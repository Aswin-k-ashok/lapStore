// import axios from 'axios'
// import { SHOW_REFERRAL_CODE } from '../constants/referralIdConstants'
// export const showReferralCode = () => async (dispatch, getState) => {
//   const {
//     userLogin: { userInfo },
//   } = getState()

//   const config = {
//     headers: {
//       Authorization: `Bearer ${userInfo.token}`,
//     },
//   }

//   const { data } = await axios.get(`/api/referral`, config)
//   dispatch({
//     type: SHOW_REFERRAL_CODE,
//     payload: data,
//   })
// }
