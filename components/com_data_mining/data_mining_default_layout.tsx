import { AppShell, Burger, Container, Header, MediaQuery, Navbar, NavLink, Text, useMantineTheme } from "@mantine/core";
import { Keyword } from "@prisma/client";
import { AppProps } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useRouter } from "next/router";
import { HTMLAttributes, HtmlHTMLAttributes, useState } from "react";

interface KEYWORD {
    data: Keyword[]
}

export default function DataMiningDefaultLayout({ children, ...props }: HtmlHTMLAttributes<HTMLUListElement>) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const route = useRouter()
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <NavLink label="Keyword" onClick={() => route.push('/data-mining/keyword')} >

                    </NavLink>
                </Navbar>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Text>Application header</Text>
                    </div>
                </Header>
            }
        >
            <Container>
                {children}
            </Container>
        </AppShell>
    );
}