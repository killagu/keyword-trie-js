# keyword-trie-js
replace keywords base trie
thanks for https://github.com/xhlian/keyword


## usage
``` js
const TrieTree = require('TrieTree');
const tree = new TrieTree();
const keywords = ['5', '6'];
keywords.forEach(t => tree.add(t));
tree.compile();
const str = '555test661555';
const res = tree.replace(str, replaceFunc);
console.log(res);
```