import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// create the schema for the user model
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

/***************************************
 * Static register method for the model
 ***************************************/
userSchema.statics.register = async function (email, password) {
    /******************************************
     *  field validations on the register form
     ******************************************/
    if (!email || !password) throw Error("Both Email and Password fields are required");

    //check for the validity of the email
    if (!validator.isEmail(email)) throw Error("Please enter a valid email address");

    // check for password strength
    if (!validator.isStrongPassword(password)) throw Error("Please enter a strong password");

    // check whether the email exists
    const exists = await this.findOne({ email });
    if (exists) throw Error("email has already been taken");

    // bcrypting the user password
    const salt = await bcrypt.genSalt(); // specify the number of rounds, the default is 10.
    const hashed_password = await bcrypt.hash(password, salt);

    // store the user in the database
    const user = await this.create({ email, password: hashed_password });

    return user;
};

/***************************************
 * Static login method for the model
 ***************************************/
userSchema.statics.login = async function (email, password) {
    /*************************************
     * field validation on the login from
     *************************************/
    if (!email || !password) throw Error("Both Email and Password fields are required");

    // validate email address to see if exists inside the database
    const user = await this.findOne({ email });
    if (!user) throw Error("Email doesnot exist in the database");

    // validate the password
    const password_match = await bcrypt.compare(password, user.password);
    if (!password_match) throw Error("password doesnot match");

    return user;
};

// create the model for the schema
export const User = model("User", userSchema);
