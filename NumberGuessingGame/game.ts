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
type Level = 'easy' | 'medium' | 'hard';
let count: number = 0;

const chances = {
	easy: 10,
	medium: 5,
	hard: 3
};

const startRound = (level: Level) => {
	rl.question(guessNumberSentence, (input: string) => {
		if (count === 1) {
			console.log('You lost the game...');
			rl.close();
		} else {
			if (parseInt(input) > guessingNumber) {
				console.log(`Incorrect! The number is less than ${input}`);
				count -= 1;
				startRound(level);
			} else if (parseInt(input) < guessingNumber) {
				console.log(`Incorrect! The number is greater than ${input}`);
				count -= 1;
				startRound(level);
			} else if (count > 0 && parseInt(input) === guessingNumber) {
				console.log(
					`Congratulations! You guessed the correct number in ${
						chances[level] - count + 1
					} attempts`
				);
				rl.close();
			}
		}
	});
};

const selectLevel = {
	1: 'Easy',
	2: 'Medium',
	3: 'Hard'
};

const selectLevelPhrase = (input: string) => {
	const inputInNumber = parseInt(input);
	console.log(
		`\nGreat! You have selected the ${selectLevel[inputInNumber]}  difficulty level\nLet's start the game!`
	);
};

const startingGame = () => {
	welcomePhrase.forEach((phrase) => console.log(phrase));
	rl.question('Enter your choice: ', (input: string) => {
		switch (input) {
			case '1':
				console.log(
					"\nGreat! You have selected the Easy difficulty level\nLet's start the game!"
				);
				count = chances['easy'];
				for (let i = 0; i < count; i++) {
					startRound('easy');
				}
				break;
			case '2':
				console.log(
					"\nGreat! You have selected the Medium difficulty level\nLet's start the game!"
				);
				count = chances['medium'];
				for (let i = 1; i < count; i++) {
					startRound('medium');
				}
				break;
			case '3':
				console.log(
					"\nGreat! You have selected the Hard difficulty level\nLet's start the game!"
				);
				count = chances['hard'];
				for (let i = 0; i < count; i++) {
					startRound('hard');
				}
				break;
		}

		// rl.close();
	});
};

startingGame();
