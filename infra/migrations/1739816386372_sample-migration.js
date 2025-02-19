/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  console.log('running a sample migration', pgm)
}

exports.down = (pgm) => {
  console.log('reverting a sample migration', pgm)
}
