/// schema operations 

// db.instructors.find({}).toArray().length
// 


//// ************************************
// 1- define datatypes  ---> salary : int  ---> 
// 2- define required fields in document 
// 3- define datatype of id ---> unifor  ---> numbers . object_id 


//// Not Only sql ===>  schema validation
/// check schema validation rules  on any collection 

db.getCollectionInfos({name:"instructors"})



/// create schema  ---> validation rules 

/// create new collection ,, add validation schema

db.createCollection("employees",  
{
    validator: {
        $jsonSchema: {
            bsonType: "object",  /// document inform of object 
            // define properties 
            properties : {
                
                firstName: {bsonType: "string"},  // define datatypes
                lastName : {bsonType: "string"}
                
                }// properties

            }// jsonschema validator 

        
        } /// validator 
    
    } // schema creation options 
)


/// 
    
   db.employees.insertOne({firstName:"noha"})
//    
   
       db.employees.insertOne({firstName:91287489})  // Document failed validation",

    
    ///// modify existing collection schema 
      
      db.getCollectionInfos({name:"employees"}) 
      
      
      
      db.employees.runCommand("collMod", {
          
           validator: {
            $jsonSchema: {
            bsonType: "object",  /// document inform of object 
            properties : {
                firstName: {bsonType: "string"},  
                lastName : {bsonType: "string"}
                
                }// properties

            }// jsonschema validator 

        
        } /// validator 
 
          })
      
       /// add age field 
          
         db.employees.runCommand("collMod", {
           validator: {
            $jsonSchema: {
            bsonType: "object",  /// document inform of object 
            properties : {
                firstName: {bsonType: "string"},  
                lastName : {bsonType: "string"}, 
                age: {bsonType: "number", minimum:20}
                
                }// properties

            }// jsonschema validator 

        
        } /// validator 
 
          })   
          
          db.employees.insertOne({age:21})
          
          
          //// add required fields 
          
           db.employees.runCommand("collMod", {
           validator: {
            $jsonSchema: {
            bsonType: "object",  /// document inform of object 
            required :["firstName", "lastName", "age"] ,    
                
            properties : {
                firstName: {bsonType: "string"},  
                lastName : {bsonType: "string"}, 
                age: {bsonType: "number", minimum:20}
                
                }// properties

            }// jsonschema validator 

        
        } /// validator 
 
          })   
          
   db.employees.insertOne({firstName:"ahmed", lastName:"Ali",age:21})

//// check this 
   
  db.employees.insertOne({firstName:"ahmed", city: "cairo",
      lastName:"Ali",age:21})


/// prevent adding additional fields 

db.employees.runCommand("collMod", {
   validator: {
    $jsonSchema: {
    bsonType: "object",  /// document inform of object 
    required :["firstName", "lastName", "age"] ,    
    additionalProperties: false, 
    properties : {
        firstName: {bsonType: "string"},  
        lastName : {bsonType: "string"}, 
        age: {bsonType: "number", minimum:20}
        
        }// properties

    }// jsonschema validator 


} /// validator 

  }) 



  db.employees.insertOne({firstName:"ahmed", city: "cairo",
      lastName:"Ali",age:21})
      
      
    db.employees.insertOne({firstName:"ahmed",
      lastName:"Ali",age:21})
///// solving id issues 

db.employees.runCommand("collMod", {
   validator: {
    $jsonSchema: {
    bsonType: "object",  /// document inform of object 
    required :["firstName", "lastName", "age"] ,    
    additionalProperties: false, 
    properties : {
        _id: {}, /// object
        firstName: {bsonType: "string"},  
        lastName : {bsonType: "string"}, 
        age: {bsonType: "number", minimum:20}
        
        }// properties

    }// jsonschema validator 


} /// validator 

  }) 

  db.employees.insertOne({firstName:"ahmed",
      lastName:"Ali",age:21})


/// modify collection schema  ---> _id : number 
      
      
db.employees.runCommand("collMod", {
   validator: {
    $jsonSchema: {
    bsonType: "object",  /// document inform of object 
    required :["firstName", "lastName", "age"] ,    
    additionalProperties: false, 
    properties : {
        _id: {bsonType: "number"}, 
        firstName: {bsonType: "string"},  
        lastName : {bsonType: "string"}, 
        age: {bsonType: "number", minimum:20}
        
        }// properties

    }// jsonschema validator 


} /// validator 

  }) 

  db.employees.insertOne({firstName:"ahmed",
      lastName:"Ali",age:21, _id:10})


//////////////////////// Enum  
db.employees.runCommand("collMod", {
   validator: {
    $jsonSchema: {
    bsonType: "object",  /// document inform of object 
    required :["firstName", "lastName", "age"] ,    
    additionalProperties: false, 
    properties : {
        _id: {bsonType: "number"}, 
        firstName: {bsonType: "string"},  
        lastName : {bsonType: "string"}, 
        age: {bsonType: "number", minimum:20}, 
        gender : {enum: ["male", "female"]}
        
        }// properties  ---> define datatypes  ---> also specific values 

    }// jsonschema validator 


} /// validator 

  }) 

  db.employees.insertOne({firstName:"ahmed",
      lastName:"Ali",age:21, _id:11, gender: "male"})































          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    



































