import { ActionIcon, Alert, Box, Button, Card, Checkbox, Flex, Grid, Group, Indicator, Loader, Modal, NativeSelect, Notification, Paper, SimpleGrid, Space, Stack, Table, Text, Textarea, TextInput, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCircleMinus, IconInfoCircle, IconTrash } from "@tabler/icons";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import store from 'store2';
import LayoutDefault from "../../components/layout/layout_default";
import { ModelTrainAi } from '../../components/models/model';
import io from 'socket.io-client'
import SkeTrainAi from "../../components/layout/skeleton/ske-tain-ai";
import { useInputState, useShallowEffect } from '@mantine/hooks'
import _ from 'lodash'

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

const listIteration = ["10", "500", "1000", "2000", "5000", "10000", "20000", "50000", "100000"]

const TrainAi: NextPage = () => {

    const [list, setList] = useState<ModelTrainAi[]>([])
    const [listSuggest, setlistSuggest] = useState<string[]>([])
    const [suggestConteroller, setSuggestConteroller] = useState("")
    const [openModal, setOpenModdal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [itteration, setIteration] = useState(listIteration[0])
    const [trainId, setTrainId] = useState("")
    const [nameInput, setNamInput] = useInputState("")

    const storeList = useStore('listSource')
    const storeSuggest = useStore('suggest')

    useEffect(() => {
        loadData()

    }, [])

    const loadData = () => {
        fetch('/api/train-ai').then(val => val.json()).then((val: ModelTrainAi[]) => {
            for(let itm of val){
                itm.title = _.lowerCase(itm.title?.replace(/[^a-zA-Z ]/g, "") as any)
            }
            setList([...list, ...val])
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


    if (list == undefined || list.length == 0) return <div><SkeTrainAi /></div>
    return <div>

        <LayoutDefault>

            <Modal
                centered
                overflow="inside"
                title={"Success"}
                opened={openModal}
                withCloseButton={true}
                onClose={() => {
                    setOpenModdal(false)
                }}>
                <Title order={3}>{trainId}</Title>
                <Text mb={"sm"}>
                    Berikan Nama Untuk Dapat Digunakan Nanti
                </Text>
                <Grid>
                    <Grid.Col span={"auto"}>
                        <TextInput value={nameInput} onChange={setNamInput} placeholder="Masukkan Nama" />
                    </Grid.Col>
                    <Grid.Col span={"content"}>
                        <Button onClick={() => {
                            const id = trainId;
                            const body = {
                                name: nameInput
                            }
                            if (_.isEmpty(nameInput)) {
                                showNotification({
                                    color: "pink",
                                    title: "Error",
                                    message: "Nama Tidak Boleh Kosong"
                                })
                                return;
                            }

                            fetch(`/api/train-ai/update-name?id=${id}`, { method: "POST", body: JSON.stringify(body) })
                                .then(val => {
                                    if (val.status == 200) {
                                        showNotification({
                                            title: "success",
                                            message: "success"
                                        })

                                        setOpenModdal(false);

                                    } else {
                                        showNotification({
                                            title: "error",
                                            message: "error",
                                            color: "pink"
                                        })
                                    }
                                })

                        }}>Simpan</Button>
                    </Grid.Col>
                </Grid>
            </Modal>
            <Button onClick={() => {
                setOpenModdal(true)
            }}>
                <div>show modal</div>
            </Button>
            <Card>
                <Box mb={"sm"}>
                    <Title>Create Suggest</Title>
                    <Text fs={"italic"}>buat atau hapus suggest untuk train AI</Text>
                </Box>
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
                {/* list suggest */}
                <Stack>
                    {listSuggest.map(val => <Group p={"sm"} key={Math.random()}>
                        <ActionIcon onClick={() => {
                            let ls = [...listSuggest].filter(vv => vv != val)
                            setlistSuggest(ls)
                        }} >
                            <IconCircleMinus color={"red"} />
                        </ActionIcon>
                        <div>{val}</div>
                    </Group>)}
                </Stack>
            </Card>
            <Space m={"sm"} />

            <Card>
                <Stack>
                    <Box>
                        <Title>Train Ai</Title>
                        <Text fs={"italic"}>silahkan edit data dibawah, buat prasa serapi mungkin agar mesin muddah mengerti </Text>
                    </Box>
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
                        <Group align={"end"}>
                            <NativeSelect label="masukkan literation" data={listIteration} onChange={(val) => {
                                setIteration(val.target.value)
                            }} />
                            {/* tombol untuk train data yang sudah dipilih */}
                            <Indicator label={list.filter(val => val.selectted).length} size={16} color={"red"}>
                              
                                {loading ? <Loader /> : <Button
                                    disabled={list.filter(val => val.selectted).length == 0}
                                    onClick={() => {

                                        // setLoading(true)
                                        // const ls2 = list.filter(val => val.selectted).map(c => ({
                                        //     input: c.title?.split(' ').map(mm => ({mm: 1})),
                                        //     output: {`"${c.suggest.replace(/\s+/g, '.')}"`: 1}
                                        // }))

                                        let ls2: any[] = [];
                                        for(let itm of list.filter(ee => ee.selectted)){
                                            let inp = itm.title?.split(' ');
                                            let data: any  = {}
                                            for(let ii of inp!){
                                                data[ii] = 1
                                            }
                                            let hasil: any = {};

                                            hasil['input'] = data
                                            hasil['output'] = JSON.parse(`{"${itm.suggest.replace(' ', '.')}": 1}`)

                                            ls2.push(hasil)
                                        }
                                        
                                        const dataBody = {
                                            iteration: Number(itteration),
                                            suggest: listSuggest,
                                            data: ls2
                                        }

                                        fetch('/api/train-ai/sekarang', { method: 'POST', body: JSON.stringify(dataBody) }).then(async val => {
                                            setLoading(false)
                                            if (val.status == 200) {
                                                const data = await val.text();
                                                setTrainId(data)
                                                setOpenModdal(true)
                                               

                                            } else {
                                                showNotification({
                                                    title: "error",
                                                    message: await val.text()
                                                })
                                            }
                                        })
                                    }}
                                >Train</Button>}
                            </Indicator>
                        </Group>
                    </Group>

                </Stack>
            </Card>

            {/* scroll bottom */}
            <BottomScrollListener
                onBottom={() => {

                    fetch(`/api/train-ai?p=${Math.ceil((list.length / 20))}`).then(val => val.json()).then((val: ModelTrainAi[]) => {
                        for(let itm of val){
                            itm.title = _.lowerCase(itm.title?.replace(/[^a-zA-Z ]/g, "") as any)
                        }

                        setList([...list, ...val])
                        // storeList.set(list)
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