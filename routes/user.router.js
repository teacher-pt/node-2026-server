import { Router } from "express";
import multer from "multer";

import { login, register } from "../controllers/user.controller.js";
import { joiValidator } from "../middlewares/validator.middleware.js";
import { userValidation } from "../models/user.model.js";

const upload = multer({ dest: 'uploads/' });

const router = Router();

router.post('/login', joiValidator(userValidation.login), login);

router.post('/', upload.single('advatar'), register);

export default router;