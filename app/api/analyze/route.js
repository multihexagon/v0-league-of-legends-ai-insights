// app/api/analyze/route.js

export async function POST(req) {
  try {
    // Validate request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON format in request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { summonerName, tag } = body;

    // Validate required fields
    if (!summonerName || !tag) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: summonerName and tag are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate field formats
    if (typeof summonerName !== "string" || typeof tag !== "string") {
      return new Response(
        JSON.stringify({
          error: "Invalid field types: summonerName and tag must be strings",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate field lengths
    if (summonerName.trim().length === 0 || tag.trim().length === 0) {
      return new Response(
        JSON.stringify({
          error: "Empty fields: summonerName and tag cannot be empty",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check Lambda endpoint configuration
    const lambdaUrl = process.env.LAMBDA_ENDPOINT;
    if (!lambdaUrl) {
      console.error("Lambda endpoint not configured");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Calling Lambda with:", {
      summonerName: summonerName.trim(),
      tag: tag.trim(),
    });

    // Call Lambda with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    let lambdaRes;
    try {
      lambdaRes = await fetch(lambdaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summonerName: summonerName.trim(),
          tag: tag.trim(),
        }),
        signal: controller.signal,
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);

      if (fetchError.name === "AbortError") {
        console.error("Lambda request timeout");
        return new Response(
          JSON.stringify({ error: "Request timeout. Please try again." }),
          { status: 504, headers: { "Content-Type": "application/json" } }
        );
      }

      console.error("Lambda fetch error:", fetchError);
      return new Response(
        JSON.stringify({ error: "Failed to connect to game data service" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    clearTimeout(timeoutId);

    // Parse Lambda response
    let data;
    try {
      data = await lambdaRes.json();
    } catch (parseError) {
      console.error("Failed to parse Lambda response:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid response from game data service" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Lambda response status:", lambdaRes.status);

    if (!lambdaRes.ok) {
      console.error("Lambda failed with status:", lambdaRes.status, data);

      // Map Lambda errors to user-friendly messages
      let userError = "Failed to retrieve player data";
      let statusCode = 500;

      if (lambdaRes.status === 404) {
        userError = "Player not found. Please check the summoner name and tag.";
        statusCode = 404;
      } else if (lambdaRes.status === 400) {
        userError = "Invalid player name or tag format.";
        statusCode = 400;
      } else if (lambdaRes.status === 429) {
        userError = "Too many requests. Please wait a moment and try again.";
        statusCode = 429;
      } else if (lambdaRes.status === 503) {
        userError = "Game servers are temporarily unavailable.";
        statusCode = 503;
      } else if (data && data.error) {
        userError = data.error;
        statusCode = lambdaRes.status;
      }

      return new Response(JSON.stringify({ error: userError }), {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate response data structure
    if (!data || typeof data !== "object") {
      console.error("Invalid data structure from Lambda:", data);
      return new Response(
        JSON.stringify({ error: "Invalid data format received" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Analyze API unexpected error:", err);

    // Don't expose internal error details to client
    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred. Please try again later.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
