import migrationRunner from 'node-pg-migrate'
import { join } from 'node:path'
import database from 'infra/database'

export default async function migrations(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).send()
  }
  const dbClient = await database.getNewClient()
    .catch((err) => {
      console.error(err)
      return res.status(500).send()
    })
  try {
    const defaultMigrationConfig = {
      dbClient,
      dryRun: req.method === 'POST' ? false : true,
      dir: join("infra", "migrations"),
      direction: 'up',
      migrationsTable: 'pgmigrations',
      verbose: true
    }

    const pendingMigrations = await migrationRunner({
      ...defaultMigrationConfig,
    })
    await dbClient.end()
    const STATUS_CODE = pendingMigrations.length > 0 && req.method === 'POST' ? 201 : 200
    return res.status(STATUS_CODE).json(pendingMigrations)
  } catch (error) {
    console.error(error)
    return res.status(500).send()
  } finally {
    await dbClient.end()
  }
}


