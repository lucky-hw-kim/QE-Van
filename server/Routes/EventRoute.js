import express from 'express';
import { attendingEvent, createEvent, deleteEvent, getAllEvents, getEvent, saveEvent, updateEvent } from '../Controllers/EventController.js';


const router = express.Router();

router.get('/:id', getEvent)
router.post('/', createEvent)
router.delete('/:id', deleteEvent)
router.put('/:id', updateEvent)
router.put('/:id/save', saveEvent)
router.put('/:id/attend', attendingEvent)
router.get('/events', getAllEvents)

export default router;
