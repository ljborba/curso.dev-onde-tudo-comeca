import database from "infra/database.js";

// beforeAll(cleanDataBase);

// async function cleanDataBase() {
//   await database.query("drop shema public cascade; create schema public;");
// }

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(Array.isArray(responseBody)).toBe(true);

  // const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  // expect(responseBody.updated_at).toEqual(parseUpdatedAt);

  // expect(responseBody.dependencies.database.version).toEqual("16.0");

  // expect(responseBody.dependencies.database.max_connections).toEqual(100);

  // expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
