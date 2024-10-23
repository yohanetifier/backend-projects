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
    lastTask = allTasks.slice(-1).map(e => e.id)
} 

rl.question('What do you want to do ? ', action => {
    if(!action) {
        console.log('the action can be add | update | delete')
        rl.close()
    }
    if (action === 'add') {
        rl.question('Task to add : ', task => {
            if(lastTask) {
                let lastTaskParse = JSON.parse(lastTask)
                lastTaskParse++
                taskToAdd = {
                    id: lastTaskParse,
                    description: task,
                    status: STATUS[0]
            }  
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