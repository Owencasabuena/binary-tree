import { Tree } from "./tree.js";

// A small helper function to print the tree visually in the console
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.rightNode !== null) {
        prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftNode !== null) {
        prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Helper function to generate an array of random numbers under 100
function generateRandomArray(size) {
    const arr = [];
    while (arr.length < size) {
        const randomNum = Math.floor(Math.random() * 100);
        arr.push(randomNum);
    }
    return arr;
}

// --- DRIVER SCRIPT EXECUTION ---

console.log("Creating a balanced Binary Search Tree from random numbers...");
const randomNumbers = generateRandomArray(15);
const tree = new Tree(randomNumbers);

console.log("\nVisual Tree Structure:");
prettyPrint(tree.root);

// 1. Confirm that the tree is balanced
console.log(`\nIs the tree balanced? -> ${tree.isBalanced()}`);

// 2. Print out all elements in specific traversal orders
console.log("\n--- TREE TRAVERSALS ---");

const levelOrderElements = [];
tree.levelOrderForEach(val => levelOrderElements.push(val));
console.log(`Level-Order : [ ${levelOrderElements.join(", ")} ]`);

const preOrderElements = [];
tree.preOrderForEach(val => preOrderElements.push(val));
console.log(`Pre-Order   : [ ${preOrderElements.join(", ")} ]`);

const postOrderElements = [];
tree.postOrderForEach(val => postOrderElements.push(val));
console.log(`Post-Order  : [ ${postOrderElements.join(", ")} ]`);

const inOrderElements = [];
tree.inOrderForEach(val => inOrderElements.push(val));
console.log(`In-Order    : [ ${inOrderElements.join(", ")} ]`);

// 3. Unbalance the tree by adding several numbers > 100
console.log("\nInjecting large numbers to unbalance the tree...");
tree.insert(150);
tree.insert(200);
tree.insert(250);
tree.insert(300);

console.log("\nNew Visual Tree Structure (Heavy on the right side):");
prettyPrint(tree.root);

// 4. Confirm that the tree is now unbalanced
console.log(`\nIs the tree balanced now? -> ${tree.isBalanced()}`);

// 5. Balance the tree by calling rebalance
console.log("\nRebalancing the tree...");
tree.rebalance();

console.log("\nFinal Visual Tree Structure (Perfectly flattened):");
prettyPrint(tree.root);

// 6. Confirm that the tree is balanced again
console.log(`\nIs the tree balanced again? -> ${tree.isBalanced()}`);