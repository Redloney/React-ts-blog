import axios from './axios'

type Avatar = {
  code: Number,
  Height: Number,
  imgUrl: String,
  width: Number
}

// 获取随机头像
export const GetRandomAvatar = (gender: string | undefined, type?: string): Promise<Avatar | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const mail = [
        // a1（男头）
        "a1",
        // c3（动漫男头）
        "c3",
      ]
      const femail = [
        // b1（女头）
        "b1",
        // c2（动漫女头）
        "c2",
      ]
      let key = Math.floor((Math.random() * 2) + 1);
      let lx = gender === 'male' ? mail[key] : femail[key]
      const { data } = await axios({
        method: "GET",
        url: '/avatar',
        params: {
          lx,
          format: 'json'
        }
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
      const { data } = await axios.post('/api/user/validate', validate)
      data.code && data.count ? resolve(true) : resolve(false)
    } catch (err) {
      reject(err)
    }
  })
}
// 用户登录
export const UserLogin = (userinfo: object): Promise<{ code: Number, token: String, msg: String, warn: String }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/user/login', { ...userinfo })
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
      const { data } = await axios.post('/api/user/auth')
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
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

type address = {
  message: String,
  result: {
    ad_info: {
      adcode: Number
      city: String
      district: String
      nation: String
      province: String
    },
    ip: String,
    location: {
      lat: Number,
      lng: Number
    }
  },
  status: Number
}

// 腾讯地图api
export const GetUserAddress = (): Promise<address | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await axios({
        url: '/map',
        method: "GET",
        params: {
          key: 'S6SBZ-I7LWR-JVPWP-W7SJK-OWEDT-GFBJS'
        }
      })
      data ? resolve(data) : resolve(null)
    } catch (err) {
      reject(err)
    }
  })
}
