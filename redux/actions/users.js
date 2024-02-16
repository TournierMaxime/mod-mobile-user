import { SearchUsers, GetOneUser, UpdateUser, DeleteUser } from '../../../../services/users'

const searchUsers = (data) => async (dispatch) => {
  try {
    dispatch({type: 'SEARCH_USERS_REQUEST'})
    const response = await SearchUsers(data)
    dispatch({type: 'SEARCH_USERS_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'SEARCH_USERS_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const getUser = (userId) => async (dispatch) => {
  try {
    dispatch({type: 'GET_USER_REQUEST'})
    const response = await GetOneUser(userId)
    dispatch({type: 'GET_USER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'GET_USER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const updateUser = (data, userId) => async (dispatch) => {
  try {
    dispatch({type: 'UPDATE_USER_REQUEST'})
    const response = await UpdateUser(data, userId)
    dispatch({type: 'UPDATE_USER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'UPDATE_USER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({type: 'DELETE_USER_REQUEST'})
    const response = await DeleteUser(userId)
    dispatch({type: 'DELETE_USER_SUCCESS', payload: response.data});
    return response.data
  } catch (error) {
    dispatch({type: 'DELETE_USER_FAILURE', payload: error.message});
    console.log(error)
    throw error
  }
};

const resetUser = () => ({
  type: "USER_RESET",
});

export { searchUsers, getUser, updateUser, deleteUser, resetUser }