import { Comment } from '../types'
import axios from './axios'

// 获取评论
export const GetComments = (page: number = 0, size: number = 15, sorter: string = 'createdAt_descend', obj = {}) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: '/api/comments',
        params: { page, size, sorter, ...obj }
      })
      data.code && data.count >= 1 ? resolve(data) : resolve([])
    } catch (err) {
      console.log(err)
      resolve([])
    }
  })
}

// 添加评论
export const InsertComment = ({ content, replyId }: any) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: '/api/comment/insert',
        data: { content, replyId }
      })
      console.log(data)
      data && data.code ? resolve(data) : resolve([])
    } catch (err) {
      console.log(err)
      resolve([])
    }
  })
}


// 删除评论
export const deleteComment = (uId: string, _id: string, fId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/comment/delete', { uId, _id, fId })
      data.code ? resolve(true) : resolve(false)
    } catch (err) {
      reject(err)
    }
  })
}