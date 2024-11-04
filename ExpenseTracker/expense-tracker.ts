import { program } from 'commander';
import fs from 'node:fs';
import { format, parse } from 'date-fns';

program.name('expense-tracker').description('CLI to manage expense');
program
	.option('--description')
	.option('--amount')
	.option('--id')
	.option('--month');

program.parse();

const options = program.opts();
const dateOfTheDay = format(new Date(), 'yyyy-MM-dd');

type Expense = {
	id?: number;
	date?: string;
	description: string;
	amount: number;
};

type Action = 'add' | 'delete';

const writeInFiles = (content: any, id: number, action: Action) => {
	fs.writeFile(
		'./expense-tracker.json',
		JSON.stringify(content),
		(err: any) => {
			if (err) {
				console.error(err);
			} else {
				console.log(
					`Task ${id} ${
						action === 'add' ? 'added' : 'deleted'
					} successfully`
				);
			}
		}
	);
};

const addExpense = async (description: string, amount: number) => {
	if (description === 'add') {
		console.log('You have to supply a description');
		return;
	}
	if (fs.existsSync('./expense-tracker.json')) {
		const allExpense = await getAllExpenses();
		if (allExpense) {
			let lastId = allExpense.length > 0 ? allExpense.slice(-1)[0].id : 0;
			let expenseToAdd = {
				id: lastId ? lastId! + 1 : 1,
				date: dateOfTheDay,
				description,
				amount
			};
			writeInFiles([...allExpense, expenseToAdd], lastId! + 1, 'add');
		}
	} else {
		let expenseToAdd = {
			id: 1,
			date: dateOfTheDay,
			description,
			amount
		};
		writeInFiles([expenseToAdd], 1, 'add');
	}
};

const deleteExpenseById = async (id: number) => {
	const allExpense = await getAllExpenses();
	if (allExpense) {
		const expenseToDelete = allExpense.filter(
			(expense: Expense) => expense.id !== id
		);
		if (expenseToDelete.length === allExpense.length) {
			console.log(`Expense with id ${id} not exist`);
		} else {
			writeInFiles(expenseToDelete, id, 'delete');
		}
	} else {
		console.log('No expense to delete');
	}
};

const getAllExpenses = async (): Promise<Expense[]> => {
	let allExpense: Expense[] = [];
	try {
		const res = await fs.promises.readFile(
			'./expense-tracker.json',
			'utf8'
		);
		allExpense = JSON.parse(res);
		return allExpense;
	} catch (err) {
		console.error(err);
		return allExpense;
	}
};

const summary = async () => {
	const allExpense = await getAllExpenses();
	let initialValue = 0;
	let summary = allExpense.reduce((acc: any, currentValue: any) => {
		return acc + currentValue.amount;
	}, initialValue);
	console.log('Total expenses', `$${summary}`);
};

const checkExpensesByMonth = (summary: number, month: number) => {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	if (summary) {
		console.log(
			`Total expenses for ${monthNames[month - 1]}`,
			'$' + summary
		);
	} else {
		console.log(`No expenses for ${monthNames[month - 1]}`);
	}
};

const getExpensesByMonth = async (month: string) => {
	const parseMonth = parseInt(month);
	const allExpense = await getAllExpenses();
	if (allExpense) {
		const allExpensesByMonth = allExpense.filter((expense: Expense) => {
			return parseInt(expense.date?.split('-').at(1)!) === parseMonth;
		});
		let initialValue = 0;
		const summary = allExpensesByMonth.reduce(
			(acc: number, currentValue: Expense) => {
				return acc + currentValue.amount;
			},
			initialValue
		);
		checkExpensesByMonth(summary, parseMonth);
	} else {
		console.log('No expenses found');
	}
};

const [action, ...rest] = program.args;

if (action === 'add') {
	addExpense(
		program.args[1].split(options.description).toString(),
		parseInt(program.args[2].split(options.amount)[0])
	);
} else if (action === 'delete') {
	const id = parseInt(program.args[1].toString());
	deleteExpenseById(id);
} else if (action === 'list') {
	getAllExpenses().then((res) => console.table(res));
} else if (action === 'summary') {
	const [, , args, monthFlag] = process.argv;
	if (monthFlag) {
		getExpensesByMonth(program.args[1].split(options.month)[0]);
	} else {
		summary();
	}
}
