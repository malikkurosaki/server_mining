import type { NextPage } from 'next'
import { useEffect } from 'react'
import LayoutHome from '../components/layout/home/layout_home'
import LayoutDefault from '../components/layout/layout_default'
import io from "socket.io-client";
import PageLanding from '../components/landing/page_landing';
import { Center, Container, Flex } from '@mantine/core';

const Home: NextPage = () => {

  return <>
    <Container sx={{ height: 100 + "vh" }}>
      <Flex sx={{ height: 100 + "vh" }} justify={"center"} align={"center"}>
        <PageLanding />
      </Flex>
    </Container>
  </>
}

export default Home
