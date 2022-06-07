import mongoose from "mongoose";

const ForumSchema = mongoose.Schema(
  {
    userId: {
      type: String, require: true
    },
    post_title: {
      type: String, require: true
    },
    post_description: {
      type: String, require: true
    },
    spotted_date: {
      type: Date, require: true
    },
    spottted_location: {
      type: String, require: true
    },
    user_email: {
      type: String, require: true
    }
  },
  {timestamps: true}
)

const ForumModel = mongoose.model("Forums", ForumSchema)
export default ForumModel