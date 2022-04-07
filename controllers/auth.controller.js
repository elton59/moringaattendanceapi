const Lesson = require ('../models/lesson.model');

//this is responsible for registering a Meter to the database
exports.registerLesson = (req, res) => {
     console.log(req.body);
    //check whether the req body is empty or not before proceeding
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send( { error: "Please fill in all the fields" } );
        return; 
    }
    
     else {
        //make sure none of the important fields are blank

        if (req.body.lessonid != ""  && req.body.registrationnumber != "" && req.body.studentfirstname != "" &&  req.body.studentlastname != "" )
         {
                      
            let lessonArr=new Lesson(req.body.lessonid,req.body.lessonkey,req.body.studentfirstname,req.body.studentlastname,req.body.registrationnumber);
                        

                       
                                    Lesson.registerLessonModel(lessonArr, (err, results) => {
                                        if (err) {
                                            if(err.code == "ER_BAD_NULL_ERROR"){
                                                res.status(500).send({ error: "Internal server error"}); 
                                            }
                                            res.status(500).send({ error: "Error inserting values in the database"});
                                          
                                        }
                                        else{
                                             //no error
        
                                            res.send(results);
                                            console.log(results)
                                        }        
                                    });   
                              }                         
                             else if (err) {
                        res.status(500).send({error: err});
                    }
              
                    

                
         
        else {
            res.status(400).send({message: "Please make sure you have not submitted empty data"});
        }

    }
}
//return student details
exports.findStudent = (req, res) => {
    //check whether the req body is empty or not before proceeding
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send( { error: "Please fill in all the fields" } );
         return; 
   }
      else {
        //make sure none of the important fields are blank
        if (req.body.registrationnumber !="" && req.body.checkintime != "")
         {
                //check whether the meter exists: if yes then abort the add request
                Lesson.findstudentModel(req.body , async (err, results) => {
                    
                    if (results) {                        
                        if (results.message==true) {
                            res.send({ res: "student exist" });                           
                        }
                       
                                    
                           else if (results.message==false) {
                                res.send({ res: "student details mising" });                           
                            }
                      
                    } else if (err) {
                        res.send( err);
                    }
                });          
        } 
        else {
            res.status(400).send({message: "Please make sure you have not submitted empty data"});
        }

    }
}



//update lesson
exports.updateLesson= (req, res) => {
    
    //check whether the Meter has not submited an empty body request
    if (req.body.constructor ===Object && Object.keys(req.body).length === 0) {
        res.status(400).send( { message: "Please fill in all the fields" } );
        return; 
    }
  
                //proceed with the update as the request body matches the database
                Lesson.updateLessonModel(req.body, async (errR, resultsS) => {
                    if (errR) {
                        res.status(500).send({ error: errR.error });
                    }else{
                   
                        res.send(resultsS);
                    }        
                }); 
                       
        }
    
    //actual update 
    //this is for updating Longitude and latitudes manually
    exports.FindAMeter = (req, res) => {
        //check whether the req body is empty or not before proceeding
        if (req.query.constructor === Object && Object.keys(req.query).length === 0) {
            res.status(400).send( { error: "Please fill in all the fields" } );
            return; 
        }
         else {
            //make sure none of the important fields are blank
            if (req.query.MeterCode != "")
             {
                    //check whether the meter exists: if yes then abort the add request
                    Meter.findAMeterModel(req.query.MeterCode , async (err, results) => {
                        
                        if (results) {                        
                            if (results.message==true) {
                                console.log(results);
                                res.send(results);                           
                            }
                           
                                        
                               else if (results.message==false) {
                                    res.send({ res: "MetercodeNotFound" });                           
                                }
                          
                        } else if (err) {
                            res.status(500).send({error: err});
                        }
                    });          
            } 
            else {
                res.status(400).send({message: "Please make sure you have not submitted empty data"});
            }
    
        }
    }
    
  

