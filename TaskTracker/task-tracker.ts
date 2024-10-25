import readline from 'node:readline';
import fs from 'node:fs';
import allTasks from './tasks.json' assert { type: 'json' };
import { format } from 'date-fns';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

type Task = {
	id: number;
	description: string;
	status: string;
	createdAt?: string;
	updatedAt?: string | null;
};

type Action = 'add' | 'update' | 'delete';

const STATUS = ['todo', 'in-progress', 'done'];
const dateOfTheDay = format(new Date(), 'MM/dd/yyyy');

const writeInfiles = (
	withAllTasks: boolean,
	content: Task | Task[],
	id?: string
) => {
	if (withAllTasks === true) {
		fs.writeFile(
			'./tasks.json',
			JSON.stringify([...allTasks, content]),
			(err: any) => {
				if (err) {
					console.error(err);
				} else {
					console.log('Task added successfully ');
				}
			}
		);
	} else {
		fs.writeFile('./tasks.json', JSON.stringify(content), (err: any) => {
			if (err) {
				console.error(err);
			} else {
				console.log(`Task ${id} updated successfully`);
			}
		});
	}

	rl.close();
};

const addTask = (description: string) => {
	let lastTaskId: string | any;
	let taskToAdd: Task;

	if (!description) {
		console.log('You have to give a task');
		rl.close();
	} else {
		if (allTasks) {
			lastTaskId = allTasks.slice(-1).map((e: any) => e.id);
			let lastTaskParse = JSON.parse(lastTaskId);
			lastTaskParse++;
			taskToAdd = {
				id: lastTaskParse,
				description,
				status: STATUS[0],
				createdAt: dateOfTheDay,
				updatedAt: null
			};
		} else {
			taskToAdd = {
				id: 1,
				description,
				status: STATUS[0],
				createdAt: dateOfTheDay,
				updatedAt: null
			};
		}
		writeInfiles(true, taskToAdd);
	}
};

const updateTasksById = (newDescription: string, id: string) => {
	let taskToUpdate;
	if (!newDescription) {
		console.log('NewDescription needed !');
	}
	const shallowCopy = allTasks.slice();
	let filterTaskArray = shallowCopy.filter((t: any) => t.id === parseInt(id));

	if (newDescription === 'in-progress' || newDescription === 'done') {
		taskToUpdate = filterTaskArray.map((t: any) => ({
			...t,
			status: newDescription,
			updatedAt: dateOfTheDay
		}));
	} else {
		taskToUpdate = filterTaskArray.map((t: any) => ({
			...t,
			description: newDescription,
			updatedAt: dateOfTheDay
		}));
	}

	const indexOfTheTaskToUpdate = allTasks.findIndex(
		(task: any) => task.id === parseInt(id)
	);

	if (indexOfTheTaskToUpdate !== -1) {
		shallowCopy[indexOfTheTaskToUpdate] = taskToUpdate[0];
	}
	writeInfiles(false, shallowCopy as unknown as Task[], id);
	rl.close();

	// const shallowCopy = allTasks.slice();
	// let filterTaskArray = shallowCopy.filter(
	// 	(t: any) => t.id === parseInt(id)
	// );
	// const taskToUpdate = filterTaskArray.map((t: any) => ({
	// 	...t,
	// 	description: newDescription,
	// 	updatedAt: dateOfTheDay
	// }));
	// const indexOfTheTaskToUpdate = allTasks.findIndex(
	// 	(task: any) => task.id === parseInt(id)
	// );
	// if (indexOfTheTaskToUpdate !== -1) {
	// 	shallowCopy[indexOfTheTaskToUpdate] = taskToUpdate[0];
	// }
	// writeInfiles(false, shallowCopy as unknown as Task[]);
	// 	fs.writeFile('./tasks.json', JSON.stringify(shallowCopy), (err) => {
	// 		if (err) {
	// 			console.log(err);
	// 		} else {
	// 			console.log(`Tasks ${id} updated`);
	// 		}
	// 	});
	// 	rl.close();
};
// } else  {
// }

const deleteTaskById = (deletedTasksId: string) => {
	const shallowCopy = allTasks.slice();
	const othersTasks = shallowCopy.filter(
		(task: any) => task.id !== parseInt(deletedTasksId)
	);
	fs.writeFile(
		'./tasks.json',
		JSON.stringify([...othersTasks]),
		(err: any) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`Tasks ${deletedTasksId} deleted !`);
				rl.close();
			}
		}
	);
};

rl.question(
	'What do you want to do (add | update | delete | list)? ',
	(action: string) => {
		if (!action) {
			console.log('the action can be add | update | delete');
			rl.close();
		}
		if (action === 'add') {
			rl.question('Task to add : ', (task: string) => {
				addTask(task);
			});
		} else if (action === 'update') {
			rl.question('Which task you want to update : ', (id: string) => {
				if (!id) {
					console.log('Id needed !');
					rl.close();
				} else {
					rl.question(
						'What do you want to update (status | description) : ',
						(choice: string) => {
							if (choice === 'status') {
								rl.question(
									'Which status (in-progress | done) : ',
									(status) => {
										updateTasksById(status, id);
										rl.close();
									}
								);
							} else {
								rl.question(
									'New description : ',
									(description) => {
										updateTasksById(description, id);
										rl.close();
									}
								);
							}
							// updateTasksById(newDescription, id);
						}
					);
				}
			});
		} else if (action === 'delete') {
			rl.question(
				'Which tasks do you want to delete: ',
				(deletedTasksId: string) => {
					deleteTaskById(deletedTasksId);
				}
			);
		} else if (action === 'list') {
			console.log(allTasks);
			rl.close();
		} else {
			console.log('allow action add | update | delete | list');
			rl.close();
		}
	}
);
