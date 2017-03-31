/**
 * Created by Thomas Lesperance on 3/28/2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Goal = require('../models/goals');

router.get('/droplist/', function (req, res, next) {
    User.find({role:'Director'}, function(err, result){
        if(err){
            return res.status(500).json({
                title: 'An error ocurred',
                obj: err
            })
        } //end error

        if(!result){
            return res.status(500).json({
                title: 'No Directors Found',
                obj: result
            });
        }//end of null user
        return res.status(200).json({
           title: 'Success!',
            obj: result
        });
    }); //end find getDirectors method
});

router.put('/goal', function(req, res, next){

    //create a goal object
    var goal = new Goal({
        director: {_id: new mongoose.mongo.ObjectId(req.body.director)},
        year: req.body.year,
        goals: req.body.goals
    });

    console.log("goal is: " + goal);

    //check to decide if we need an ID object
    if(req.body.goalId != null || req.body.goalId != undefined){
        var  goalId = {_id: new mongoose.mongo.ObjectId(req.body.Id)};
        var update = {$set: {director: goal.director,
                            year: goal.year,
                            goals: goal.goals}};

        console.log("goal ID is: " + goalId + "\n");
        cconsole.log("goal update is: " + update);
    }

    if(goalId != undefined && goalId != null){
        console.log("goalID block")
        Goal.findOneAndUpdate(goalId, update, function(error, result){
            if(error){
                console.log("in error block of findOne");
                return res.status(500).json({
                    title: 'An error has occurred',
                    error: error
                });
            } //end error block

            if(!result){
                console.log("in result block of findOne");
                return res.status(500).json({
                    title: 'No user found',
                    obj: {User: null}
                });
            }// end null result block

            console.log("in 201 block of findOne");
            return res.status(201).json({
                title: 'Success! Goal has been updated',
                obj: result
            });

        });//end findOneAndupdate and its callback
    } else {
        console.log("in no ID block");
        goal.save(function(error, result){
           if(error){
               console.log("in error block of noID");
               return res.status(500).json({
                   title: 'An Error has Occurred',
                   error: error
               });

               console.log("in 201 block of noID");
               return res.status(201).json({
                   title: 'Success! Your goals have been created',
                   obj: result
               });

           } //end error block

        }); //End save new goal

    }//end else
}); // end of putGoals method

module.exports = router;