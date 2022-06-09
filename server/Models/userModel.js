import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      required: true
    },
    pronoun: [],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    refresToken:[String],
    roles: {
      User: {
          type: Number,
          default: 2001
      },
      Admin: Number
    },
    profilePicture: String,
    saved_events: [],
    attending_events: []    
  },
  {timestamps: true}
)

const UserModel = mongoose.model("Users", UserSchema)
export default UserModel