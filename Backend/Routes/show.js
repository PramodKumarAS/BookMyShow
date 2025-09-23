const express = require("express");
const showModels = require("../Model/shows");
const authMiddleware = require("../Middleware/authMiddleware");
const showRouter = express.Router();

showRouter.post('/add-show',authMiddleware, async(req,res)=>{
    try {

        const show = new showModels(req.body);
        await show.save();

        res.status(200).json({
            success: true,
            message: "show Added!", 
            show
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
});

showRouter.post('/update-show',authMiddleware, async (req, res) => {

  try {
    await showModels.findByIdAndUpdate(req.body.showId, req.body);
    res.send({
      success: true,
      message: "The show has been updated!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }

});

showRouter.post('/get-all-shows-by-theatre', authMiddleware, async (req, res) => {
  try {
    // 1️⃣ Current time in IST
    const now = new Date();
    const istOffsetMs = (5 * 60 + 30) * 60 * 1000; // 5:30 hours in milliseconds
    const nowIST = new Date(now.getTime() + istOffsetMs);

    // 2️⃣ Start of today in IST
    const todayIST = new Date(
      nowIST.getFullYear(),
      nowIST.getMonth(),
      nowIST.getDate(),
      0, 0, 0, 0
    );

    // 3️⃣ Update only past shows to today's date and clear bookedSeats
    await showModels.updateMany(
      { date: { $lt: todayIST } }, // only shows in the past
      { $set: { date: todayIST, bookedSeats: [] } }
    );

    // 4️⃣ Fetch shows for today/future only (IST)
    const shows = await showModels.find({
      theatre: req.body.theatreId,
      date: { $gte: todayIST }
    }).populate("movie");

    // 5️⃣ Convert dates to IST string (YYYY-MM-DD) for frontend
    const showsWithIST = shows.map(show => {
      const istDate = new Date(show.date.getTime() + istOffsetMs);
      return {
        ...show.toObject(),
        date: istDate.toISOString().split("T")[0]
      };
    });

    res.send({
      success: true,
      message: "All shows fetched (past shows updated to today IST)",
      data: showsWithIST,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});



showRouter.post('/get-all-theatres-by-movie',authMiddleware,  async (req, res) => {

  try {
    const { movie, date } = req.body;
    const shows = await showModels.find({ movie, date }).populate("theatre");

    let uniqueTheatres = [];

    shows.forEach((show) => {
      let isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id
      );

      if (!isTheatre) {
        let showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });

    res.send({
      success: true,
      message: "All theatres fetched!",
      data: uniqueTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }

});

showRouter.post('/get-show-by-id',authMiddleware, async (req, res) => {

  try {
    const show = await showModels.findById(req.body.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "Show fetched!",
      data: show,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }

});

showRouter.post('/delete-show',authMiddleware,async (req, res) => {

  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "The show has been deleted!",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }

});

module.exports = showRouter;