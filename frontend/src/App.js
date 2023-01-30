import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import Navbar from "./components/partials/Navbar";
import CreateWorkout from "./components/workouts/CreateWorkout";
import UpdateWork from "./components/workouts/UpdateWork";
import { AuthContext } from "./contexts/AuthContextProvider";

function App() {
    const { user } = useContext(AuthContext);
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/create" element={user ? <CreateWorkout /> : <Navigate to="/login" />} />
                    <Route path="/:id/update" element={user ? <UpdateWork /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
