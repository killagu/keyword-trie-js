# keyword-trie-js
replace keywords base trie
thanks for https://github.com/xhlian/keyword

## install
```
npm install --save keyword-trie-js
```

## usage
``` js
function replaceFunc(replace) {
  return new Array(replace.length).fill('*').join();
}

const TrieTree = require('keyword-trie-js');
const tree = new TrieTree();
const keywords = ['5', '6'];
keywords.forEach(t => tree.add(t));
tree.compile();
const str = '555test661555';
const res = tree.replace(str, replaceFunc);
console.log(res); //print ***test**1***
```
