

db.product.find().count()  // get no of document  =--> 1560 


db.product.find({brand_name:"Denny" }).count()


// db.product.dropIndex({brand_name:1})
// 
///details of find process

db.product.find({brand_name:"Denny" }).explain("executionStats")


db.product.find({brand_name:"Denny" })  // 0.006


/// create index 

db.product.createIndex({brand_name:1 })


db.product.find({brand_name:"Denny" })    // 0.0003

db.product.find({brand_name:"Denny" }).explain("executionStats")

/// indexing speed up performance 







