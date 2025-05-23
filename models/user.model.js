const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
    {
        name: {
            type:String, 
            required: [true, "Eneter a name"]
        },

        password : {
            type:String,
            required:[true, "enter password"]
        }
    },

    {
    timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;