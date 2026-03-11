const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");

const { checkLargeTransaction, countSuspiciousDays } = require("./services/fraudEngine");
const SuspiciousTransaction = require("./models/Transaction");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fraud-detection")
    .then(() => {
        console.log("MongoDB connected 👍")
    })
    .catch((error) => {
        console.log(error);
    })



app.post("/check-transaction", async (req, res) => {

    const { userId, avgTransaction, amount, date } = req.body;

    let riskScore = 0;

    const suspicious = checkLargeTransaction(avgTransaction, amount);
    console.log(`[DEBUG] suspicious=${suspicious}, avgTransaction=${avgTransaction}, amount=${amount}`);

    if (suspicious) {

        const savedDate = date ? new Date(date) : new Date();
        console.log(`[DEBUG] Saving transaction with date: ${savedDate.toISOString()}`);

        await SuspiciousTransaction.create({
            userId: userId,
            amount: amount,
            date: savedDate
        });

        riskScore += +20;
    }

    const transaction = await SuspiciousTransaction.find({
        userId: userId
    });

    console.log(`[DEBUG] All transactions for ${userId}:`, transaction.map(t => t.date.toISOString().split("T")[0]));

    const suspiciousDays = countSuspiciousDays(transaction);
    console.log(`[DEBUG] suspiciousDays=${suspiciousDays}`);

    if (suspiciousDays >= 3) {
        riskScore += 40;
    }

    const flagged = riskScore >= +60;

    res.json({
        suspicious,
        suspiciousDays,
        riskScore,
        flagged
    });

});

app.delete("/reset/:userId", async (req, res) => {
    const { userId } = req.params;
    await SuspiciousTransaction.deleteMany({ userId });
    console.log(`[DEBUG] Cleared all transactions for ${userId}`);
    res.json({ message: `Cleared transactions for ${userId}` });
});

app.listen(5001, () => {
    console.log("Fraud service running on port 5001 🏃‍♀️‍➡️");
});