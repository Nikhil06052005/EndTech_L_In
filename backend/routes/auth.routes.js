import express from 'express';
import { signUp } from '../controllers/auth.controllers.js';
import { login } from '../controllers/auth.controllers.js';
import { logout } from '../controllers/auth.controllers.js';
let authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post("/logout",logout)

export default authRouter