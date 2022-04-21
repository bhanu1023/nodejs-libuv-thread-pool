const http = require('http')

function run(iterations){
    const result = {}

    for(let i=0; i<iterations; i++){
        result[i + 1] = { start: Date.now() };
        http.request({ host: 'help.indiamart.com', path: '/wp-content/themes/helpguru-child/img/search.png'},res => {
            res.on('data',() => {})
            res.on('end',()=>{
                result[i + 1].end = Date.now()
            })
        }).end()
    }

    setTimeout(()=>{
        console.log(`CASE 1: Sync Version`)
        printResult(result)
    },5000)
}

function printResult(result){
    let ref = result['1'].start;
    Object.keys(result).forEach((key) => {
        const start = key === '1'? 0 : result[key].start - ref
        const end   = result[key].end - ref

        console.log(`Iteration ${key} started at ${start} and ended at ${end}`)
    })
}


if(process.argv && process.argv.length != 3){
    throw new Error('Invalid args provided')
}else{
    run(parseInt(process.argv[2]))
}

//node hashing_password.js 4