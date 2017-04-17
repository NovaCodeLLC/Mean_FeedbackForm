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
    console.log("req body type is: " + req.params.type);
    if(req.params.type != null && req.params.type != 'undefined') {
        console.log("inside fetch with type param");
        User.find({role: req.params.type}, function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error ocurred',
                    obj: err
                })
            } //end error

            if (!result) {
                return res.status(500).json({
                    title: 'No Directors Found',
                    obj: result
                });
            }//end of null user
            return res.status(200).json({
                title: 'Success!',
                obj: result
            });
        }); //end find get users by type block
    } else {
        console.log("in find all");
        User.find()
            .exec(function(error, users){
            if(error){
                res.status(500).json({
                    title: 'An error has occurred',
                    error: error
                });
            }
            if(!users){
                res.status(500).json({
                   title: 'No users were found',
                    obj: users
                });
            }
            res.status(200).json({
               title: 'Success! Found Available Users',
                obj: users
            });
        });// end else block to return a list of all users / callback for block
    }
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
    if(req.body._id != null && req.body._id != 'undefined'){
        var  goalId = {_id: new mongoose.mongo.ObjectId(req.body._id)};
        var update = {$set: {director: goal.director,
                            year: goal.year,
                            goals: goal.goals}};
    }

    //if ID exists then run an update on the record, otherwise create a new record.
    if(goalId != 'undefined' && goalId != null){
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

    if(req.body._id != null && req.body._id != 'undefined'){
        console.log("found goal ID:" + req.body._id);
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
    if (groupId != null && groupId != 'undefined'){
        console.log("inside findone and update");
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
    console.log(groupId);
    Group.findOne(groupId, function(error,data){
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
        }//end no data
        console.log("we're at data 200")
        console.log(data);
        return res.status(200).json({
            title: 'Success! Record was found',
            obj: data
        });
    });//end of find

});//end of get

router.delete('/group/:id', function(req, res, next){
    Group.findById(req.params.id, function(err, group){
        if(err) {
            return res.status(500).json({
                title: 'An error has occurred trying to find the requested group',
                error: err
            });
        } // end error if-block of findByID callback
        if(!group){
            return res.status(500).json({
               title: 'The group your wish to delete could not be found',
                obj: group
            });
        }//end null group if-block of findByID Callback
        group.remove(function(error, result){
            if(error){
                return res.status(500).json({
                    title: 'an error has occurred trying to delete the requested group',
                    error: error
                });
            }// end error if block of remove group callback
            res.status(200).json({
                title: 'deleted group',
                obj: result
            });
        });//end remove group / callback
    });//end findByID / callback
});//end delete route

router.delete('/user/delete', function(req, res, next){

    var deleteUsersObj = new DeleteUserObj( req.body.directorID,
                                            req.body.managerID,
                                            req.body.contributorID,
                                            req.body.adminID);

    console.log("Delete users obj:")
    console.log(deleteUsersObj);
    //create a flat array of all users
    var flatArr = [];

    if( deleteUsersObj.Directors != null &&  deleteUsersObj.Directors != 'undefined') {
        deleteUsersObj.Directors.forEach(function (item) {
            flatArr.push(new mongoose.mongo.ObjectId(item));
        });
    }

    if( deleteUsersObj.Contributors != null && deleteUsersObj.Contributors != 'undefined') {
        deleteUsersObj.Contributors.forEach(function (item) {
            flatArr.push(new mongoose.mongo.ObjectId(item));
        });
    }

    if(deleteUsersObj.Managers != null && deleteUsersObj.Managers != 'undefined') {
        deleteUsersObj.Managers.forEach(function (item) {
            flatArr.push(new mongoose.mongo.ObjectId(item));
        });
    }

    // console.log("flat array:" + flatArr);
    //break out items for groups

    var queryUsers = {_id: {$in: flatArr}};
    // var queryContributors ={contributorID: {$pullAll: idArr}};
    // var queryManagers ={managerID: {$pullAll: idArr}};

    User.remove(queryUsers, function(error, obj){
        if(error){
            res.status(500).json({
                title: 'An Error has occurred while trying to delete your users',
                error: error
            });
        }//end error if block
        if(!obj){
            res.status(500).json({
                title: 'No Users were found',
                obj: obj
            });
        }//end null response if block
        res.status(201).json({
           title: 'Users were successfully deleted',
            obj: obj
        });
    });//end remove and its callback for user table
});//end delete user route

//makes the delete route easier to handle
function DeleteUserObj(Directors, Managers, Contributors, Admins){
    this.Managers = Managers;
    this.Directors = Directors;
    this.Contributors = Contributors;
    this.Admins = Admins;
}

module.exports = router;