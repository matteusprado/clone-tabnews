import { Client } from 'pg'


async function query(queryObject) {
  const client = await getNewClient()
    .catch((error) => {
      console.error('Error connecting to database: ', error.message, 'at', new Date().toISOString())
      throw error
    })
  try {
    const result = await client.query(queryObject)
    return result
  } catch (error) {
    console.error('Error connecting to database: ', error.message, 'at', new Date().toISOString())
    throw error
  } finally {
    await client.end()
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  })
  await client.connect()
  return client;
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "production" ? true : false;
}

export default {
  query,
  getNewClient
}
