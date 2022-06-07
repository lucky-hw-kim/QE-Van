import express from 'express'
import { createForum, getAllForums, deleteForum, getForum, updateForum } from "../Controllers/ForumController.js";

const router = express.Router();

router.get('/:id', getForum)
router.put('/:id', updateForum)
router.post('/', createForum)
router.get('/', getAllForums)
router.delete('/:id', deleteForum)

export default router;
