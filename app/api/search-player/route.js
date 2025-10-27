// app/api/search-player/route.js

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

    // Llama a la Lambda para buscar el otro jugador
    const lambdaUrl = process.env.LAMBDA_ENDPOINT;
    const lambdaRes = await fetch(lambdaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summonerName, tag }),
    });

    const data = await lambdaRes.json();
    console.log("Search player Lambda response:", data);

    if (!lambdaRes.ok) {
      console.error("Lambda failed:", data);
      return new Response(
        JSON.stringify({ error: data.error || "Player not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Devolver solo los datos necesarios para la comparación
    const playerData = {
      name: `${summonerName}#${tag}`,
      summary: data.summary,
      topChampion: data.matches?.[0]
        ? {
            name: data.matches[0].champion,
            image: data.matches[0].champion_img,
          }
        : null,
    };

    return new Response(JSON.stringify(playerData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Search player API error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
