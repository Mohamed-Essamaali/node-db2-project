
exports.up = async function(knex) {
    //create database schema
    await knex.schema.createTable("cars",(table)=>{
        table.increments("id") // id will be generated and incremented
        table.text("vin").notNull().unique()
        table.text("make").notNull()
        table.text("model").notNull()
        table.integer("mileage").notNull()
        table.text('type')
        table.text("status")
    })
  
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("cars")
};
