import { create, authenticate, find } from "../services/index.js";

const handleSignup = async (req, res, next) => {
    try {
      const { email, age, firstName, lastName, password } = req.body;
      const user = await find({ email });
   
      if (user) {
        throw new Error("Email already exists!");
      }
      // Create a token for the user
      const { token } = await create({ email, age, firstName, lastName, password });
   
      // Send a token to the client when a user signs up
      res.json({ token });
    } catch (error) {
      next(error);
    }
   };

   const handleLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await find({ email });
 
      if (!user) {
        throw new Error("Unable to login");
      }
 
      // Create a token for the user, if successfully authenticated
      const { token } = await authenticate({ email, password });
      res.json({ token });
    } catch (error) {
      next(error);
    }
 };
 
 export default {
   handleSignup,
   handleLogin,
 };