const mongoose = require("mongoose");

const suspiciousTransactionSchema = new mongoose.Schema({

    //for the user who made transaction
    userId: {
        type: String,
        required: true
    },

    //transaction amount
    amount: {
        type: Number,
        required: true
    },

    //when suspicius transaction is made
    date: {
        type: Date,
        default: Date.now
    }
});

const SuspiciousTransaction = mongoose.model(
    "SuspiciousTransaction",
    suspiciousTransactionSchema
);

module.exports = SuspiciousTransaction;