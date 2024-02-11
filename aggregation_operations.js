

///***************** Aggregation operations **************************/


/// get all instructors ---> age = 21 ---> sort --

db.instructors.aggregate()

db.instructors.aggregate([]) /// you must pass the aggregate stages in form of array 
db.instructors.find()


/// ***********************get instuctors , age > 21  *****************************

/**aggregate stage  --> operator $match **/
db.instructors.aggregate([
    {
        $match: { age: { $gt: 21 } }

    }, /// first stage


])

// output of stage can be input to another stage 

db.instructors.aggregate([
    {
        $match: { age: { $gt: 21 } }

    }, /// first stage
    {

        $sort: { firstName: 1, lastName: -1 }

    }, /// sorting according firstname 

])
// 
// firstName="noha"
//     lastName= "shehab"
// 
/// get firstname , age 
db.instructors.aggregate([
    {
        $match: { age: { $gt: 21 } }

    }, /// first stage return documents age > 21
    {

        $sort: { firstName: 1, lastName: -1 }

    }, /// sorting data from first stage according firstname 

    // projection  ===> 
    {

        $project: {
            fullname: { $concat: ["$firstName", " ", "$lastName"] },
            age: "$age",
            salary: "$salary",
            nextSalary: { $multiply: ["$salary", 2] }


        }

    },

])

/****************************** save result into another collection 
***/


db.instructors.aggregate([
    {
        $match: { age: { $gt: 20 } }

    }, /// first stage return documents age > 21
    {

        $sort: { firstName: 1, lastName: -1 }

    }, /// sorting data from first stage according firstname 

    // projection  ===> 
    {

        $project: {
            fullname: { $concat: ["$firstName", " ", "$lastName"] },
            age: "$age",
            salary: "$salary",
            nextSalary: { $multiply: ["$salary", 2] },
            // _id:0 // please don't do that with $out


        }

    }, {

        $out: "instructor_info"


    }

])


/// ---> operations on data 


/// group instrutor pased on age 

db.instructors.aggregate([
    {
        $match: { age: { $gt: 20 } }

    }, /// first stage return documents age > 21

    {

        $group: { _id: "$age" }   // grouping fields 

    }/// group
])
/***********************************************/
// get ages and total number of instructors in each age 

db.instructors.aggregate([
    {
        $match: { age: { $gt: 20 } }

    }, /// first stage return documents age > 21

    {

        $group: {

            _id: "$age",// grouping field
            totalmembers: { $sum: 1 },  // count members
            total_salaries: { $sum: "$salary" },
            min_salary: { $min: "$salary" },
            max_salary: { $max: "$salary" },
            avg_salary: { $avg: "$salary" },

        }  /// 

    }/// group stage
])


////*****************************************************/

db.instructors.insertOne(
    {
        "_id": 30.0,
        "firstName": "mazen",
        "lastName": "ali",
        "age": 30.0,
        "salary": 7010.0,
        "address": {
            "city": "cairo",
            "street": 20.0,
            "building": 5.0
        },
        "courses": [
            "asp.net",
            "MVC_updated",
            "EF"
        ],
        "instructorEmail": false
    }


)

///********** get instructors in the same city and have the age
db.instructors.aggregate([
    {
        $match: { age: { $gt: 20 } }

    }, /// first stage return documents age > 21

    {

        $group: {

            _id: { age: "$age", city: "$address.city" },// grouping field
            totalmembers: { $sum: 1 },  // count members
            total_salaries: { $sum: "$salary" },
            min_salary: { $min: "$salary" },
            max_salary: { $max: "$salary" },
            avg_salary: { $avg: "$salary" },

        }  /// 

    }/// group stage
])
/// projection 

/*****************************************/
db.instructors.aggregate([
    {
        $match: { age: { $gt: 20 } }

    }, /// first stage return documents age > 21

    {
        $group: {

            _id: { age: "$age", city: "$address.city" },// grouping field
            totalmembers: { $sum: 1 },  // count members
            total_salaries: { $sum: "$salary" },
            min_salary: { $min: "$salary" },
            max_salary: { $max: "$salary" },
            avg_salary: { $avg: "$salary" },

        }  /// 

    }, /// group stage
    {

        $project: {
            age_specifoed: "$_id.age",
            city_specified: "$_id.city",
            _id: 0,
            min_salary: "$min_salary",
            total_numbers: "$totalmembers"



        }

    }
])


/***************************** lookup *******************************/


/******** join * lookup ---> get data from different collection*********/


// display department name , student info

db.students.aggregate([
    {

        $lookup: {

            from: "departments",  // other collection
            localField: "department",
            foreignField: "_id",
            as: "dept_info"

        }

    } /// stage ==> get data from different collection

])


///////////////////////////////////////////////////
db.students.aggregate([
    {

        $lookup: {

            from: "departments",  // other collection
            localField: "department",
            foreignField: "_id",
            as: "dept_info"

        }

    },  /// stage ==> get data from different collectio

    {

        $project: {
            firstName: "$firstName",
            dept: "$dept_info",
            dept_obj: { $arrayElemAt: ["$dept_info", 0] }


        }

    }, // stage 

    {
        $project: {
            firstName: "$firstName",
            dept_name: "$dept_obj.name"

        }


    }

])





///**************** get students and their subjects *************************************

db.students.aggregate([
    {

        $lookup: {

            from: "subjects",  // other collection
            localField: "subjects",
            foreignField: "_id",
            as: "subjects_info"

        }

    },  /// stage ==> get data from different collectio

    {

        $project: {
            firstName: "$firstName",
            subjects: "$subjects_info"

        }

    }


])



































































































