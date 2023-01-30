import { useState, useEffect, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";

function UpdateWork() {
    const [postFormData, setPostFormData] = useState({ title: "", load: "", reps: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const { id } = useParams();

    useEffect(() => {
        (async function fetch_workout() {
            const response = await fetch("http://127.0.0.1:5000/api/workouts/" + id);
            const data = await response.json();
            if (response.status !== 200) {
                setError(data.error);
            }
            // initialise the postFormData
            setPostFormData(data);
        })();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in");
            return;
        }

        const response = await fetch("http://127.0.0.1:5000/api/workouts/" + id, {
            method: "PATCH",
            body: JSON.stringify(postFormData),
            headers: { "Content-Type": "application/json", Authorization: `Bearer, ${user.token}` },
        });

        const data = await response.json();

        if (response.status !== 202) {
            setError(data.error);
        } else {
            // navigate to workouts page after form is submitted
            // here i can call the dispatch method to make our context sync with the database if my form was on the same page with the worklists
            navigate("/");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-content-center">
                <div className="col-6">
                    <div className="card border-0 my-5">
                        <div className="card-body">
                            {postFormData && (
                                <form onSubmit={handleSubmit}>
                                    <h4>Update Workout</h4>
                                    <div className="my-3">
                                        <label htmlFor="title">Exercise Title:</label>
                                        <input type="text" id="title" value={postFormData.title} onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })} className="form-control" placeholder="Exercise Title..." />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="load">Load (in kg):</label>
                                        <input type="number" id="load" value={postFormData.load} onChange={(e) => setPostFormData({ ...postFormData, load: e.target.value })} className="form-control" placeholder="Load..." />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="reps">Reps:</label>
                                        <input type="number" id="reps" value={postFormData.reps} onChange={(e) => setPostFormData({ ...postFormData, reps: e.target.value })} className="form-control" placeholder="Reps..." />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-sm">
                                        Submit
                                    </button>
                                    {error && (
                                        <div className="alert alert-danger mt-3" role="alert">
                                            {error}
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateWork;
