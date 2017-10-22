// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      from: '0x0869a6b40b036e0cecacacc5edc50232ba5071ad'
    }
  }
}
