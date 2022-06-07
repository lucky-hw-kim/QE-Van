import EventModel from "../Models/eventModel.js"
import UserModel from "../Models/userModel.js"


//Get All events 

export const getAllEvents = async (req, res) => {

  try {
    const events = await EventModel.find().sort({ event_date : 1 })

    res.status(200).json(events)
    
  } catch (error) {
    res.status(500).json(error)
  }

}


// Create Event
export const createEvent = async (req, res) => {
  const newEvent = new EventModel(req.body)
  try {
    await newEvent.save()
    res.status(200).json("Event Created")
  } catch (err) {
    res.status(500).json(err)
  }
}
// Get Event
export const getEvent = async (req, res) => {
  const id = req.params.id

  try {
    const event = await EventModel.findById(id)
    res.status(200).json(event)
  } catch (err) {
    res.status(500).json(err)
  }

}

// Update Event
export const updateEvent = async (req, res) => {
  const eventId = req.params.id
  const {userId} = req.body

  try {

    const user = await UserModel.findById(userId)
    const event = await EventModel.findById(eventId)
    // const {userId, ...otherDetails} = event._doc

    if(event.userId === userId || user.isAdmin) {

      await event.updateOne({ $set : req.body });
      res.status(200).json("Post updated")
    } else {
      res.status(500).send("Not Authorized")
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

// Delete Event
export const deleteEvent = async (req, res) => {
  const eventId = req.params.id
  const {userId} = req.body

  const user = await UserModel.findById(userId)
  const event = await EventModel.findById(eventId)

  try {
    if(userId === event.userId || user.isAdmin) {
      await event.deleteOne();
      res.status(200).json("Event deleted successfully")
    } else {
      res.status(403).json("Action Forbidden")
    }
    
  } catch (error) {
    res.status(500).json(error)
  }
}

// Save Event
export const saveEvent = async (req, res) => {
  const eventId = req.params.id
  const {userId} = req.body

  try {
    const event = await EventModel.findById(eventId)
    const user = await UserModel.findById(userId)

    if(!event.saved_userId.includes(userId)) {
      await event.updateOne({$push : {saved_userId: userId}})
      await user.updateOne({$push : {saved_events: eventId}})
      res.status(200).json("Event saved")
    } else {
      await event.updateOne({$pull : {saved_userId: userId}})
      await user.updateOne({$pull : {saved_events: eventId}})
      res.status(200).json("Event unsaved")
    }
  } catch (err) {
    res.status(500).json(error)
  }
}

// Attending Event
export const attendingEvent = async (req, res) => {
  const eventId = req.params.id
  const {userId} = req.body

  try {

    const event = await EventModel.findById(eventId)
    const user = await UserModel.findById(userId)

    if(!event.attending_userId.includes(userId)) {
      await event.updateOne({$push: {attending_userId: userId}})
      await user.updateOne({$push : {attending_events: eventId}})
      res.status(200).json("Event attending!")
    } else {
      await event.updateOne({$pull: {attending_userId: userId}})
      await user.updateOne({$pull : {attending_events: eventId}})
      res.status(200).json("Event not attending!")
    }
  } catch (err) {
    res.status(500).json(error)
  }
}


