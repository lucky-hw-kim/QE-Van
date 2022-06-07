import mongoose from "mongoose";

const EventSchema = mongoose.Schema(
  {
    userId: {
      type: String, required: true
    },
    event_title: {
      type: String, required: true
    },
    event_date: {
      type: Date, required: true
    },
    event_location: {
      type: String, required: true
    },
    event_thumbnail: {
      type: String
    },
    event_description: {
      type: String, required: true
    },
    event_link: {
      type: String, required: true
    },
    saved_userId: [],
    attending_userId: []
  },
  {timestamps: true}
)

const EventModel = mongoose.model("Events", EventSchema)
export default EventModel