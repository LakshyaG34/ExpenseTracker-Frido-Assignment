# 💰 Expense Tracker (MERN Stack)

An advanced **Expense Tracker Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
This app helps users **create groups**, **add and split expenses**, and **track balances** among members seamlessly — perfect for trips, shared living, or team budgets.

---

## 🚀 Features

- 👥 Create and manage **groups** with multiple members  
- 💵 Add and split expenses by **equal, unequal, or percentage** share  
- 📊 View **group-wise balances** and settlements  
- 🧾 Track all expenses and contributions in real-time  
- 🔒 Secure authentication using JWT  
- 🎨 Beautiful and responsive UI built with **React + Tailwind CSS**

---

## 🛠️ Tech Stack

| Layer        | Technology Used                     |
|---------------|-------------------------------------|
| Frontend      | React.js, Redux Toolkit, Tailwind CSS |
| Backend       | Node.js, Express.js                 |
| Database      | MongoDB (Mongoose)                 |
| Authentication| JWT + Cookies                       |

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally 👇

### 1️⃣ Clone the Repository


git clone https://github.com/your-username/expense-tracker-mern.git
cd expense-tracker-mern

### 2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file inside the backend folder and add:

env
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Then start the backend server:

Copy code
npm run dev
Backend should now be running on 👉 http://localhost:5000


### 3️⃣ Frontend Setup

Copy code
cd frontend
npm install
Start the frontend:


Copy code
npm start
Frontend runs on 👉 http://localhost:3000

4️⃣ Folder Structure
pgsql
Copy code
expense-tracker-mern/
│
├── backend/
│   ├── controller/
│   ├── model/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
│   └── package.json
│
└── README.md
🧩 API Endpoints Overview
Method	Endpoint	Description
POST	/api/expenses	Add a new expense
GET	/api/expenses/all	Fetch all expenses
PUT	/api/expenses/:expenseId	Update an expense
DELETE	/api/expenses/:expenseId	Delete an expense
GET	/api/expenses/group/:groupId	Get total expense of a group
GET	/api/balances/group/:groupId	Calculate balances within a group

📸 Screenshots
🏠 Dashboard
Add screenshot here

➕ Add Expense Page
Add screenshot here

👥 Group Creation
Add screenshot here

💰 Balance Summary
Add screenshot here

