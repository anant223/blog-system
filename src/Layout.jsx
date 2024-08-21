import {Header, Footer} from "./components/index"
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header/>
        <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout
