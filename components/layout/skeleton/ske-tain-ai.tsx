import { Grid, Group, Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";

export default function SkeTrainAi() {
    const [tinggi, setTinggi] = useState(0)

    useEffect(() => {
        setTinggi(window.innerHeight)
    })

    return <div>
        <Skeleton height={70} mb={"sm"} >
            <div>Data Mining Server</div>
        </Skeleton>
        <Grid>
            <Grid.Col span={2}>
                <Skeleton height={tinggi} mr={"sm"} />
            </Grid.Col>
            <Grid.Col span={"auto"}>
                <Skeleton height={tinggi} />
            </Grid.Col>
        </Grid>
    </div>
}