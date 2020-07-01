import { BasicThunkType, InferActionsType } from './redux-store';

const initState = {
  loginErr: null as string | null,
  singupErr: null as string | null,
  isFetching: true,
  err: null as string | null
}

const authReducer = (state = initState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "PRJAPP/AUTH/LOGIN_SUCCESS":
      return { ...state, loginErr: '' }
    case "PRJAPP/AUTH/LOGIN_ERROR":
      return { ...state, loginErr: action.err }
    case "PRJAPP/AUTH/SING_UP_ERROR":
      return { ...state, singupErr: action.err }
    case "PRJAPP/AUTH/SING_UP_SUCCESS":
      return { ...state, singupErr: '' }
    case "PRJAPP/AUTH/LOGOUT_SUCCESS":
      return { ...state }
    case "PRJAPP/AUTH/TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching }
    default:
      return state

  }
}

export const actions = {
  loginSuccess: () => ({ type: "PRJAPP/AUTH/LOGIN_SUCCESS" } as const),
  loginError: (err: string | null) => ({ type: "PRJAPP/AUTH/LOGIN_ERROR", err } as const),
  singUpSuccess: () => ({ type: "PRJAPP/AUTH/SING_UP_SUCCESS" } as const),
  singUpError: (err: string | null) => ({ type: "PRJAPP/AUTH/SING_UP_ERROR", err } as const),
  logoutSuccess: (err: string | null) => ({ type: "PRJAPP/AUTH/LOGOUT_SUCCESS", err } as const),
  toggleFetching: (isFetching: boolean) => ({ type: 'PRJAPP/AUTH/TOGGLE_IS_FETCHING', isFetching } as const)
}

// todo: fix any
export const signIn = (email: string,
  password: string) => (dispatch: any,  getFirebase: any ) => {

    const firebase = getFirebase()
    dispatch(actions.toggleFetching(true))
    firebase.auth().signInWithEmailAndPassword(
      email,
      password
    ).then(() => {
      dispatch(actions.loginSuccess())
      dispatch(actions.toggleFetching(false))
    }).catch((error: string) => {
      dispatch(actions.loginError(error))
      dispatch(actions.toggleFetching(false))
    })

  }

export const signOut = () => (dispatch: any,  getFirebase: any ) => {

  const firebase = getFirebase()

  dispatch(actions.toggleFetching(true))
  firebase.auth().signOut().then(() => {
    dispatch(actions.logoutSuccess(null))
    dispatch(actions.toggleFetching(false))
  })

}

export const signUp = (newUser: any) => (dispatch: any,  getFirebase: any, getFirestore: any ) => {

  const firebase = getFirebase()
  const firestore = getFirestore()

  firebase.auth().createUserWithEmailAndPassword(newUser.email,
    newUser.password).then((res: any) => {
      return firestore.collection('users').doc(res.user.uid).set({
        authorName: newUser.authorName,
        email: newUser.email,
        password: newUser.password,
        initials: newUser.authorName[0] // todo: may be in UI
      })
    }
    ).then(() => {
      dispatch(actions.singUpSuccess())
      dispatch(actions.toggleFetching(false))
    }).catch((error: string) => {
      dispatch(actions.singUpError(error))
      dispatch(actions.toggleFetching(false))

    })

}

type InitialStateType = typeof initState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BasicThunkType<ActionsType | any>

export default authReducer;