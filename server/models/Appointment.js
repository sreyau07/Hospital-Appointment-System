const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema(
  {

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },


    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },


    appointmentDate: {
      type: Date,
      required: true
    },
paymentStatus: {
  type: String,
  default: "Pending",
},

paymentId: {
  type: String,
  default: "",
},

    appointmentTime: {
      type: String,
      required: true
    },


    reason: {
      type: String
    },


    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "completed",
        "cancelled"
      ],
      default: "pending"
    },


    prescription: {
      type: String,
      default: ""
    }


  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);