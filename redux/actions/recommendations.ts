import {
  CreateRecommendation,
  GetOneRecommendation,
  DeleteRecommendation,
} from "../../../../services/recommendations"
import { AppThunk } from "store"

export const CREATE_RECOMMENDATION_REQUEST = "CREATE_RECOMMENDATION_REQUEST"
export const CREATE_RECOMMENDATION_SUCCESS = "CREATE_RECOMMENDATION_SUCCESS"
export const CREATE_RECOMMENDATION_FAILURE = "CREATE_RECOMMENDATION_FAILURE"

export const GET_RECOMMENDATION_REQUEST = "GET_RECOMMENDATION_REQUEST"
export const GET_RECOMMENDATION_SUCCESS = "GET_RECOMMENDATION_SUCCESS"
export const GET_RECOMMENDATION_FAILURE = "GET_RECOMMENDATION_FAILURE"

export const DELETE_RECOMMENDATION_REQUEST = "DELETE_RECOMMENDATION_REQUEST"
export const DELETE_RECOMMENDATION_SUCCESS = "DELETE_RECOMMENDATION_SUCCESS"
export const DELETE_RECOMMENDATION_FAILURE = "DELETE_RECOMMENDATION_FAILURE"

export const RECOMMENDATION_RESET = "RECOMMENDATION_RESET"

interface CreateRecommendationRequestAction {
  type: typeof CREATE_RECOMMENDATION_REQUEST
}

interface CreateRecommendationSuccessAction {
  type: typeof CREATE_RECOMMENDATION_SUCCESS
  payload: any
}

interface CreateRecommendationFailureAction {
  type: typeof CREATE_RECOMMENDATION_FAILURE
  payload: string
}

interface GetRecommendationRequestAction {
  type: typeof GET_RECOMMENDATION_REQUEST
}

interface GetRecommendationSuccessAction {
  type: typeof GET_RECOMMENDATION_SUCCESS
  payload: any
}

interface GetRecommendationFailureAction {
  type: typeof GET_RECOMMENDATION_FAILURE
  payload: string
}

interface DeleteRecommendationRequestAction {
  type: typeof DELETE_RECOMMENDATION_REQUEST
}

interface DeleteRecommendationSuccessAction {
  type: typeof DELETE_RECOMMENDATION_SUCCESS
  payload: any
}

interface DeleteRecommendationFailureAction {
  type: typeof DELETE_RECOMMENDATION_FAILURE
  payload: string
}

interface RecommendationResetAction {
  type: typeof RECOMMENDATION_RESET
}

type RecommendationActionTypes =
  | CreateRecommendationRequestAction
  | CreateRecommendationSuccessAction
  | CreateRecommendationFailureAction
  | GetRecommendationRequestAction
  | GetRecommendationSuccessAction
  | GetRecommendationFailureAction
  | DeleteRecommendationRequestAction
  | DeleteRecommendationSuccessAction
  | DeleteRecommendationFailureAction
  | RecommendationResetAction

const createRecommendation =
  (data: any): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_RECOMMENDATION_REQUEST })
      const response = await CreateRecommendation(data)
      dispatch({
        type: CREATE_RECOMMENDATION_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: CREATE_RECOMMENDATION_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const getRecommendation =
  (recommendationId: string, userId: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_RECOMMENDATION_REQUEST })
      const response = await GetOneRecommendation(recommendationId, userId)
      dispatch({
        type: GET_RECOMMENDATION_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: GET_RECOMMENDATION_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const deleteRecommendation =
  (recommendationId: string, userId: string): AppThunk<Promise<any>> =>
  async (dispatch) => {
    try {
      dispatch({ type: DELETE_RECOMMENDATION_REQUEST })
      const response = await DeleteRecommendation(recommendationId, userId)
      dispatch({
        type: DELETE_RECOMMENDATION_SUCCESS,
        payload: response.data,
      })
      return response.data
    } catch (error: any) {
      dispatch({
        type: DELETE_RECOMMENDATION_FAILURE,
        payload: error.message,
      })
      throw new Error(error)
    }
  }

const resetRecommendation = (): RecommendationResetAction => ({
  type: RECOMMENDATION_RESET,
})

export {
  createRecommendation,
  getRecommendation,
  deleteRecommendation,
  resetRecommendation,
}

export type { RecommendationActionTypes }
