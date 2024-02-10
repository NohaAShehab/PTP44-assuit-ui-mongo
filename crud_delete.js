///******************* delete operation 


db.instructors.deleteOne({}) /// delete the first document  

db.instructors.deleteOne({_id:{$gt:50}}) /// delete the first document  

