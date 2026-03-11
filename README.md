🛡️ Banking Fraud Detection System
-------------------------------------------------------------------
A Node.js microservice designed to detect suspicious banking transactions using behavioral analysis and rule-based fraud detection. The system monitors transaction patterns and flags accounts that show abnormal activity over multiple days.

This service can be integrated with a banking backend to automatically evaluate transactions and help prevent fraud, scams, or money laundering.

 Features:-
-------------------------------------------------------------------
1.Unusual Transaction Detection:-
  Detects transactions that are significantly larger than a user's normal transaction behavior.

2.Multi-Day Fraud Pattern Detection:-
  Identifies suspicious activity when large transactions occur across three or more different days.

3.Risk Scoring System (0-100):-
  Assigns a risk score based on suspicious behavior.

4.Automatic Account Flagging:-
  Accounts are flagged when the risk score exceeds a defined threshold.

5.MongoDB Data Storage:-
  Suspicious transactions are stored for historical tracking and analysis.

6.Microservice Architecture:-
  Runs independently and can be connected to any banking system through REST APIs.

🧠 Fraud Detection Logic:-
-------------------------------------------------------------------
1. The system monitors a user's average transaction behavior.

2. If a user who normally sends small transactions suddenly sends a large transaction, it is marked as suspicious.

3. Suspicious transactions are stored in the database.

4. If suspicious activity occurs across three different days, the system increases the risk score.

5. When the risk score crosses the threshold, the user account is flagged for review.

🛠️ Tech Stack:-
-------------------------------------------------------------------
. Node.js
. Express.js
. MongoDB
. Mongoose
. REST API

📂 Project Structure
-------------------------------------------------------------------
fraud-detection-system
│
├── controllers
├── models
│   └── Transaction.js
├── services
│   └── fraudEngine.js
├── routes
├── server.js
├── package.json
└── README.md

🔌 API Endpoint:-
-------------------------------------------------------------------
Check Transaction

POST

/check-transaction

Example Request:-
{
  "userId": "user123",
  "avgTransaction": 3000,
  "amount": 25000
}

Example Response:-
{
  "suspicious": true,
  "suspiciousDays": 3,
  "riskScore": 60,
  "flagged": true
}
