const mongoose = require("mongoose");

const AboutMissionSchema = new mongoose.Schema({
  aboutText: { type: String, required: true },
  missionText: { type: String, required: true },
});

module.exports = mongoose.model("AboutMission", AboutMissionSchema);
