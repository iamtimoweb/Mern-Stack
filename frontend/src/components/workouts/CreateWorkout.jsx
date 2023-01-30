import { useContext } from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";

function CreateWorkout() {
    const [postFormData, setPostFormData] = useState({ title: "", load: "", reps: "" });
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in");
            return;
        }

        const response = await fetch("http://127.0.0.1:5000/api/workouts", {
            method: "POST",
            body: JSON.stringify(postFormData),
            headers: { "Content-Type": "application/json", Authorization: `Bearer, ${user.token}` },
        });

        const data = await response.json();

        if (response.status !== 201) {
            setError(data.error);
            setEmptyFields(data.empty_fields);
        } else {
            setError(null);
            setEmptyFields([]);

            // navigate to workouts page after form is submitted
            navigate("/");
        }
    };
    return (
        <div className="container">
            <div className="row justify-content-center align-content-center">
                <div className="col-6">
                    <div className="card border-0 my-5">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <h4>Add New Workout</h4>
                                <div className="my-3">
                                    <label htmlFor="title">Exercise Title:</label>
                                    <input type="text" id="title" value={postFormData.title} onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })} className={emptyFields.includes("title") ? "form-control is-invalid" : "form-control"} placeholder="Exercise Title..." />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="load">Load (in kg):</label>
                                    <input type="number" id="load" value={postFormData.load} onChange={(e) => setPostFormData({ ...postFormData, load: e.target.value })} className={emptyFields.includes("load") ? "form-control is-invalid" : "form-control"} placeholder="Load..." />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reps">Reps:</label>
                                    <input type="number" id="reps" value={postFormData.reps} onChange={(e) => setPostFormData({ ...postFormData, reps: e.target.value })} className={emptyFields.includes("reps") ? "form-control is-invalid" : "form-control"} placeholder="Reps..." />
                                </div>

                                <button className="btn btn-primary">Submit</button>
                                {error && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        {error}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateWorkout;
