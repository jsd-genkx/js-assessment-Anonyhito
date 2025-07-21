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


		this.positionRow = 0;
		this.positionCol = 0;
		this.gameOver = false
		this.steps = 0; //เพิ่มนับก้าว
	}

	static createField(holes,row,column) { 

	const field = [];
	const len = row*column
	const dimension = new Array(len).fill("░");

	for (let i=0; i < holes; i++) {
		const holeIndex = Math.floor(Math.random() * len)
		dimension[holeIndex] = "O"
	}

	const hatIndex = Math.floor(Math.random() * len)
	dimension[hatIndex] = "^"


	for (let i=0; i < row; i++) {
    const r = []
    for (let j = 0; j < column; j++) {
        r.push(dimension.pop());
    }
    field.push(r);
}

return field;
}

	// Print field //
	print() {
		clear();
		for (let row of this.field) {
			console.log(row)
		}
			console.log(`\nSteps taken: ${this.steps}`);
}

	updatePath() {
		 this.field[this.positionRow][this.positionCol] = fieldCharacter;
	}


	move(direction) {
		 switch (direction.toLowerCase()) {
      case "a": this.moveLeft(); break;
      case "d": this.moveRight(); break;
      case "w": this.moveUp(); break;
      case "s": this.moveDown(); break;
      default:
        console.log("Invalid direction! Use 'a', 'd', 'w', or 's'");
        return;
	}
	this.steps++; // นับก้าวเมื่อมีการเคลื่อนที่
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

	checkCondition() {
		//positionRow >= 0 positionCol >= 0
		//console.log(`positionRow: ${positionRow}, positionCol: ${positionCol}`)
	if (this.field.length <= this.positionRow || this.field[0].length <= this.positionCol || this.positionRow < 0 || this.positionCol < 0) {
		this.gameOver = true
		console.log(`Loses by attempting to move “outside” the field.😡`)
		return;
	}

	else if (this.field[this.positionRow][this.positionCol] === "O") {
		this.gameOver = true
		console.log(`Loses by landing on (and falling in) a hole.😭`)
		return;
	}

	else if (this.field[this.positionRow][this.positionCol] === "^") {
		this.gameOver = true
		console.log(`Wins by finding their hat.🤠`)
		return;
	}
}

	update() {
		if (!this.gameOver) {
		this.field[this.positionRow][this.positionCol] = pathCharacter
		}
	}

	createActor() {
		const row = Math.floor(Math.random() *this.field.length);
		const column = Math.floor(Math.random() *this.field[0].length);
		this.positionRow = row;
		this.positionCol = column;
		this.field[this.positionRow][this.positionCol] = pathCharacter;
	}


	runner() {
		this.createActor()
		while (!this.gameOver) {
			this.print()
			const way = prompt("Which way?") // user input: u , way = 'u'
			this.move(way)
			this.checkCondition()
			this.update()
		}
		
	}
}

const newGame = new Field(Field.createField(2,3,3));

newGame.runner()

