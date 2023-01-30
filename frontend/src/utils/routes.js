import Home from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { Register } from "../components/pages/Register";
import CreateWorkout from "../components/workouts/CreateWorkout";
import UpdateWork from "../components/workouts/UpdateWork";

const routes = [
    {
        path: "/",
        component: <Home />,
    },
    {
        path: "/create",
        component: <CreateWorkout />,
    },
    {
        path: "/:id/update",
        component: <UpdateWork />,
    },
    {
        path: "/login",
        component: <Login />,
    },
    {
        path: "/register",
        component: <Register />,
    },
];

export default routes;
