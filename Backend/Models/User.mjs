import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    screenName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    skills: {type:Array, required: true},
    projects: {type:Array, required: false},
    favorites: {type:Array, required: false},
    position: {type:String, required: false},
    profilePhoto:{type:String, required: false},
    friends:{type:Array, required: false},
    pendingFriends:{type:Array, required: false}
});

const User = mongoose.model('User', userSchema);
export default User;