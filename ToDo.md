https://cyber-dojo.org/creator/choose_problem?type=single

Remove Duplicates
Define a function RemoveDuplicate(nlist) to remove duplicate elements from list.

Here are some examples:

[] -> []

[1,2] -> [1,2]

[1,1,2,2,3,3] -> [1,2,3]
var nums = [1,1,2,2,3,3],
unique = [];

function RemoveDuplicate(nlist){
    nlist.forEach(num=>{
        if(!unique.includes(num)){
            unique.push(num);
        }
    });
}
RemoveDuplicates(nums);
console.log({unique})
Author: Ramya V, KGISL
------

ABC problem
You are given a collection of ABC blocks (maybe like the ones you had when you were a kid).
There are twenty blocks with two letters on each block.
A complete alphabet is guaranteed amongst all sides of the blocks.
The sample collection of blocks:

 (B O)
 (X K)
 (D Q)
 (C P)
 (N A)
 (G T)
 (R E)
 (T G)
 (Q D)
 (F S)
 (J W)
 (H U)
 (V I)
 (A N)
 (O B)
 (E R)
 (F S)
 (L Y)
 (P C)
 (Z M)

Task
Write a function that takes a string (word) and determines whether the word can be spelled with the given collection of blocks.
The rules are simple:
   1. Once a letter on a block is used that block cannot be used again
   2. The function should be case-insensitive
   3. Show the output on this page for the following 7 words in the following example

Example

>>> can_make_word("A")
True
>>> can_make_word("BARK")
True
>>> can_make_word("BOOK")
False
>>> can_make_word("TREAT")
True
>>> can_make_word("COMMON")
False
>>> can_make_word("SQUAD")
True
>>> can_make_word("CONFUSE")
True

[Source https://rosettacode.org/wiki/ABC_Problem]

     