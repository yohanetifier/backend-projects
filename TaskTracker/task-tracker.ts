import readline from 'node:readline';
import fs from 'node:fs';
import allTasks from './tasks.json' assert { type: 'json' };
import { format } from 'date-fns';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

type STATUS = 'todo' | 'in-progress' | 'done';

type Task = {
	id: number;
	description: string;
	status: STATUS;
	createdAt?: string;
	updatedAt?: string | null;
};

type Action = 'add' | 'update' | 'delete';
const action = process.argv;

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
					process.exit(0);
				}
			}
		);
	} else {
		fs.writeFile('./tasks.json', JSON.stringify(content), (err: any) => {
			if (err) {
				console.error(err);
			} else {
				console.log(`Task ${id} updated successfully`);
				process.exit(0);
			}
		});
	}
};

const addTask = (description: string) => {
	let lastTaskId: string | any;
	let taskToAdd: Task;

	if (!description) {
		console.log('You have to give a task');
		process.exit(1);
	} else {
		if (allTasks) {
			lastTaskId = allTasks.slice(-1).map((e: any) => e.id);
			let lastTaskParse = JSON.parse(lastTaskId);
			lastTaskParse++;
			taskToAdd = {
				id: lastTaskParse,
				description,
				status: 'todo',
				createdAt: dateOfTheDay,
				updatedAt: null
			};
		} else {
			taskToAdd = {
				id: 1,
				description,
				status: 'todo',
				createdAt: dateOfTheDay,
				updatedAt: null
			};
		}
		writeInfiles(true, taskToAdd);
	}
};

const updateTasksById = (id: string, newDescription?: string) => {
	let taskToUpdate;
	const shallowCopy = allTasks.slice();
	let filterTaskArray = shallowCopy.filter((t: any) => t.id === parseInt(id));
	const taskToUpdateFunction = (newStatus: STATUS) => {
		return (taskToUpdate = filterTaskArray.map((t: any) => ({
			...t,
			status: newStatus,
			updatedAt: dateOfTheDay
		})));
	};
	if (process.argv[2] === 'mark-in-progress') {
		taskToUpdateFunction('in-progress');
	} else if (process.argv[2] === 'mark-done') {
		taskToUpdateFunction('done');
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
		shallowCopy[indexOfTheTaskToUpdate] = taskToUpdate![0];
	}
	writeInfiles(false, shallowCopy as unknown as Task[], id);
	rl.close();
};

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

const retrieveTaskByStatus = (status?: STATUS) => {
	if (status) {
		const tasksByStatus = allTasks.filter((task) => task.status === status);
		if (!tasksByStatus.length) {
			console.log('No tasks found');
		} else {
			console.log(`Tasks ${status} : `, tasksByStatus);
		}
		process.exit(0);
	}
};

if (action[2] === 'add') {
	addTask(process.argv[3]);
} else if (action[2] === 'update') {
	updateTasksById(process.argv[3], process.argv[4]);
} else if (action[2] === 'delete') {
	deleteTaskById(process.argv[3]);
} else if (action[2] === 'mark-in-progress' || action[2] === 'mark-done') {
	updateTasksById(process.argv[3]);
} else if (
	process.argv.includes('done') ||
	process.argv.includes('todo') ||
	process.argv.includes('in-progress')
) {
	retrieveTaskByStatus(process.argv[3] as unknown as STATUS);
} else {
	// const [, , cmd, ...args] = process.argv;
	// console.log('process.argv', process.argv);
	// console.log('args', args);
	// console.log('cmd', cmd);
	console.log('list', allTasks);
}
//  else if (action[2] === 'list' && action[3] === '') {
// 	console.log(allTasks);
// 	process.exit(0);
// }

// rl.question(
// 	'What do you want to do (add | update | delete | list)? ',
// 	(action: string) => {
// 		if (!action) {
// 			console.log('the action can be add | update | delete');
// 			rl.close();
// 		}
// 		if (action === 'add') {
// 			// rl.question('Task to add : ', (task: string) => {
// 			// 	addTask(task);
// 			// });
// 			console.log('process.argv[1]', process.argv[1]);
// 		} else if (action === 'update') {
// 			rl.question('Which task you want to update : ', (id: string) => {
// 				if (!id) {
// 					console.log('Id needed !');
// 					rl.close();
// 				} else {
// 					rl.question(
// 						'What do you want to update (status | description) : ',
// 						(choice: string) => {
// 							if (choice === 'status') {
// 								rl.question(
// 									'Which status (in-progress | done) : ',
// 									(status) => {
// 										updateTasksById(status, id);
// 										rl.close();
// 									}
// 								);
// 							} else {
// 								rl.question(
// 									'New description : ',
// 									(description) => {
// 										updateTasksById(description, id);
// 										rl.close();
// 									}
// 								);
// 							}
// 							// updateTasksById(newDescription, id);
// 						}
// 					);
// 				}
// 			});
// 		} else if (action === 'delete') {
// 			rl.question(
// 				'Which tasks do you want to delete: ',
// 				(deletedTasksId: string) => {
// 					deleteTaskById(deletedTasksId);
// 				}
// 			);
// 		} else if (action === 'list') {
// 			console.log(allTasks);
// 			rl.close();
// 		} else {
// 			console.log('allow action add | update | delete | list');
// 			rl.close();
// 		}
// 	}
// );
