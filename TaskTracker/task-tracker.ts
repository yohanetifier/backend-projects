#! /usr/bin/env node

import readline from 'node:readline';
import fs from 'node:fs';
import { format } from 'date-fns';
import path from 'path';

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
	content: Task | Task[],
	type: Action,
	id?: string
) => {
	fs.writeFile(
		process.env.NODE_ENV !== 'test' ? './tasks.json' : './task-test.json',
		JSON.stringify(content),
		{ flag: 'w+' },
		(err: any) => {
			if (err) {
				console.error(err);
			} else {
				successMessage(id!, type);
				process.exit(1);
			}
		}
	);
};

const taskNotFound = (id: string) => {
	console.error(`No tasks ${id} found. Try again`);
};

const successMessage = (id: string, action: Action) => {
	console.log(
		`Tasks ${id} ${
			action === 'add'
				? 'added'
				: action === 'delete'
				? 'deleted'
				: 'updated'
		} successfully`
	);
};

export const addTask = (description: string) => {
	let taskToAdd: Task;

	if (!description) {
		console.log('You have to give a task');
		process.exit(1);
	} else {
		const filePath = path.join(__dirname, 'tasks.json');
		fs.readFile(filePath, 'utf8', async (err, data) => {
			if (err) {
				taskToAdd = {
					id: 1,
					description,
					status: 'todo',
					createdAt: dateOfTheDay,
					updatedAt: null
				};
				writeInFiles([taskToAdd], 'add', taskToAdd.id?.toString());
				return;
			} else {
				const allTasks = await getAllTasks();
				try {
					const task = JSON.parse(data);
					let lastTaskId = parseInt(
						task.slice(-1).map((e: any) => e.id)
					);
					taskToAdd = {
						id: allTasks.length > 0 ? lastTaskId + 1 : 1,
						description,
						status: 'todo',
						createdAt: dateOfTheDay,
						updatedAt: null
					};
					writeInFiles(
						[...task, taskToAdd],
						'add',
						taskToAdd.id?.toString()
					);
				} catch (e) {
					console.error('Erreur parsing');
					process.exit(1);
				}
			}
		});
	}
};

const getAllTasks = async (): Promise<Task[]> => {
	let allTasks = [];
	try {
		const data = await fs.promises.readFile('./tasks.json', 'utf8');
		allTasks = JSON.parse(data);
		return allTasks;
	} catch (err) {
		console.error(err);
		return allTasks;
	}
};

const updateTasksById = async (id: string, newDescription?: string) => {
	const allTasks = await getAllTasks();
	let taskToUpdate;
	let filterTaskArray = allTasks.filter((t) => t.id === parseInt(id));
	const taskToUpdateFunction = (newStatus: STATUS) => {
		return (taskToUpdate = filterTaskArray.map((t) => ({
			...t,
			status: newStatus,
			updatedAt: dateOfTheDay
		})));
	};
	if (!filterTaskArray.length) {
		taskNotFound(id);
	} else {
		if (process.argv[2] === 'mark-in-progress') {
			taskToUpdateFunction('in-progress');
		} else if (process.argv[2] === 'mark-done') {
			taskToUpdateFunction('done');
		} else if (process.argv[2] === 'mark-todo') {
			taskToUpdateFunction('todo');
		} else {
			taskToUpdate = filterTaskArray.map((t) => ({
				...t,
				description: newDescription,
				updatedAt: dateOfTheDay
			}));
		}

		const indexOfTheTaskToUpdate = allTasks.findIndex(
			(task) => task.id === parseInt(id)
		);

		if (indexOfTheTaskToUpdate !== -1) {
			allTasks[indexOfTheTaskToUpdate] = taskToUpdate![0] as Task;
		}
		writeInFiles(allTasks as unknown as Task[], 'update', id);
	}
	rl.close();
};

export const deleteTaskById = async (deletedTasksId: string) => {
	const allTasks = await getAllTasks();
	const othersTasks = allTasks.filter(
		(task) => task.id !== parseInt(deletedTasksId)
	);
	if (othersTasks.length === allTasks.length) {
		taskNotFound(deletedTasksId);
		process.exit(1);
	} else {
		writeInFiles([...othersTasks], 'delete', deletedTasksId);
	}
};

const retrieveTaskByStatus = async (status?: STATUS) => {
	if (status) {
		const allTasks = await getAllTasks();
		const tasksByStatus = allTasks.filter((task) => task.status === status);
		if (!tasksByStatus.length) {
			taskNotFound(status);
			process.exit(1);
		} else {
			console.log(`Tasks ${status} : `, tasksByStatus);
			process.exit(0);
		}
	}
};

const [_, __, ...action] = process.argv;

if (action[0] === 'add') {
	addTask(action[1]);
} else if (action[0] === 'update') {
	updateTasksById(action[1], action[2]);
} else if (action[0] === 'delete') {
	deleteTaskById(action[1]);
} else if (
	action[0] === 'mark-in-progress' ||
	action[0] === 'mark-done' ||
	action[0] === 'mark-todo'
) {
	updateTasksById(action[1]);
} else if (
	process.argv.includes('done') ||
	process.argv.includes('todo') ||
	process.argv.includes('in-progress')
) {
	retrieveTaskByStatus(action[1] as unknown as STATUS);
} else if (action[0] === 'list') {
	getAllTasks()
		.then((task) => console.table(task))
		.then(() => process.exit(0));
} else {
	console.log(
		'Please provid a valid action. Valid action are: add, update, delete, list, mark-done, mark-in-progress, mark-todo'
	);
	process.exit(1);
}
