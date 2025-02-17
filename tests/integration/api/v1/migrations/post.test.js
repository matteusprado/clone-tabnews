import database from 'infra/database'
beforeAll(cleanDatabase)

async function cleanDatabase () { 
  await database.query('drop schema public cascade;')
  await database.query('create schema public;')
}



test('POST /api/migrations should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/migrations', { method: 'POST' })
  expect(response.status).toBe(201)

  const responseBody = await response.json()
  expect(Array.isArray(responseBody)).toBeTruthy()
  expect(responseBody.length).toBeGreaterThan(0)
  expect(responseBody[0].path).toBeDefined()
  expect(responseBody[0].name).toBeDefined()
  expect(responseBody[0].timestamp).toBeDefined()

  const response2 = await fetch('http://localhost:3000/api/v1/migrations', { method: 'POST' })
  expect(response2.status).toBe(200)
  const responseBody2 = await response2.json()
  expect(responseBody2.length).toBe(0)

})


