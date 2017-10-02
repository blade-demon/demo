export class NBATeamsService {
  private nbateams: { name, image }[] = [{
    name: '亚特兰大老鹰',
    image: 'assets/img/teams/ATL.svg'
  },{
    name: '布鲁克林篮网',
    image: 'assets/img/teams/BKN.svg'
  },{
    name: '波士顿凯尔特人',
    image: 'assets/img/teams/BOS.svg'
  },{
    name: '夏洛特山猫',
    image: 'assets/img/teams/CHA.svg'
  },{
    name: '芝加哥公牛',
    image: 'assets/img/teams/CHI.svg'
  },{
    name: '克利夫兰骑士',
    image: 'assets/img/teams/CLE.svg'
  },{
    name: '达拉斯小牛',
    image: 'assets/img/teams/DAL.svg'
  },{
    name: '丹佛掘金',
    image: 'assets/img/teams/DEN.svg'
  },{
    name: '底特律活塞',
    image: 'assets/img/teams/DET.svg'
  },{
    name: '金州勇士',
    image: 'assets/img/teams/GSW.svg'
  },{
    name: '休斯敦火箭',
    image: 'assets/img/teams/HOU.svg'
  },{
    name: '印第安纳步行者',
    image: 'assets/img/teams/IND.svg'
  },{
    name: '洛杉矶快船',
    image: 'assets/img/teams/LAC.svg'
  },
  {
    name: '洛杉矶湖人',
    image: 'assets/img/teams/LAL.svg'
  },
  {
    name: '孟菲斯灰熊',
    image: 'assets/img/teams/MEM.svg'
  },
  {
    name: '迈阿密热火',
    image: 'assets/img/teams/MIA.svg'
  },{
    name: '密尔沃基雄鹿',
    image: 'assets/img/teams/MIL.svg'
  },
  {
    name: '明尼苏达森林狼 ',
    image: 'assets/img/teams/MIN.svg'
  },{
    name: '新奥尔良鹈鹕',
    image: 'assets/img/teams/NOP.svg'
  },
  {
    name: '纽约尼克斯',
    image: 'assets/img/teams/NYK.svg'
  },
  {
    name: '俄克拉荷马雷霆',
    image: 'assets/img/teams/OKC.svg'
  },{
    name: '奥兰多魔术',
    image: 'assets/img/teams/ORL.svg'
  },{
    name: '费城76人',
    image: 'assets/img/teams/PHI.svg'
  },{
    name: '菲尼克斯太阳',
    image: 'assets/img/teams/PHX.svg'
  },{
    name: '波特兰开拓者',
    image: 'assets/img/teams/POR.svg'
  },{
    name: '萨克拉门多国王',
    image: 'assets/img/teams/SAC.svg'
  },{
    name: '圣安东尼奥马刺',
    image: 'assets/img/teams/SAS.svg'
  },{
    name: '多伦多猛龙',
    image: 'assets/img/teams/TOR.svg'
  },{
    name: '犹他爵士',
    image: 'assets/img/teams/UTA.svg'
  },{
    name: '华盛顿奇才',
    image: 'assets/img/teams/WAS.svg'
  }];

  getNBATeams() {
    return this.nbateams.slice();
  }
}
