import express from "express";
import control from "../controller/index.js"

const router = express.Router();

//router.post('/home', control.home)
router.post("/signup", control.handleSignup);
router.post("/login", control.handleLogin);

export {router};