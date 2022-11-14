import {
  AppShell,
  useMantineTheme
} from '@mantine/core';
import { PropsWithChildren, useState } from 'react';
import LayoutFooter from './layout_footer';
import LayoutHeader from './layout_header';
import LayoutNavbar from './layout_navbar';

export default function LayoutDefault({ children }: PropsWithChildren) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<LayoutNavbar opened={opened} />
        // <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        //   <Text>Application navbar</Text>
        // </Navbar>
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      // footer={<LayoutFooter />}
      header={<LayoutHeader opened={opened} setOpened={setOpened} theme={theme} />
        // <Header height={{ base: 50, md: 70 }} p="md">
        //   <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        //     <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        //       <Burger
        //         opened={opened}
        //         onClick={() => setOpened((o) => !o)}
        //         size="sm"
        //         color={theme.colors.gray[6]}
        //         mr="xl"
        //       />
        //     </MediaQuery>

        //     <Text>Application header</Text>
        //   </div>
        // </Header>
      }
    >
      {children}
    </AppShell>
  );
}