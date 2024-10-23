import readline from 'node:readline'
import fs from 'node:fs'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Read the Arg
// process.argv.forEach((val, index) => {
//     console.log('val', val)
// })

rl.question('What do you want to do ? ', action => {
    if (action === 'add') {
        fs.writeFile('./tasks.json', action ,err => {
            if (err) {
                console.error(err);
            } else {
                action
            }
        })

    }
    rl.close()
})