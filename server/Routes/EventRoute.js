import express from 'express';
import { attendingEvent, createEvent, deleteEvent, getAllEvents, getEvent, saveEvent, updateEvent } from '../Controllers/EventController.js';
import multer from "multer"

// const storage1 = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "../../client/src/assets")
//   },
//   filename: (req, file, callback) => {
    
//     callback(null,file.originalname)
//   }
// })

const storage = multer.memoryStorage();


const uploads = multer({storage})



const router = express.Router();

router.get('/:id', getEvent)
router.post('/', uploads.single('event_thumbnail'), createEvent)
router.delete('/:id', deleteEvent)
router.put('/:id', uploads.single('event_thumbnail'), updateEvent)
router.put('/:id/save', saveEvent)
router.put('/:id/attend', attendingEvent)
router.get('/', getAllEvents)

export default router;
