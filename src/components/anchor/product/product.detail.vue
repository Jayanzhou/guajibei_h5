<!--作品详情页面-->
<template>
  <!--:class="{isfemale: userInfo.sex == 2, ismale: userInfo.sex == 1}"-->
<div class="product-detail" >
    <div class="anchor-info" :class="{isfemale: userInfo.sex == 2, ismale: userInfo.sex == 1}">
        <img :src="userInfo.avatar">
        <div class="anchor-intro">
            <div>
                <span class="nickname">{{userInfo.nickname}}</span>
                <span class="sex-female" v-if="userInfo.sex == 2"><i class="icon gjb-female">{{userInfo.age}}</i></span>
                <span class="sex-male" v-else><i class="icon gjb-male">{{userInfo.age}}</i></span>
                <span class="job">{{userInfo.job}}</span>
            </div>
            <p>{{updateTime}}</p>
        </div>
        <div class="bg-music">
          <span :class="{'music-box': bgMusicPlay}" @click="bgMusicBtnClick"><i class="icon gjb-music"></i></span>
          <audio id="audio_bg" src="http://www.9fhl.cn/share/bg_music.mp3" autoplay loop hidden="true">
            您的浏览器不支持 audio 标签。
          </audio>
        </div>
    </div>
    <div class="dynamic-box">
        <div class="msg-text">
            {{detail.content}}
        </div>
        <div class="msg-img" v-if="!!detail.picture && detail.picture.length > 0">
          <template v-for="picUrl in detail.picture">
            <img :src="picUrl">
          </template>
        </div>
        <div class="msg-video" v-if="!!detail.video && detail.video.length > 0">
          <template v-for="videoUrl in detail.video">
            <video :src="videoUrl" controls="controls">
              您的浏览器不支持 video 标签。
            </video>
          </template>
        </div>
        <div class="msg-comment-box">
            <div class="comment-intro">
                <div>
                    <i class="icon gjb-prise icon-blue"></i>
                    <span class="prise-count">{{detail.zan_num}}</span>
                    <template v-for="user in detail.zan_user">
                        <img class="prise-img" :src="user.avatar">
                    </template>
                </div>
                <p><i class="icon gjb-comment icon-blue"></i>  {{detail.comment_amount}}</p>
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
</div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';

export default {
    name: "productDetail",
    data() {
        return {
            id: this.$route.query.id,
            detail: {
              comment_amount: '',
              content: '',
              create_time: '',
              id: '',
              picture: [],
              type: '',
              update_time: '',
              video: '',
              zan_num: '',
              zan_user: []
            },
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
            page: 1,
            commentList: [],
            bgMusicPlay: true
        };
    },
    created() {
        this.getUserInfo();
        this.getDynamicDetail();
        this.getComments();
    },
    mounted() {
      const audioBg = document.getElementById('audio_bg');
      const self = this;
      audioBg.addEventListener('ended', () => {
        self.bgMusicPlay = true;
      });
    },
    computed: {
        updateTime() {
            if (!!this.detail.update_time) {
              const time = parseInt(this.detail.update_time) * 1000;
              return new Date(time).pattern('yyyy-MM-dd hh:mm:ss');
            } else {
                return "";
            }
        }
    },
    methods: {
        getUserInfo() {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          let self = this;
          const aim_id = this.$route.query.userid;
          $.ajax({
            url: "http://guajibei.9fhl.cn/app_service/discover/homepage",
            method: "POST",
            data: {
              aim_id: aim_id
            }
          }).done(res => {
            if (res.status == 0) {
              self.userInfo = res.data.userinfo;
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
        getDynamicDetail() {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          let self = this;
          const id = this.$route.query.id;
          $.ajax({
            url: "http://guajibei.9fhl.cn/app_service/dynamic/getdynamicdetail",
            method: "POST",
            data: {
              dynamic_id: id
            }
          }).done(res => {
            if (res.status == 0) {
              self.detail = res.data.detail;
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
        getComments() {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          let self = this;
          const id = this.$route.query.id;
          $.ajax({
            url: "http://guajibei.9fhl.cn/app_service/comment/getcomments",
            method: "POST",
            data: {
              dynamic_id: id,
              page: self.page
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
.product-detail {
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
    .anchor-info {
        background: #ffffff;
        padding: 2rem 3rem 1rem 3rem;
        text-align: left;
        font-size: 1.6rem;
        display: flex;
        position: relative;
        box-shadow: 10px 10px 5px #888888;
        .bg-music {
          position: absolute;
          right: 1rem;
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
        &.isfemale {
             background: #e894bf!important;
         }
        &.ismale {
             background: #a8cafd!important;
         }
        img {
            width: 10rem;
            height: 10rem;
            border-radius: 50%;
        }
        .anchor-intro {
            padding-left: 2rem;
            flex: 1;
            line-height: 2;
            i {
              font-size: 1.4rem;
            }
            div {
                color: #000;
            }
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
    .dynamic-box {
        background: #ffffff;
        margin-top: 2rem;
        padding: 1rem 3rem;
        text-align: left;
        font-size: 1.6rem;
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
                align-items: center;
                .prise-img {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                }
                i {
                    display: inline-block;
                }
                div {
                    display: flex;
                    align-items: center;
                    .prise-count {
                        margin-right: .5rem;
                    }
                }
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
                    border-radius: 50%
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
}

</style>
