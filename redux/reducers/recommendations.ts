import {
  CREATE_RECOMMENDATION_REQUEST,
  CREATE_RECOMMENDATION_SUCCESS,
  CREATE_RECOMMENDATION_FAILURE,
  GET_RECOMMENDATION_REQUEST,
  GET_RECOMMENDATION_SUCCESS,
  GET_RECOMMENDATION_FAILURE,
  DELETE_RECOMMENDATION_REQUEST,
  DELETE_RECOMMENDATION_SUCCESS,
  DELETE_RECOMMENDATION_FAILURE,
  RECOMMENDATION_RESET,
  RecommendationActionTypes,
} from "../actions/recommendations"

interface RecommendationState {
  data: any
  loading: boolean
  error: string | null
}

const initialState: RecommendationState = {
  data: {},
  loading: false,
  error: null,
}

const createRecommendationReducer = (
  state = initialState,
  action: RecommendationActionTypes,
): RecommendationState => {
  switch (action.type) {
    case CREATE_RECOMMENDATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case CREATE_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case CREATE_RECOMMENDATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case RECOMMENDATION_RESET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const oneRecommendationReducer = (
  state = initialState,
  action: RecommendationActionTypes,
): RecommendationState => {
  switch (action.type) {
    case GET_RECOMMENDATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case GET_RECOMMENDATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case RECOMMENDATION_RESET:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const deleteRecommendationReducer = (
  state = initialState,
  action: RecommendationActionTypes,
): RecommendationState => {
  switch (action.type) {
    case DELETE_RECOMMENDATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case DELETE_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case DELETE_RECOMMENDATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    default:
      return state
  }
}

export {
  createRecommendationReducer,
  oneRecommendationReducer,
  deleteRecommendationReducer,
}
