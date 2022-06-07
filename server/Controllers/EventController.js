import EventModel from "../Models/eventModel.js"


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
    const event = await EventModel.findById(eventId)
    if(event.userId === userId) {

      const event = await EventModel.findByIdAndUpdate(eventId, req.body, {new: true});
      res.status(200).json(event)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

// Delete Event
export const deleteEvent = async (req, res) => {
  const eventId = req.params.id
  const {userId} = req.body

  const event = await EventModel.findById(eventId)

  try {
    if(userId === event.userId) {
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
    if(!event.saved_userId.includes(userId)) {
      await event.updateOne({$push : {saved_userId: userId}})
      res.status(200).json("Event saved")
    } else {
      await event.updateOne({$pull : {saved_userId: userId}})
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
    if(!event.attending_userId.includes(userId)) {
      await event.updateOne({$push: {attending_userId: userId}})
      res.status(200).json("Event attending!")
    } else {
      await event.updateOne({$pull: {attending_userId: userId}})
      res.status(200).json("Event not attending!")
    }
  } catch (err) {
    res.status(500).json(error)
  }
}

//Get All events 

export const getAllEvents = async (req, res) => {

  try {
    const events = await EventModel.find();
    res.status(200).json(events).sort((a,b)=>{
      return b.event_date - a.event_date
    })
    
  } catch (error) {
    res.status(500).json(error)
  }

}

