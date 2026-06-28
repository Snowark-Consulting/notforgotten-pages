export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { businessName, contactName, mobile, email, industry, quotesPerMonth, quoteFollowUp, quoteMethod, notes } = req.body || {};

  if (!businessName || !contactName || !email) {
    return res.status(400).json({ error: 'Business name, contact name, and email are required' });
  }

  const outreachNotes = [
    quotesPerMonth ? `Quotes/month: ${quotesPerMonth}` : '',
    quoteFollowUp ? `Follow-up process: ${quoteFollowUp}` : '',
    quoteMethod ? `Quote method: ${quoteMethod}` : '',
    notes ? `Additional: ${notes}` : ''
  ].filter(Boolean).join('\n');

  const fields = {
    'Business name': businessName,
    'Contact first name': contactName,
    'Mobile': mobile || '',
    'Email': email,
    'Industry': industry || 'Other',
    'Source': 'Inbound',
    'Pipeline stage': 'New',
    'First contacted date': new Date().toISOString().split('T')[0],
    'Outreach notes': outreachNotes
  };

  try {
    const resp = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Prospects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ typecast: true, fields })
    });

    if (!resp.ok) {
      const err = await resp.json();
      return res.status(resp.status).json({ error: err.error?.message || 'Airtable write failed' });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
}
