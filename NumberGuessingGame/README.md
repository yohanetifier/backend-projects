# Number Guessing Game

Sample solution for the [number-guessing-game](https://roadmap.sh/projects/number-guessing-game) challenge

## Introduction

Welcome to the Number Guessing Game! This is a simple command-line game where you have to guess a randomly generated number between 1 and 100. The game has three difficulty levels: Easy, Medium, and Hard, each with a different number of attempts to guess the correct number.

## How to Run

1. Clone the repository

```bash
git clone https://github.com/yohanetifier/backend-projects.git
cd backend-projects/NumberGuessingGame
```

## How to Play

1. Run the game by executing typescript file "npx ts-node --esm game.ts"
2. You will be presented with a welcome message and a prompt to select the difficulty level.
3. Choose the difficulty level by entering 1 for Easy, 2 for Medium, or 3 for Hard.
4. Once you've selected the difficulty level, you will be prompted to enter your guess.
5. Enter a number between 1 and 100.
6. If your guess is incorrect, you will receive a hint indicating whether the correct number is higher or lower than your guess.
7. Keep guessing until you correctly guess the number or run out of attempts.

## Difficulty Levels

- **Easy**: 10 attempts
- **Medium**: 5 attempts
- **Hard**: 3 attempts

## Technical Details

This game is built using Node.js and the readline module for handling user input. The game logic is implemented in JavaScript and TypeScript, and the code is organized into separate functions for each phase.

### Requirements

- Node.js (version 18 or higher)

### Code Structure

- main.ts: The main entry point of the game
