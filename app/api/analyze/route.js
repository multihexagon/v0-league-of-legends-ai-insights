// app/api/analyze/route.js

export async function POST(req) {
  try {
    const body = await req.json();
    const { summonerName, tag } = body;

    if (!summonerName || !tag) {
      return new Response(
        JSON.stringify({ error: "Missing summonerName or tag" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Llama a la Lambda (usa tu variable de entorno)
    const lambdaUrl = process.env.LAMBDA_ENDPOINT;
    const lambdaRes = await fetch(lambdaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summonerName, tag }),
    });

    const data = await lambdaRes.json();
    console.log("Lambda response:", data);
    if (!lambdaRes.ok) {
      console.error("Lambda failed:", data);
      return new Response(
        JSON.stringify({ error: data.error || "Lambda request failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Analyze API error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
