import { Keyword, PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";
import DataMiningDefaultLayout from "../../components/com_data_mining/data_mining_default_layout";
import TableKeyword from "../../components/com_data_mining/table_keyword";
import { useStore } from "../../mystore";

interface KEYWORD {
    data: Keyword
}

const Keyword = ({ data }: KEYWORD) => {
    const dataKeyword = useStore("keyWord");

    useEffect(() => {
        dataKeyword.set(data)
    }, [])

    return <>
        <DataMiningDefaultLayout>
            <TableKeyword />
        </DataMiningDefaultLayout>
    </>
}

export async function getServerSideProps() {
    const data = await new PrismaClient().keyword.findMany({
        orderBy: {
            idx: "asc"
        },
        select: {
            id: true,
            name: true
        }
    })
    // const data = JSON.stringify(res)
    return {
        props: { data },
    }
}

export default Keyword;

