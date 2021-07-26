import axios from './axios'

// 点赞评论
export const UserLike = (target_id: string, target_type?: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: '/api/comment/user_like',
        data: {
          target_id,
          target_type,
        }
      })
      data.code ? resolve(data.user_like_groups) : resolve([])
    } catch (err) {
      reject(err)
    }
  })
}

// 点赞评论
export const UserLikeGroup = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: '/api/comment/user_like_record_groups',
      })
      data.code ? resolve(data) : resolve({})
    } catch (err) {
      reject(err)
    }
  })
}