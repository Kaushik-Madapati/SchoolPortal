var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');

mongoose.set('debug', true);
//var db = mongojs('mongodb://brad:brad@ds047666.mlab.com:47666/mytasklist_brad', ['tasks']);

mongoose.connect('mongodb://ec2-34-215-100-184.us-west-2.compute.amazonaws.com:27017/school_portal');

var TeacherInfo     = require('../models/teacher_schema_info');
var RoomInfo = require('../models/room_schema_info');
var StudentInfo = require('../models/student_schema_info');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// teacher Rest API
router.route('/teacher')

	// create a bear (accessed at POST http://localhost:8080/users)
	.post(function(req, res) {
		
		console.log(' route post')
		console.log(req.body);
		var teacherInfo = new TeacherInfo();		// create a new instance of the Bear model
    	teacherInfo.name = req.body.name;  // set the bears name (comes from the request)
        teacherInfo.phone = req.body.phone;
		teacherInfo.email = req.body.email;
        teacherInfo.roomID = req.body.roomId;
        teacherInfo.roomName = req.body.roomName;
        teacherInfo.no_of_pto = req.body.no_of_pto;
        teacherInfo.no_of_sick_leave = req.body.no_of_sick_leave;
        teacherInfo.no_of_call_off = req.body.no_of_call_off;
        teacherInfo.vaccationID = req.body.vaccationID;
	    teacherInfo.description = req.body.description;
		console.log(req.body);

		//res.setHeader('Access-Control-Allow-Origin', '*');

		teacherInfo.save(function(err) {
			if (err) {
				 res.send(err);
				console.log(' error adding Teacher info created')
			    return ; 
			}

			res.json({ message: 'Teacher info  created!' });
            res.end();

			console.log(' Teacher info created')
		});

		
	})
	.get(function(req, res) {
		console.log('get function');
        
        TeacherInfo.find(function(err, teachers) {
		    if (err)
               return  res.send(err);
           
            res.json(teachers);
       
        });
    });

	router.route('/teacher/:teacher_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        TeacherInfo.findById(req.params.teacher_id, function(err, teacher) {
            if (err)
                return res.send(err);

            res.json(teacher);
            res.end();
        });
    })
	.put(function(req, res) {

        // use our bear model to find the bear we want
        TeacherInfo.findById(req.params.teacher_id, function(err, teacher) {

            if (err)
               return  res.send(err);

            teacher.name = req.body.name;  // set the bears name (comes from the request)
            teacher.phone = req.body.phone;
            teacher.email = req.body.email;
            teacher.roomID = req.body.roomId;
            teacher.roomName = req.body.roomName;
            teacher.no_of_pto = req.body.no_of_pto;
            teacher.no_of_sick_leave = req.body.no_of_sick_leave;
            teacher.no_of_call_off = req.body.no_of_call_off;
            teacher.vaccationID = req.body.vaccationID;
            teacher.description = req.body.description;
            // save the bear
            teacher.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'teacher updated!' });
            });

        });
    })
	.delete(function(req, res) {
        console.log(req.params);
        TeacherInfo.findByIdAndRemove( req.params.teacher_id, function(err, teacher) {
        
         if (err)
             return res.send(err);
         if (!teacher) {
            return res.status(404).json({success: false, msg: 'Teacher not found'});
        }  

          res.json({ message: 'Successfully deleted' });
        })
    });

    router.route('/teacher/find/:teacher_name')
      // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        TeacherInfo.find( {'name': req.params.teacher_name}, '_id' ,function(err, teacher_id) {
            if (err)
               return  res.send(err);

            res.json(teacher_id);
            res.end();
        });
    });

/// room rest API
router.route('/room')

	// create a bear (accessed at POST http://localhost:8080/users)
	.post(function(req, res) {

     
		console.log(' route post')
		console.log(req.body);
		var roomInfo = new RoomInfo();		// create a new instance of the Bear model
		roomInfo.name = req.body.name;  // set the bears name (comes from the request)
        roomInfo.phone = req.body.phone;
        roomInfo.teacher_name = req.body.teacher_name;
        roomInfo.teacherID = req.body.teacherID;
		console.log(req.body);

		//res.setHeader('Access-Control-Allow-Origin', '*');

		roomInfo.save(function(err) {
			if (err) {
				 res.send(err);
				console.log(' error adding Room info created')
			    return ; 
			}

			res.json({ message: 'Room info  created!' });
            res.end();

			console.log(' Room info created')
		});

		
	})
	.get(function(req, res) {
		console.log('get function');
        
        RoomInfo.find(function(err, rooms) {
		    if (err)
                return res.send(err);
           
            res.json(rooms);
       
        });
    });

	router.route('/room/:room_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        RoomInfo.findById(req.params.room_id, function(err, room) {
            if (err)
               return  res.send(err);

            res.json(room);
            res.end();
        });
    })
	.put(function(req, res) {

        // use our bear model to find the bear we want
        RoomInfo.findById(req.params.room_id, function(err, room) {

            if (err)
               return  res.send(err);

            room.name = req.body.name;  // set the bears name (comes from the request)
            room.phone = req.body.phone;
            room.teacher_name = req.body.teacher_name;
            room.teacherID = req.body.teacherID;
          
            // save the bear
            room.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'room updated!' });
            });

        });
    })
	.delete(function(req, res) {
        console.log(req.params);
        RoomInfo.findByIdAndRemove( req.params.room_id, function(err, room) {
        
         if (err)
             return res.send(err);
         if (!room) {
            return res.status(404).json({success: false, msg: 'Room not found'});
        }  

          res.json({ message: 'Successfully deleted' });
        })
    });
    router.route('/room_find/:room_name')
      // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        console.log('find ID from name');
        RoomInfo.find( {'name': req.params.room_name},function(err, room) {
            if (err)
               return  res.send(err);

            //   console.log(room);

            res.json(room);
            res.end();
        });
    });

/// room rest API
router.route('/student')

	// create a bear (accessed at POST http://localhost:8080/users)
	.post(function(req, res) {

     
		console.log(' route post')
		console.log(req.body);
		var studentInfo = new StudentInfo();		// create a new instance of the Bear model
		studentInfo.name = req.body.name;  // set the bears name (comes from the request)
        studentInfo.room =  req.body.room;
        studentInfo.parent_name = req.body.parent_name;
        studentInfo.parent_phone = req.body.parent_phone;
        studentInfo.parent_email = req.body.parent_email;
        studentInfo.roomID = req.body.roomID;
        studentInfo.description = req.body.description;
        console.log(req.body);

		//res.setHeader('Access-Control-Allow-Origin', '*');

		studentInfo.save(function(err) {
			if (err) {
				 res.send(err);
				console.log(' error adding Room info created')
			    return ; 
			}

			res.json({ message: 'Student info  created!' });
            res.end();

			console.log(' Student info created')
		});

		
	})
	.get(function(req, res) {
		console.log('get function');
        
        StudentInfo.find(function(err, students) {
		    if (err)
                return res.send(err);
           
            res.json(students);
       
        });
    });

	router.route('/student/:student_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        StudentInfo.findById(req.params.student_id, function(err, student) {
            if (err)
               return res.send(err);

            res.json(student);
            res.end();
        });
    })
	.put(function(req, res) {
            // use our bear model to find the bear we want
        RoomInfo.findById(req.params.student_id, function(err, student) {

            if (err)
                res.send(err);

            student.name = req.body.name;  // set the bears name (comes from the request)
            student.room =  req.body.room;
            student.parent_name = req.body.parent_name;
            student.parent_phone = req.body.parent_phone;
            student.parent_email = req.body.parent_email;
            student.roomID = req.body.roomID;
            student.description = req.body.description;

            // save the bear
            student.save(function(err) {
                if (err)
                   return res.send(err);

                res.json({ message: 'student updated!' });
            });

        });
    })
	.delete(function(req, res) {
        console.log(req.params);
        StudentInfo.findByIdAndRemove( req.params.student_id, function(err, student) {
        
         if (err)
            return res.send(err);
         if (!student) {
            return res.status(404).json({success: false, msg: 'student  not found'});
        }  

          res.json({ message: 'Successfully deleted' });
        })
    });



module.exports = router;