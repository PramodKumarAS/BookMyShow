# 🎬 BookMyShow Clone (MERN Stack)

A full-stack clone of the **BookMyShow** application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
This project allows users to browse movies, view details, select seats, and book tickets – similar to the real BookMyShow app.

---

## 🚀 Features
- 🔐 User authentication (signup/login)
- 🎥 Browse movies with details (title, genre, cast, release date, trailer, etc.)
- 🏟 Seat selection and ticket booking
- 💳 Payment gateway integration (dummy/real depending on setup)
- 📱 Responsive UI for desktop and mobile
- 📊 Admin panel (add/manage movies, theaters, shows)

---

## 🛠 Tech Stack
- **Frontend:** React.js, Redux (or Context API), Antd.
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT 
- **Payment:** Stripe

---

## 📂 Project Structure
/frontend -> React frontend
/backend -> Express backend
/models -> MongoDB models
/routes -> API routes
/config -> Environment & DB configs



---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/bookmyshow-clone.git
cd bookmyshow-clone

# Install server dependencies
cd backend
npm install

# Install client dependencies
cd frontend
npm install

3️⃣ Setup environment variables

Create a .env file inside the server folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYMENT_KEY=your_payment_gateway_key 

4️⃣ Run the project
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start



