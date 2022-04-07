const controller = require ('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router
    .route("/")
        .get((req, res) => {
            res.send({message: `you are in the default route`});
        });
router
    .route("/registerLesson")
        .post(controller.registerLesson);
  

 
router
    .route("/updateLesson")
        .put(controller.updateLesson);
router
     .route("/findStudent")
         .put(controller.findStudent );



module.exports = router;


