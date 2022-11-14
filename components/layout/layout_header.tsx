import { Burger, Header, MantineTheme, MediaQuery, Text } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface pelengkap {
    opened: boolean,
    theme: MantineTheme
    setOpened: Dispatch<SetStateAction<boolean>>
}

export default function LayoutHeader({opened, theme, setOpened}: pelengkap) {
    return <Header height={{ base: 50, md: 70 }} p="md">
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

            <Text>Data Maining Server</Text>
        </div>
    </Header>
}