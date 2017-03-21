/**
 * Created by TXL8009 on 3/13/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Rx = require('rxjs/Rx');


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



    var testData = Rx.Observable.from(req.body).map(function (currentElement) {
        returnItem = new CompositeFeeder(
                {_id: new mongoose.mongo.ObjectId(currentElement.feedbackID)},
                new Feedback({
                nameBox: currentElement.nameBox,
                productBox: currentElement.productBox,
                upsBox: currentElement.upsBox,
                downsBox: currentElement.downsBox
            }));
        return returnItem;
        })
        .fromCallback(function(item) {
            var val = Feedback.findByIdAndUpdate(item.query,
                {$set:{upsBox: item.feedback.upsBox, downsBox: item.feedback.downsBox}},
                function (err, res) {
                console.log("response from Db: " + res);
                    if (err) {
                        return res;
                    }
                    if (!res) {
                        return res;
                    }
                    if(res) {
                        return res;
                    }
                }
            );
            console.log("Value is: val" + val);
        });

    testData.subscribe(function (item) {
        console.log(item + " \n \n subscriber")
    });
});
//     var updater = Rx.Observable.from(data)
//                  .map(function(currentElement){
//                             returnItem = new compositeFeeder({
//                                 feedbackField: new Feedback({
//                                     nameBox: currentElement.nameBox,
//                                     productBox: currentElement.productBox,
//                                     upsBox: currentElement.upsBox,
//                                     downsBox: currentElement.downsBox
//                                 }),
//                                 query: {_id: new mongoose.mongo.ObjectId(currentElement.feedbackID)}
//                             })
//                      console.log("return item: " +returnItem);
//                     })
//         .flatMap(function(currentElement){
//                 Fetcher(currentElement.query, {$set:{upsBox: currentElement.feedbackField.upsBox,
//                                                  downsBox: currentElement.feedbackField.downsBox}})
//                         .ap(function(res){res.json({title: "response of DB", body: res})})
//                         .subscribe(
//                             function(next){console.log(next)},
//                             function(err){err.json({title:"error occurred", error:err})},
//                             function(complete){console.log("update completed for: " + complete.json())}
//                         );
//         });
//
//         updater.subscribe(
//             function(next){console.log(next);},
//             function(err) {
//                 return res.status(500).json({
//                     title: "an error occured",
//                     error: err
//                 });},
//             function (res) {
//                 return res.status(200).json({
//                     title: "Successful update",
//                     body: res
//                 })
//             });
// });
//
// function Fetcher(query, update){
//     return Rx.Observable.from(Feedback.findOneAndUpdate(query, update,
//         function (res, err){
//             if (err) {
//                 return err.json({
//                     title: 'An error occurred',
//                     error: err
//                 });
//             }
//             if (!res) {
//                 return res.json({
//                     title: 'No Message Found!',
//                     error: {message: 'Message not found'}
//                 });
//             }
//                 return res.json({
//                     message: 'Updated message',
//                     obj: res
//                 });
//         }));


    //     //iterate over each item in the array
    //     var iteration = [];
    //
    //         iteration.push(data.every(function (feedbackIn) {
    //
    //         //take current object and transform to feedback object
    //         var feedBack = new Feedback({
    //         nameBox: feedbackIn.nameBox,
    //         productBox: feedbackIn.productBox,
    //         upsBox: feedbackIn.upsBox,
    //         downsBox: feedbackIn.downsBox
    //     });
    //
    //     //grab the current object's id
    //
    //     var objectID = new mongoose.mongo.ObjectId(feedbackIn.feedbackID);
    //     var query = {_id: objectID};
    //     var result;
    //
    //     //find the ID and attempt to store to DB
    //     result =  Feedback.findOneAndUpdate(query,
    //                                             {$set:{upsBox: feedBack.upsBox,
    //                                                     downsBox: feedBack.downsBox}},
    //                                             function (err, dbRes) {
    //         console.log("in findby");
    //         if (err) {
    //             responseArray.push(JSON.stringify({
    //                 title: 'An error occurred',
    //                 error: err
    //             }));
    //             console.log(responseArray);
    //             return false;
    //         }
    //         if (!dbRes) {
    //             responseArray.push(JSON.stringify({
    //                 title: 'No Feedback Record Found!',
    //                 error: {feedback: 'Feedback Record not found'}
    //             }));
    //             console.log(responseArray);
    //             return false;
    //         }
    //             console.log("in Save! pass");
    //             responseArray.push({
    //                 message: 'Updated message',
    //                 obj: dbRes
    //             });
    //             console.log("holding array content: " + responseArray);
    //             return true;
    //         });
    //     console.log("Result value: " + result);
    //     return result;
    // }));
    // console.log("iteration array: " + iteration);
    //     if(iteration.includes(false)){
    //         console.log("in iteration failure");
    //         res.status(500).json({
    //             message: 'update failed',
    //             obj: JSON.stringify(responseArray)
    //         });
    //     } else if(iteration.includes(true)) {
    //         console.log("interation success");
    //         res.status(200).json({
    //             message: "Update Success!",
    //             obj: JSON.stringify(responseArray)
    //         });
    //     }

router.delete('/', function(req, res, next) {
    Feedback.find()
        .exec(function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        message.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});

module.exports = router;