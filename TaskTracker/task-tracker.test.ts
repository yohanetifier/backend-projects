import { deleteTaskById, writeInFiles, addTask } from './task-tracker.ts';
import fs from 'fs/promises';

// const allTasks = require('./task-test.json');
import allTasks from './task-test.json';

// jest.mock('fs');

describe('WriteInFiles function', () => {
	let consoleSpy: jest.SpyInstance;
	let processSpy: jest.SpyInstance;
	beforeEach(() => {
		process.env.NODE_ENV = 'test';
		consoleSpy = jest.spyOn(console, 'log');
		processSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
		// (fs.writeFile as jest.Mock).mockImplementation((path, data, callback) =>
		// 	callback(null)
		// );
	});

	afterEach(() => {
		consoleSpy.mockRestore();
		processSpy.mockRestore();
		jest.restoreAllMocks();
	});
	// Successfully writes a single task to tasks.json when withAllTasks is false
	it('should add a task when withAllTasks is true', async () => {
		const allTasksLength = allTasks.length;
		console.log('------- allTasksLength -------', allTasksLength);
		// const fs = require('node:fs');
		// const mockWriteFile = jest
		// 	.spyOn(fs, 'writeFile')
		// 	.mockImplementation((path, data, callback: any) => {
		// 		callback(null);
		// 	});
		await writeInFiles(false, { description: 'Testing purpose' }, '101010');
		// expect(writeInFiles).toHaveBeenCalledWith(
		// 	JSON.stringify(task),
		// 	expect.any(Function)
		// );
		expect(allTasks.length).toBe(0);
		// mockWriteFile.mockRestore();
	});
	it('should add log a give a task when empty', () => {
		addTask('');
		expect(consoleSpy).toHaveBeenCalledWith('You have to give a task');
		expect(processSpy).toHaveBeenCalledWith(1);
	});
});
