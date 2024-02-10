// find --> mongo function /// get data from collection
// select * from collection
db.instructors.find(  
    {_id:6}, // condition 
    {firstName:1 , lastName:1} // projection
)
    
db.instructors.find().constructor.name   // cursor , DBQuery ---> reference to data returned from mongo 
    
db.instructors.find().toArray()  // array of object 
    
// use forEach 

db.instructors.find().toArray().forEach((document)=> {
    
        print( `${document.firstName} ${document.lastName}`)
    })  
      
    
// mongo knows you need to deal with the resutlset as an array ===> 
    
  db.instructors.find().forEach((document)=> {
    
        print( `Name: ${document.firstName} ${document.lastName}`)
    })    
    
   //// 
    
 /*****************  find  operators **************************************/
  /***************************Comparison operators***********************************/  
    // select * from instructors where _id = 6
    db.instructors.find(
    {
        _id: 6
        },  // condition 
    {} // projection 
    )
    
    
    
    // $gt , lt 
    
    db.instructors.find(
    
        { _id : {$gt:7}}, 
        {}
    )
    
    
        
        
     // equality
        
db.instructors.find(
    
    { salary : 3600}, 
        {}
    )
        
db.instructors.find(
    
    { salary : {$eq:3600}}, 
    {}
    )
     
        
    // get instructor age 22 or 28
    // $in

db.instructors.find({
    age: {$in: [22,28]}
    
    }, {})    
        
  
    
   db.instructors.find({
    age: {$nin: [22,28]}
    
    }, {})     
    
   /***************************logical operators***********************************/  
   
    // and 
        // instructor age 21 and salary 3600 
    
    db.instructors.find(
    {
        age:21 , salary:3600
        
     }, // condition
    {} // projection
    )
    
    // $and  ---> top level operator 
    
   // select  * from fdf where age=21 and salary=3600; 
  db.instructors.find(
    {
        $and: [{age:21}, {salary:3600} ] ///array
        
     }, // condition
    {} // projection
    )  
  
    
    /// or 
    
     db.instructors.find(
    {
        $or: [{age:21}, {salary:3600} ] ///array
        
     }, // condition
    {} // projection
    )  
    
    
    // not  ---> 
     db.instructors.find(
    {
        salary: {$not : {$eq:3600}}
        
     }, // condition
    {} // projection
    )  
    
    
    
   ///////////////////////////////////////////////////////////////
   /********************** dealing embedded objects *************************************/
   db.instructors.find()
   
    // get instructors city cairo ?
    
     db.instructors.find(
    {
       "address.city" :"cairo"
        
     }, // condition
    {address:1 , firstName:1} // projection
    )  
   
   
   
  // city cairo ,,, street 10 or 20 ? 
         db.instructors.find(
    {
       "address.city" :"cairo", 
        "address.street": {$in :[10 , 20]}
        
     }, // condition
    {address:1 , firstName:1} // projection
    )  
   
    
    
    //////////////////////////////////////////////////////////////
    //**************************Array operators***********************************/
    db.instructors.find()
    
    /// get instructor ---> teach mvc 
    
    db.instructors.find(
    {
            courses : "mvc" // mongo shortcut ---> courses field is an array --> 
            /// search in courses about value 'mvc'
     }, 
    {}  
    )
    // mvc , singalrR
   db.instructors.find(
    {
            courses : ["mvc", "signalR"] , 
           
     }, 
    {}  
    )
    
    
    // all operator 
      db.instructors.find(
    {
            courses :{$all:  ["mvc", "signalR"]} ,   // array contain all given values
           
     }, 
    {}  
    )
    
    
    
    db.instructors.find(
    {
            courses :{$in:  ["mvc", "signalR"]} ,   // array contain mvc or signalR
           
     }, 
    {}  
    )
    
    //// ---> get instructor ---> teach only three courses ?
    
     db.instructors.find(
    {
            courses : {$size:3}
           
     }, 
    {}  
    )
    
    
    
    
 /// elemMatch 
    
    
    
 /// insertOne 
    
    db.instructors.insertOne(
    
    {
            _id:61, 
            name : "Noha Shehab", 
            subjects : [90,10]
        
     }

    
    )
    
    db.instructors.find()
     
     // get instructor subjects ---. each element in subject > 6
     
     
     db.instructors.find(
     {
         
               subjects: {
                   
                   $elemMatch : {$gt:6}
                   
                   }
         
      } , // condition
     
     {} /// projection
     
     )
    
  ///  
     ///*************************** Element operators ---
     /*check element status 
     ************************************/
  
     /// check field salary exists 
  summ = 0
  
  db.instructors.find(
     {
        salary: {$exists:true}
      
      }, /// condition 
      {
          
       }
      ).forEach((document)=> {
          print(document.salary)
       summ += document.salary   
          
       })  

   print (`total salary : ${summ}`)
     /*******************************************************/
   //// after modification 
    summ = 0
    db.instructors.find(
     {
        salary: {$exists:true}
      
      }, /// condition 
      {
       salary:1   
       } /// projection
          
      ).forEach((document)=> {
            print(document.salary)
            summ += document.salary   
          
       })  
     
           
   print (`total salary : ${summ}`)
     
   /// another scenario
   db.instructors.insertOne({
       firstName:"Ali", 
       salary: "Thousand",
       _id:62
       })
   
   /***********************************************************/
       summ = 0
    db.instructors.find(
     {
        salary: {$exists:true}
      
      }, /// condition 
      {
       salary:1   
       } /// projection
          
      ).forEach((document)=> {
            print(document.salary)
            summ += document.salary   
          
       })  
     
           
   print (`total salary : ${summ}`)
        
   /////////////////////////////////////////////////////////////////
    summ = 0
    db.instructors.find(
     {
        salary: {$type:"number"}
      
      }, /// condition 
      {
       salary:1   
       } /// projection
          
      ).forEach((document)=> {
            print(document.salary)
            summ += document.salary   
          
       })  
     
           
   print (`total salary : ${summ}`)
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   
   
   
   
   
   
  
 






 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    