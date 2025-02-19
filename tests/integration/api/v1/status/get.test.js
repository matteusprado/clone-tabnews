import orchestrator from "tests/orchestrator"

beforeAll(async () => {
  await orchestrator.waitForAllServices();
})

test('GET /api/status should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status')
  expect(response.status).toBe(200)
  const responseBody = await response.json()
  expect(responseBody.updated_at).toBeDefined()
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
  expect(responseBody.updated_at).toBe(parsedUpdatedAt)
  expect(responseBody.dependencies.database).toBeDefined()
  expect(responseBody.dependencies.database.version).toBe('16.0')
  expect(responseBody.dependencies.database.max_connections).toBe(100)
  expect(responseBody.dependencies.database.opened_connections).toBe(1)
})


