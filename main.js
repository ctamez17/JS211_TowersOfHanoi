'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  let actionPiece = stacks[startStack].pop();
  stacks[endStack].push(actionPiece);
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  //startStack = startStack.trim().toLowerCase(); <-------- Fix me

  let moveablePiece = [stacks[startStack].length-1];
  let targetLocation = stacks[endStack];
  if(moveablePiece > 0 && targetLocation.length == 0){
    return true;
  }else{
    return false;
  }
}

const isLegalCharacter = (startStack, endStack) => {
  if(startStack === ('a' || 'b' || 'c') && endStack === ('a' || 'b' || 'c')){
    return true;
  }else{
    return false;
  }
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  if(stacks.b.length === 4 || stacks.c.length === 4){
    return true;
  }else{
    return false;
  }

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  //startStack = startStack.toLowerCase();
  // Your code here
  checkForWin();
  if(isLegal(startStack, endStack) === true){
    movePiece(startStack, endStack);
  }else{
    console.log("--- " + startStack + " to " + endStack + " is an invalid move ---");
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests
if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
  //CUSTOM TESTS
  //test ideas (verify numbers, trim whitespace, reset board)
  //Test 1
  describe('#isLegalCharacter()', () => {
    it('should not allow an illegal character', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegalCharacter('1', 'X'), false);
    });
  });
  // //Test 2
  // describe('#isLegal()', () => {
  //   it('should not allow a capital character', () => {
  //     assert.equal(towersOfHanoi('A', 'B'), false);
  //   });
  // });
  // //Test 3
  // describe('#isLegal()', () => {
  //   it('should not allow spaces', () => {
  //     assert.equal(towersOfHanoi(' '), false);
  //   });
  // });

} else {
  getPrompt();

}
