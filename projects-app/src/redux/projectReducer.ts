import { ProjectType } from './../types/types';
import { InferActionsType, BasicThunkType } from "./redux-store"

const initState = {}

const projectReducer = (state = initState, action: ActionsType) => {
  switch (action.type) {
    case 'PRJAPP/PRJ/CREATE_PROJECT_SUCCESS':
      return { ...state }
    case 'PRJAPP/PRJ/CREATE_PROJECT_SUCCESS':
      return { ...state }
    default:
      return { ...state }
  }
}

export const actions = {
  createProjectSuccess: () => ({ type: "PRJAPP/PRJ/CREATE_PROJECT_SUCCESS" } as const),
  createProjectError: (err: string) => ({ type: "PRJAPP/PRJ/CREATE_PROJECT_SUCCESS", err } as const)
}

export const createProject = (title: string, content: string) => (dispatch: any, getState: any, getFirestore: any) => {
  // make async call to database

  const firestore = getFirestore()
  const profile = getState().firebase.profile
  const authorId = getState().firebase.auth.uid

  firestore.collection('projects').add({
    title: title,
    content: content,
    authorId: authorId,
    authorName: profile.authorName,
    createdAt: new Date()
  }).then(() => {
    dispatch(actions.createProjectSuccess())
  }).catch((err: string) => {
    dispatch(actions.createProjectError(err))
  })
}

type ActionsType = InferActionsType<typeof actions>
type ThunkType = BasicThunkType<ActionsType | any>

export default projectReducer