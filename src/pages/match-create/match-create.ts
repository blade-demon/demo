import { Component, ViewChild } from "@angular/core"
import { NavController, ToastController, AlertController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { RecordResultPage } from '../record-result/record-result';
import { PlayerCreatePage } from '../player-create/player-create';
import { TeamSelectPage } from '../team-select/team-select';
import { MatchServiceProvider } from '../../providers/match-service/match-service';
import { Match } from '../../models/match';
import { NBATeamsService } from '../../providers/nbateams.service';
import { Api } from "../../providers/api/api";
import { Storage } from '@ionic/storage';
import * as randomize from 'randomatic';
declare var AzureStorage: any;
declare const Buffer;

@Component({
  selector: 'page-match-create',
  templateUrl: 'match-create.html'
})

export class MatchCreatePage {
  @ViewChild('fileInput') fileInput;

  teams: any[];
  tournament: any;
  team: any;
  match: any;
  gameRule: string;
  players: any[];

  matchId: string;
  matchFinalResult: string;

  showImagePlaceHolder: boolean;
  resultImage: any;
  blobStorageService: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nbateamsservice: NBATeamsService,
    public matchService: MatchServiceProvider,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public api: Api) {

    this.teams = this.nbateamsservice.getNBATeams();
    this.players = [];
    this.showImagePlaceHolder = false;
    this.match = {
      "tournamentId": "",
      "gameRule": "BO1",
      "playersId": [],
      "date": "",
      "results": []
    }

    // Azure Blob Storage Init
    this.blobStorageService = AzureStorage.createBlobService("DefaultEndpointsProtocol=https;AccountName=storeapp;AccountKey=cwzlYfEC+rSZRmt2ywr4GqVKytXsMvh/a6bIgH2zzlYLu5BLa2fvqMw1fHHkrEEugUlLlhBmik+GRQG4TpUtpQ==;EndpointSuffix=core.chinacloudapi.cn");
  }

  // 添加选手
  selectPlayer(playerIndex) {
    const modal = this.modalCtrl.create(PlayerCreatePage);
    modal.onDidDismiss((player) => {
      if (player) {
        console.log(`选手${playerIndex}是: ${player.name}`);
        this.match.playersId[playerIndex - 1] = player.celid;
        this.players[playerIndex - 1] = player;
        console.log(this.match);
      } else {
        // console.log(`选手${playerIndex}为空`);
      }
    });
    modal.present();
  }

  // 选择球队
  selectTeam(playerIndex, matchIndex) {
    if (!this.match.playersId[0] || !this.match.playersId[1] || this.match.results[matchIndex]) {
      return;
    }
    const modal = this.modalCtrl.create(TeamSelectPage);
    modal.onDidDismiss((team) => {
      if (team) {
        // console.log(`在第${matchIndex + 1}局比赛中，选手${playerIndex}选择的球队是，${team.name}`);
        if (!playerIndex) {
          // 第matchIndex+1场比赛的选手1的选手Id
          this.match.results[matchIndex].player1.playerId = this.match.playersId[playerIndex];
          // 第matchIndex+1场比赛的选手1的选手的队伍
          this.match.results[matchIndex].player1.teamId = team.index;
          console.log(team.index);
        } else {
          // 第matchIndex+1场比赛的选手2的选手Id
          this.match.results[matchIndex].player2.playerId = this.match.playersId[playerIndex];
          // 第matchIndex+1场比赛的选手2的选手的队伍
          this.match.results[matchIndex].player2.teamId = team.index;
        }
      } else {
        console.log(`在第${matchIndex + 1}局比赛中，选手${playerIndex}选择的球队为空`);
      }
    })
    modal.present();
  }

  // 添加新的比赛纪录
  addNewMatch() {
    if (this.matchId) {
      let confirm = this.alertCtrl.create({
        title: '注意',
        message: '确定要新建比赛记录吗？',
        buttons: [
          {
            text: '取消',
            handler: () => { }
          },
          {
            text: '确定',
            handler: () => {
              // 初始化服务
              this.initialData();
              this.match.tournamentId = this.tournament._id;
              // 清空图片
              this.showImagePlaceHolder = false;
              this.resultImage=null;
              // 显示创建比赛对话框
              const loading = this.loadingCtrl.create({
                content: '创建比赛中...'
              });
              loading.present();
              this.api.post('matches', {
                "tournamentId": this.tournament,
                "gameRule": "BO1"
              }).subscribe(data => {
                loading.dismiss();
                this.matchId = data.json()._id;
                this.match.gameRule = data.json().gameRule;
                this.matchService.setMatchInfo(this.matchId);
              }, (error) => {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                  title: '错误',
                  subTitle: `创建比赛记录失败, ${error}`,
                  buttons: ['确定']
                });
                alert.present();
              });
            }
          }
        ]
      });
      confirm.present();
    } else {
      const loading = this.loadingCtrl.create({
        content: '创建比赛中...'
      });
      loading.present();
      this.api.post('matches', {
        "tournamentId": this.tournament,
        "gameRule": "BO1"
      }).subscribe(data => {
        loading.dismiss();
        this.matchId = data.json()._id;
        this.match.gameRule = data.json().gameRule;
        this.matchService.setMatchInfo(this.matchId);
      }, (error) => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: '错误',
          subTitle: `创建比赛记录失败, ${error}`,
          buttons: ['确定']
        });
        alert.present();
      });
    }
  }

  ionViewWillEnter() {
    // 已存在缓存比赛结果
    //   console.log("已缓存的比赛数据：" + data);
    //   this.matchId = data[0].matchId;
    //   let matchCount = this.getMatchCount();
    //   let currentMatchCount = data.length / 2;
    //   console.log("matchCount", matchCount);
    //   console.log("currentMatchCount", currentMatchCount);
    //   if (matchCount >= currentMatchCount) {
    //     console.log("已记录比赛记录", this.match.results);
    //     this.addNewResult(this.match.results);
    //     console.log("待更新比赛记录", this.match.results);
    //   }
    //   this.matchService.getTournament().then(data => {
    //     this.tournament = JSON.parse(data);
    //   });
    //   console.log(this.tournament);
    // } else {
    // 新比赛
    this.tournament = this.navParams.get("tournament");
    this.match.tournamentId = this.tournament._id;
    this.storage.set("tournament", this.tournament._id);
    // }
  }

  // 记录比赛详细数据
  onRecordResult(index) {
    console.log("详细记录比赛数据");
    this.match.results[index].player1.matchId = this.matchId;
    this.match.results[index].player2.matchId = this.matchId;
    this.match.results[index].player1.matchIndex = index;
    this.match.results[index].player2.matchIndex = index;
    this.navCtrl.push(RecordResultPage, { index: index, match: this.match });
  }

  getMatchCount() {
    console.log(this.match.gameRule);
    return Number(this.match.gameRule.slice(2));
  }

  // 确定是否添加比赛
  addNewResult(data) {
    let gameCount = this.getMatchCount();
    let p1WinCount = 0;
    let p2WinCount = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].player1.win) {
        p1WinCount++;
      } else {
        p2WinCount++;
      }
    }
    let winCount = Math.floor(gameCount / 2) + 1;
    console.log("选手1赢得比赛次数：", p1WinCount);
    console.log("选手2赢得比赛次数：", p2WinCount);
    console.log("需要赢得的比赛次数为：", winCount);
    if (p1WinCount < winCount && p2WinCount < winCount) {
      this.match.results.push({
        "player1": {
          "playerId": "",
          "matchId": "",
          "teamId": null,
          "matchIndex": -1,
          "score": null,
          "gotShots": null,
          "shots": null,
          "gotThreePointsShots": null,
          "threePointsShots": null,
          "gotPenaltyShots": null,
          "penaltyShots": null,
          "fastBreakScore": null,
          "freeThrowLaneScore": null,
          "secondAttackScore": null,
          "substituteScore": null,
          "assists": null,
          "offensiveRebounds": null,
          "defensiveRebounds": null,
          "steals": null,
          "blockShots": null,
          "turnovers": null,
          "turnoverScores": null,
          "teamFouls": null,
          "maxLeadScore": null,
          "possessionTime": "0",
          "remainingPauses": null,
          "win": false
        }, "player2": {
          "matchId": "",
          "playerId": "",
          "teamId": null,
          "matchIndex": -1,
          "score": null,
          "gotShots": null,
          "shots": null,
          "gotThreePointsShots": null,
          "threePointsShots": null,
          "gotPenaltyShots": null,
          "penaltyShots": null,
          "fastBreakScore": null,
          "freeThrowLaneScore": null,
          "secondAttackScore": null,
          "substituteScore": null,
          "assists": null,
          "offensiveRebounds": null,
          "defensiveRebounds": null,
          "steals": null,
          "blockShots": null,
          "turnovers": null,
          "turnoverScores": null,
          "teamFouls": null,
          "maxLeadScore": null,
          "possessionTime": "0",
          "remainingPauses": null,
          "win": false
        }
      });
    } else {
      this.matchFinalResult = p1WinCount > p2WinCount ? `选手1获胜` : `选手2获胜`;
    }
  }

  // 初始化数据
  initialData() {
    this.players = [];
    this.match.playersId = [];

    this.match = {
      "tournamentId": "",
      "gameRule": "BO1",
      "playersId": [],
      "date": "",
      "results": []
    }
    this.matchFinalResult = "";
  }

  // 交换顺序
  doSwap() {
    console.log("修改之前", this.players);
    this.players = this.players.reverse();
    this.match.playersId = this.match.playersId.reverse();
    console.log("交换顺序");
    console.log(this.players);
  }

  // 上传数据
  uploadData() {
    const loading = this.loadingCtrl.create({
      content: '数据上传中...'
    });
    loading.present();

    let savedArray = [];
    for (let i = 0; i < this.match.results.length; i++) {
      savedArray.push(randomize('Aa0', 20));
    }
    console.log(savedArray);
    // 上传图片到Blob Storage
    this.uploadImg(this.match.results, savedArray, (err, result) => {
      this.uploadDataToServer(savedArray).then(() => {
        loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            subTitle: '数据上传成功!',
            buttons: ['确定']
          });
          alert.present();
        });
      }).catch(e => {
        alert(e);
      });
    })
  }

  // 上传最终数据到服务器
  uploadDataToServer(imageArray) {
    return new Promise((resolve, reject) => {
      imageArray.forEach(image => {
        // 上传成功后post结果到服务器
        let matchResult = {
          "matchId": this.matchId,
          "matchIndex": 0,
          "players": this.match.playersId,
          "resultImages": `https://storeapp.blob.core.chinacloudapi.cn/match/${image}.jpeg`
        };
        this.api.post('matchresults', matchResult).subscribe((resp) => {
          resolve();
        }, error => {
          reject(error);
        });
      });
    });
  }


  getPicture() {
    this.fileInput.nativeElement.click();
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      // this.form.patchValue({ 'profilePic': imageData });
      this.resultImage = imageData;
      this.match.results.push(imageData);
    };
    if (event.target.files[0]) {
      this.showImagePlaceHolder = true;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getProfileImageStyle() {
    return 'url(' + this.resultImage + ')'
  }

  // 确认是否可以上传照片
  canUpload() {
    return this.match.tournamentId != "" && this.match.gameRule != "" && this.match.results.length != 0 && this.match.playersId.length === 2;
  }

  // 上传图片
  uploadImg(files: any[], savedArray, callback) {
    if (!files.length) {
      return;
    }

    // 创建容器
    this.createContainer("match", (error, result) => {
      if (!error) {
        // 上传Blob
        this.uploadFiles("match", files, savedArray, function (error, result) {
          if (!error) {
            callback(null, "上传结果：" + result);
          } else {
            callback(error, "上传失败：" + error);
          }
        });
      } else {
        callback(error, "上传失败：" + error);
      }
    });
  }

  // 检查container是否存在, 如果不存在就为门店创建一个容器
  createContainer(container, cb) {
    this.blobStorageService.createContainerIfNotExists(container, { publicAccessLevel: 'blob' }, function (error, result, response) {
      if (!error) {
        if (result) {
          cb(null, "容器已经创建");
        } else {
          cb(null, "容器已存在");
        }
      } else {
        cb(error, "出现错误");
      }
    });
  }

  // 上传文件
  uploadFiles(containerName, files, savedArray, callback) {
    var finished = 0;
    var blobService = this.blobStorageService;
    // console.log(files);
    files.forEach(function (file, index) {
      // var blobName = file.replace(/^.*[\\\/]/, '');
      var fileInfo = [];
      fileInfo = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      // console.log(fileInfo);
      var type = fileInfo[1];
      //alert(this.employeeInfo.Name);
      var blobName = savedArray[index] + ".jpeg";
      var fileBuffer = new Buffer(fileInfo[2], "base64");
      // console.log(fileBuffer);
      blobService.createBlockBlobFromText(containerName, blobName, fileBuffer, { contentType: type }, function (error, result, response) {
        finished++;
        if (error) {
          callback(error);
        } else {
          if (finished === files.length) {
            callback(null, result);
          }
        }
      });
    });
  }

}
