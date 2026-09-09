// Vercel serverless function: forwards a lightweight visitor ping to Discord.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not configured");
    return res.status(500).json({ error: "Notifications are not configured" });
  }

  const truncate = (value, max) =>
    typeof value === "string" ? value.slice(0, max) : "";

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const path = truncate(body.path, 200) || "/";
  const referrer = truncate(body.referrer, 200) || "direct";
  const userAgent = truncate(req.headers["user-agent"], 200) || "unknown";
  const ip =
    truncate(req.headers["x-forwarded-for"], 100).split(",")[0].trim() ||
    "unknown";

  const payload = {
    embeds: [
      {
        title: "New portfolio visitor",
        color: 0xc9a227,
        fields: [
          { name: "Page", value: path, inline: true },
          { name: "Referrer", value: referrer, inline: true },
          { name: "IP", value: ip, inline: true },
          { name: "User agent", value: userAgent },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!discordRes.ok) {
      console.error("Discord webhook error", discordRes.status, await discordRes.text());
      return res.status(502).json({ error: "Failed to notify" });
    }

    return res.status(204).end();
  } catch (err) {
    console.error("Discord webhook request failed", err);
    return res.status(502).json({ error: "Failed to notify" });
  }
}
