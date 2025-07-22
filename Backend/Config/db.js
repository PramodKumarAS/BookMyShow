const mongo =require("mongoose");

const connectDB = ()=>mongo.connect(process.env.Mongo_Url)
.then(() => console.log("✅ Connected to MongoDB"))
.catch((e) => console.error("❌ MongoDB Connection Error:", e));

module.exports=connectDB;