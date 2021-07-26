import axios from './axios'
import { UserLikeGroup } from './LikeRecord'

// 获取评论 未被删除
export const GetComments = (
  page: number = 0,
  size: number = 15,
  sorter: string = 'createdAt_descend',
  obj = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {

      // 获取用户点赞列表
      const { user_like_groups } = await UserLikeGroup() as any

      const { data } = await axios({
        method: 'GET',
        url: '/api/comment/list',
        params: { page, size, sorter, ...obj },
      })

      let comments: Array<any> = []

      if (user_like_groups[0]) {
        for (const comm of data.comments) {
          for (const like of user_like_groups) {
            if (comm._id == like._id.target_id) {
              comments.push({
                ...comm,
                like_number: like.likeTotal
              })
            }
          }
        }
        resolve({ ...data, comments })
        return
      }
      resolve(data || {})
    } catch (err) {
      reject([])
    }
  })
}

// 添加评论
export const InsertComment = ({ content, replyId }: { content: string, replyId: string }) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/api/comment/insert',
        data: { content, replyId },
      })
      data && data.code ? resolve(data) : resolve([])
    } catch (err) {
      resolve([])
    }
  })
}

// 删除评论
export const DeleteComment = (fId: string, id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/comment/delete', { fId, id })
      data.code ? resolve(true) : resolve(false)
    } catch (err) {
      reject(err)
    }
  })
}
