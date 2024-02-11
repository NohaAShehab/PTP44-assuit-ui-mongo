///// why we need relationship ?



/// students  /// subjects 
///********************************** Non SQL=== Non relational **************************************/
/*      
    1- one to one 
        --> total participation ---> merge two table   
            {
                _id, name // emp 
                address /// 
            }
        
         --> partial participation ? --> add emp_id in department 
         emp: {_id, name }   --> dept {_id, name , mng_id}
                              --> dept {_id, name , manager: {_id, name }}
                              
                       adv:  data retrieval --> faster 
                       disadv :  ===> modify dept_mng_inf0  >> 
    
    
    2- one to many 
     
    student :  {_id, name , email },,, dept : {_id , name, }
    
    
    to implement 
    student :  {_id, name , email, dept: {_id, name } }   /// speed of data retrieval fast --> 
    modify dept ---> time consuming process 
    
    dept : {_id , name, students: [{}, {}, {}, {}] }
    
    /// relational databases 
    
     student :  {_id, name , email, dept_id },,, dept : {_id , name, }  joins --> data retrieval 
        
     student :  {_id, name , email, dept: {dept_id , dept_name } }
     
   
    
    3- many to many ?
    
    students: {_id, name }                      subjects: {_id , name}
    
    ***option one 
        student_subject {_id, subject_id, student_id }
        adv ===> small size , disadv ===> complex join  --> data stored in different collections 
        
        
   *** option 2 
   
   students: {_id, name, subject: [{}, {}, {}, {}, {} ] }   
   adv ==> students info in one collection ? 
   disadv ==> to get subjects info --> scan all students 
   
   *** option 3
   subject: {_id, name, students: [{}, {}, {}, {}, {} ] }   
   adv ==> subjects info in one collection ? 
   disadv ==> to get students info --> scan all subject  
   
   
  **** option 4
  
  students: {_id, name, subject: [{}, {}, {}, {}, {} ] }   
   adv ==> students info in one collection ? 
      subject: {_id, name, students: [{}, {}, {}, {}, {} ] }   
   adv ==> subjects info in one collection ? 
    
    disadv :: data redundancy and size 
    
    
    *** option 5
    
    students: {_id, name, subject: [_ids , ... ] }   
      subject: {_id, name, students: [_ids ] }   

    disadv :: data retreival
    
    *** option 6
    students: {_id, name, subject: [{_id, name }] }   
    ***** option 7
      subject: {_id, name, students: [{_id ,name } ] }   
      
     *** options 6
      students: {_id, name, subject: [{_id, name }] }   
      subject: {_id, name, students: [{_id ,name } ] }   
      

  
    to decide 
        1- business logic .. scenario 
        2- data size
        3- operations ===> decide the optimal
        

*/


let departments = [
    { "_id": 1, "name": "opensource", "location": "3rdfloor", "phone": 12345 },

    { "_id": 2, "name": "sd", "location": "2ndfloor", "phone": 12345 },
    { "_id": 3, "name": "ai", "location": "1stfloor", "phone": 12345 },

    { "_id": 4, "name": "cloud", "location": "3rdfloor", "phone": 12345 },
    { "_id": 5, "name": "graphics", "location": "3rdfloor", "phone": 12345 },

]



let students = [

    {
        "_id": 1, "firstName": "Ahmed",
        "lastName": "Ali",
        "addresses": [
            { "city": "mansoura", "street": 10 },
            { "city": "cairo", "street": 20 }],

        "department": 1,
        "subjects": [1, 2, 5]

    },


    {
        "_id": 2, "firstName": "Mohamed",
        "lastName": "Ali",
        "addresses": [
            { "city": "alex", "street": 10 },
            { "city": "cairo", "street": 30 }],

        "department": 2,
        "subjects": [3, 2, 5]

    },

    {
        "_id": 3, "firstName": "Omar",
        "lastName": "Ahmed",
        "addresses": [
            { "city": "mansoura", "street": 100 }],
        "department": 2,
        "subjects": [3, 2, 5]

    },

    {
        "_id": 4, "firstName": "Mohamed",
        "lastName": "Ahmed",
        "addresses": [
            { "city": "Assuit", "street": 100 }],
        "department": 2,
        "subjects": [3, 4, 5]

    }

]


db.students.insertMany(students)

db.departments.insertMany(departments)



let subjects = [

    { _id: 1, "name": "js", "maxgrade": 100 },
    { _id: 2, "name": "mongo", "maxgrade": 100 },
    { _id: 3, "name": "jenkins", "maxgrade": 100 },
    { _id: 4, "name": "gcp", "maxgrade": 100 },
    { _id: 5, "name": "aws", "maxgrade": 100 },
    { _id: 6, "name": "terraform", "maxgrade": 100 },
    { _id: 7, "name": "microservice", "maxgrade": 100 },
    { _id: 8, "name": "admin", "maxgrade": 100 },

]


db.subjects.insertMany(subjects)



/////////////////////////////////////////////////////////////////////////////////////////////
/************** I need to print firstName , lastName , deptartment of students **************/

db.students.find({}, // condition
    { firstName: 1, lastName: 1, department: 1 } // projection

)
    .forEach((document) => {
        //             print(document.department)
        dept = db.departments.find({ _id: document.department }).toArray()
        print(`${document.firstName} ${document.lastName} ${dept[0].name}`)
        //             print(dept)

    })


///**********************

db.departments.findOne({ _id: 1 }).constructor.name

db.students.find({}, // condition
    { firstName: 1, lastName: 1, department: 1 } // projection

)
    .forEach((document) => {
        dept = db.departments.findOne({ _id: document.department })
        print(`${document.firstName} ${document.lastName} ${dept.name}`)

    })


////******************************************* one to many
alldepts = db.departments.find({}, { name: 1 }).toArray()
print(alldepts)

db.students.find({}, // condition
    { firstName: 1, lastName: 1, department: 1 } // projection

)
    .forEach((document) => {
        // get dept from array 
        filter_depts = alldepts.filter((mydept) => mydept._id === document.department)
        //             print(filter_depts[0])
        selected_dept = filter_depts[0].name
        print(`${document.firstName} ${document.lastName}: at ${selected_dept}`)

    })


///************************** get student name , subjects name ************************************



allsubjects = db.subjects.find({}, { name: 1 }).toArray()


db.students.find({}, { firstName: 1, subjects: 1 })
    .forEach((document) => {

        //                 print(document.subjects)     /// is an array of subject ids               
        // this contains the document subjects 
        doc_subjects = document.subjects
        // loop over the document subject to get name of each subjects 
        print(doc_subjects)
        subnames = ""
        doc_subjects.forEach((sub) => {
            //                       print(sub)
            subname = allsubjects.filter((element) => element._id === sub)
            //                       print(subname[0].name)
            subnames += subname[0].name + " "
        })
        print(`${document.firstName}, subjects are ${subnames}`)

    })










































































