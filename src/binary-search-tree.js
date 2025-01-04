const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      this.#addNode(this.rootNode, newNode);
    }
  }

  #addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.#addNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.#addNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this.#hasNode(this.rootNode, data);
  }

  #hasNode(node, data) {
    if (node === null) {
      return false;
    }

    if (data < node.data) {
      return this.#hasNode(node.left, data);
    } else if (data > node.data) {
      return this.#hasNode(node.right, data);
    }

    return true;
  }

  find(data) {
    return this.#findNode(this.rootNode, data);
  }

  #findNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      return this.#findNode(node.left, data);
    } else if (data > node.data) {
      return this.#findNode(node.right, data);
    }

    return node;
  }

  remove(data) {
    this.rootNode = this.#removeNode(this.rootNode, data);
  }

  #removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this.#removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.#removeNode(node.right, data);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      const minNode = this.#findMinNode(node.right);
      node.data = minNode.data;
      node.right = this.#removeNode(node.right, minNode.data);
    }

    return node;
  }

  #findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  min() {
    if (this.rootNode === null) {
      return null;
    }
    const minNode = this.#findMinNode(this.rootNode);
    return minNode.data;
  }

  max() {
    if (this.rootNode === null) {
      return null;
    }
    let current = this.rootNode;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
