const conn = require('../util/database');
module.exports =
     class Lesson {

        constructor (lessonid, lessonkey=null, studentfirstname, studentlastname , registrationnumber,comment=null,checkintime=null,Id)
        {
        this.lessonid=lessonid;
        this.lessonkey=lessonkey;
        this.studentfirstname=studentfirstname;
        this.studentlastname=studentlastname ;
        this.registrationnumber = registrationnumber;
        this.comment = comment;
        this.checkintime = checkintime; 
        this.Id=Id;
         }
         // return Student
         static findstudentModel(studentDetail, callback){
            conn.query("SELECT * from attendance WHERE registrationnumber = ?   ", [studentDetail.registrationnumber,studentDetail.checkintime] , async (err, results) => {
                if (err) {
                    console.log (`There was trouble executing the sql, error :${ err }`);
                    callback ({error: "Internal server error"});
                    return;
                }else{
                 

                    if (!results.length > 0) {
                        callback (null, { message: false });
                    }else{
                        callback ( results);
                    }
                    
                }
               
            });
        }
      


    
 //update Lesson
static async updateLessonModel(lessonUpdateArr, callback){
    if (!lessonUpdateArr) {
        callback (null, { error: "body cannot be blank" });
        console.log(lessonUpdateArr);    
        return;
    }
    else{

        conn.query("UPDATE attendance  SET lessonkey=?,comment=? WHERE Id = ?", [ lessonUpdateArr.lessonkey,lessonUpdateArr.comment,lessonUpdateArr.Id] , (err, results) => {
       
            if (err) {
                callback ({error: err}, null);
                console.log(err);
            }
          else{
                callback (null, { message: "record updated successfully"});
                }
        });
   
    


    }
}


//register leson
static registerLessonModel(lessonArr, callback) {
    console.log(lessonArr.registrationnumber);
 conn.query("INSERT INTO attendance (lessonid,studentfirstname,	studentlastname,registrationnumber) VALUES(?,?,?,?)", [lessonArr.lessonid,lessonArr.studentfirstname,lessonArr.studentlastname,lessonArr.registrationnumber], (err, results) => {
    if (err) {
    console.log(err);
    callback ({error: "Internal server error"}, null);
     }
    else
    {
                   callback(null, { message: "Lesson booked Sucessfully"});
           
   
 }
     });

}  
     }