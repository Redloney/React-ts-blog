import React, { useEffect, useState } from 'react'
import './blog.scss'
import { Skeleton } from 'antd'
import { getArtList } from '../../api/Article'
import dayjs from 'dayjs'
import TimeLine from '../../component/TimeLine'

const Blog = () => {
  const [artList, setArtList] = useState([])

  const syncArtList = async () => {
    const list: any = await getArtList()
    list.forEach((el: any) => {
      el.updatedAt = dayjs(el.updatedAt).format('YYYY-MM-DD')
    })
    setArtList(list)
  }

  useEffect(() => {
    // syncArtList()
  }, [])

  const none = [<Skeleton active />, <Skeleton active />, <Skeleton active />]

  return (
    <div className="blog">
      <TimeLine />
    </div>
  )
}

export default Blog
