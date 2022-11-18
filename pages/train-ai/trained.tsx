import { ActionIcon, Box, Button, Divider, Grid, Group, Input, Modal, NativeSelect, Stack, Table, Text, Textarea, TextInput, Title, Tooltip } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconEye, IconFileX, IconPlus } from "@tabler/icons";
import _ from 'lodash';
import { SetStateAction, useEffect, useState } from "react";
import LayoutDefault from "../../components/layout/layout_default";

interface ModelTrained {
    id: string
    name: string
    suggest: string[]
    content: {}[]
    iteration: number
    text: string
    result: any
    test: any;
}

interface ModelDataSource {
    input: {}
    output: {}
}

const Trained = () => {
    const [listTrained, setListTrained] = useState<ModelTrained[]>([])
    const [openModal, setOpenModdal] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [openModalEdit, setOpenModdalEdit] = useState(false)
    const [valueEdit, setValueEdit] = useState<ModelTrained>()


    useEffect(() => {
        loadData()

        console.log("berubah rubah")
    }, [])

    const loadData = () => {
        fetch('/api/train-ai/list-trained').then(val => {
            if (val.status == 200) {
                val.json().then((vv: ModelTrained[]) => {
                    for (let itm of vv) {
                        itm.text = ""
                        itm.test = ""
                    }
                    setListTrained([...vv])

                })
            } else {
                showNotification({
                    title: "error",
                    message: "check connection"
                })
            }
        })
    }



    if (_.isEmpty(listTrained)) return <LayoutDefault><div>empty data</div></LayoutDefault>
    return (<div>
        <LayoutDefault>
            <ModalEdit openModalEdit={openModalEdit} setOpenModdalEdit={setOpenModdalEdit} valueData={valueEdit!} />
            <Modal opened={openModal} onClose={() => { setOpenModdal(false) }} title="Data Source">
                <Table>
                    <thead>
                        <tr>
                            <th>Input</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource.map((vv: ModelDataSource) =>
                            <tr key={Math.random()}>
                                <td>{Object.keys(vv.input).join(', ')}</td>
                                <td>{Object.keys(vv.output)}</td>
                            </tr>

                        )}
                    </tbody>
                </Table>
            </Modal>
            <Table withColumnBorders>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Suggest</th>
                        <th>Total Source</th>
                        <th>Pengulangan</th>
                        <th>Test</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        listTrained.map(
                            val =>
                                <tr key={val.id}>
                                    <td >
                                        <Group align={"start"}>
                                            <Text>{(listTrained.findIndex(vv => vv.id == val.id) + 1)}</Text>
                                        </Group>
                                    </td>
                                    <td>{val.name}</td>
                                    <td>{val.suggest.join(', ')}</td>
                                    <td>
                                        <Group>
                                            <Text>{(val.content).length}</Text>
                                            <ActionIcon onClick={() => {
                                                setDataSource(val.content as any)
                                                setOpenModdal(true)
                                            }}>
                                                <IconEye />
                                            </ActionIcon>
                                        </Group>
                                    </td>
                                    <td>{val.iteration}</td>
                                    <td>
                                        <Stack>
                                            <Group>
                                                <TextInput placeholder="Masukkan test" value={val.text} onChange={(xx) => {
                                                    val.text = xx.target.value;
                                                    setListTrained([...listTrained])
                                                }} />
                                                <Button onClick={() => {
                                                    fetch(`/api/train-ai/get-result?q=${val.text}&id=${val.id}`).then(ll => {
                                                        if (ll.status == 200) {
                                                            ll.text().then(l => {
                                                                val.test = JSON.parse(l);
                                                                setListTrained([...listTrained])
                                                            })
                                                        }
                                                    })
                                                }}>Test</Button>
                                            </Group>
                                            <Text size={24} align={"start"} color={"blue"}>
                                                {{
                                                    ..._.maxBy(Object.keys(val.test).map(xx => ({
                                                        name: xx,
                                                        value: val.test[xx]
                                                    })), 'value')
                                                }['name']}
                                            </Text>

                                            {Object.keys(val.test).map(xx => <Grid key={Math.random()}>
                                                <Grid.Col span={3}><Text>{xx} </Text></Grid.Col>
                                                <Grid.Col span={"auto"}><Text>{val.test[xx]}</Text></Grid.Col>
                                            </Grid>)}
                                        </Stack>
                                    </td>
                                    <td>
                                        <Group align={"start"}>
                                            <Tooltip label="menghapus data yang sudah di train">
                                                <ActionIcon onClick={() => {
                                                    fetch(`/api/train-ai/remove?id=${val.id}`, { method: "DELETE" }).then(vvv => {
                                                        if (vvv.status == 200) {
                                                            loadData();

                                                            showNotification({
                                                                title: "success",
                                                                message: "success"
                                                            })


                                                        } else {
                                                            showNotification({
                                                                title: "error",
                                                                message: "error"
                                                            })
                                                        }
                                                    })
                                                }}>
                                                    <IconFileX color="red" />
                                                </ActionIcon>
                                            </Tooltip>
                                            <ActionIcon onClick={() => {
                                                setValueEdit(val);
                                                setOpenModdalEdit(true)
                                            }}>
                                                <IconEdit />
                                            </ActionIcon>
                                        </Group>
                                    </td>
                                </tr>
                        )
                    }

                </tbody>
            </Table>

        </LayoutDefault>
    </div>)
}

interface ModelEditProps {
    valueData: ModelTrained
    openModalEdit: boolean
    setOpenModdalEdit: any
}

const ModalEdit = ({ valueData, openModalEdit, setOpenModdalEdit }: ModelEditProps) => {

    const [valueEdit, setValueEdit] = useState(valueData)
    const [newData, setNewData] = useInputState("")
    const [newSuggest, setNewSuggest] = useInputState(null)
    const [valueDipilih, setValueDipilih] = useState(false)

    let idx = 1;

    useEffect(() => {
        setValueEdit(valueData)
    })

    if (_.isEmpty(valueEdit) || !valueEdit) return <div>loading ...</div>
    return <>
        <Modal overflow="inside" size={"70%"} title={"Edit Trained"} opened={openModalEdit} onClose={() => setOpenModdalEdit(false)}>
            {/* {JSON.stringify(valueEdit.content)} */}
            <Group position={"apart"}>
                <Title>{valueEdit?.name}</Title>
                <Button color={"orange"} onClick={() => {
                    console.log(valueEdit)
                }}>Update</Button>
            </Group>
            <Text>{valueEdit?.id}</Text>
            <Grid my={"md"} align={"end"} >
                <Grid.Col span={"auto"}><Textarea value={newData} onChange={setNewData} placeholder="Masukkan Data"></Textarea></Grid.Col>
                <Grid.Col span={"content"} >
                    <NativeSelect
                        defaultValue={newSuggest ?? valueData.suggest[0]}
                        onClick={() => setValueDipilih(true)}
                        label={"Masukkan Pilihan"}
                        data={valueEdit.suggest}
                        // value={newSuggest}
                        onChange={setNewSuggest} />
                </Grid.Col>
                <Grid.Col span={"content"}><Button leftIcon={<IconPlus />}
                    onClick={() => {
                        // console.log(newData, newSuggest)
                        if (_.isEmpty(newData)) {
                            showNotification({
                                title: "info",
                                message: "isi semua data dengan lengkap"
                            })
                            return
                        }


                        let dataInput: {} = newData.split(' ').reduce((a: any, b: any, c, d) => { a[b] = 1; return a }, {})
                        let dataoutput: {} = (newSuggest ?? valueEdit.suggest[0]).split(" ").reduce((a: Record<string, number>, b: string) => {
                            a[b] = 1;
                            return a;
                        }, {})

                        let result = {
                            input: dataInput,
                            output: dataoutput
                        }

                        valueEdit.content.unshift(result)
                        setValueEdit({ ...valueEdit })
                        setNewData("")

                    }} >Add</Button></Grid.Col>
            </Grid>
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Source</th>
                        <th>Select</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {valueEdit?.content.map((vvv: any) => <tr key={idx}>
                        <td>{idx++}</td>
                        <td><Textarea value={Object.keys(vvv.input).join(" ")} onChange={(v1) => {
                            vvv.text = v1.target.value;
                        }} /></td>
                        <td><NativeSelect defaultValue={Object.keys(vvv.output).join("")} data={[...valueEdit.suggest]} onChange={() => { }} /></td>
                        <td><ActionIcon onClick={() => {
                            let dataInput = valueEdit?.content.map((i: any) => Object.keys(i.input).join(" "))
                            let index = dataInput.indexOf(Object.keys(vvv.input).join(" "))
                            valueEdit?.content.splice(index, 1)

                            setValueEdit({ ...valueEdit })

                        }}>
                            <IconFileX color="red" />
                        </ActionIcon></td>
                    </tr>)}
                </tbody>
            </Table>

        </Modal>
    </>
}

export default Trained;