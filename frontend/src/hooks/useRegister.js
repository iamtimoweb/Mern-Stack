import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

export default function useRegister() {
    const [registerAlerts, setRegisterAlerts] = useState({ error: null, isloading: null });

    const { dispatch } = useContext(AuthContext);

    const register = async (email, password) => {
        setRegisterAlerts({ ...registerAlerts, isloading: true });

        // make an api request to the register endpoint
        const response = await fetch("http://127.0.0.1:5000/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setRegisterAlerts({ ...registerAlerts, isloading: false, error: data.error });
            //throw new Error(`HTTP error! status: ${response.status}`);
            return;
        }

        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(data));

        // update the AuthContext
        dispatch({ type: "LOGIN", payload: data });

        // set isloading to false
        setRegisterAlerts({ ...registerAlerts, error: null, isloading: false });
    };

    return { register, registerAlerts };
}
