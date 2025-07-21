"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });


const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
	constructor(field = [[]]) {
		this.field = field;

		// Replace with your own code //
		// Set the home position at (0, 0) before the game starts
		this.positionRow = 0;
		this.positionCol = 0;
		this.field[this.positionRow][this.positionCol] = pathCharacter;
		this.gameOver = false
	}

	// Print field //
	print() {
		clear();
		//1. กระดาน
		for (let row of this.field) {
			console.log(row)
		}

		// Replace with your own code //
		// console.log(this.field); // Please REMOVE this line before you start your code!
	}


	move(direction) {
	if (direction === "l") {
		this.moveLeft()
	}
	else if (direction === "r") {
		this.moveRight()
	}
	else if (direction === "u") {
		this.moveUp()
	}
	else if (direction === "d") {
		this.moveDown()
	}
}


	moveLeft() {
		this.positionCol--

	}

	moveRight() {
		this.positionCol++

	}

	moveUp() {
		this.positionRow = this.positionRow - 1
	}

	moveDown() {
		this.positionRow = this.positionRow + 1

	}

	checkCondition(positionRow, positionCol) {
		//positionRow >= 0 positionCol >= 0
	if (this.field.length <= positionRow || this.field[0].length <= positionCol || positionRow >= 0 || positionCol >= 0) {
		this.gameOver = true
		console.log('Loses by attempting to move “outside” the field.')
		return this.gameOver
	}

	else if (this.field[positionRow][positionCol] === "O") {
		this.gameOver = true
		console.log("Loses by landing on (and falling in) a hole.")
		return this.gameOver
	}

	else if (this.field[positionRow][positionCol] === "^") {
		this.gameOver = true
		console.log('Wins by finding their hat.')
		return this.gameOver
}

}

	update() {
		if (!this.gameOver) {
		this.field[this.positionRow][this.positionCol] = pathCharacter
		}
	}

	runner() {
		while (!this.gameOver) {
			this.print()
			const way = prompt("Which way?") // user input: u , way = 'u'
			this.move(way) // move("u")
			this.checkCondition(this.positionRow, this.positionCol)
			this.update()
		}
	}

}

// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
const newGame = new Field([
	["░", "░", "O"],
	["░", "O", "░"],
	["░", "^", "░"],
]);

newGame.runner()