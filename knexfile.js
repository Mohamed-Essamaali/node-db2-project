// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault:true, // flag required by SQLite
    connection: {
      filename: './data/car-dealer.db3'
    }
  }

};
