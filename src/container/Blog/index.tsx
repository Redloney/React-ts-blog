import React, { useEffect, useState } from 'react'
import './blog.scss'
import { Link } from 'react-router-dom'
import { Skeleton } from 'antd'
import { getArtList } from '../../api/Article'
import dayjs from 'dayjs'
import lodash from 'lodash'
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

  const none = [<Skeleton active />, <Skeleton active />, <Skeleton active />]

  return (
    <div className="blog">
      <TimeLine />
      {/* {!lodash.isEmpty(artList)
        ? artList.map((art: any) => {
            return (
              <article
                key={art._id}
                className="article"
                data-aos="fade-up"
                data-aos-duration="850"
              >
                <div className="doots"></div>
                <Link className="date" to={'/detail/' + art._id}>
                  <span className="trig"></span>
                  <span className="dates">{art.updatedAt}</span>
                </Link>
                <div className="container">
                  <div className="line"></div>
                  <div className="content">
                    <Link to={'/detail/' + art._id} className="title">
                      {art.title}
                    </Link>
                    <div className="cover">
                      <img src={art.cover} alt="art cover" />
                    </div>
                    <p className="desc">{art.desc}</p>
                  </div>
                </div>
              </article>
            )
          })
        : none} */}
    </div>
  )
}

export default Blog
