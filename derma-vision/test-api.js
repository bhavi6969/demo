/**
 * API Verification Script
 * Run: node test-api.js
 * Make sure the backend is running first: npm run dev (in derma-vision/)
 */

const BASE = 'http://localhost:5000';
const TEST_EMAIL = `test_${Date.now()}@dermavision.ai`;
const TEST_PASS = 'TestPass123!';
let token = '';

const log = (label, ok, data) => {
  const icon = ok ? '✅' : '❌';
  console.log(`${icon} ${label}`);
  if (!ok) console.error('   →', JSON.stringify(data, null, 2));
};

async function run() {
  console.log('\n═══════════════════════════════════════');
  console.log('  DermaVision API Verification Suite');
  console.log('═══════════════════════════════════════\n');

  // 1. Register
  let res = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Patient',
      email: TEST_EMAIL,
      password: TEST_PASS,
      phone: '+1 555 000 0001',
      allergies: 'Penicillin',
      skinCondition: 'Eczema'
    })
  });
  let data = await res.json();
  log('POST /api/auth/register', res.ok && data.token, data);
  if (!res.ok) return;
  token = data.token;

  // 2. Login
  res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: TEST_EMAIL, password: TEST_PASS })
  });
  data = await res.json();
  log('POST /api/auth/login', res.ok && data.token, data);
  if (data.token) token = data.token;

  // 3. GET /me
  res = await fetch(`${BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  data = await res.json();
  log('GET  /api/auth/me', res.ok && data.success && data.user.allergies === 'Penicillin', data);

  // 4. PUT /me (update profile)
  res = await fetch(`${BASE}/api/auth/me`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name: 'Updated Patient', skinCondition: 'Psoriasis' })
  });
  data = await res.json();
  log('PUT  /api/auth/me', res.ok && data.success && data.user.skinCondition === 'Psoriasis', data);

  // 5. GET /api/predict/history (empty initially)
  res = await fetch(`${BASE}/api/predict/history`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  data = await res.json();
  log('GET  /api/predict/history', res.ok && data.success && Array.isArray(data.history), data);

  // 6. GET /api/chat/history (empty initially)
  res = await fetch(`${BASE}/api/chat/history`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  data = await res.json();
  log('GET  /api/chat/history', res.ok && data.success && Array.isArray(data.messages), data);

  // 7. POST /api/chat/message
  res = await fetch(`${BASE}/api/chat/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text: 'What causes acne?' })
  });
  data = await res.json();
  log('POST /api/chat/message', res.ok && data.success && data.messages.length >= 2, data);

  // 8. DELETE /api/chat/history
  res = await fetch(`${BASE}/api/chat/history`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  data = await res.json();
  log('DEL  /api/chat/history', res.ok && data.success && data.messages.length === 0, data);

  // 9. POST /api/analysis (save full skin analysis)
  res = await fetch(`${BASE}/api/analysis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      scanId: 'scan-test-001',
      diseaseId: 'acne',
      diseaseName: 'Acne Vulgaris',
      confidence: '94%',
      severity: 'Moderate',
      imageUrl: '/uploads/test.jpg',
      answers: { skinType: 'oily', primaryConcern: 'acne', ageGroup: 'twenties', lifestyle: 'moderate' },
      recommendations: {
        products: [{ category: 'Cleanser', name: 'CeraVe Foaming', why: 'Removes oil', icon: 'Droplet' }],
        foodTips: [{ label: 'Omega-3', tip: 'Eat salmon', icon: 'Fish' }],
        routine: { morning: 'Cleanse + SPF', night: 'Retinol + moisturise' }
      }
    })
  });
  data = await res.json();
  log('POST /api/analysis', res.ok && data.success && data.analysis._id, data);

  // 10. GET /api/analysis/latest
  res = await fetch(`${BASE}/api/analysis/latest`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  data = await res.json();
  log('GET  /api/analysis/latest', res.ok && data.success && data.analysis?.diseaseName === 'Acne Vulgaris', data);

  console.log('\n═══════════════════════════════════════');
  console.log('  All tests complete.');
  console.log('  Note: POST /api/predict requires a real image file.');
  console.log('  Test it manually via the UI after starting the backend.');
  console.log('═══════════════════════════════════════\n');
}

run().catch(console.error);
