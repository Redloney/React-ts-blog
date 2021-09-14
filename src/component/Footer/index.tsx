import React from 'react'
import './footer.scss'

const Footer = () => {
  return (
    <footer
      className="footer"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-delay={3 * 10}
      data-aos-duration={850}
    >
      <p className="copyright">© RedLoney | 鄂ICP备20004008-1号</p>
      <p className="power">Power by React & Ant Design</p>
    </footer>
  )
}

export default Footer
