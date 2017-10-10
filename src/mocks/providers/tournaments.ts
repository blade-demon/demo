import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Tournament } from '../../models/tournament';

@Injectable()
export class Tournaments {
  tournaments: Tournament[] = [];

  defaultTournament: any = {
    name: "NBA 2K18练习赛",
    coverImg: "http://wechatservice.gamepoch.com/images/DKVavutUIAAqfxE.jpg",
    location: "上海圣诺亚大酒店",
    time: "2017-10-01",
    desc: "NBA 2K18练习赛是一场由Gamepoch星游纪举办的NBA 2K18线下比赛",
    status: "进行中"
  };

  constructor(public http: Http) {
    let tours = [
      {
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
        "name": "NBA 2K18训练赛",
        "coverImg": "https://pbs.twimg.com/media/DKlyvo0UMAAYr9p.jpg",
        "location": "上海圣诺亚大酒店",
        "time": "2017-08-10",
        "desc": "NBA 2K18亚洲锦标赛中国赛训练赛3",
        "status": "已结束"
      }
    ];

    for (let tour of tours) {
      this.tournaments.push(tour);
    }
  }

  query(params?: any) {
    if (!params) {
      return this.tournaments;
    }

    return this.tournaments.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(tournament: Tournament) {
    this.tournaments.push(tournament);
  }

  delete(match: Tournament) {
    this.tournaments.splice(this.tournaments.indexOf(match), 1);
  }
}
