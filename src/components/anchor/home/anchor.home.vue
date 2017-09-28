<!--个人主页-->
<template>
  <!--:class="{isfemale: userInfo.sex == 2, ismale: userInfo.sex == 1}"-->
<div class="anchor-home" >
    <div class="anchor-content" :class="{isfemale: userInfo.sex == 2, ismale: userInfo.sex == 1}">
        <div class="bg-music">
          <span :class="{'music-box': bgMusicPlay}" @click="bgMusicBtnClick"><i class="icon gjb-music"></i></span>
          <audio id="audio_bg" src="http://www.9fhl.cn/share/bg_music.mp3" autoplay loop hidden="true">
            您的浏览器不支持 audio 标签。
          </audio>
        </div>
        <img class="anchor-img" :src="userInfo.avatar">
        <div class="audio-msg">
          <!--<i class="icon gjb-audio-high"></i>-->
          <audio id="audio_intro" :src="audioUrl" preload="auto" hidden="true">
            您的浏览器不支持 audio 标签。
          </audio>
        </div>

        <p class="anchor-name">
            <span class="nickname">{{userInfo.nickname}}</span>
            <span class="sex-male" v-if="userInfo.sex == 1"><i class="icon gjb-male"></i>男</span>
            <span class="sex-female" v-else><i class="icon gjb-female"></i>女</span>
        </p>
        <p class="anchor-id">ID:{{userInfo.accid}}</p>
        <div class="anchor-count">
            <div>
                <p class="count">{{!!userInfo.fans ? userInfo.fans : 0}}</p>
                <p>粉丝</p>
            </div>
            <div>
                <p class="count">{{!!userInfo.attention ? userInfo.attention : 0}}</p>
                <p>关注</p>
            </div>
            <div>
                <p class="count">{{!!userInfo.zan ? userInfo.zan : 0}}</p>
                <p>点赞</p>
            </div>
            <div>
                <p class="count">{{!!userInfo.visitor ? userInfo.visitor : 0}}</p>
                <p>访客</p>
            </div>
        </div>
    </div>

    <!--主播信息-->
    <div class="anchor-info">
            <p class="info-title">属于我的个性</p>
            <div class="info-box">
                <div>
                    <span>性别：</span>
                    <span class="sex-male" v-if="userInfo.sex == 1"><i class="icon gjb-male"></i>男</span>
                    <span class="sex-female" v-else><i class="icon gjb-female"></i>女</span>
                </div>
                <div>
                    <span>年龄：</span>
                    <span>{{userInfo.age}}</span>
                </div>
                <div>
                    <span>职业：</span>
                    <span class="job">{{userInfo.job}}</span>
                </div>
                <div>
                    <span>现居地：</span>
                    <span>{{userInfo.location}}</span>
                </div>
                <div>
                    <span>爱好：</span>
                    <span>{{userInfo.hobby}}</span>
                </div>
                <div>
                    <span>个人签名：</span>
                    <span>{{userInfo.signature}}</span>
                </div>
            </div>
        </div>

    <!--动态展示-->
    <div class="dynamic-box" v-if="!!dynamic && !!dynamic.create_time">
        <div class="msg-text">
            {{dynamic.content}}
        </div>
        <div class="msg-img" v-if="!!dynamic.picture && dynamic.picture.length > 0">
            <template v-for="picUrl in dynamic.picture">
              <img :src="picUrl">
            </template>
        </div>
        <div class="msg-video" v-if="!!dynamic.video && dynamic.video.length > 0">
            <template v-for="videoUrl in dynamic.video">
                <video :src="videoUrl" controls="controls">
                  您的浏览器不支持 video 标签。
                </video>
            </template>
        </div>
        <div class="msg-comment-box">
            <div class="comment-intro">
                <p><i class="icon gjb-prise icon-blue"></i>{{dynamic.zanTotal}}</p>
                <p><i class="icon gjb-comment icon-blue"></i>  {{dynamic.commentTotal}}</p>
            </div>

            <div class="comment-detail" v-for="comment in commentList">
              <img class="msg-comment-img" :src="comment.avatar">
              <div class="comment-text">
                <div class="comment-user-info">
                  <div>
                    <span class="nickname">{{comment.nickname}}</span>
                    <span class="sex-female" v-if="comment.sex == 2"><i class="icon gjb-female"></i>{{comment.age}}</span>
                    <span class="sex-male" v-else><i class="icon gjb-male"></i>{{comment.age}}</span>
                    <span class="job">{{comment.job}}</span>
                  </div>
                  <p><i class="icon gjb-prise icon-blue"></i> {{comment.zan_num}}</p>
                </div>
                <div>{{new Date(parseInt(comment.create_time) * 1000).pattern('yyyy-MM-dd hh:mm:ss')}}</div>
                <div class="comment-info">{{comment.content}}</div>
              </div>
            </div>

        </div>
    </div>
    <!--没有动态-->
    <div class="dynamic-box" v-else>
      该用户很懒，暂时没有动态哦～
    </div>

    <div class="logo">
        <img class="logo-img" src="../../../assets/logo.png">
        <img class="logo-img" src="http://www.9fhl.cn/share/qr_code.png">
    </div>

</div>
</template>

<script>
import {Toast, Indicator} from 'mint-ui';

export default {
    name: "anchorHome",
    data() {
        return {
            id: this.$route.query.id,
            userInfo: {
                accid: "",
                age: "",
                attention: "",
                avatar: "",
                fans: "",
                hobby: "",
                job: "",
                location: "",
                nickname: "",
                sex: "",
                signature: "",
                sound: "",
                sound_length: "",
                user_id: "",
                visitor: "",
                zan: ""
            },
            dynamic: {
                commentTotal: '',
                content: '',
                create_time: '',
                id: '',
                picture: [],
                update_time: '',
                user_id: '',
                video: [],
                zan: '',
                zanTotal: ''
            },
            commentList: [],
            audioUrl: '',
            bgMusicPlay: true
        };
    },
    created() {
        this.getHomepage();
    },
    mounted() {
        const audioBg = document.getElementById('audio_bg');
        const self = this;
        audioBg.addEventListener('ended', () => {
          self.bgMusicPlay = true;
        });
    },
    methods: {
        getHomepage() {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          let self = this;
          const id = this.$route.query.id;
          $.ajax({
            url: "http://guajibei.9fhl.cn/app_service/discover/homepage",
            method: "POST",
            data: {
              aim_id: id
            }
          }).done(res => {
            if (res.status == 0) {
              self.userInfo = res.data.userinfo;
              self.dynamic = res.data.dynamic;
              self.audioUrl = res.data.cast.sound;
              self.getComments(self.dynamic.id);
            } else {
              Toast({
                message: res.message || '网络超时，请重试',
                duration: 3000
              });
            }
          }).fail(err => {
            Toast({
              message: err.message || '网络超时，请重试',
              duration: 3000
            });
          }).always(() => Indicator.close());
        },
        getComments(dynamic_id) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          let self = this;
          $.ajax({
            url: "http://guajibei.9fhl.cn/app_service/comment/getcomments",
            method: "POST",
            data: {
              dynamic_id: dynamic_id,
              page: 1
            }
          }).done(res => {
            if (res.status == 0) {
              self.commentList = res.data;
            } else {
              Toast({
                message: res.message || '网络超时，请重试',
                duration: 3000
              });
            }
          }).fail(err => {
            Toast({
              message: err.message || '网络超时，请重试',
              duration: 3000
            });
          }).always(() => Indicator.close());
        },
        bgMusicBtnClick(event) {
            const audioBg = document.getElementById('audio_bg');
            if(audioBg.paused) {
              audioBg.play();
              this.bgMusicPlay = true;
            }else{
              audioBg.pause();
              this.bgMusicPlay = false;
            }
        }
    }
}
</script>

<style lang="less">
.anchor-home {
    height: 100%;
    &.isfemale {
         background: #e894bf!important;
     }
    &.ismale {
        background: #a8cafd!important;
     }
    .sex-female {
        font-size: 1.4rem!important;
        color: #fff;
        background: #FF69B4;
        padding: .2rem;
        border-radius: 5px;
    }
    .sex-male {
        font-size: 1.4rem!important;
        color: #fff;
        background: #1b73b8;
        padding: .2rem;
        border-radius: 5px;
    }
    .job {
        background: #71a047;
        color: #fff;
        padding: .2rem;
        border-radius: 5px;
        font-size: 1.4rem;
    }
    .nickname {
        font-size: 2rem;
        font-weight: 600;
    }
    .icon-blue {
        color: #3184cc;
    }
    .bg-music {
        position: absolute;
        .music-box {
          transform-origin: 50% 50%;
          animation: bgmusic 1s infinite linear;
          display: inline-block;
        }
        i {
          font-size: 4rem;
          color: #77a4dc;
        }
    }
    .anchor-content {
        background: #ffffff;
        padding: 3rem;
        margin-bottom: 2rem;
        position: relative;
        box-shadow: 10px 10px 5px #888888;
        &.isfemale {
             background: #e894bf!important;
         }
        &.ismale {
             background: #a8cafd!important;
         }
        .anchor-img {
            width: 10rem;
            height: 10rem;
            border-radius: 50%;
        }
        .anchor-name {
            font-size: 2rem;
            padding: .5rem;
        }
        .anchor-id {
            font-size: 1.4rem;
            margin-top: .5rem;
        }
        .anchor-count {
            display: flex;
            justify-content: space-around;
            font-size: 1.4rem;
            margin-top: 2rem;
            .count {
                font-weight: bold;
                font-size: 2rem;
            }
        }
    }
    .anchor-info {
        margin-bottom: 2rem;
        text-align: left;
        background: #ffffff;
        padding: 1rem 3rem;
        margin-top: 1rem;
        line-height: 2rem;
        box-shadow: 10px 10px 5px #888888;
        .info-title {
            font-size: 1.6rem;
            color: #000000;
        }
        .info-box {
            font-size: 1.4rem;
            i {
              font-size: 1.4rem;
            }
        }
    }
    .dynamic-box {
        background: #ffffff;
        margin-bottom: 2rem;
        padding: 1rem 3rem;
        text-align: left;
        font-size: 1.6rem;
        box-shadow: 10px 10px 5px #888888;
        .msg-text {
            margin-bottom: 1rem;
            line-height: 2rem;
        }
        .msg-img {
            img {
                width: 10rem;
            }
        }
        .msg-video {
            video {
                width: 100%;
                height: 16rem;
            }
        }
        .msg-comment-box {
            .comment-intro {
                display: flex;
                justify-content: space-between;
                margin: 1rem 0;
            }
            .comment-detail {
                padding: .5rem 0;
                display: flex;
                font-size: 1.4rem;
                margin-bottom: 1rem;
                border-top: 1px solid #eee;
                .msg-comment-img {
                    width: 5rem;
                    height: 5rem;
                    border-radius: 50%;
                }
                .comment-text {
                    flex: 1;
                    padding-left: 1rem;
                    .comment-user-info {
                        display: flex;
                        justify-content: space-between;
                        i {
                          font-size: 1.4rem;
                        }
                    }
                    .comment-info {
                        font-size: 1.6rem;
                    }
                }
            }
        }
    }
    .logo {
        margin-bottom: 5rem;
        background: #ffffff;
        padding: 3rem 2rem;
        display: flex;
        justify-content: space-around;
        .logo-img {
            width: 10rem;
            height: 10rem;
        }
    }

  @keyframes bgmusic {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }

}
</style>
