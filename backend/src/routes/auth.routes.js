import { Router } from "express";

import { login, register } from "../controllers/auth.controller.js";

const router = Router();

router.post('/login', login);
router.post('/registrar', register);

export default router;