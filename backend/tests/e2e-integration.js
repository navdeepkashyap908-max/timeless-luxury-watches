import assert from "node:assert";

const BACKEND_URL = "http://127.0.0.1:5000/api";
const FRONTEND_URL = "http://127.0.0.1:3000";

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    process.stdout.write(`Testing: ${name}... `);
    await fn();
    console.log(" PASSED");
    passed++;
  } catch (err) {
    console.log(" FAILED");
    console.error(`  Error: ${err.message}`);
    failed++;
  }
}

async function run() {
  console.log("\n=======================================================");
  console.log(" TIMELESS Haute Horlogerie — Full E2E Integration Suite");
  console.log("=======================================================\n");

  // 1. Frontend Server
  await test("Frontend Dev Server serves HTML on 127.0.0.1:3000", async () => {
    const res = await fetch(FRONTEND_URL);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes("<!doctype html>") || html.includes("<html"));
    assert.ok(html.includes("TIMELESS"));
  });

  // 2. Backend Health
  await test("Backend API /api/health responds with status ok", async () => {
    const res = await fetch(`${BACKEND_URL}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, "ok");
    assert.ok(data.uptime >= 0);
  });

  // 3. Demo User Login
  let authToken = null;
  let demoUser = null;
  await test("Auth: Login with demonstration collector account", async () => {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "collector@timeless.ch",
        password: "Password123!",
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token);
    assert.strictEqual(data.user.email, "collector@timeless.ch");
    authToken = data.token;
    demoUser = data.user;
  });

  // 4. Authenticated /me
  await test("Auth: Get current profile (/api/auth/me) with JWT", async () => {
    const res = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.data.email, "collector@timeless.ch");
  });

  // 5. Registration with new user
  const uniqueEmail = `collector_${Date.now()}@geneva-vault.ch`;
  let newCollectorToken = null;
  await test("Auth: Register new collector with password hashing", async () => {
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Lord Vikramaditya Singhania",
        email: uniqueEmail,
        password: "SecurePassword987!",
        phone: "+91 98200 12345",
        city: "Mumbai",
      }),
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token);
    assert.strictEqual(data.user.name, "Lord Vikramaditya Singhania");
    newCollectorToken = data.token;
  });

  // 6. Tasks CRUD - Create
  let createdTaskId = null;
  await test("Tasks CRUD: POST /api/tasks (Create Concierge Task)", async () => {
    const res = await fetch(`${BACKEND_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title: "Bespoke Royal Chronometer Strap Fitting",
        description: "Requesting dark cognac alligator leather strap with 18k rose gold folding buckle at BKC Mumbai salon.",
        category: "concierge",
        priority: "high",
        watchName: "Royal Chronometer 41mm",
        location: "Mumbai BKC Flagship Suite",
        status: "pending",
      }),
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.data._id);
    assert.strictEqual(data.data.title, "Bespoke Royal Chronometer Strap Fitting");
    createdTaskId = data.data._id;
  });

  // 7. Tasks CRUD - Read List
  await test("Tasks CRUD: GET /api/tasks (Retrieve Collector Tasks)", async () => {
    const res = await fetch(`${BACKEND_URL}/tasks`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.ok(data.data.some((t) => t._id === createdTaskId));
  });

  // 8. Tasks CRUD - Read One
  await test("Tasks CRUD: GET /api/tasks/:id (Retrieve Single Task)", async () => {
    const res = await fetch(`${BACKEND_URL}/tasks/${createdTaskId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.data._id, createdTaskId);
  });

  // 9. Tasks CRUD - Update
  await test("Tasks CRUD: PUT /api/tasks/:id (Update Task Status to in_progress)", async () => {
    const res = await fetch(`${BACKEND_URL}/tasks/${createdTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        status: "in_progress",
        priority: "urgent",
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.data.status, "in_progress");
    assert.strictEqual(data.data.priority, "urgent");
  });

  // 10. Tasks CRUD - Delete
  await test("Tasks CRUD: DELETE /api/tasks/:id (Archive Task)", async () => {
    const res = await fetch(`${BACKEND_URL}/tasks/${createdTaskId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);

    // Verify deletion
    const verifyRes = await fetch(`${BACKEND_URL}/tasks/${createdTaskId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert.strictEqual(verifyRes.status, 404);
  });

  // 11. Watches Catalog
  await test("Watches Catalog: GET /api/watches (Search & Filters)", async () => {
    const res = await fetch(`${BACKEND_URL}/watches?search=chronometer`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.data.length > 0);
    assert.ok(data.data.some((w) => w.id === "royal-chronometer"));
  });

  // 12. Escrow Order Creation
  await test("Orders: POST /api/orders (Create Escrow Custody Order)", async () => {
    const res = await fetch(`${BACKEND_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        items: [
          {
            watchId: "royal-chronometer",
            name: "Royal Chronometer 41mm",
            price: 1485000,
            quantity: 1,
            strap: "alligator-cognac",
            dial: "champagne",
          },
        ],
        totalAmount: 1485000,
        deliveryCity: "Mumbai",
        address: "Altamount Road, South Mumbai",
        pincode: "400026",
        paymentMethod: "institutional_escrow",
      }),
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.data.referenceNumber.startsWith("TL-ESCROW-"));
  });

  // 13. Pre-Owned Valuation Dossier
  await test("Valuations: POST /api/valuations (Submit Trade-In Appraisal)", async () => {
    const res = await fetch(`${BACKEND_URL}/valuations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        brand: "Patek Philippe",
        model: "Nautilus 5711/1R",
        year: "2021",
        condition: "mint",
        hasBox: true,
        hasPapers: true,
        estimatedMin: 6500000,
        estimatedMax: 7200000,
        beneficiaryName: "Lord Vikramaditya Singhania",
        beneficiaryPhone: "+91 98200 12345",
        beneficiaryCity: "Mumbai",
      }),
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.valuation.referenceId.startsWith("TL-VAL-"));
  });

  // 14. Wishlist Toggle Sync
  await test("Auth: POST /api/auth/wishlist/toggle (Sync Saved Timepieces)", async () => {
    const res = await fetch(`${BACKEND_URL}/auth/wishlist/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ watchId: "sovereign-celestial" }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.wishlist));
  });

  console.log("\n-------------------------------------------------------");
  console.log(`📊 Final Results: ${passed} Passed, ${failed} Failed`);
  console.log("-------------------------------------------------------\n");

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("FATAL SUITE ERROR:", e);
  process.exit(1);
});
