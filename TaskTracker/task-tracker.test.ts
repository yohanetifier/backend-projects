import { deleteTaskById, writeInFiles, addTask } from './task-tracker.ts';
import fs from 'fs/promises';

const allTasks = require('./tasks.json');

// jest.mock('fs');

describe('WriteInFiles function', () => {
	let consoleSpy: jest.SpyInstance;
	let processSpy: jest.SpyInstance;
	beforeEach(() => {
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
	it('should write a single task to tasks.json when withAllTasks is false', async () => {
		const fs = require('node:fs');
		const mockWriteFile = jest
			.spyOn(fs, 'writeFile')
			.mockImplementation((path, data, callback: any) => {
				callback(null);
			});
		const task = { description: 'Testing purpose' };
		await writeInFiles(false, { description: 'Testing purpose' }, '99');
		expect(mockWriteFile).toHaveBeenCalledWith(
			'./tasks.json',
			JSON.stringify(task),
			expect.any(Function)
		);
		mockWriteFile.mockRestore();
	});
	it('should add log a give a task when empty', () => {
		addTask('');
		expect(consoleSpy).toHaveBeenCalledWith('You have to give a task');
		expect(processSpy).toHaveBeenCalledWith(1);
	});
});
