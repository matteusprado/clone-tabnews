const { exec } = require('node:child_process')
function checkPostgres() {
  exec('docker exec postgres-dev pg_isready --host localhost', handleReturn)
  function handleReturn(_, stdout) {
    if (stdout.search('accepting connections') === -1) {
      process.stdout.write('.')
      checkPostgres()
      return
    }
    process.stdout.write('\n')
    console.log('\n✅ Postgres is ready and accepting connections\n')
  }
}
process.stdout.write('\n\n🛑 Waiting for postgres to accept connections')

checkPostgres()
