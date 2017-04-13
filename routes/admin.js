/**
 * Created by Thomas Lesperance on 3/28/2017.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Goal = require('../models/goals');
var Group = require('../models/group');
var mongoose = require('mongoose');

router.get('/droplist/:type', function (req, res, next) {
    console.log(req.params.type);
    User.find({role: req.params.type}, function(err, result){
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

    console.log(req.body.director);

    //create a goal object
    var goal = new Goal({
        director: {_id: new mongoose.mongo.ObjectId(req.body.director)},
        year: req.body.year,
        goals: req.body.goals
    });

    //check to decide if we need an ID object
    if(req.body._id != null || req.body._id != undefined){
        var  goalId = {_id: new mongoose.mongo.ObjectId(req.body._id)};
        var update = {$set: {director: goal.director,
                            year: goal.year,
                            goals: goal.goals}};
    }

    //if ID exists then run an update on the record, otherwise create a new record.
    if(goalId != undefined && goalId != null){
        Goal.findOneAndUpdate(goalId, update,  {new: true}, function(error, result){
            if(error){
                return res.status(500).json({
                    title: 'An error has occurred',
                    error: error
                });
            } //end error block

            if(!result){
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
               return res.status(500).json({
                   title: 'An Error has Occurred',
                   error: error
               });
           } //end error block

            return res.status(201).json({
                   title: 'Success! Your goals have been created',
                   obj: result
            });
        }); //End save new goal

    }//end else
}); // end of putGoals method

router.get('/goals/:id/:year', function (req, res, next) {

    //query for year AND director ID
    var query = {director: new mongoose.mongo.ObjectId(req.params.id), year: req.params.year};
    console.log(query);
    Goal.findOne(query, function(error,data){
        if(error){
            return res.status(500).json({
              title: 'Error',
                obj: error
            });
        }
        if(!data){
            return res.status(500).json({
                title: 'Record not found',
                obj: 'No record exists for this user.'
            });
        }
        return res.status(200).json({
            title: 'Record Found',
            obj: data
        });
    });//end callback / find
}); //end getGoals

router.put('/group', function (req, res, next) {

    if(req.body.goalID != null || req.body.goalID != undefined){
        var  groupId = {_id: new mongoose.mongo.ObjectId(req.body._id)};
        var update = {$set: {managerID: req.body.managerIDs,
                             contributorID: req.body.contributorIDs}};
    } else {
        var group = new Group({
            directorID: req.body.directorID,
            managerID: req.body.managerIDs,
            contributorID: req.body.contributorIDs
        });
    } // end goalID if/else


    //if not null / undefined create update data set, otherwise create new entry
    if (groupId != null){
        Group.findOneAndUpdate(groupId, update, {new: true}, function(error, obj){
            if(error){
                return res.status(500).json({
                    title: 'An error has occurred',
                    error: error
                });
            }//end error

            if(!obj){
                return res.status(500).json({
                   title: 'Error! record not found',
                    obj: obj
                });
            }//end object not found

            return res.status(201).json({
                title: 'Success! Your Group has been Updated',
                obj: obj
            });
        }); //end callback and findOneAndUpdate
    } else {
        group.save(function(error, obj){
           if(error){
               return res.status(500).json({
                   title: 'An Error has occurred',
                   error: error
               });
           } //end error

            res.status(200).json({
                title: 'Success! Your new group has been made',
                obj: obj
            });
        });//end callback and save
    }//end of goalID if / else
});

router.get('/group/:id', function(req, res, next){
    var  groupId = {directorID: new mongoose.mongo.ObjectId(req.params.id)};

    Group.find(groupId, function(error,data){
        if(error){
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        }// end error
        if(!data){
            return res.status(500).json({
                title: 'Error! The requested record could not be found',
                obj: data
            })
        }
        return res.status(200).json({
            title: 'Success! Record was found',
            obj: data
        });
    });//end of find

});//end of get

module.exports = router;