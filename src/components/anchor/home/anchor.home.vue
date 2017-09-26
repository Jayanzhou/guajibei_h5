<!--个人主页-->
<template>
<div class="anchor-home">
    <div class="anchor-content">
        <img class="anchor-img" :src="userInfo.avatar">
        <p class="anchor-name">{{userInfo.nickname}}</p>
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
                    <span v-if="userInfo.sex == 1"><i class="icon gjb-male"></i>男</span>
                    <span v-else><i class="icon gjb-female"></i>女</span>
                </div>
                <div>
                    <span>年龄：</span>
                    <span>{{userInfo.age}}</span>
                </div>
                <div>
                    <span>职业：</span>
                    <span>{{userInfo.job}}</span>
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

    <!--好评如潮-->
    <!--<div class="best-comment">
            <p class="comment-title">好评如潮</p>
            <div class="comment-detail">
                <img class="best-comment-img" :src="bestComImgUrl">
                <div class="comment-text">
                    <div>
                        <span>小米2</span>
                        <span><i class="icon gjb-female"></i>33</span>
                        <span>网络游戏</span>
                    </div>
                    <div class="comment-info">小姐姐声音很美</div>
                </div>
            </div>
        </div>-->

    <!--动态展示-->
    <div class="dynamic-box">
        <div class="msg-text">
            三月，醉一场青春的流年。慢步在三月的春光里，走走停停，看花开嫣然，看春雨绵绵，感受春风拂面，春天，就是青春的流年。青春，是人生中最美的风景。青春，是一场花开的遇见；青春，是一场痛并快乐着的旅行；青春，是一场轰轰烈烈的比赛；青春，是一场鲜衣奴马的争荣岁月；青春，是一场风花雪月的光阴。
        </div>
        <div class="msg-img">
            <img :src="msgImgUrl">
            <img :src="msgImgUrl">
        </div>
        <div class="msg-comment-box">
            <div class="comment-intro">
                <p><i class="icon gjb-prise"></i>9</p>
                <p><i class="icon gjb-comment"></i>  1</p>
            </div>
            <div class="comment-detail">
                <img class="msg-comment-img" :src="bestComImgUrl">
                <div class="comment-text">
                    <div class="comment-user-info">
                        <div>
                            <span>小米2</span>
                            <span><i class="icon gjb-male"></i>33</span>
                            <span>网络游戏</span>
                        </div>
                        <p><i class="icon gjb-prise"></i> 1</p>
                    </div>
                    <div class="comment-info">小姐姐声音很美</div>
                </div>
            </div>
            <div class="comment-detail">
                <img class="msg-comment-img" :src="bestComImgUrl">
                <div class="comment-text">
                    <div class="comment-user-info">
                        <div>
                            <span>小米2</span>
                            <span><i class="icon gjb-female"></i>33</span>
                            <span>网络游戏</span>
                        </div>
                        <p><i class="icon gjb-prise"></i> 1</p>
                    </div>
                    <div class="comment-info">小姐姐声音很美</div>
                </div>
            </div>
            <div class="comment-detail">
                <img class="msg-comment-img" :src="bestComImgUrl">
                <div class="comment-text">
                    <div class="comment-user-info">
                        <div>
                            <span>小米2</span>
                            <span><i class="icon gjb-male"></i>33</span>
                            <span>网络游戏</span>
                        </div>
                        <p><i class="icon gjb-prise"></i> 1</p>
                    </div>
                    <div class="comment-info">小姐姐声音很美</div>
                </div>
            </div>
        </div>
    </div>

    <div class="logo">
        <img class="logo-img" src="../../../assets/logo.png">
        <img class="logo-img" :src="codeUrl">
    </div>

</div>
</template>

<script>
export default {
    name: "anchorHome",
    data() {
        return {
            id: this.$route.query.id,
            anchorImgUrl: "http://img5.imgtn.bdimg.com/it/u=1380084653,2448555822&fm=27&gp=0.jpg",
            codeUrl: "http://img2.imgtn.bdimg.com/it/u=2861195764,1723929130&fm=214&gp=0.jpg",
            logoUrl: "http://img5.imgtn.bdimg.com/it/u=1380084653,2448555822&fm=27&gp=0.jpg",
            bestComImgUrl: "http://img5.imgtn.bdimg.com/it/u=1380084653,2448555822&fm=27&gp=0.jpg",
            msgImgUrl: "http://b.hiphotos.baidu.com/image/pic/item/6f061d950a7b02084260ea216bd9f2d3562cc841.jpg",
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
            }
        };
    },
    created() {
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
            } else {

            }
        }).fail(err => {

        });
    }
}
</script>

<style lang="less">
.anchor-home {
    .anchor-content {
        background: #ffffff;
        padding: 3rem;
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
            }
        }
    }
    .anchor-info {
        margin-top: 1rem;
        text-align: left;
        background: #ffffff;
        padding: 1rem 3rem;
        margin-top: 1rem;
        line-height: 2rem;
        .info-title {
            font-size: 1.6rem;
            color: #000000;
        }
        .info-box {
            font-size: 1.4rem;
        }
    }
    .best-comment {
        text-align: left;
        margin-top: 1rem;
        background: #ffffff;
        padding: 1rem 3rem;
        .comment-title {
            font-size: 1.6rem;
            color: #000000;
        }
        .comment-detail {
            padding: .5rem 0;
            display: flex;
            font-size: 1.4rem;
            .best-comment-img {
                width: 5rem;
                height: 5rem;
            }
            .comment-text {
                flex: 1;
                padding-left: 1rem;
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
                    }
                    .comment-info {
                        font-size: 1.6rem;
                    }
                }
            }
        }
    }
    .logo {
        margin-top: 1rem;
        background: #ffffff;
        padding: 4rem 3rem;
        display: flex;
        justify-content: space-around;
        .logo-img {
            width: 14rem;
            height: 14rem;
        }
    }

}
</style>