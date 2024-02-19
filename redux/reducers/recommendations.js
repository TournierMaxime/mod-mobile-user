const initialState = {
  data: {},
  loading: false,
  error: null,
}

const createRecommendationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_RECOMMENDATION_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'CREATE_RECOMMENDATION_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'CREATE_RECOMMENDATION_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RECOMMENDATION_RESET':
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const oneRecommendationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RECOMMENDATION_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'GET_RECOMMENDATION_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'GET_RECOMMENDATION_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {},
      }
    case 'RECOMMENDATION_RESET':
      return {
        ...initialState,
      }
    default:
      return state
  }
}

const deleteRecommendationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_RECOMMENDATION_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      }
    case 'DELETE_RECOMMENDATION_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case 'DELETE_RECOMMENDATION_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: {}
      }
    default:
      return state
  }
}

export { createRecommendationReducer, oneRecommendationReducer, deleteRecommendationReducer }
