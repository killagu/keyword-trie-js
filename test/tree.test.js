/**
 * Created by killa on 02/06/2017.
 */
"use strict";
const TrieTree = require('../TrieTree');
const should = require('should');
const dirty = require('../dirty');

describe('test tree', () => {
  let keywords, str, replaceFunc;
  before(() => {
    replaceFunc = rep => {
      return new Array(rep.length).fill('*')
    };
  });

  describe('test replace', () => {
    before(() => {
      keywords = ['1', '2', '3'];
      str = '123test321';
    });

    it('should success', () => {
      const tree = new TrieTree();
      keywords.forEach(t => tree.add(t));
      tree.compile();
      const res = tree.replace(str, replaceFunc);
      should.equal(res, '***test***');
    });
  });

  describe('test skip words', () => {
    let skipWords;
    before(() => {
      keywords = ['1', '2', '3'];
      str = '1.2-3test321';
      skipWords = ['.', '-'];
    });

    it('should success', () => {
      const tree = new TrieTree();
      keywords.forEach(t => tree.add(t));
      tree.addSkipWords(skipWords);
      tree.compile();
      const res = tree.replace(str, replaceFunc);
      should.equal(res, '***test***');
    });
  });

  describe('one word replace', () => {
    before(() => {
      keywords = ['5', '6'];
      str = '555test661555';
    });

    it('should success', () => {
      const tree = new TrieTree();
      keywords.forEach(t => tree.add(t));
      tree.compile();
      const res = tree.replace(str, replaceFunc);
      should.equal(res, '***test**1***');
    });
  });

  describe('overlap replace', () => {
    before(() => {
      keywords = ['55', '551'];
      str = '555test551555';
    });

    it('should success', () => {
      const tree = new TrieTree();
      keywords.forEach(t => tree.add(t));
      tree.compile();
      const res = tree.replace(str, replaceFunc);
      should.equal(res, '**5test*****5');
    });
  });

  describe('ten thousand keywords', () => {
    let tree;
    before(() => {
      keywords = dirty;
      str = `5月31日下午，上海市经信委主任陈鸣波在市政府新闻发布会上介绍了上海市政府最新出台的《关于创新驱动发展巩固提升实体经济能级的若干意见》主要内容，指出将聚焦政策，突破、优化振兴实体经济新举措。

陈鸣波表示，上海将通过梳理国家和上海政策措施，加强政策系统集成和落地见效。如在推进产业结构调整方面，将建立“压减”与“新增”对接机制；在加大调整落后产能力度，今年全市实施市级调整项目1300项、重点区域调整16个；同时坚持“边拔边种”，依托市产业结构调整盘活信息服务平台，加快新兴产业导入速度。

陈鸣波表示，将落实智能制造实施意见。创新智能制造应用模式，开展智能制造应用“十百千”工程，到2020年重点培育10家引领性智能制造系统解决方案供应商、100家示范性智能工厂、带动1000家左右规模以上企业实施智能化转型，以新业态新模式促进传统产业改造提升。

陈鸣波说，《若干意见》对创新体制机制，释放发展活力提出了要求，将通过制度创新破瓶颈、补短板，促进全市经济协同一体、集约高效发展。出台产业统筹招商等政策。建立市区联动、以区为主、多部门协同的统筹招商机制，搭建全市产业项目及资源的信息集成和供需对接平台，保障关键资源要素供给，协调跨区产业项目迁移拓展等工作；引导区级层面建立产业统筹招商平台，加强土地、项目、产业布局等统筹优化。

陈鸣波说，《若干意见》还将后续研究落实一批政策措施。包括完善科技成果转化协调机制，促进创新成果在产业基地和园区产业化；在落实“人才30条”基础上，着力破解人才住房问题，鼓励企事业单位、产业园区自建人才公寓等配套服务设施等。

陈鸣波表示，将落实智能制造实施意见。创新智能制造应用模式，开展智能制造应用“十百千”工程，到2020年重点培育10家引领性智能制造系统解决方案供应商、100家示范性智能工厂、带动1000家左右规模以上企业实施智能化转型，以新业态新模式促进传统产业改造提升。

陈鸣波说，《若干意见》对创新体制机制，释放发展活力提出了要求，将通过制度创新破瓶颈、补短板，促进全市经济协同一体、集约高效发展。出台产业统筹招商等政策。建立市区联动、以区为主、多部门协同的统筹招商机制，搭建全市产业项目及资源的信息集成和供需对接平台，保障关键资源要素供给，协调跨区产业项目迁移拓展等工作；引导区级层面建立产业统筹招商平台，加强土地、项目、产业布局等统筹优化。

陈鸣波说，《若干意见》还将后续研究落实一批政策措施。包括完善科技成果转化协调机制，促进创新成果在产业基地和园区产业化；在落实“人才30条”基础上，着力破解人才住房问题，鼓励企事业单位、产业园区自建人才公寓等配套服务设施等。`;
      tree = new TrieTree();
      keywords.forEach(t => tree.add(t));
      tree.compile();
    });

    it('should success', () => {
      tree.replace(str, replaceFunc);
    });
  });
});