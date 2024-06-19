import {
  SearchUsers,
  GetOneUser,
  UpdateUser,
  DeleteUser,
} from "../../../../services/users"
import { AppThunk } from "store"

export const SEARCH_USERS_REQUEST = "SEARCH_USERS_REQUEST"
export const SEARCH_USERS_SUCCESS = "SEARCH_USERS_SUCCESS"
export const SEARCH_USERS_FAILURE = "SEARCH_USERS_FAILURE"

export const GET_USER_REQUEST = "GET_USER_REQUEST"
export const GET_USER_SUCCESS = "GET_USER_SUCCESS"
export const GET_USER_FAILURE = "GET_USER_FAILURE"

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE"

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST"
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS"
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE"

export const USER_RESET = "USER_RESET"

interface SearchUsersRequestAction {
  type: typeof SEARCH_USERS_REQUEST
}

interface SearchUsersSuccessAction {
  type: typeof SEARCH_USERS_SUCCESS
  payload: any
}

interface SearchUsersFailureAction {
  type: typeof SEARCH_USERS_FAILURE
  payload: string
}

interface GetUserRequestAction {
  type: typeof GET_USER_REQUEST
}

interface GetUserSuccessAction {
  type: typeof GET_USER_SUCCESS
  payload: any
}

interface GetUserFailureAction {
  type: typeof GET_USER_FAILURE
  payload: string
}

interface UpdateUserRequestAction {
  type: typeof UPDATE_USER_REQUEST
}

interface UpdateUserSuccessAction {
  type: typeof UPDATE_USER_SUCCESS
  payload: any
}

interface UpdateUserFailureAction {
  type: typeof UPDATE_USER_FAILURE
  payload: string
}

interface DeleteUserRequestAction {
  type: typeof DELETE_USER_REQUEST
}

interface DeleteUserSuccessAction {
  type: typeof DELETE_USER_SUCCESS
  payload: any
}

interface DeleteUserFailureAction {
  type: typeof DELETE_USER_FAILURE
  payload: string
}

interface RsetUserRequestAction {
  type: typeof USER_RESET
}

type UserActionTypes =
  | SearchUsersRequestAction
  | SearchUsersSuccessAction
  | SearchUsersFailureAction
  | GetUserRequestAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
  | DeleteUserRequestAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction
  | RsetUserRequestAction

const searchUsers =
  (data: any): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: SEARCH_USERS_REQUEST })
      const response = await SearchUsers(data)
      dispatch({ type: SEARCH_USERS_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: SEARCH_USERS_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

const getUser =
  (userId: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_USER_REQUEST })
      const response = await GetOneUser(userId)
      dispatch({ type: GET_USER_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: GET_USER_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

const updateUser =
  (data: any, userId: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST })
      const response = await UpdateUser(data, userId)
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: UPDATE_USER_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

const deleteUser =
  (userId: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST })
      const response = await DeleteUser(userId)
      dispatch({ type: DELETE_USER_SUCCESS, payload: response.data })
      return response.data
    } catch (error: any) {
      dispatch({ type: DELETE_USER_FAILURE, payload: error.message })
      throw new Error(error)
    }
  }

const resetUser = () => ({
  type: USER_RESET,
})

export { searchUsers, getUser, updateUser, deleteUser, resetUser }

export type { UserActionTypes }
