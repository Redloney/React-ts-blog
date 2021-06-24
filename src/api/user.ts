import axios from './axios'

export const ValidateUserExist = (validate: {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/user/validate', validate)
      data.code && data.count ? resolve(true) : resolve(false)
    } catch (err) {
      reject(err)
    }
  })
}

export const UserLogin = (userinfo: object) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/user/login', { ...userinfo })
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

export const UserLogout = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/user/logout')
      resolve(data.code)
    } catch (err) {
      reject(err)
    }
  })
}

// 腾讯地图api
export const GetUserAddress = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios({
        url: '/map',
        method: "GET",
        params: {
          key: 'S6SBZ-I7LWR-JVPWP-W7SJK-OWEDT-GFBJS'
        }
      })
      data ? resolve(data) : resolve({})
    } catch (err) {
      reject(err)
    }
  })
}