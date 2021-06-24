import axios from './axios'

export const GetComments = (page: number = 0, size: number = 15, sorter: string = 'createdAt_descend', obj = {}) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: '/api/comments',
        params: {
          page, size, sorter, ...obj
        }
      })
      console.log(data)
      // data.code && data.count ? resolve(data.comments) : resolve([])
    } catch (err) {
      console.log(err)
      resolve([])
    }
  })
}