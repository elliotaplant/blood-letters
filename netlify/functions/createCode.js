const Airtable = require('airtable');
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

const base = new Airtable({ apiKey: AIRTABLE_API_KEY  }).base(AIRTABLE_BASE_ID);

exports.handler = async function(event) {
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Invalid JSON payload' }) };
  }

  const [{ id }] = await base('codes').create([
    {
      fields: {
        email: body.email
      }
    }
  ]);

  return {
    statusCode: 200,
    body: JSON.stringify({ code: id })
  };
};
