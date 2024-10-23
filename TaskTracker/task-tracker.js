import readline from 'node:readline'
import fs from 'node:fs'
import allTasks from './tasks.json' assert {type: "json"};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const STATUS = [ 'todo', 'in-progress', 'done' ];
console.log('allTasks', allTasks)

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
                fs.writeFile('./tasks.json', JSON.stringify( [...allTasks, TASK_TO_ADD] ) ,err => {
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

    } else {
        rl.close()
    }
    // rl.close()
})