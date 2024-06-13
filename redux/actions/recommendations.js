import {
  CreateRecommendation,
  GetOneRecommendation,
  DeleteRecommendation,
} from "../../../../services/recommendations"

const createRecommendation = (data) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_RECOMMENDATION_REQUEST" })
    const response = await CreateRecommendation(data)
    dispatch({ type: "CREATE_RECOMMENDATION_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "CREATE_RECOMMENDATION_FAILURE", payload: error.message })
    throw new Error(error)
  }
}

const getRecommendation = (recommendationId, userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_RECOMMENDATION_REQUEST" })
    const response = await GetOneRecommendation(recommendationId, userId)
    dispatch({ type: "GET_RECOMMENDATION_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "GET_RECOMMENDATION_FAILURE", payload: error.message })
    throw new Error(error)
  }
}

const deleteRecommendation = (recommendationId, userId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_RECOMMENDATION_REQUEST" })
    const response = await DeleteRecommendation(recommendationId, userId)
    dispatch({ type: "DELETE_RECOMMENDATION_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "DELETE_RECOMMENDATION_FAILURE", payload: error.message })
    throw new Error(error)
  }
}

const resetRecommendation = () => ({
  type: "RECOMMENDATION_RESET",
})

export {
  createRecommendation,
  getRecommendation,
  deleteRecommendation,
  resetRecommendation,
}
