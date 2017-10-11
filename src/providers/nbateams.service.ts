export class NBATeamsService {
  private nbateams: { index, name, image }[] = [{
    index: 0,
    name: '亚特兰大老鹰',
    image: 'assets/img/teams/ATL.svg'
  }, {
    index: 1,
    name: '布鲁克林篮网',
    image: 'assets/img/teams/BKN.svg'
  }, {
    index: 2,
    name: '波士顿凯尔特人',
    image: 'assets/img/teams/BOS.svg'
  }, {
    index: 3,
    name: '夏洛特山猫',
    image: 'assets/img/teams/CHA.svg'
  }, {
    index: 4,
    name: '芝加哥公牛',
    image: 'assets/img/teams/CHI.svg'
  }, {
    index: 5,
    name: '克利夫兰骑士',
    image: 'assets/img/teams/CLE.svg'
  }, {
    index: 6,
    name: '达拉斯小牛',
    image: 'assets/img/teams/DAL.svg'
  }, {
    index: 7,
    name: '丹佛掘金',
    image: 'assets/img/teams/DEN.svg'
  }, {
    index: 8,
    name: '底特律活塞',
    image: 'assets/img/teams/DET.svg'
  }, {
    index: 9,
    name: '金州勇士',
    image: 'assets/img/teams/GSW.svg'
  }, {
    index: 10,
    name: '休斯敦火箭',
    image: 'assets/img/teams/HOU.svg'
  }, {
    index: 11,
    name: '印第安纳步行者',
    image: 'assets/img/teams/IND.svg'
  }, {
    index: 12,
    name: '洛杉矶快船',
    image: 'assets/img/teams/LAC.svg'
  },
  {
    index: 13,
    name: '洛杉矶湖人',
    image: 'assets/img/teams/LAL.svg'
  },
  {
    index: 14,
    name: '孟菲斯灰熊',
    image: 'assets/img/teams/MEM.svg'
  },
  {
    index: 15,
    name: '迈阿密热火',
    image: 'assets/img/teams/MIA.svg'
  }, {
    index: 16,
    name: '密尔沃基雄鹿',
    image: 'assets/img/teams/MIL.svg'
  },
  {
    index: 17,
    name: '明尼苏达森林狼 ',
    image: 'assets/img/teams/MIN.svg'
  }, {
    index: 18,
    name: '新奥尔良鹈鹕',
    image: 'assets/img/teams/NOP.svg'
  },
  {
    index: 19,
    name: '纽约尼克斯',
    image: 'assets/img/teams/NYK.svg'
  },
  {
    index: 20,
    name: '俄克拉荷马雷霆',
    image: 'assets/img/teams/OKC.svg'
  }, {
    index: 21,
    name: '奥兰多魔术',
    image: 'assets/img/teams/ORL.svg'
  }, {
    index: 22,
    name: '费城76人',
    image: 'assets/img/teams/PHI.svg'
  }, {
    index: 23,
    name: '菲尼克斯太阳',
    image: 'assets/img/teams/PHX.svg'
  }, {
    index: 24,
    name: '波特兰开拓者',
    image: 'assets/img/teams/POR.svg'
  }, {
    index: 25,
    name: '萨克拉门多国王',
    image: 'assets/img/teams/SAC.svg'
  }, {
    index: 26,
    name: '圣安东尼奥马刺',
    image: 'assets/img/teams/SAS.svg'
  }, {
    index: 27,
    name: '多伦多猛龙',
    image: 'assets/img/teams/TOR.svg'
  }, {
    index: 28,
    name: '犹他爵士',
    image: 'assets/img/teams/UTA.svg'
  }, {
    index: 29,
    name: '华盛顿奇才',
    image: 'assets/img/teams/WAS.svg'
  }];

  getNBATeams() {
    return this.nbateams.slice();
  }
}
