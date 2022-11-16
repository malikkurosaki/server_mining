import { Navbar, NavbarProps, NavLink, Text } from "@mantine/core";
import { Icon123, IconHome, IconLeaf } from '@tabler/icons'
import Link from "next/link";
import { useRouter } from "next/router";

interface terbuka {
    opened: boolean;
}

export default function LayoutNavbar({ opened }: terbuka) {
    const router = useRouter()

    return <Navbar
        p="md"
        hiddenBreakpoint="sm"
        hidden={!opened}
        width={{ sm: 200, lg: 300 }}
    >
        <NavLink
            label="With icon"
            onClick={() => router.push('/')}
            icon={<IconHome />} />
        <NavLink
            icon={<IconLeaf />}
            label="Train Ai"
            onClick={() => {
                router.push('/train-ai')
            }} />
        <NavLink
            icon={<Icon123 />}
            label="Trained Ai"
            onClick={() => {
                router.push('/train-ai/trained')
            }} />
    </Navbar>
}