import type { NextPage } from 'next'
import { useEffect } from 'react'
import LayoutHome from '../components/layout/home/layout_home'
import LayoutDefault from '../components/layout/layout_default'
import io from "socket.io-client";

const Home: NextPage = () => {

  return (
    <LayoutDefault >
      <LayoutHome />
    </LayoutDefault>
  )
}

export default Home
