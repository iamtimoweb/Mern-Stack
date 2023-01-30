import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
//import { WorkoutsContext } from "../contexts/WorkoutsContextProvider";

export default function useLogout() {
    const { dispatch } = useContext(AuthContext);
    //const { dispatch: dispatchWorkouts } = useContext(WorkoutsContext);

    const logout = () => {
        // remove the user from storage
        localStorage.removeItem("user");

        // dispatch the logout action
        dispatch({ type: "LOGOUT" });
        // dispatch workouts
        //dispatchWorkouts({ type: "FETCH_ALL", payload: null });
    };

    return { logout };
}
