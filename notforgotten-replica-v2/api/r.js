/**
 * Not Forgotten — Campaign Response Handler
 * Route: /r?t=<token>
 * 
 * Handles YES, NO CALL, and UNSUBSCRIBE responses from campaign emails.
 * Tokens are opaque — no Airtable IDs or email addresses in URLs.
 */
export default async function handler(req, res) {
  const { t } = req.query;

  if (!t) {
    return res.status(400).send('Missing token.');
  }

  // ── TEST TOKENS (test-{action}-{name}) ──
  if (t.startsWith('test-')) {
    const parts = t.replace('test-', '').split('-');
    const action = parts[0]; // 'yes', 'no', or 'unsub'
    const name = parts.slice(1).join('-') || 'there';

    if (action === 'yes') {
      return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Thanks</title></head>
<body style="font-family: Arial, Helvetica, sans-serif; background: #f7fbff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0;">
<div style="text-align: center; max-width: 400px; padding: 40px;">
<p style="font-size: 18px; color: #0b2c4d; margin: 0 0 8px 0;">Thanks ${name.charAt(0).toUpperCase() + name.slice(1)},</p>
<p style="font-size: 16px; color: #666; margin: 0 0 24px 0;">James will give you a call this week.</p>
<p style="font-size: 12px; color: #aaa;">— Not Forgotten</p>
</div></body></html>`);
    }

    if (action === 'no') {
      return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>No Problem</title></head>
<body style="font-family: Arial, Helvetica, sans-serif; background: #f7fbff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0;">
<div style="text-align: center; max-width: 400px; padding: 40px;">
<p style="font-size: 18px; color: #0b2c4d; margin: 0 0 8px 0;">No problem, ${name.charAt(0).toUpperCase() + name.slice(1)}.</p>
<p style="font-size: 16px; color: #666; margin: 0 0 24px 0;">James won't call you as a result of this email.</p>
<p style="font-size: 12px; color: #aaa;">— Not Forgotten</p>
</div></body></html>`);
    }

    if (action === 'unsub') {
      return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Unsubscribed</title></head>
<body style="font-family: Arial, Helvetica, sans-serif; background: #f7fbff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0;">
<div style="text-align: center; max-width: 400px; padding: 40px;">
<p style="font-size: 18px; color: #0b2c4d; margin: 0 0 24px 0;">You've been unsubscribed from future Not Forgotten marketing.</p>
<p style="font-size: 12px; color: #aaa;">— Not Forgotten</p>
</div></body></html>`);
    }

    return res.status(400).send('Unknown test action.');
  }

  // ── PRODUCTION TOKENS ──
  // Opaque token format: {uuid}
  // Lookup in Airtable: Campaign Tokens table
  // Token maps to: prospect_id, campaign_id, action
  
  const AIRTABLE_KEY = process.env.AIRTABLE_API_KEY;
  const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appgw8Q993yOh4xpQ';
  
  if (!AIRTABLE_KEY) {
    return res.status(500).send('Server configuration error.');
  }

  try {
    // Look up token in Campaign Tokens table
    const formula = encodeURIComponent(`{Token}='${t}'`);
    const url = `https://api.airtable.com/v0/${BASE_ID}/Campaign%20Tokens?filterByFormula=${formula}&maxRecords=1`;
    
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${AIRTABLE_KEY}` }
    });
    
    if (!response.ok) {
      return res.status(500).send('Unable to process request.');
    }
    
    const data = await response.json();
    
    if (!data.records || data.records.length === 0) {
      return res.status(404).send('Token not found or already processed.');
    }
    
    const record = data.records[0];
    const fields = record.fields;
    const action = fields.Action;
    const prospectId = fields.Prospect ? fields.Prospect[0] : null;
    const firstName = fields['First Name'] || '';
    const name = firstName || 'there';
    
    // Only process if not already used
    if (fields.Processed) {
      if (action === 'YES') {
        return res.status(200).send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Thanks</title></head><body style="font-family: Arial, Helvetica, sans-serif; background: #f7fbff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0;"><div style="text-align: center; max-width: 400px; padding: 40px;"><p style="font-size: 18px; color: #0b2c4d; margin: 0 0 8px 0;">Thanks ${name},</p><p style="font-size: 16px; color: #666; margin: 0 0 24px 0;">James will give you a call this week.</p><p style="font-size: 12px; color: #aaa;">— Not Forgotten</p></div></body></html>`);
      }
      if (action === 'NO_CALL') {
        return res.status(200).send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>No Problem</title></head><body style="font-family: Arial, Helvetica, sans-serif; background: #f7fbff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0;"><div style="text-align: center; max-width: 400px; padding: 40px;"><p style="font-size: 18px; color: #0b2c4d; margin: 0 0 8px 0;">No problem, ${name}.</p><p style="font-size: 16px; color: #666; margin: 0 0 24px 0;">James won't call you as a result of this email.</p><p style="font-size: 12px; color: #aaa;">— Not Forgotten</p></div></body></html>`);
      }
      if (action === 'UNSUBSCRIBE') {
        return res.status(200).send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Unsubscribed</title></head><body style="font-family: Arial, Helvetica, sans-serif; background: #f7fbff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0;"><div style="text-align: center; max-width: 400px; padding: 40px;"><p style="font-size: 18px; color: #0b2c4d; margin: 0 0 24px 0;">You've been unsubscribed from future Not Forgotten marketing.</p><p style="font-size: 12px; color: #aaa;">— Not Forgotten</p></div></body></html>`);
      }
    }
    
    // Mark as processed and update prospect
    const now = new Date().toISOString();
    const updateBody = { fields: { Processed: true, 'Processed At': now } };
    
    await fetch(`https://api.airtable.com/v0/${BASE_ID}/Campaign%20Tokens/${record.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateBody)
    });
    
    // Update prospect record
    if (prospectId && action) {
      const prospectUpdate = {
        fields: {
          'Campaign Response': action === 'YES' ? 'YES' : action === 'NO_CALL' ? 'NO CALL' : 'Unsubscribed',
          'Campaign Response At': now,
        }
      };
      
      if (action === 'YES') {
        prospectUpdate.fields['Permission To Call'] = 'YES';
        prospectUpdate.fields["James' Action"] = '📞 Call Today';
      } else if (action === 'NO_CALL') {
        prospectUpdate.fields['Permission To Call'] = 'NO';
      } else if (action === 'UNSUBSCRIBE') {
        prospectUpdate.fields['Sequence Status'] = 'Unsubscribed';
        prospectUpdate.fields['Marketing Suppressed'] = true;
      }
      
      await fetch(`https://api.airtable.com/v0/${BASE_ID}/Prospects/${prospectId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prospectUpdate)
      });
    }
    
    // Return appropriate confirmation
    if (action === 'YES') {
      return res.status(200).send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Thanks</title></head><body style="font-family: Arial, Helvetica, sans-serif; background: #f7fbff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0;"><div style="text-align: center; max-width: 400px; padding: 40px;"><p style="font-size: 18px; color: #0b2c4d; margin: 0 0 8px 0;">Thanks ${name},</p><p style="font-size: 16px; color: #666; margin: 0 0 24px 0;">James will give you a call this week.</p><p style="font-size: 12px; color: #aaa;">— Not Forgotten</p></div></body></html>`);
    }
    if (action === 'NO_CALL') {
      return res.status(200).send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>No Problem</title></head><body style="font-family: Arial, Helvetica, sans-serif; background: #f7fbff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0;"><div style="text-align: center; max-width: 400px; padding: 40px;"><p style="font-size: 18px; color: #0b2c4d; margin: 0 0 8px 0;">No problem, ${name}.</p><p style="font-size: 16px; color: #666; margin: 0 0 24px 0;">James won't call you as a result of this email.</p><p style="font-size: 12px; color: #aaa;">— Not Forgotten</p></div></body></html>`);
    }
    if (action === 'UNSUBSCRIBE') {
      return res.status(200).send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Unsubscribed</title></head><body style="font-family: Arial, Helvetica, sans-serif; background: #f7fbff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0;"><div style="text-align: center; max-width: 400px; padding: 40px;"><p style="font-size: 18px; color: #0b2c4d; margin: 0 0 24px 0;">You've been unsubscribed from future Not Forgotten marketing.</p><p style="font-size: 12px; color: #aaa;">— Not Forgotten</p></div></body></html>`);
    }
    
    return res.status(400).send('Unknown action.');
    
  } catch (err) {
    console.error('Campaign response error:', err);
    return res.status(500).send('An error occurred. Please try again.');
  }
}
