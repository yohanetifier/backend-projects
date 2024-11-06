import readline from 'node:readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const welcomePhrase = [
	'Welcome to the Number Guessing Game',
	"I'm thinking of a number between 1 and 100",
	'You have 5 chances to guess the correct number \n',
	'Please select the difficulty level: ',
	'1. Easy (10 chances)\n2. Medium (5 chances)\n3. Hard (3 chances)\n'
];

const guessNumberSentence = 'Enter your guess: ';
let guessingNumber = Math.floor(Math.random() * 100);
let count: number = 0;

type Level = 'Easy' | 'Medium' | 'Hard';
type Chances = 10 | 5 | 3;

const level: { [key: string]: { level: Level; chances: Chances } } = {
	'1': {
		level: 'Easy',
		chances: 10
	},
	'2': {
		level: 'Medium',
		chances: 5
	},
	'3': {
		level: 'Hard',
		chances: 3
	}
};

let attempts = 0;

const startRound = () => {
	rl.question(guessNumberSentence, (input: string) => {
		if (count === 1) {
			console.log('You lost the game...');
			rl.close();
		} else {
			if (parseInt(input) > guessingNumber) {
				console.log(`Incorrect! The number is less than ${input}`);
				count -= 1;
				attempts++;
				startRound();
			} else if (parseInt(input) < guessingNumber) {
				console.log(`Incorrect! The number is greater than ${input}`);
				count -= 1;
				attempts++;
				startRound();
			} else if (count > 0 && parseInt(input) === guessingNumber) {
				console.log(
					`Congratulations! You guessed the correct number in ${attempts} attempts`
				);
				rl.close();
			}
		}
	});
};

const selectLevel = (input: keyof typeof level) => {
	console.log(
		`\nGreat! You have selected the ${level[input].level} difficulty level\nLet's start the game!`
	);
	count = level[input].chances;
	for (let i = 0; i < count; i++) {
		startRound();
	}
};

const startingGame = () => {
	welcomePhrase.forEach((phrase) => console.log(phrase));
	rl.question('Enter your choice: ', (input: string) => {
		switch (input) {
			case '1':
				selectLevel(input);
				break;
			case '2':
				selectLevel(input);
				break;
			case '3':
				selectLevel(input);
				break;
			default:
				console.log('Possible value 1, 2, 3...');
				rl.close();
		}
	});
};

startingGame();
