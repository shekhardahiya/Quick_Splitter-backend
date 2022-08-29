const { response } = require("express");
const User = require("../models/user");


exports.getUser = async (req, res, next) => {
    await User.find({ userEmailId: req.params.userEmailId })
        .then((docs) =>
            res.status(200).json({
                code: 200,
                message:
                    Array.isArray(docs) && docs.length <= 0
                        ? "Either User id doesn't exist or no records found"
                        : "User Fetched Successfully",

                data: docs,
            })
        )
        .catch((error) => res.json(error));
};


exports.createUser = async (req, res, next) => {
    await User.findOne()
        .select("userId")
        .sort({ userId: -1 })
        .then((lastuserId) => {
            console.log(lastuserId);
            req.body.userId = lastuserId.userId + 1;
            return req;
        })
        .then((req) => {
            User.create(req.body); res
                .status(201).json({ code: 200, message: "User Created Succesfully" });
        })
        .catch((error) => {res.json(error)
        console.log('hi error',error);});
};


exports.updateUser = async (req, res, next) => {
    await User.findOneAndUpdate({ userEmailId: req.body.userEmailId }, req.body, {
        new: true,
    })
        .then((response) => {
            res.status(200).json({
                code: 200,
                message: response
                    ? "User updated successfully"
                    : "Either User was not updated or UserId does not exist",
            });
        })
        .catch((err) => {
            res.json(err);
        });
};