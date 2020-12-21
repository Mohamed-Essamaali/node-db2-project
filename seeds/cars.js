
exports.seed = async function(knex) {
  // Deletes ALL existing entries
 await knex("cars").insert([
   {vin:"YV149MTS6G2409804",make:"Volvo",model:"s60",mileage:10365,type:'automatic',status:'clean'},
   {vin:"JTJYWRBZ6G2009198",make:"Lexus",model:"NX 300h",mileage:36365},
   {vin:"SALWG2VF5GA642581",make:"Land Rover",model:"Range Rover Sport",mileage:9365,status:"clean"},
   {vin:"KNAFZ4A81F5290432",make:"Kia",model:"Forte",mileage:68365,type:'manual',status:'salvage'},
   {vin:"WDDHH8JB5EA799727",make:"Mercedes Benz",model:"E Class",mileage:35365,type:'auto',status:''},
   {vin:"1C4BJWKGXDL508578",make:"Jeep",model:"Wrangler Unlimited",mileage:1865,type:'auto',status:''}
 ])
};
