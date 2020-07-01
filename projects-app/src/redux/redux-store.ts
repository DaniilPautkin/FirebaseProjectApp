import { firebaseReducer, getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { firestoreReducer, getFirestore, reduxFirestore } from 'redux-firestore';
import thunk, { ThunkAction } from 'redux-thunk';
import authReducer from './authReducer';
import fbConfig from '../config/fbConfig';
import './index.css';
import projectReducer from './projectReducer';

export type Nullable<T> = T | null

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fbConfig, { userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true }), // redux binding for firebase
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);


export type AppStateType = ReturnType<typeof rootReducer>
export type BasicThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export default rootReducer

// the key name will be the data property on the state object