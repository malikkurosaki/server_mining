import { Button, Group, Image, NativeSelect, Select, Stack, Text } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import _ from "lodash"
import { useRouter } from "next/router"
import { useState } from "react"

const listMenu = [
    { "label": "Data Mining", "value": "data-mining"},
    { "label": "Ai Processing", "value": "train-ai" },
    { "label": "Task", "value": "task" }
]


const PageLanding = () => {
    const [selectMenu, setSelectMenu] = useInputState("")
    const route = useRouter()
    return <>
        <Stack>
            <Image height={200} width={200} radius={"md"} src={"/img/eagle_eye.png"} />
            <Select placeholder={"Choose Menu"} data={listMenu} onChange={setSelectMenu} />
            <Button onClick={() => {
                if(_.isEmpty(selectMenu)){
                    showNotification({
                        title: "info",
                        message: "Please select menu",
                        color: "red"
                    })
                }
               
                route.push("/"+selectMenu)
            }}>Go</Button>
        </Stack>
    </>
}


export default PageLanding
