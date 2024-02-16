import {
  searchUsersReducer,
  oneUserReducer,
  updateUserReducer,
  deleteUserReducer
} from './reducers/users'

const userReducers = {
  searchUsers: searchUsersReducer,
  oneUser: oneUserReducer,
  updateUser: updateUserReducer,
  deleteUser: deleteUserReducer
}

export { userReducers }