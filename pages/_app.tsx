import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  
  useEffect(() => {
    // const socket = io({ path: "/api/socket/io" });
    // socket.on("connect", async () => {
    //   console.log("connected")
    // });

    // socket.on("disconnect", () => {
    //   console.log("disconnect")
    // });

    // socket.on('progress', data => console.log(data))

    // return () => {
    //   socket.disconnect();
    // };

   
  }, []);

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