var pg = require('pg')

module.exports = {
  get: function(query, res) {
    var client = new pg.Client(process.env.HEROKU_POSTGRESQL_COBALT_URL)
    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }

      client.query(query, function(err, result) {
        if(err) {
          return console.error('error running query', err)
        }
        res.json(result.rows)
        client.end()
      })
    })
  }
}
