/**
 * Created by TXL8009 on 3/13/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Group = require('../models/group');
var Goals = require('../models/goals');
var Feedback = require('../models/feedback');

router.get('/', function (req, res, next) {
    Feedback.find()
        .exec(function (err, feedback) {
            if (err) {
                return res.status(500).json({
                    title:'An error occurred',
                    error:err
                });
            }
            res.status(200).json({
                message:'Success',
                obj:feedback
            });
        });
});

router.post('/', function (req, res, next) {
    var feedback = new Feedback({
        nameBox: req.body.nameBox,
        productBox: req.body.productBox,
        upsBox: req.body.upsBox,
        downsBox: req.body.downsBox
    });
    feedback.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved feedback',
            obj: result
        });
    });
});


//this will be needed as a composite object within patch
function CompositeFeeder(query, Feedback){
    this.feedback = Feedback;
    this.query = query;
}

router.patch('/', function (req, res, next) {
    //create an array from the objects in the body
    var data = req.body;

    //convert request body into composite objects
    var feedbackarr = [];
    data.forEach(function (currentElement) {
        returnItem = new CompositeFeeder(
            {_id: new mongoose.mongo.ObjectId(currentElement.feedbackID)},
            new Feedback({
                nameBox: currentElement.nameBox,
                productBox: currentElement.productBox,
                upsBox: currentElement.upsBox,
                downsBox: currentElement.downsBox
            }));
        feedbackarr.push(returnItem);
    });

    var promisearray = [];
    // iterate over each item in the array and pass this to the DB
    feedbackarr.forEach(function (item) {
        //val is a query, that must be executed
        // when executed it will return a promise, **DO NOT GIVE A CALLBACK FUNCTION IF YOU WANT TO USE THE PROMISE
        var val = Feedback.findByIdAndUpdate(item.query,
            {$set: {upsBox: item.feedback.upsBox, downsBox: item.feedback.downsBox}}
        );
        promisearray.push(val.exec());

    }); //end of forEachloop

    var responsearray = [];
    var statuscode = 200;

    promisearray.forEach(function (item) {
        item.then(function (resolution) {
                console.log(resolution);
                return res.status(statuscode).json({
                    title: 'Db Update Response',
                    body: JSON.stringify(responsearray)
                });
            },
            function (error) {

                responsearray.push(error);
                statuscode = 500;

                return false;
            })
    });

});

router.delete('/:id', function(req, res, next) {
    console.log(req.param.id);
    Feedback.findById(req.params.id, function (err, feedback) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!feedback) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        feedback.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted feedback',
                obj: result
            });
        });
    });
});

//this route is ugly! we hit the group document first to locate the director for the current user
//once the group is located, we peel the director off and run another search against the goals documents
//for that director.  We then return the goals array to be used.
router.get('/goals/:groupID', function(req, res, err){

    var ID = new mongoose.mongo.ObjectId(req.params.groupID);

    Group.findOne( {_id: ID} , function (err, groupInfo) {
            if (err) {
                console.log("group find fail");
                return res.status(500).json({
                    title:'An error occurred',
                    error:err
                });
            }//end error if block

            if(!groupInfo){
                console.log("group find null");
                return res.status(500).json({
                   title: 'An error occurred',
                    obj: groupInfo
                });
            }//end null object if

            console.log("group info is:");
            console.log(groupInfo);

            var query ={director: groupInfo.directorID};

            console.log("query info for Goals: " + JSON.stringify(query));
            Goals.findOne(query, function(err, goals){
                if(err){
                    return res.status(500).json({
                        title: 'An Error occurred querying for goals',
                        error: err
                    });
                }//end error if

                if(!goals){
                    return res.status(500).json({
                        title: 'An Error occurred querying for goals',
                        obj: goals
                    });
                }

                return res.status(200).json({
                    message:'Success',
                    obj:goals
                });
            });//end of goals query / callback
        });//end of group query / callback
});//end get route / callback

module.exports = router;