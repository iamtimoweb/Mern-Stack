import { useEffect } from "react";
import { useReducer, createContext } from "react";

/***************************************
 * create a context for the application
 ***************************************/
export const AuthContext = createContext();

/******************************************************************************
 * create a workout reducer function for managing the state of the application
 ******************************************************************************/
const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };

        case "LOGOUT": {
            return { user: null };
        }
        default:
            return state;
    }
};

/***************************************************
 * create a context provider for handling the state
 ***************************************************/

export const AuthContextProvider = (props) => {
    /*******************************************************************
     * An alternative to useState.

      useReducer is usually preferable to useState when you have complex state logic 
      that involves multiple sub-values. It also lets you optimize performance for  components that trigger deep updates because you can pass dispatch down instead of callbacks.
     */

    const [state, dispatch] = useReducer(authReducer, { user: null });

    useEffect(() => {
        // checking for the presence of the user inside the browswer localstorage
        const user = localStorage.getItem("user");
        if (user) dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }, []);

    return <AuthContext.Provider value={{ ...state, dispatch }}>{props.children}</AuthContext.Provider>;
};
