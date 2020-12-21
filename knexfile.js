// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    UseNullAsDefault:true, // flag required by SQLite
    connection: {
      filename: './data/car-dealer.db3'
    }
  }

};
