import {
  searchUsersReducer,
  oneUserReducer,
  updateUserReducer,
  deleteUserReducer
} from './reducers/users'
import {
  createRecommendationReducer,
  oneRecommendationReducer,
  deleteRecommendationReducer
} from './reducers/recommendations'

const userReducers = {
  searchUsers: searchUsersReducer,
  oneUser: oneUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer
}

const recommendationReducers = {
  createRecommendation: createRecommendationReducer,
  oneRecommendation: oneRecommendationReducer,
  deleteRecommendation: deleteRecommendationReducer
}

export { userReducers, recommendationReducers }