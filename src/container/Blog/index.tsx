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
    syncArtList()
  }, [])

  const none = (
    <div className="skeleton">
      <div data-aos="fade-up" data-aos-duration="850">
        <Skeleton avatar active />
      </div>
      <div data-aos="fade-up" data-aos-duration="850" data-aos-delay="100">
        <Skeleton avatar active />
      </div>
      <div data-aos="fade-up" data-aos-duration="850" data-aos-delay="200">
        <Skeleton avatar active />
      </div>
    </div>
  )

  return (
    <div className="blog">
      {artList.length > 0 ? <TimeLine arts={artList} /> : none}
    </div>
  )
}

export default Blog
