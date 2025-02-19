import database from 'infra/database.js'

async function status(req, res) {
  const updatedAt = new Date().toISOString()
  const databaseVersionResult = await database.query(`show server_version;`)
  const version = databaseVersionResult.rows[0].server_version
  const maxConnectionsResult = await database.query('SHOW max_connections;')
  const maxConnections = parseInt(maxConnectionsResult.rows[0].max_connections)
  const databaseName = process.env.POSTGRES_DB
  const openedConnectionsResult = await database.query({
    text: 'SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;',
    values: [databaseName],
  })
  const openedConnections = openedConnectionsResult.rows[0].count
  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version,
        max_connections: maxConnections,
        opened_connections: openedConnections,
      },
    },
  })
}

export default status
