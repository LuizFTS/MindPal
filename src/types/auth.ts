import { Dispatch } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  signIn: any,
  authState: AuthReducerState,
  dispatch: Dispatch<AuthActions>
}

export interface SignInData {
  email: string,
  password: string
}

export interface SignInResponse {
  token: string,
  _id: string
}

// useReducer types
export enum AuthActionsKind {
  SHOWSIGNINMODAL = 'SHOWSIGNINMODAL',
  SHOWSIGNUPMODAL = 'SHOWSIGNUPMODAL',
  HIDESIGNUPMODAL = 'HIDESIGNUPMODAL',
  HIDESIGNINMODAL = 'HIDESIGNINMODAL',
  CHANGEMODAL = 'CHANGEMODAL',
  SIGNIN = 'SIGNIN',
  SIGNOUT = 'SIGNOUT'
}
export interface AuthActions {
  type: AuthActionsKind,
  payload?: UserState | null
}

export interface AuthReducerState {
  signInModal: boolean,
  signUpModal: boolean
  user: UserState | null
}

export interface UserState {
  createdAt: string,
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  updatedAt: string,
  __v: number,
  _id: string
}