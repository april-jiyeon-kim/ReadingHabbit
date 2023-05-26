import { firebaseReducer } from "react-redux-firebase";
import bookReducer from "./bookReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
