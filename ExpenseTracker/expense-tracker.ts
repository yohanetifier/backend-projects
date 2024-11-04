import { program } from 'commander';
import fs from 'node:fs';

program.name('expense-tracker').description('CLI to manage expense');
program.option('--description').option('--amount');

program.parse();

const options = program.opts();

type Expense = {
	id?: number;
	description: string;
	amount: number;
};

const addExpense = (description: string, amount: number) => {
	if (fs.existsSync('./expense-tracker.json')) {
		let allExpenses: Expense[] = [];
		fs.readFile('./expense-tracker.json', 'utf8', (err, data) => {
			if (err) {
				console.error(err);
			} else {
				allExpenses = JSON.parse(data);
				let lastId = allExpenses.slice(-1)[0].id;
				console.log('amount', amount);
				let expenseToAdd = {
					id: lastId! + 1,
					description,
					amount
				};
				console.log('lastId', lastId);
				fs.writeFile(
					'./expense-tracker.json',
					JSON.stringify([...allExpenses, expenseToAdd]),
					(err: any) => {
						if (err) {
							console.error(err);
						} else {
							console.log('Task added successfully');
						}
					}
				);
			}
		});
	} else {
		let expenseToAdd = {
			id: 1,
			description,
			amount
		};
		fs.writeFile(
			'./expense-tracker.json',
			JSON.stringify([expenseToAdd]),
			{ flag: 'w+' },
			(err) => {
				if (err) {
					console.error(err);
				} else {
					console.log('Expense added successfully');
				}
			}
		);
	}
};

if (
	program.args[0].split(options.description) ||
	program.args[0].split(options.amount)
) {
	addExpense(
		program.args[0].split(options.description).toString(),
		parseInt(program.args[1].split(options.amount)[0])
	);
}
