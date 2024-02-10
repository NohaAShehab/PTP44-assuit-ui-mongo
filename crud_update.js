////******************************** update operators *************************************/
// update ? /// update which with what 


/// 
db.instructors.updateOne()  // update first document that statisfy condition 


db.instructors.updateMany() // update all documents that statisfy condition 


////////////////////////////////////////////////////////////////////////////////////////////

/// update instructors set fname='' . lnsme = '' where condition

db.instructors.updateOne(

    {_id:6} ,  /// condition 
    
    {
        
        $set: { firstName: "Noha"}
        } /// update operation 

)
        
  db.instructors.updateOne(

    {_id:6} ,  /// condition 
    
    {
        
        $set: { firstName: "Noha", lastName:"Shehab", age:31}
        } /// update operation 

)      
        
        
 /// add new field to the object 
        
        // set operator  ---> 
     db.instructors.updateOne(

    {_id:6} ,  /// condition 
    
    {
            /// add new field to the document 
        $set: { firstName: "Noha", email:"nshehab.iti44@gmail.com"}
        } /// update operation 

)       
        
        
   //// add field ---> email to all documents 
        
   /***
        db.instructors.update({}/// condition, {}// operation) 
        
     */
       db.instructors.updateMany(
        {
        
        } ,  /// condition 
    
        {
            /// add new field to the document 
        $set: {  email:"nshehab.iti44@gmail.com"}
        } /// update operation 

)       
        //////// if document not exists ---> insert it
              
       db.instructors.updateOne(
        { _id:100} ,  // conditions
        
        {
            $set : {firstName:"Mohamed", lastName:"Ali"}
            
         },  /// update operation
        {
            upsert :true  // if document doesn't exist  --> insert it 
            
         } // options 
        
        )  
        /************************** rename field name  **************************/
         
         db.instructors.insertOne({name:"ali"})
         db.instructors.updateMany(
         {} , // condition
         
         {
             
               $rename : {email: "instructorEmail"}
          } /// update field name
        
         )
         
         
         //***************************remove field *****************************//
         db.instructors.insertOne({name:"ali"})
         db.instructors.updateMany(
         {} , // condition
         
         {
             
               $unset : {instructorEmail:true}
          } /// remove field name
        
         )
          //////////////////////////////////////////////////////
          db.instructors.updateMany(
         {} , // condition
         
         {
             
               $unset : {email:false}
          } /// remove field name
        
         )
          
          
          ////////////******************************* update Embedded objects *******************************************///////////////////
          
         db.instructors.updateOne(
          {
              _id: 6
              
            }, // condition 
          {
              $set: {"address.city": "Mansoura"}
              
          } /// update operation
          
          ) 
           
          ///************************************** increment salary ---> 500 ********************************************/
          
          db.instructors.updateOne( 
          
          {_id:6}, // condition 
          
          {
              $inc : {salary:-1000} /// inc operator
                
           } // update operation 
          
          )
          
           //****************** mul * 2 ****************************/
           
           db.instructors.updateOne( 
          
          {_id:6}, // condition 
          
          {
              $mul : {salary:2} /// inc operator
                
           } // update operation 
          
          )
          
           ///*******************************************Array update operator**************************************************/
           
           /*I know the index of the element I need to update **/
           db.instructors.updateOne(
           {_id:6},// condition
           {
                $set: {"courses.0": "javascript"}
               
               
            } // update operation 
           )
           
           
            /**************** update courses mvc ===> MVC I don't know the index  *************************/
             db.instructors.updateOne(
           {_id:6, courses:"mvc"  },// condition
           {
                $set: {"courses.$": "MVC_updated"}
               
               
            } // update operation 
           )
            
            
            /// update many 
            
            db.instructors.updateMany(
           { courses:"mvc"  },// condition
           {
                $set: {"courses.$": "MVC_updated"}
               
               
            } // update operation 
           )
            
            //****************** add element to the array ******************************///
            
            // 1- push element to the array 
            db.instructors.updateOne(
           {_id:6  },// condition
           {
                $push: {"courses": "mongodb"} 
               
               
            } // update operation 
           )
           /***************************************************************/ 
            
           /// 2- add to set   ---> add element to the array only if doesn't exist in it 
         db.instructors.updateOne(   
            {_id:6  },// condition
           {
                $addToSet: {"courses": "django"} 
               
            } // update operation 
           )
            
            
          // ******************* push set of courses 
            
            db.instructors.updateOne(   
            {_id:6  },// condition
           {
                $push : {"courses": ["flask", "laravel"]}
               
            } // update operation 
           )
            
            
            ///*************** use each operator 
            
         db.instructors.updateOne(   
            {_id:6  },// condition
           {
                $push : {
                    "courses": {$each: ["flask", "laravel", "linux"]}
                    }
               
            } // update operation 
           )
            
            
            ///******************Remove element from array ************************
            /// 1-- pop element 
            
           db.instructors.updateOne(
            {
                   _id: 6
              },  // condition  
            {
                
                $pop : {courses: 1}
             }
            
            )
             
             
             
        db.instructors.updateOne(
            {
                   _id: 6
              },  // condition  
            {
                
                $pop : {courses: 5}
             }
            
            )
            
            
            db.instructors.updateOne(
            {
                   _id: 6
              },  // condition  
            {
                
                $pop : {courses: -1}
             }
            
            ) 
             
             /// **************** remove specific course 
             
             
             
            
          db.instructors.updateOne(
            {
                   _id: 6
              },  // condition  
            {
                
                $pull : {courses: "expressjs"}
             }
            
            ) 
            
             
             
             db.instructors.updateOne(
            {
                   _id: 6
              },  // condition  
            {
                
                $pull : {courses: "mongodb"} // remove all values === mongodb from the array 
             }
            
            ) 
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
           
           
           
           
           
           
           
           
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        






























