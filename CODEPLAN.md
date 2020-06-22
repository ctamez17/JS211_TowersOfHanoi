# Objective
1. Move pieces from one stack to another

# Functions
1. Build object of arrays to hold "stacks." 
    ex: [a, b, c, d]
2. Check if piece is moveable, create variables 'startStack' and 'endStack'.
3. Check if move and character are legal.

# To Win
1. Move pieces from stack 'a' to either 'b' or 'c'. 
    if(stacks.b.length === 4 || stacks.c.length === 4)