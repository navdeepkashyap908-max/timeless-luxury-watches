import dotenv from "dotenv";
dotenv.config();

import { connectDB, disconnectDB } from "../src/config/db.js";
import { seedDatabase } from "../src/seed.js";
import app from "../src/server.js";

const PORT = 5055;

async function runTests() {
  console.log("==================================================");
  console.log("🧪 Starting Automated Backend API Test Suite");
  console.log("==================================================\n");

  await connectDB();
  await seedDatabase();

  const server = app.listen(PORT);
  const BASE_URL = `http://127.0.0.1:${PORT}`;

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✓ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ FAIL: ${name}`);
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  }

  let authToken = "";
  let createdTaskId = "";

  try {
    // 1. Health check
    await test("GET /api/health returns 200 and 'ok' status", async () => {
      const res = await fetch(`${BASE_URL}/api/health`);
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      const data = await res.json();
      if (data.status !== "ok") throw new Error(`Expected status 'ok', got ${data.status}`);
    });

    // 2. Watches Catalog
    await test("GET /api/watches returns populated watch collection", async () => {
      const res = await fetch(`${BASE_URL}/api/watches`);
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.data) || data.data.length < 5) {
        throw new Error(`Expected at least 5 watches, got ${data.data?.length}`);
      }
    });

    await test("GET /api/watches/royal-chronometer returns single watch details", async () => {
      const res = await fetch(`${BASE_URL}/api/watches/royal-chronometer`);
      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      const data = await res.json();
      if (data.data.id !== "royal-chronometer") {
        throw new Error(`Expected id 'royal-chronometer', got ${data.data.id}`);
      }
    });

    // 3. User Authentication
    const testEmail = `test.collector.${Date.now()}@timeless.ch`;
    await test("POST /api/auth/register creates a new collector account", async () => {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Baron Alexander Geneva",
          email: testEmail,
          password: "SecurePassword123!",
          phone: "+41 22 819 1800",
          city: "Geneva",
        }),
      });

      if (res.status !== 201) {
        const errData = await res.json();
        throw new Error(`Expected 201, got ${res.status}: ${errData.error}`);
      }
      const data = await res.json();
      if (!data.token) throw new Error("Expected JWT token in response");
      authToken = data.token;
    });

    await test("POST /api/auth/login authenticates with valid credentials", async () => {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testEmail,
          password: "SecurePassword123!",
        }),
      });

      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      const data = await res.json();
      if (!data.token) throw new Error("Expected JWT token");
    });

    await test("GET /api/auth/me returns current user profile with token", async () => {
      const res = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      const data = await res.json();
      if (data.user.email !== testEmail) {
        throw new Error(`Expected ${testEmail}, got ${data.user.email}`);
      }
    });

    // 4. Tasks REST APIs: Create, Retrieve, Update, Delete (CRUD)
    await test("POST /api/tasks creates a new task / concierge request", async () => {
      const res = await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: "Schedule Salon Viewing for Aethelgard Tourbillon",
          description: "Private appointment at Geneva Atelier with Director.",
          category: "viewing_request",
          priority: "high",
          watchId: "aethelgard-tourbillon",
          watchName: "Aethelgard Tourbillon Skeleton",
        }),
      });

      if (res.status !== 201) {
        const errData = await res.json();
        throw new Error(`Expected 201, got ${res.status}: ${errData.error}`);
      }
      const data = await res.json();
      if (!data.data._id) throw new Error("Expected created task ID");
      createdTaskId = data.data._id;
    });

    await test("GET /api/tasks retrieves collector's tasks", async () => {
      const res = await fetch(`${BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data.data) || data.data.length === 0) {
        throw new Error("Expected array with at least 1 task");
      }
    });

    await test("GET /api/tasks/:id retrieves single task by ID", async () => {
      const res = await fetch(`${BASE_URL}/api/tasks/${createdTaskId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      const data = await res.json();
      if (data.data._id !== createdTaskId) {
        throw new Error(`Expected task ID ${createdTaskId}, got ${data.data._id}`);
      }
    });

    await test("PUT /api/tasks/:id updates an existing task", async () => {
      const res = await fetch(`${BASE_URL}/api/tasks/${createdTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          status: "in_progress",
          priority: "urgent",
          description: "Appointment confirmed with Salon Director for Thursday 3 PM.",
        }),
      });

      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
      const data = await res.json();
      if (data.data.status !== "in_progress") {
        throw new Error(`Expected status 'in_progress', got ${data.data.status}`);
      }
    });

    await test("DELETE /api/tasks/:id deletes the task", async () => {
      const res = await fetch(`${BASE_URL}/api/tasks/${createdTaskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);

      // Verify deletion
      const checkRes = await fetch(`${BASE_URL}/api/tasks/${createdTaskId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (checkRes.status !== 404) {
        throw new Error(`Expected 404 after deletion, got ${checkRes.status}`);
      }
    });

    // 5. Escrow Orders
    await test("POST /api/orders creates an escrow custody allocation order", async () => {
      const res = await fetch(`${BASE_URL}/api/orders`, {
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
              reference: "Ref. TL-904L-RG",
              quantity: 1,
              selectedStrap: "alligator-cognac",
              selectedDial: "champagne",
              unitPrice: 1485000,
            },
          ],
          subtotal: 1485000,
          deliveryAddress: {
            city: "Mumbai",
            address: "Penthouse 42, Altamount Road",
            pincode: "400026",
          },
        }),
      });

      if (res.status !== 201) throw new Error(`Expected 201, got ${res.status}`);
      const data = await res.json();
      if (!data.order.escrowRef) throw new Error("Expected escrowRef in order");
    });

    // 6. Pre-Owned Valuations
    await test("POST /api/valuations submits a trade-in valuation dossier", async () => {
      const res = await fetch(`${BASE_URL}/api/valuations`, {
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
          estimatedMin: 7200000,
          estimatedMax: 8400000,
          beneficiaryName: "Baron Alexander",
          beneficiaryPhone: "+91 98200 98200",
          beneficiaryCity: "Mumbai",
        }),
      });

      if (res.status !== 201) throw new Error(`Expected 201, got ${res.status}`);
      const data = await res.json();
      if (!data.valuation.referenceId) throw new Error("Expected referenceId in valuation");
    });
  } finally {
    server.close();
    await disconnectDB();
  }

  console.log("\n==================================================");
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
