import axios from './axios'

// 
export const GetRandomAvatar = (gender: string | undefined) => {
  return new Promise(async (resolve, reject) => {
    try {
      let lx = gender === 'male' ? 'a1' : 'b1'
      const { data } = await axios({
        method: "GET",
        url: '/avatar',
        params: {
          lx,
          format: 'json'
        }
      })
      data.code ? resolve(data) : resolve({})
    } catch (err) {
      reject(err)
    }
  })
}
// 验证用户存在
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
// 用户登录
export const UserLogin = (userinfo: object) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(userinfo)
      const { data } = await axios.post('/api/user/login', { ...userinfo })
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}
// 用户注销
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