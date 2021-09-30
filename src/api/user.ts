import axios from './axios'

// 获取随机头像
export const GetRandomAvatar = (gender: string | undefined) => {
  return new Promise(async (resolve, reject) => {
    try {
      let lx = gender === 'male' ? 'a1' : 'b1'
      const { data } = await axios({
        method: 'GET',
        url: '/avatar',
        params: {
          lx,
          format: 'json',
        },
      })
      data.code ? resolve(data) : resolve(null)
    } catch (err) {
      reject(err)
    }
  })
}
// 验证用户存在
export const ValidateUserExist = (validate: {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/User/validate', validate)
      data.code && data.count ? resolve(true) : resolve(false)
    } catch (err) {
      reject(err)
    }
  })
}
// 用户登录
export const UserLogin = (
  userinfo: object
): Promise<{ code: Number; token: String; msg: String; warn: String }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/User/login', { ...userinfo })
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}
// 获取授权
export const UserAuthentication = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/User/auth')
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
      const { data } = await axios.post('/api/User/logout')
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

type address = {
  message: String
  result: {
    ad_info: {
      adcode: Number
      city: String
      district: String
      nation: String
      province: String
    }
    ip: String
    location: {
      lat: Number
      lng: Number
    }
  }
  status: Number
}

// 腾讯地图api
export const GetUserAddress = (): Promise<address | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios({
        url: '/map',
        method: 'GET',
        params: {
          key: 'S6SBZ-I7LWR-JVPWP-W7SJK-OWEDT-GFBJS',
        },
      })
      data ? resolve(data) : resolve(null)
    } catch (err) {
      reject(err)
    }
  })
}
