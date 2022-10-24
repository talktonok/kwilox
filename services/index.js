import "../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from '../model/index.js'

const { JWT_SECRET } = process.env;

const authenticate = async ({email, password }) => {
  const user = await find({ email });
  
  const isValidPassword = await bcrypt.compare(password, user.password);
    if(isValidPassword){
  var token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: 24 * 60 * 60, 
  });
}

  return { token };
};

const create = async ({ email, age, firstName, lastName, password }) => {
  const newUser = new userModel(
    {
    age: age, 
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: await bcrypt.hash(password, 10),
    }
  );

  const token = jwt.sign({ id: newUser.id }, JWT_SECRET, {
    expiresIn: 24 * 60 * 60, 
  });

  try {
    const userToSave = await newUser.save();
    res.status(200).json({userToSave, token})
}
catch (error) {
    res.status(400).json({message: error.message})
}

};

const find = async ({id, email }) => {
  const users = userModel.findOne({email: email});
  return users
};

export {
  authenticate,
  create,
  find,
};