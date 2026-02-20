export async function chatRequest(message: string) {
  console.log("Sending:", message);

  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  console.log("Status:", res.status);

  const data = await res.json();
  console.log("Response:", data);

  if (!res.ok) throw new Error("Request failed");
  return data;
}