import database from 'infra/database'
import orchestrator from "tests/orchestrator"

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query('drop schema public cascade; create schema public;')
})

test('GET /api/migrations should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/migrations')
  expect(response.status).toBe(200)

  const responseBody = await response.json()
  expect(Array.isArray(responseBody)).toBeTruthy()
  expect(responseBody.length).toBeGreaterThan(0)
  expect(responseBody[0].path).toBeDefined()
  expect(responseBody[0].name).toBeDefined()
  expect(responseBody[0].timestamp).toBeDefined()
})


