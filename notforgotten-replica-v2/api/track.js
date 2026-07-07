// /api/track — Email Open Tracking Pixel
// Serves 1x1 transparent GIF, logs open to Airtable
export default async function handler(req, res) {
  const { t } = req.query;

  // --- Serve pixel regardless of token validity (don't leak tracking state) ---
  const PIXEL = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
  );
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!t) {
    return res.status(200).send(PIXEL);
  }

  // --- Decode token: base64url JSON {p: "recXXX", ts: 1234567890} ---
  let payload;
  try {
    // Normalize base64url to base64
    const b64 = t.replace(/-/g, '+').replace(/_/g, '/');
    payload = JSON.parse(Buffer.from(b64, 'base64').toString('utf-8'));
  } catch {
    return res.status(200).send(PIXEL);
  }

  if (!payload.p) {
    return res.status(200).send(PIXEL);
  }

  // --- Decide: delivery proxy or real open? ---
  const nowS = Math.floor(Date.now() / 1000);
  const elapsed = nowS - (payload.ts || 0);
  const isDelivery = elapsed <= 10; // ≤ 10s = Gmail/Apple proxy pre-fetch, not human

  // --- Log to Airtable ---
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!baseId || !apiKey) {
      console.error('track.js: missing AIRTABLE_BASE_ID or AIRTABLE_API_KEY env vars');
      return res.status(200).send(PIXEL);
    }

    const nowISO = new Date().toISOString();
    const nowAdelaide = new Date().toLocaleString('en-AU', {
      timeZone: 'Australia/Adelaide',
      dateStyle: 'short',
      timeStyle: 'medium'
    });

    if (isDelivery) {
      // Proxy pre-fetch — log delivery, don't count as open
      await fetch(
        `https://api.airtable.com/v0/${baseId}/Prospects/${payload.p}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            typecast: true,
            fields: { 'Delivery date': nowISO },
          }),
        }
      );
      console.log(`track.js: delivery logged for ${payload.p} at ${nowAdelaide} ACST (${elapsed}s after send — proxy)`);
    } else {
      // Real open — fetch current count, increment, update
      const getResp = await fetch(
        `https://api.airtable.com/v0/${baseId}/Prospects/${payload.p}`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );

      let currentCount = 0;
      if (getResp.ok) {
        const data = await getResp.json();
        currentCount = data.fields?.['Open count'] || 0;
      }

      await fetch(
        `https://api.airtable.com/v0/${baseId}/Prospects/${payload.p}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            typecast: true,
            fields: {
              'Last opened date': nowISO,
              'Open count': currentCount + 1,
            },
          }),
        }
      );
      console.log(`track.js: open logged for ${payload.p} at ${nowAdelaide} ACST (${elapsed}s after send — count: ${currentCount + 1})`);
    }
  } catch (e) {
    console.error(`track.js: Airtable update failed — ${e.message}`);
  }

  return res.status(200).send(PIXEL);
}
