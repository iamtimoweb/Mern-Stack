import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const authenticate = async (req, res, next) => {
    /*********************************************************************************
     * verify that the user is authenticated using the headers authorization property
     *********************************************************************************/
    // on the request object we have access to the headers and we can grab the authorization property.
    // console.log("Headers =", req.headers);

    const { authorization } = req.headers;

    console.log("Authorization token =", authorization)

    // check if authorization property exists on the headers
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token is required" });
    }

    // getting the token from the headers authorization property,
    // the split() method splits the string into an array of two items ie ['bearer', 'token'] at position o and 1 respectively by the help of the space.
    const token = authorization.split(" ")[1];

    /**
     * Validate the token and then destructure the _Id from it.
     */
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user to the request object and assign an id to it from the database.
        // select only the id from the object
        req.user = await User.findById(_id, "_id");
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized" });
    }
};
