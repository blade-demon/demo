export class MatchesService {
  private matches: { name, location, time, desc, status, coverImg }[] = [{
    name: "NBA 2K18练习赛",
    coverImg: "http://wechatservice.gamepoch.com/images/DKVavutUIAAqfxE.jpg",
    location: "上海圣诺亚大酒店",
    time: "2017-10-01",
    desc: "NBA 2K18练习赛是一场由Gamepoch星游纪举办的NBA 2K18线下比赛",
    status: "进行中"
  }, {
    name: "亚洲锦标赛中国赛",
    coverImg: "http://wechatservice.gamepoch.com/images/DJKFPgFUEAELlmP.jpg",
    location: "上海线下比赛",
    time: "2017-11-01",
    desc: "NBA 2K18亚洲锦标赛中国赛",
    status: "报名中"
  }, {
    name: "NBA 2K18训练赛1",
    coverImg: "https://pbs.twimg.com/media/DK7Gl3xUEAAC8pU.jpg:small",
    location: "上海环球港",
    time: "2017-10-20",
    desc: "NBA 2K18亚洲锦标赛中国赛训练赛1",
    status: "报名中"
  }, {
    name: "NBA 2K18训练赛2",
    coverImg: "https://pbs.twimg.com/media/DKvmhwnU8AAfolC.jpg:small",
    location: "上海梅赛德斯奔驰中心",
    time: "2016-10-22",
    desc: "NBA 2K18亚洲锦标赛中国赛训练赛2",
    status: "报名中"
  }, {
    name: "NBA 2K18训练赛",
    coverImg: "https://pbs.twimg.com/media/DKlyvo0UMAAYr9p.jpg",
    location: "上海圣诺亚大酒店",
    time: "2017-08-10",
    desc: "NBA 2K18亚洲锦标赛中国赛训练赛3",
    status: "已结束"
  }];

  getMatchesInfo() {
    return this.matches.slice();
  }
}
