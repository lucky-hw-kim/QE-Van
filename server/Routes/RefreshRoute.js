import express from 'express'
import handleRefreshToken from '../Controllers/RefreshTokenController.js'

const router = express.Router();

router.get('/', handleRefreshToken);

export default router;