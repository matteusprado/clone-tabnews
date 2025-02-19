const nextJest = require('next/jest')
const dotenv = require('dotenv')

dotenv.config({
  path: '.env.development'
})

const createJestConfig = nextJest({
  dir: './',
})

module.exports = createJestConfig({
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testTimeout: 1000 * 60,
})