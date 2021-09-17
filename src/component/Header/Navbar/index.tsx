import React from 'react'

import { NavLink } from 'react-router-dom'

import './index.scss'

interface State {}
interface Props {
  active: number
  links: Array<linkTypes>
}

interface linkTypes {
  title: string
  path: string
}

export default class NavBar extends React.Component<Props, State> {
  render() {
    const { links } = this.props
    return (
      <nav className="nav">
        {links.map(({ title, path }, index) => {
          return (
            <NavLink
              key={index}
              className="nav-link"
              activeClassName="active"
              to={path}
            >
              {title}
            </NavLink>
          )
        })}
      </nav>
    )
  }
}

// const Navbar = (Props: Props) => {
//   const { links } = Props
//   const match = useRouteMatch()
//   console.log(match)
//   useEffect(() => {
//     console.log(match)
//   }, [])
//   return (
//     <nav className="nav">
//       {links.map(({ title, path }, index) => {
//         return (
//           <NavLink
//             key={index}
//             className="nav-link"
//             activeClassName="active"
//             to={path}
//           >
//             {title}
//           </NavLink>
//         )
//       })}
//     </nav>
//   )
// }

// export default Navbar
