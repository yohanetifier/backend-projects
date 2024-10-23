import readline from 'node:readline'
import fs from 'node:fs'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const STATUS = [ 'todo', 'in-progress', 'done' ];

rl.question('What do you want to do ? ', action => {
    if (action === 'add') {
        rl.question('Task to add : ', task => {
            const TASK_TO_ADD = {
                id: 1,
                description: task,
                status: STATUS[0]
            }
            if(!task) {
                console.log('You have to give a task')
                rl.close();
            }else {
                fs.writeFile('./tasks.json', JSON.stringify(TASK_TO_ADD) ,err => {
                    if (err) {
                        console.error(err);
                    } else {
                        task
                        console.log('Task added successfully ')
                    }
                })
                rl.close()
            }
        })

    }
    // rl.close()
})