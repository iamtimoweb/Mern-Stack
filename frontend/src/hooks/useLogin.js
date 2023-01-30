import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

export const useLogin = () => {
    const [loginAlerts, setLoginAlerts] = useState({ error: null, isloading: null });

    const { dispatch } = useContext(AuthContext);

    const login = async (email, password) => {
        setLoginAlerts({ ...loginAlerts, isloading: true });

        // make an api request to the login endpoint
        const response = await fetch("http://127.0.0.1:5000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setLoginAlerts({ ...loginAlerts, isloading: false, error: data.error });
            //throw new Error(`HTTP error! status: ${response.status}`);
            return;
        }

        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(data));

        // update the AuthContext
        dispatch({ type: "LOGIN", payload: data });

        // set isloading to false
        setLoginAlerts({ ...loginAlerts, error: null, isloading: false });
    };

    return { login, loginAlerts };
};
