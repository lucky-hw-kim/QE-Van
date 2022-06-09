import UserModel from "../Models/userModel.js";


//Get All Users
export const getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  if (!users) return res.status(204).json({ 'message': 'No users found' });
  res.json(users);
}

// Get User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if(user)
    {
      const {password, ...otherDetails} = user._doc
      res.status(200).json(otherDetails)
    }
    else {
      res.status(404).json("No User Found");
    }

  } catch (err) {
    res.status(500).json(err);
  }
}

// Update User

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const {currentUserId, currentUserAdminStatus, password} = req.body;

  if(id === currentUserId || currentUserAdminStatus) {
    try {
      if(password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt)
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
      res.status(200).json(user);

    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Access Denied: only authorized user can update current user")
  }
}

//delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id
  const {currentUserId, currentUserAdminStatus} = req.body;

  if(id === currentUserId || currentUserAdminStatus) {

    try {
      const user = await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    }catch(err){
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Access Denied!!")
  }

}