function checkLargeTransaction(userAvg, amount) {

    if (userAvg <= 5000 && amount >= 20000) {
        return true;
    }

    return false;
}

function countSuspiciousDays(transactions) {

    const days = new Set();

    transactions.forEach(tx => {
        const day = new Date(tx.date).toISOString().split("T")[0];
        days.add(day);
    });

    return days.size;
}

module.exports = {
    checkLargeTransaction,
    countSuspiciousDays
};