<!--作品详情页面-->
<template>
<div class="product-detail">
    <div class="anchor-info">
        <img :src="userInfo.avatar">
        <div class="anchor-intro">
            <div>
                <span>{{userInfo.nickname}}</span>
                <span v-if="userInfo.sex == 2"><i class="icon gjb-female">{{userInfo.age}}</i></span>
                <span v-else><i class="icon gjb-male">{{userInfo.age}}</i></span>
                <span>{{userInfo.job}}</span>
            </div>
            <p>{{updateTime}}</p>
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
                    <i class="icon gjb-prise"></i>
                    <span class="prise-count">{{detail.zan_num}}</span>
                    <template v-for="user in detail.zan_user">
                        <img class="prise-img" :src="user.avatar">
                    </template>
                </div>
                <p><i class="icon gjb-comment"></i>  {{detail.comment_amount}}</p>
            </div>

            <div class="comment-detail" v-for="comment in commentList">
                <img class="msg-comment-img" :src="comment.avatar">
                <div class="comment-text">
                    <div class="comment-user-info">
                        <div>
                            <span>{{comment.nickname}}</span>
                            <span v-if="comment.sex == 2"><i class="icon gjb-female"></i>{{comment.age}}</span>
                            <span v-else><i class="icon gjb-male"></i>{{comment.age}}</span>
                            <span>{{comment.job}}</span>
                        </div>
                        <p><i class="icon gjb-prise"></i> {{comment.zan_num}}</p>
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
            commentList: []
        };
    },
    created() {
        this.getUserInfo();
        this.getDynamicDetail();
        this.getComments();
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
        }
    }
}
</script>
<style lang="less">
.product-detail {
    .anchor-info {
        background: #ffffff;
        padding: 2rem 3rem 1rem 3rem;
        text-align: left;
        font-size: 1.6rem;
        display: flex;
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
    .dynamic-box {
        background: #ffffff;
        margin-top: 1rem;
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
