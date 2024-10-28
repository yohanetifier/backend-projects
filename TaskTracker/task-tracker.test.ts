import { writeInFiles } from './task-tracker.ts';
const allTasks = require('./tasks.json');

const taskToAdd = {
	description: 'test'
};

describe('WriteInFiles function', () => {
	it('should write add in a files with the same content', () => {
		writeInFiles(false, taskToAdd);
		expect(allTasks.length).toContain(taskToAdd);
	});
});
