import { Node } from "./node.js";

export class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        if (array.length === 0) {
            return null;
        }

        let noDuplicates = new Set(array);
        let uniqueArray = Array.from(noDuplicates);
        uniqueArray.sort((a, b) => a - b);

        let middleIndex = Math.floor(uniqueArray.length / 2);
        let leftHalf = uniqueArray.slice(0, middleIndex);
        let rightHalf = uniqueArray.slice(middleIndex + 1);

        let middleValue = uniqueArray[middleIndex];
        let leftChild = this.buildTree(leftHalf);
        let rightChild = this.buildTree(rightHalf);

        return new Node(middleValue, leftChild, rightChild);
    }

    includes(value) {
        let current = this.root;
        while(current !== null) {
            if (value === current.value) {
                return true;
            } else if (value < current.value) {
                current = current.leftNode;
            } else {
                current = current.rightNode;
            }
        }

        return false;
    }

    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        let current = this.root;   
        while(current !== null) {
            if (value === current.value) {
                return;
            } else if (value < current.value) {
                if (current.leftNode === null) {
                    const node = new Node(value);
                    current.leftNode = node;
                    return;
                } else {
                    current = current.leftNode
                }
            } else {
                if (current.rightNode === null) {
                    const node = new Node(value);
                    current.rightNode = node;
                    return
                } else {
                    current = current.rightNode;
                }
            }
        }
    }

    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.leftNode = this.deleteNode(node.leftNode, value);
            return node; 
        } else if (value > node.value) {
            node.rightNode = this.deleteNode(node.rightNode, value);
            return node;
        }   
        
        else {
            if (node.leftNode === null && node.rightNode === null) {
                return null;
            }

            if (node.leftNode === null) {
                return node.rightNode; 
            }

            if (node.rightNode === null) {
                return node.leftNode; 
            }

            let successor = this.findSmallest(node.rightNode);
            node.value = successor.value;
            node.rightNode = this.deleteNode(node.rightNode, node.value);
            return node;
        }
    }

    findSmallest(node) {
        let current = node;
        while (current.leftNode !== null) {
            current = current.leftNode;
        }
        return current; 
    }
}