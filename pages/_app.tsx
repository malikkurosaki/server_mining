import { MantineProvider } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  
  useEffect(() => {
    const socket = io({ path: '/api/socket' });
    socket.on("connect", () => {
        console.log('socket train ai nconnected')
    })
    socket.on('progress-finish', data => {
        console.log("finish")
    })
}, [])

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}