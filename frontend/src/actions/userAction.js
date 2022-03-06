import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_BLOCK_REQUEST,
  USER_BLOCK_SUCCESS,
  USER_BLOCK_FAIL,
  USER_LIST_ADDRESS,
  USER_ADD_ADDRESS,
  SHOW_REFERRAL_CODE,
  SHOW_WALLET_BALANCE,
  DEDUCT_FROM_WALLET,
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post('/api/users/login', {
      email,
      password,
      config,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
}

export const register =
  (name, email, password, phone, referralId) => async (dispatch, getState) => {
    let token
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post('/api/users', {
        name,
        email,
        password,
        phone,
        config,
      })
      token = data.token
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })

      const configB = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      await axios.post('/api/users/referral', { referralId }, configB)
      if (referralId.length > 0) {
        await axios.put('/api/users/referral', { referralId }, configB)
      }

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/users', config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const blockUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_BLOCK_REQUEST,
    })
    const {
      userLogin: { userInfo },
      id = user,
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/api/users/${id}`, config)
    dispatch({
      type: USER_BLOCK_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_BLOCK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAddress = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState()
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  const { data } = await axios.get(`/api/address/${userInfo._id}`, config)
  dispatch({
    type: USER_LIST_ADDRESS,
    payload: data,
  })
}

export const addToAddresses = (address) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  await axios.put(`/api/address/${userInfo._id}`, address, config)
  dispatch({
    type: USER_ADD_ADDRESS,
  })
}

export const showReferralCode = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  const { data } = await axios.get(`/api/users/referral`, config)
  dispatch({
    type: SHOW_REFERRAL_CODE,
    payload: data,
  })
}

export const showWalletBalance = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  const { data } = await axios.get(`/api/users/wallet`, config)
  dispatch({
    type: SHOW_WALLET_BALANCE,
    payload: data,
  })
}

export const deductFromWallet = (amount) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  const { data } = await axios.put(`/api/users/wallet/${amount}`, {}, config)
  dispatch({
    type: DEDUCT_FROM_WALLET,
    payload: data,
  })
}

// export const getUserCount = () => async (dispatch, getState) => {
//   const {
//     userLogin: { userInfo },
//   } = getState()

//   const config ={
//     headers:{
//       Authorization: `Bearer ${userInfo.token}`,
//     },
//   }

//   await axios.get('/api/users/userCount',config)({
//     dispatch({

//     })
//   })

// }
