// utils/fetchData.js
export async function fetchData(summonerName, tag) {
  const res = await fetch("/api/analyze", {
    method: "POST",                           // 👈 se hace POST
    headers: {
      "Content-Type": "application/json",     // 👈 importante para que Next parse req.body
    },
    body: JSON.stringify({ summonerName, tag }) // 👈 aquí se arma el cuerpo
  });

  console.log("Proxy response status:", res);
  if (!res.ok) {
    throw new Error(`Proxy returned ${res.status}: ${await res.text()}`);
  }

  return await res.json();
}
