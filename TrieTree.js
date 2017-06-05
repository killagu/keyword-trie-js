/**
 * Created by killa on 01/06/2017.
 */
'use strict';
const TrieNode = require('./TrieNode');

class TrieTree {
  constructor() {
    this.root = new TrieNode();
    this.compiled = false;
    this.skipWords = new Set();
  }

  /**
   * add word should replace
   * @param {string} word
   */
  add(word) {
    if (!word) throw new TypeError(`word ${word} is empty`);
    if (this.compiled) throw new Error(`tree is compiled`);
    const last = this.root.extend(word.split(''));
    last.setResult(word);
  }

  /**
   * add word should skip
   * @param {string} word
   */
  addSkip(word) {
    this.skipWords.add(word);
  }

  /**
   * add words should skip
   * @param {Array.<string>} words
   */
  addSkipWords(words) {
    words.forEach(t => this.addSkip(t));
  }

  /**
   * compile and build fail path
   */
  compile() {
    this.buildFailPath();
    this.compiled = true;
  }

  /**
   * replace input with func
   * @param {string} input
   * @param {function} func func should accept string return string[]
   * @return {string}
   */
  replace(input, func) {
    let ret = [];
    const length = input.length;
    let last = this.root;
    let preKeyword = null;
    let count = 0;
    let buf = [];
    for (let i = 0; i < length; ++i) {
      const ch = input[i];
      if (this.skipWords.has(ch)) continue;
      let failed = false;
      while (!last.get(ch) && last !== this.root) {
        last = last.getFail();
        failed = true;
      }
      if (failed) {
        const match = count - (preKeyword && preKeyword.length);
        count = 0;
        last = this.root;
        if (preKeyword) {
          this.replaceStr(ret, preKeyword, func);
          preKeyword = null;
          buf = [];
          if (match) {
            i = i - match - 1;
            continue;
          }
        } else if (buf.length) {
          ret.push.apply(ret, buf);
          buf = [];
        }
      }
      last = last.get(ch);
      if (!last) {
        last = this.root;
        ret.push(ch);
      } else if (!last.leaf || last.getResult()) {
        buf.push(ch);
        preKeyword = last.getResult() || preKeyword;
        count++;
        if (i === length - 1) {
          if (preKeyword) {
            this.replaceStr(ret, preKeyword, func);
            const match = count - (preKeyword && preKeyword.length);
            preKeyword = null;
            count = 0;
            buf = [];
            i = i - match;
          } else {
            ret.push(ch);
          }
        }
      }
    }
    return ret.join('');
  }

  replaceStr(ret, preKeyword, func) {
    ret.push.apply(ret, func(preKeyword));
  }

  /**
   * build fail path
   */
  buildFailPath() {
    const nodes = [];
    const keys = this.root.keys;
    const keyLength = keys.length;
    for (let i = 0; i < keyLength; ++i) {
      const key = keys[i];
      const child = this.root.get(key);
      child.setFail(this.root);
      nodes.push(child);
    }

    while (nodes.length) {
      const node = nodes.pop();
      const keys = node.keys;
      const keyLength = keys.length;
      for (let i = 0; i < keyLength; ++i) {
        let r = node;
        const ch = keys[i];
        const child = r.get(ch);
        nodes.push(child);
        do {
          r = r.getFail();
        } while (r && !r.get(ch));
        child.setFail(r ? r.get(ch) : this.root);
      }
    }
  }
}

module.exports = TrieTree;