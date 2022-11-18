import { Button, Card, Center, Grid, Group, Input, Table, Text, TextInput, Title } from "@mantine/core";
import { Keyword } from "@prisma/client";
import { useEffect, useState } from "react";
import { useStore } from "../../mystore";

import DataMiningDefaultLayout from "./data_mining_default_layout";


export default function TableKeyword() {

    const [isEdit, setIsEdit] = useState(false);
    const [dataKeyword, setDataKeyword] = useState<Keyword[]>();
    const dk = useStore("keyWord")

    useEffect(() => {
        setDataKeyword(dk.get())
    }, [])

    if (!dataKeyword) return <Center>Loading ..</Center>
    return <>
        <Title>Table Keyword</Title>
        <Card>
            <Grid justify={"end"}>
                <Grid.Col span={"content"}>
                    <Input />
                </Grid.Col>
                <Grid.Col span={"content"}>
                    <Button >Add</Button>
                </Grid.Col>
            </Grid>
        </Card>
        <Table withColumnBorders >
            <thead >
                <tr >
                    <th>No</th>
                    <th>Name</th>
                    {/* <th>Action</th> */}
                </tr>
            </thead>
            <tbody>
                {dataKeyword.map((item) => <tr key={item.id}>
                    <td>{(dataKeyword.findIndex(i => i.id == item.id)) + 1}</td>
                    <td>
                        {!isEdit && <Text>{item.name}</Text>}
                        {isEdit && <Grid>
                            <Grid.Col span={"auto"}>
                                <TextInput value={item.name as any} onChange={(val) => {
                                    item.name = val.target.value

                                }} />
                            </Grid.Col>
                            <Grid.Col span={"content"}>
                                <Button>Update</Button>
                            </Grid.Col>
                        </Grid>}
                    </td>
                    {/* <td>
                        <Group>
                            <Button color={"orange"} onClick={() => setIsEdit(!isEdit)}>Edit</Button>
                            <Button color={"red"}>Delete</Button>
                        </Group>
                    </td> */}
                </tr>
                )}
            </tbody>
        </Table>
    </>
}

