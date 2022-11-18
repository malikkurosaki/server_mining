import { AppShell, Aside, Burger, Footer, Header, MediaQuery, Navbar, Text, useMantineTheme } from "@mantine/core"
import { AppProps } from "next/app"
import TableKeyword from "../../components/com_data_mining/table_keyword"
import { Keyword, Prisma, PrismaClient } from "@prisma/client"
import { useEffect, useState } from "react"
import DataMiningDefaultLayout from "../../components/com_data_mining/data_mining_default_layout"
import { useStore } from "../../mystore"


interface KEYWORD {
    data: Keyword[]
}

const DataMiningPage = () => {
    return <>
        <DataMiningDefaultLayout >
            <Text>Data mining</Text>
        </DataMiningDefaultLayout>
    </>
}



export default DataMiningPage;
