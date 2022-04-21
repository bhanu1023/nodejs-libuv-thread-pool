const crypto = require('crypto')

function run(iterations){
    const asyncCaseResult = {}

    for(let i=0; i<iterations; i++){
        asyncCaseResult[i + 1] = { start: Date.now() };
        const key = crypto.pbkdf2('secret','salt',100000,64,'sha512',(err,derivedkey) => {
            if (err) { throw err;}
            asyncCaseResult[i + 1].end = Date.now()

        })
    }

    setTimeout(()=>{
        console.log(`CASE 1: Sync Version`)
        printResult(asyncCaseResult)
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