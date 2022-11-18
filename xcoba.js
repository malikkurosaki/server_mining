const brain = require('brain.js');
const network = new brain.NeuralNetwork({hiddenLayers: [3]})

async function main(){

    const adta = await new (require('@prisma/client').PrismaClient)().googleNews.findMany({
        orderBy: {
            des: ""
        }
    })
    // network.train([
    //     {
    //         "input": {bagus: 1,  jelek: 1},
    //         "output": {positive: 1}
    //     },
    //     {
    //         "input": {jelek: 1,  jelek: 1},
    //         "output": {negative: 1}
    //     },
    //     {
    //         "input": {biasa: 1,  jelek: 1},
    //         "output": {netral: 1}
    //     }
    // ], {
    //     log: true,
    //     iterations: 1000
    // })

    // console.log(network.run({biasa: 1}))


    let data = "nama saya adalah".split(" ")
    let result = {}
    for(let itm of data){
        result[itm] = 1
    }
    console.log(result)
}

main()