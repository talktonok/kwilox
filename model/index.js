import mongoose from "mongoose";

const kwilox = mongoose.Schema(
{
    PhoneNumber:{required:true, type:Number}, 
    Age:{required:true, type:Number}, 
    Email: {required:true, type:String},
    FirstName: {required:true, type:String},
    LastName: {required:true, type:String},
    Password: {required:true, type:String}

}
);

const users = mongoose.model('Users', kwilox);
export default {users};