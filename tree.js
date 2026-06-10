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

    levelOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required!'); 
        }

        let queue = [];
        queue.push(this.root);
        while(queue.length > 0) {
            let current = queue.shift();
            callback(current.value);
            if(current.leftNode !== null) {
                queue.push(current.leftNode);
            } 

            if(current.rightNode !== null) {
                queue.push(current.rightNode);
            }
        }
    }

    inOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required!'); 
        }
        this.inOrderForNode(this.root, callback);
    }

    inOrderForNode(node, callback) {
        if (node === null) return;

        this.inOrderForNode(node.leftNode, callback);
        callback(node.value);
        this.inOrderForNode(node.rightNode, callback);
    }

    preOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required!'); 
        }
        this.preOrderForNode(this.root, callback);
    }

    preOrderForNode(node, callback) {
        if (node === null) return;

        callback(node.value);
        this.preOrderForNode(node.leftNode, callback);
        this.preOrderForNode(node.rightNode, callback);
    }

    postOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required!');
        }
        this.postOrderForNode(this.root, callback);
    }

    postOrderForNode(node, callback) {
        if (node === null) return;

        this.postOrderForNode(node.leftNode, callback);
        this.postOrderForNode(node.rightNode, callback);
        callback(node.value);
    }

    depth(value) {
        let depthCounter = 0;
        let current = this.root;
        while(current !== null) {
            if (value === current.value) {
                return depthCounter;
            } else if (value < current.value) {
                current = current.leftNode;
                depthCounter++;
            } else {
                current = current.rightNode;
                depthCounter++;
            }
        }

        return undefined;
    }

    height(value) {
        let heightCounter = 0;
        let current = this.root;
        while(current !== null) {
            if (value === current.value) {
                return this.calculateHeight(current);
            } else if (value < current.value) {
                current = current.leftNode;
            } else {
                current = current.rightNode;
            }
        }

        return undefined;
    }

    calculateHeight(node) {
        if (node === null) return -1;
        let leftHeight = this.calculateHeight(node.leftNode);
        let rightHeight = this.calculateHeight(node.rightNode);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    isBalanced() {
        return this.checkBalance(this.root);
    }

    checkBalance(node) {
        if (node === null) return true;

        let leftHeight = this.calculateHeight(node.leftNode);
        let rightHeight = this.calculateHeight(node.rightNode);
        if (
            Math.abs(leftHeight - rightHeight) <= 1 &&
            this.checkBalance(node.leftNode) &&
            this.checkBalance(node.rightNode)
        ) {
            return true; 
        }
        
        return false;
    }

    rebalance() {
        let values = [];

        this.inOrderForEach((val) => {
            values.push(val);
        });

        this.root = this.buildTree(values);
    }
}