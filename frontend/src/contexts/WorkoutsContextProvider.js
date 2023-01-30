import { useReducer, createContext } from "react";

/***************************************
 * create a context for the application
 ***************************************/
export const WorkoutsContext = createContext();

/******************************************************************************
 * create a workout reducer function for managing the state of the application
 ******************************************************************************/
const workoutReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return { workouts: action.payload };

        case "CREATE": {
            return [action.payload, ...state.workouts];
        }
        
        case "DELETE":
            return {
                workouts: state.workouts.filter((workout)=>workout._id !==action.payload._id),
            };

        default:
            return state;
    }
};

/***************************************************
 * create a context provider for handling the state
 ***************************************************/

export const WorkoutsContextProvider = (props) => {
    /*******************************************************************
     * An alternative to useState.

      useReducer is usually preferable to useState when you have complex state logic 
      that involves multiple sub-values. It also lets you optimize performance for  components that trigger deep updates because you can pass dispatch down instead of callbacks.
     */
    const [state, dispatch] = useReducer(workoutReducer, { workouts: null });
    //console.log(state.workouts)

    return <WorkoutsContext.Provider value={{ ...state, dispatch }}>{props.children}</WorkoutsContext.Provider>;
};

