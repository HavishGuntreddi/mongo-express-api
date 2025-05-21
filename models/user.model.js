const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
    {
        name: {
            type:String, 
            required: [true, "Eneter a name"]
        },

        email : {
            type:String,
            required:[true, "enter email"]
        }
    },

    {
    timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;