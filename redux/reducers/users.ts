import {
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  USER_RESET,
  UserActionTypes,
} from "../actions/users"

interface UserState {
  data: any
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  data: {},
  loading: false,
  error: null,
}

const searchUsersReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case SEARCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case SEARCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case USER_RESET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const oneUserReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case USER_RESET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const updateUserReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case USER_RESET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const deleteUserReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export {
  searchUsersReducer,
  oneUserReducer,
  updateUserReducer,
  deleteUserReducer,
}
