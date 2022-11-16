import { ActionIcon, Button, Group, Input, Modal, Stack, Table, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import LayoutDefault from "../../components/layout/layout_default";
import _ from 'lodash'
import { showNotification } from "@mantine/notifications";
import brain from 'brain.js'
import { IconEye } from "@tabler/icons";

interface ModelTrained {
    id: string
    name: string
    suggest: string[]
    content: []
    iteration: number
    text: string
    result: any,
    test: string
}

export default function Trained() {
    const [listTrained, setListTrained] = useState<ModelTrained[]>([])
    const [hasil, setHasil] = useState("");
    const [openModal, setOpenModdal] = useState(false)
    const [dataSource, setDataSource] = useState('')

    useEffect(() => {
        fetch('/api/train-ai/list-trained').then(val => {
            if (val.status == 200) {
                val.json().then((vv: ModelTrained[]) => {
                    for (let itm of vv) {
                        itm.text = ""
                        itm.test = ""
                    }
                    setListTrained(vv)

                })
            } else {
                showNotification({
                    title: "error",
                    message: "check connection"
                })
            }
        })
    }, [])

    if (_.isEmpty(listTrained)) return <div>Empty Data</div>
    return (<div>
        <LayoutDefault>
            <Modal opened={openModal} onClose={() => {setOpenModdal(false)}} title="Data Source">
                <Text>
                    {dataSource}
                </Text>
            </Modal>
            <Table withBorder>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Suggest</th>
                        <th>Total Source</th>
                        <th>Pengulangan</th>
                        <th>Test</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        listTrained.map(
                            val =>
                                <tr key={Math.random()}>
                                    <td>{(listTrained.findIndex(vv => vv.id == val.id) + 1)}</td>
                                    <td>{val.name}</td>
                                    <td>{val.suggest.join(', ')}</td>
                                    <td>
                                        <Group>
                                            <Text>{(val.content).length}</Text>
                                            <ActionIcon onClick={() => {setOpenModdal(true)}}>
                                                <IconEye />
                                            </ActionIcon>
                                        </Group>
                                    </td>
                                    <td>{val.iteration}</td>
                                    <td>
                                        <Stack>
                                            <Group>
                                                <TextInput placeholder="Masukkan Text" onChange={vv => {
                                                    val.text = vv.target.value
                                                }} />
                                                <Button onClick={() => {
                                                    fetch(`/api/train-ai/get-result?q=${val.text}&id=${val.id}`).then(ll => {
                                                        if (ll.status == 200) {
                                                            ll.text().then(l => {
                                                                val.test = l;
                                                                setListTrained([...listTrained])
                                                            })
                                                        }
                                                    })
                                                }}>Test</Button>
                                            </Group>
                                            <Text>{val.test}</Text>
                                        </Stack>
                                    </td>
                                </tr>
                        )
                    }

                </tbody>
            </Table>

        </LayoutDefault>
    </div>)
}