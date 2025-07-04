# React-Node.js-CRUD-System

# 📝 📄 Project Description:
SmartUser Manager is a full-stack web application that provides complete CRUD (Create, Read, Update, Delete) functionality for managing user data, including name, email, job title, and mobile number. It is built using React.js for the frontend, Node.js & Express.js for the backend, and MySQL for database storage. The user interface is styled using Bootstrap 5, ensuring a clean and responsive design. <br>

# 🔧 Key Features:
🟢 Create – Add new users using a dynamic registration form <br>
🔵 Read – View a list of all registered users in a styled table <br>
🟠 Update – Edit existing user details with real-time form pre-fill <br>
🔴 Delete – Remove user records with confirmation and feedback <br>
<br>
✅ RESTful API integration with Axios <br>
✅ User-friendly UI with Bootstrap styling and form validation <br>
✅ Modular, reusable React components with proper state management <br>
<br>
# 🛠️ Tech Stack: <br>
Frontend: React.js, Axios, Bootstrap 5, CSS3<br>
Backend: Node.js, Express.js <br>
Database: MySQL<br> 
Tools: VS Code, Git,Thunder Client <br>

# 💡 Use Case: <br>
Ideal for small teams or admin panels where user information needs to be added, viewed, updated, or removed efficiently.



## Getting Started

1. Clone the repository
2. Navigate to `Client/` and run:
3. Navigate to `Server/` and run:

# Ensure that you have Node.js and npm installed.



#👨‍💻 1. Client Folder ke liye (React): <br>
cd Server <br>
npm install <br>
node index.js     <br>


 # 2. Server Folder ke liye (Node.js + Express): <br>
cd Server <br>
npm install <br>
node index.js     <br>


# CREATE TABLE 

CREATE TABLE `react_tb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `num` varchar(13) NOT NULL,
  PRIMARY KEY (`id`)
) 
