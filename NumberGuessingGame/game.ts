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
					chances[level] - count
				} attempts`
			);
			rl.close();
		} else if (count === 0 && parseInt(input) !== guessingNumber) {
			console.log('Sorry but you loose...');
			rl.close();
		}
	});
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
		}
		// rl.close();
	});
};

startingGame();
