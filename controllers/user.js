const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");



exports.getUser = async (req, res, next) => {
    const user = await User.findOne({ userEmailId: req.body.userEmailId });
    if (user) {
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (validPassword) {
            res
                .status(200)
                .json({
                    message: "Valid Password",
                    user: {
                        userName: user.userName,
                        userEmailId: user.userEmailId,
                        groupsInvolved: user.groupsInvolved,
                    },
                });
        } else {
            res.status(400).json({ error: "Invalid password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const oldUser = await User.findOne({ userEmailId: req.body.userEmailId });
        if (oldUser) {
            return res.status(400).send("User Already exist, Please Login");
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        User.create(req.body)
            .then((docs) => {
                res.status(201).json(docs);
            })
            .catch((err) => res.json(err));
    } catch (err) {
        res.json(err);
    }
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