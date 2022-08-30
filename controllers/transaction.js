const { response } = require("express");
const Transaction = require("../models/transaction");


exports.getTransaction = async (req, res, next) => {
    await Transaction.find({ groupId: req.params.groupId })
        .then((docs) =>
            res.status(200).json({
                code: 200,
                message:
                    Array.isArray(docs) && docs.length <= 0
                        ? "Either Group  id doesn't exist or no records found"
                        : "Transactions Fetched Successfully",

                data: docs,
            })
        )
        .catch((error) => res.json(error));
};


exports.createTransaction = async (req, res, next) => {
    await Transaction.findOne()
        .select("transactionId")
        .sort({ transactionId: -1 })
        .then((lasttransactionId) => {
            req.body.transactionId = lasttransactionId ? lasttransactionId.transactionId + 1 : 1;
            return req;
        })
        .then((req) => {
            Transaction.create(req.body); res
                .status(201).json({ code: 200, message: "Transaction Created Succesfully" });
        })
        .catch((error) => res.json(error));
};
