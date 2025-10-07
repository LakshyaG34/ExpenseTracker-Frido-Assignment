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

| Layer        | Technology Used                        |
|---------------|---------------------------------------|
| Frontend      | React.js, Redux Toolkit, Tailwind CSS |
| Backend       | Node.js, Express.js                   |
| Database      | MongoDB (Mongoose)                    |
| Authentication| JWT + Cookies                         |

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally 👇

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/LakshyaG34/ExpenseTracker-Frido-Assignment.git
cd expense-tracker-mern
```

### 2️⃣ Backend Setup
```bash
bash
cd backend
npm install
Create a .env file inside the backend folder and add:

env.example
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV


npm run dev
Backend should now be running on 👉 http://localhost:5000
```


### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
Start the frontend:


npm run dev
```
Frontend runs on 👉 http://localhost:5173

4️⃣ Folder Structure
```bash
expense-tracker-mern/
│
├── server/
│   ├── controller/
│   ├── model/
│   ├── routes/
│   ├── lib/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── .env
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

```
🧩 API Endpoints Overview
```bash
Method	Endpoint	                    Description
POST	/api/expenses	                Add a new expense
GET	    /api/expenses	                Fetch all expenses from category query
GET	    /api/expenses/all	            Fetch all expenses
PUT	    /api/expenses/:expenseId	    Update an expense
DELETE	/api/expenses/:expenseId	    Delete an expense
GET	    /api/expenses/group/:groupId	Get total expense of a group
POST    /api/auth/signup                Signup User
POST    /api/auth/signin                Login User
POST    /api/auth/logout                Logout User
GET     /api/auth/me                    Sends Tokens
GET     /api/auth/users                 Get All users
POST    /api/groups                     createGroup
GET     /api/groups                     getGroup
GET     /api/groups/:groupId            getGroupById
DELETE  /api/groups/:groupId            deleteGroup
PUT     /api/groups/:groupId            updateGroup

```

📸 Screenshots
🏠 Dashboard
<img width="1920" height="1080" alt="Screenshot (3398)" src="https://github.com/user-attachments/assets/e43d6455-70c9-4c35-b930-a23af2c0aa6d" />

➕ Add Expense Page
<img width="1920" height="1080" alt="Screenshot (3399)" src="https://github.com/user-attachments/assets/f222fb44-5ba0-4a3c-8c50-0befee7d8edc" />

👥 Group
<img width="1920" height="1080" alt="Screenshot (3401)" src="https://github.com/user-attachments/assets/bc8d24be-a2ac-4475-b0cb-eb687b5382ac" />

👥 Group Creation
<img width="1920" height="1080" alt="Screenshot (3402)" src="https://github.com/user-attachments/assets/5d33fd85-7529-4a5b-a74a-dc4daa1198d3" />

💰 Balance Summary
<img width="1920" height="1080" alt="Screenshot (3400)" src="https://github.com/user-attachments/assets/8c72d572-6d2d-401e-a828-9a352d9f8510" />

👥 Login
<img width="1920" height="1080" alt="Screenshot (3404)" src="https://github.com/user-attachments/assets/4378942a-6701-47fe-8012-dcdfcda8b894" />

👥 Signup
<img width="1920" height="1080" alt="Screenshot (3405)" src="https://github.com/user-attachments/assets/05e1e029-367b-4d11-9a4e-d5a16d0672f6" />



