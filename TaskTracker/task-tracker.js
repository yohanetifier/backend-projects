import readline from 'node:readline';
import fs from 'node:fs';
import allTasks from './tasks.json' assert { type: 'json' };

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const STATUS = ['todo', 'in-progress', 'done'];
let lastTask;
let taskToAdd = {};
if (allTasks) {
	lastTask = allTasks.slice(-1).map((e) => e.id);
}

const writeInfiles = (content) => {
	fs.writeFile(
		'./tasks.json',
		JSON.stringify([...allTasks, content]),
		(err) => {
			if (err) {
				console.error(err);
			} else {
				console.log('Task added successfully ');
			}
		}
	);
	rl.close();
};

const addTask = (task) => {
	if (lastTask) {
		let lastTaskParse = JSON.parse(lastTask);
		lastTaskParse++;
		taskToAdd = {
			id: lastTaskParse,
			description: task,
			status: STATUS[0]
		};
	} else {
		taskToAdd = {
			id: 1,
			description: task,
			status: STATUS[0]
		};
	}

	if (!task) {
		console.log('You have to give a task');
		rl.close();
	} else {
		writeInfiles(taskToAdd);
	}
};

rl.question('What do you want to do ? ', (action) => {
	if (!action) {
		console.log('the action can be add | update | delete');
		rl.close();
	}
	if (action === 'add') {
		rl.question('Task to add : ', (task) => {
			addTask(task);
		});
	} else if (action === 'update') {
		rl.question('Which task you want to update : ', (id) => {
			if (!id) {
				console.log('Id needed !');
				rl.close();
			} else {
				rl.question(
					'What is the new description : ',
					(newDescription) => {
						if (!newDescription) {
							console.log('NewDescription needed !');
						} else {
							const shallowCopy = allTasks.slice();
							let filterTaskArray = shallowCopy.filter(
								(t) => t.id === parseInt(id)
							);
							const taskToUpdate = filterTaskArray.map((t) => ({
								...t,
								description: newDescription
							}));
							const indexOfTheTaskToUpdate = allTasks.findIndex(
								(task) => task.id === parseInt(id)
							);
							if (indexOfTheTaskToUpdate !== -1) {
								shallowCopy[indexOfTheTaskToUpdate] =
									taskToUpdate[0];
							}

							fs.writeFile(
								'./tasks.json',
								JSON.stringify(shallowCopy),
								(err) => {
									if (err) {
										console.log(err);
									} else {
										console.log(`Tasks ${id} updated`);
									}
								}
							);
							rl.close();
						}
					}
				);
			}
		});
	} else {
		console.log('allow action add | update | delete');
		rl.close();
	}
	// rl.close()
});
