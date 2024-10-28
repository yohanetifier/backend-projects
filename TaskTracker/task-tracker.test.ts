import { deleteTaskById, writeInFiles } from './task-tracker.ts';
const allTasks = require('./tasks.json');

describe('WriteInFiles function', () => {
	it('should write the files with the same content', async () => {
		console.log('allTasks.length', allTasks.length);
		await writeInFiles(true, { id: 99, description: 'testing purpose' });
		expect(allTasks.length).toBe(allTasks.length + 1);
	});
});
