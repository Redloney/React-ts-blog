import axios from './axios'

// 获取评论
export const GetComments = (page: number = 0, size: number = 15, sorter: string = 'createdAt_descend', obj = {}) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: '/api/comment/list',
        params: { page, size, sorter, ...obj }
      })
      console.log(data)
      data.code && data.count >= 1 ? resolve(data) : resolve([])
    } catch (err) {
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
      data && data.code ? resolve(data) : resolve([])
    } catch (err) {
      resolve([])
    }
  })
}
// 添加评论
export const ThumbComment = (id: string | undefined, fId: string, isThumb: boolean) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: '/api/comment/thumb',
        data: { id, fId, isThumb }
      })
      // data && data.code ? resolve(data) : resolve([])
      resolve(data)
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