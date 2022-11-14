import { ActionIcon, Button, Card, Checkbox, Flex, Group, Indicator, Loader, Modal, NativeSelect, Notification, Paper, SimpleGrid, Space, Table, Text, Textarea, TextInput, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCircleMinus, IconTrash } from "@tabler/icons";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import store from 'store2';
import LayoutDefault from "../../components/layout/layout_default";
import { ModelTrainAi } from '../../components/models/model';
import io from 'socket.io-client'

function useStore(key: string) {
    return {
        get() {
            return store(key)
        },
        set(val: any) {
            store(key, val)
        },
        has() {
            return store.has(key)
        },
        isEmpty() {
            return store(key) != undefined && store(key).length === 0
        }
    }
}

const TrainAi: NextPage = () => {

    const [list, setList] = useState<ModelTrainAi[]>([])
    const [listSuggest, setlistSuggest] = useState<string[]>([])
    const [suggestConteroller, setSuggestConteroller] = useState("")
    const [openModal, setOpenModdal] = useState(false)
    const [loading, setLoading] = useState(false)

    const storeList = useStore('listSource')
    const storeSuggest = useStore('suggest')

    useEffect(() => {
        loadData()
        const socket = io({ path: '/api/socket' });
        socket.on("connect", () => {
            console.log('socket train ai nconnected')
        })
        socket.on('progress-finish', data => {
            console.log("finish")
        })

    }, [])



    const loadData = () => {
        fetch('/api/train-ai').then(val => val.json()).then(val => {
            setList(val)
            loadSuggest(val)
        })

    }

    const loadSuggest = (val: ModelTrainAi[]) => {
        if (storeSuggest.has()) {
            setlistSuggest(storeSuggest.get())
            let ls2 = [...val]
            for (let itm of ls2) {
                itm.suggest = listSuggest[0]
            }
            setList(ls2)
        }
    }


    if (list == undefined || list.length == 0) return <div>...</div>
    return <div >
        {/* <LoadingOverlay visible={loading} overlayBlur={2} loader={<Center><Loader /> <Text>Loading ...</Text></Center>} /> */}

        <LayoutDefault>
            {/* <div>{JSON.stringify(list)}</div> */}
            <Paper p={"sm"}>
                <div> create sussgest</div>
                <SimpleGrid cols={2}>
                    <TextInput placeholder="masukkan suggest" onChange={val => {
                        setSuggestConteroller(val.target.value)
                    }} />
                    <div>
                        <Button onClick={() => {
                            let ls = [...listSuggest];
                            ls.push(suggestConteroller)
                            setlistSuggest(ls)
                            storeSuggest.set(ls)
                        }}>Add</Button>
                    </div>
                </SimpleGrid>
                <Flex direction={"column"}>
                    {listSuggest.map(val => <Group p={"sm"} key={Math.random()}>
                        <ActionIcon onClick={() => {
                            let ls = [...listSuggest].filter(vv => vv != val)
                            setlistSuggest(ls)
                        }} >
                            <IconCircleMinus color={"red"} />
                        </ActionIcon>
                        <div>{val}</div>
                    </Group>)}
                </Flex>
            </Paper>
            <Space m={"sm"} />
            <Card>
                <Group position="apart">
                    {/* menghapus list source semuanya */}
                    <Group>
                        <ActionIcon onClick={() => {
                            setList([])
                            storeList.set([])
                            loadData()
                        }}>
                            <IconTrash />
                        </ActionIcon>
                        <Text>Bersihkan </Text>
                    </Group>
                    <Group>
                        {/* tombol untuk train data yang sudah dipilih */}
                        <Indicator label={list.filter(val => val.selectted).length} size={16} color={"red"}>
                            {/* <Modal
                                centered
                                overflow="inside"
                                size={"xl"}
                                title={"Train Ai"}
                                opened={openModal}
                                withCloseButton={true}
                                onClose={() => {
                                    setOpenModdal(false)

                                }}>

                                <Group position="apart">
                                    <Group>
                                        <Title order={1}>{list.filter(val => val.selectted).length}</Title>
                                        <Text>target source train</Text>
                                    </Group>
                                    <Group position="right" mb={"sm"}>
                                        {loading ? <Loader /> : <Button onClick={() => {
                                            setLoading(true)
                                            const ls2 = list.map(c => ({
                                                input: c.title,
                                                output: c.suggest
                                            }))

                                            fetch('/api/train-ai/now', { method: 'POST', body: JSON.stringify(ls2) }).then(val => {
                                                setLoading(false)
                                                if (val.status == 200) {
                                                    setLoading(false)
                                                    showNotification({
                                                        title: "success",
                                                        message: "success"
                                                    })
                                                }
                                            })

                                        }}>Train Sekarang</Button>}
                                    </Group>
                                </Group>

                            </Modal> */}
                            {loading ? <Loader /> : <Button
                                disabled={list.filter(val => val.selectted).length == 0}
                                onClick={() => {
                                    // setOpenModdal(true)

                                    setLoading(true)
                                    const ls2 = list.map(c => ({
                                        input: c.title,
                                        output: c.suggest
                                    }))

                                    fetch('/api/train-ai/now', { method: 'POST', body: JSON.stringify(ls2) }).then(val => {
                                        setLoading(false)
                                        if (val.status == 200) {
                                            setLoading(false)
                                            showNotification({
                                                title: "success",
                                                message: "success"
                                            })
                                        }
                                    })
                                }}
                            >Train</Button>}
                        </Indicator>
                    </Group>
                </Group>
            </Card>
            <BottomScrollListener
                onBottom={() => {
                    console.log("bottom")
                    fetch(`/api/train-ai?p=${Math.ceil((list.length / 20))}`).then(val => val.json()).then(val => {
                        const list2 = [...list, ...val]
                        setList(list2)
                        storeList.set(list)
                    })
                }}>
                <Table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Source</th>
                            <th>Sugest</th>
                            <th>Selected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(val => <tr key={val.id}>
                            <td>{list.findIndex(vl => vl.id == val.id) + 1}</td>
                            {/* <td>{val.id}</td> */}
                            <td><Textarea value={val.title ?? ""} placeholder="" onChange={(vv) => {
                                let list2 = [...list]
                                list2[list2.findIndex(vv => vv.id == val.id)].title = vv.target.value
                                setList(list2)
                                storeList.set(list)
                            }} /></td>
                            <td><NativeSelect data={listSuggest} onChange={vv => {
                                let list2 = [...list]
                                list2[list2.findIndex(vv => vv.id == val.id)].suggest = vv.target.value
                                setList(list2)
                            }} /></td>
                            <td><Checkbox checked={val.selectted} onChange={() => {
                                if (!val.suggest) {
                                    loadSuggest(list)
                                }

                                console.log(val.suggest)
                                let list2 = [...list]
                                list2[list2.findIndex(vv => vv.id == val.id)].selectted = !val.selectted
                                setList(list2)
                                storeList.set(list)

                            }} /></td>
                        </tr>)}
                    </tbody>
                </Table>
            </BottomScrollListener>
        </LayoutDefault>

    </div>
}

export default TrainAi;