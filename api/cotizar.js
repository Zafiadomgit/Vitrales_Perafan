const LIMITS = { nombre: 120, contacto: 160, tipo: 80, ubicacion: 200, idea: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LABELS = {
  nombre: 'Nombre',
  contacto: 'Correo / WhatsApp',
  tipo: 'Tipo de proyecto',
  ubicacion: 'Ubicación y dimensiones',
  idea: 'Idea del proyecto'
};

const escapeHtml = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function parseBody(body) {
  if (body && typeof body === 'object') return body;
  try { return JSON.parse(body || '{}'); } catch { return {}; }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = parseBody(req.body);
  // Bots fill the hidden field; answer as if it worked so they don't retry.
  if (body._honey) return res.status(200).json({ ok: true });

  const f = {};
  for (const key of Object.keys(LIMITS)) f[key] = String(body[key] ?? '').trim().slice(0, LIMITS[key]);
  if (!f.nombre || !f.contacto) return res.status(400).json({ ok: false, error: 'missing_fields' });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }
  const to = (process.env.CONTACT_TO || 'vitralesperafan@yahoo.com').split(',').map(s => s.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM || 'Vitrales Perafán <onboarding@resend.dev>';

  const rows = Object.keys(LABELS).map(k => [LABELS[k], f[k] || '—']);
  const html = `
    <h2 style="font-family:Georgia,serif;color:#4a3323">Nueva solicitud de cotización</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#4a3323">
      ${rows.map(([label, value]) => `
        <tr>
          <td style="border:1px solid #e3d3b5;background:#f7f0e3;font-weight:bold;vertical-align:top">${label}</td>
          <td style="border:1px solid #e3d3b5;white-space:pre-wrap">${escapeHtml(value)}</td>
        </tr>`).join('')}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#8a5a2f">Enviado desde el formulario de vitralesperafan.com</p>`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

  const payload = {
    from,
    to,
    subject: `Solicitud de cotización — ${f.nombre.replace(/[\r\n]+/g, ' ')}`,
    html,
    text
  };
  if (EMAIL_RE.test(f.contacto)) payload.reply_to = f.contacto;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ ok: false, error: 'send_failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend request failed', err);
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
};
