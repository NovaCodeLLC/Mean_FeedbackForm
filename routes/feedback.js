/**
 * Created by TXL8009 on 3/13/2017.
 */
var express = require('express');
var router = express.Router();

var Feedback = require('../models/feedback');

router.get('/', function (req, res, next) {
    Feedback.find()
        .exec(function (err, feedback) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: feedback
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