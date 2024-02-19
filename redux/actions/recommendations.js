import { CreateRecommendation, GetOneRecommendation, DeleteRecommendation } from '../../../../services/recommendations'

const createRecommendation = (data) => async (dispatch) => {
  try {
    dispatch({type: 'CREATE_RECOMMENDATION_REQUEST'})
    const response = await CreateRecommendation(data)
    dispatch({type: 'CREATE_RECOMMENDATION_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'CREATE_RECOMMENDATION_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const getRecommendation = (recommendationId) => async (dispatch) => {
  try {
    dispatch({type: 'GET_RECOMMENDATION_REQUEST'})
    const response = await GetOneRecommendation(recommendationId)
    dispatch({type: 'GET_RECOMMENDATION_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'GET_RECOMMENDATION_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const deleteRecommendation = (recommendationId) => async (dispatch) => {
  try {
    dispatch({type: 'DELETE_RECOMMENDATION_REQUEST'})
    const response = await DeleteRecommendation(recommendationId)
    dispatch({type: 'DELETE_RECOMMENDATION_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'DELETE_RECOMMENDATION_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const resetRecommendation = () => ({
  type: "RECOMMENDATION_RESET",
});

export { createRecommendation, getRecommendation, deleteRecommendation, resetRecommendation }