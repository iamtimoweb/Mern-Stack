import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { WorkoutsContext } from "../../contexts/WorkoutsContextProvider";
function WorkoutDetails({ workout, index }) {
    const id = workout._id;
    const { dispatch } = useContext(WorkoutsContext);
    const { user } = useContext(AuthContext);

    const handleDelete = async () => {
        if (!user) {
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/workouts/" + id, {
                method: "DELETE",
                headers: { Authorization: `Bearer, ${user.token}` },
            });
            //console.log(response);

            const data = await response.json();
            //console.log(data);

            if (response.status === 200) {
                dispatch({ type: "DELETE", payload: data });
            }
        } catch (error) {}
    };
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{workout.title}</h5>
                    <p className="card-text">{workout.load}kg load</p>
                    <p className="card-text">
                        <small className="text-muted">{workout.reps} reps</small>
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <Link to={"/" + workout._id + "/update"} className="btn btn-sm btn-outline-secondary">
                                Update
                            </Link>
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                        <small className="text-muted">{workout.createdAt}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkoutDetails;
