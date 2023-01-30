import { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { WorkoutsContext } from "../../contexts/WorkoutsContextProvider";
import WorkoutDetails from "./WorkoutDetails";

function Workouts() {
    const { workouts, dispatch } = useContext(WorkoutsContext);

    // Get the authenticated user from AuthContext
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            (async function fetch_workouts() {
                try {
                    const response = await fetch("http://127.0.0.1:5000/api/workouts", {
                        headers: { Authorization: `Bearer ${user.token}` },
                    });
                    if (!response.ok) {
                        throw Error("Failed to fetch workouts from the api endpoint");
                    }
                    const data = await response.json();

                    // dispatch FETCH_ALL an action to update the global state
                    dispatch({ type: "FETCH_ALL", payload: data });
                } catch (error) {
                    console.log(error.message);
                }
            })();
        }
    }, [dispatch, user]);
    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">{workouts && workouts.map((workout, index) => <WorkoutDetails workout={workout} index={index} key={workout._id} />)}</div>
        </div>
    );
}

export default Workouts;
