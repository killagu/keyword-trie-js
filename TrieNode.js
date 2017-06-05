/**
 * Created by killa on 01/06/2017.
 */
'use strict';
class TrieNode {
  constructor() {
    this.children = {};
    this.fail = null;
    this.result = null;
    this.keys = [];
    this.leaf = false;
  }

  extend(word) {
    let node = this;
    const length = word.length;
    for (let i = 0; i < length; ++i) {
      node = node.touchChild(word[i]);
    }
    node.leaf = true;
    node.setResult(word);
    return node;
  }

  touchChild(ch) {
    const child = this.get(ch);
    if (child) {
      child.leaf = false;
      return child;
    }
    const next = new TrieNode();
    this.put(ch, next);
    return next;
  }

  get(ch) {
    return this.children[ch];
  }

  put(ch, node) {
    this.keys.push(ch);
    return this.children[ch] = node;
  }

  getFail() {
    return this.fail;
  }

  setFail(node) {
    return this.fail = node;
  }

  setResult(result) {
    this.result = result;
  }

  getResult() {
    return this.result;
  }
}

module.exports = TrieNode;