import readline from 'node:readline'
import fs from 'node:fs'
import allTasks from './tasks.json' assert {type: "json"};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const STATUS = [ 'todo', 'in-progress', 'done' ];
let lastTask;
let taskToAdd = {};
if(allTasks) {
    lastTask = allTasks.slice(-1).map(e => JSON.parse(e.id))
} 

rl.question('What do you want to do ? ', action => {
    if (action === 'add') {
        rl.question('Task to add : ', task => {
            if(lastTask) {
                taskToAdd = {
                    id: lastTask++,
                    description: task,
                    status: STATUS[0]
            }  
            console.log('in if') 
            }else {
                taskToAdd = {
                    id: 1,
                    description: task,
                    status: STATUS[0]
            }
            }
            
            if(!task) {
                console.log('You have to give a task')
                rl.close();
            }else {
                fs.writeFile('./tasks.json', JSON.stringify( [...allTasks, taskToAdd] ) ,err => {
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