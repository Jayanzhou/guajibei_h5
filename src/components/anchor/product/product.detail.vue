<!--作品详情页面-->
<template>
<div class="product-detail">
    <div class="anchor-info">
        <img :src="bestComImgUrl">
        <div class="anchor-intro">
            <div>
                <span>墨月</span>
                <span><i class="icon gjb-female">33</i></span>
                <span>网络游戏</span>
            </div>
            <p>2017-09-26 15:34:12</p>
        </div>
    </div>
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
                <div>
                    <i class="icon gjb-prise"></i>
                    <span class="prise-count">9</span>
                    <img class="prise-img" :src="bestComImgUrl">
                    <img class="prise-img left" :src="bestComImgUrl">
                    <img class="prise-img left" :src="bestComImgUrl">
                </div>
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
                    <div>2017-09-26 15:34:12</div>
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
                    <div>2017-09-26 15:34:12</div>
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
                    <div>2017-09-26 15:34:12</div>
                    <div class="comment-info">小姐姐声音很美</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "productDetail",
    data() {
        return {
            id: this.$route.query.id,
            bestComImgUrl: "http://img5.imgtn.bdimg.com/it/u=1380084653,2448555822&fm=27&gp=0.jpg",
            msgImgUrl: "http://b.hiphotos.baidu.com/image/pic/item/6f061d950a7b02084260ea216bd9f2d3562cc841.jpg"
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
    },
    getDynamicDetail() {
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

            } else {

            }
        }).fail(err => {

        });
    },
    getComments() {

        $.ajax({
            url: "http://guajibei.9fhl.cn/app_service/comment/getcomments",
            method: "POST",
            data: {
                dynamic_id: id,
                page: 1
            }
        }).done(res => {
            if (res.status == 0) {

            } else {

            }
        }).fail(err => {

        });
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