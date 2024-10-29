#! /usr/bin/env -node

import readline from 'node:readline';
import fs, { constants } from 'node:fs';
// import allTasks from './tasks.json' assert { type: 'json' };
// import allTasks from './tasks.json';
import { format } from 'date-fns';
import path from 'path';

let allTasks: Task[] = [];

// fs.access('./tasks.json', constants.F_OK, async (err) => {
// 	if (err) {
// 		console.log('err', err);
// 	} else {
// 		console.log('ele ');
// 		// fetch(`../TaskTracker/tasks.json`)
// 		// 	.then((response) => response.json())
// 		// 	.then((data) => console.log('data', data))
// 		// 	.catch((err) => console.log('err', err));
// 	}
// });

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

type STATUS = 'todo' | 'in-progress' | 'done';

type Task = {
	id?: number;
	description: string;
	status?: STATUS;
	createdAt?: string;
	updatedAt?: string | null;
};

type Action = 'add' | 'update' | 'delete';

const dateOfTheDay = format(new Date(), 'MM/dd/yyyy');

export const writeInFiles = async (
	withAllTasks: boolean,
	content: Task | Task[],
	id?: string
) => {
	fs.writeFile(
		process.env.NODE_ENV !== 'test' ? './tasks.json' : './task-test.json',
		withAllTasks ? JSON.stringify(content) : JSON.stringify([content]),
		{ flag: 'w+' },
		(err: any) => {
			if (err) {
				console.error(err);
			} else {
				console.log(`Tasks ${id} added successfully`);
				process.exit(1);
			}
		}
	);
};

export const addTask = (description: string) => {
	let lastTaskId: string | any;
	let taskToAdd: Task;

	if (!description) {
		console.log('You have to give a task');
		process.exit(1);
	} else {
		const filePath = path.join(__dirname, 'tasks.json');
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				// console.error(err);
				taskToAdd = {
					id: 1,
					description,
					status: 'todo',
					createdAt: dateOfTheDay,
					updatedAt: null
				};
				writeInFiles(false, taskToAdd, taskToAdd.id?.toString());
				return;
			} else {
				try {
					const task = JSON.parse(data);
					let lastTaskId = parseInt(
						task.slice(-1).map((e: any) => e.id)
					);
					taskToAdd = {
						id: lastTaskId + 1,
						description,
						status: 'todo',
						createdAt: dateOfTheDay,
						updatedAt: null
					};
					writeInFiles(
						true,
						[...task, taskToAdd],
						taskToAdd.id?.toString()
					);
				} catch (e) {
					console.error('Erreur parsing');
				}
			}
		});
		// lastTaskId = allTasks.slice(-1).map((e: any) => e.id);
		// let lastTaskParse = JSON.parse(lastTaskId);
		// taskToAdd = {
		// 	id: 1,
		// 	description,
		// 	status: 'todo',
		// 	createdAt: dateOfTheDay,
		// 	updatedAt: null
		// };
		// writeInFiles(
		// 	allTasks.length > 0 ? true : false,
		// 	taskToAdd,
		// 	taskToAdd.id?.toString()
		// );
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
	writeInFiles(false, shallowCopy as unknown as Task[], id);
	rl.close();
};

export const deleteTaskById = (deletedTasksId: string) => {
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
		const tasksByStatus = allTasks.filter(
			(task: any) => task.status === status
		);
		if (!tasksByStatus.length) {
			console.log('No tasks found');
		} else {
			console.log(`Tasks ${status} : `, tasksByStatus);
		}
		process.exit(0);
	}
};

// const action = process.argv;

if (process.argv[2] === 'add') {
	addTask(process.argv[3]);
} else if (process.argv[2] === 'update') {
	updateTasksById(process.argv[3], process.argv[4]);
} else if (process.argv[2] === 'delete') {
	deleteTaskById(process.argv[3]);
} else if (
	process.argv[2] === 'mark-in-progress' ||
	process.argv[2] === 'mark-done'
) {
	updateTasksById(process.argv[3]);
} else if (
	process.argv.includes('done') ||
	process.argv.includes('todo') ||
	process.argv.includes('in-progress')
) {
	retrieveTaskByStatus(process.argv[3] as unknown as STATUS);
} else if (process.argv[3] === 'list') {
	// console.log('list', allTasks);
}
// const [, , cmd, ...args] = process.argv;
// console.log('process.argv', process.argv);
// console.log('args', args);
// console.log('cmd', cmd);
//  else if (action[2] === 'list' && action[3] === '') {
// 	console.log(allTasks);
// 	process.exit(0);
// }
