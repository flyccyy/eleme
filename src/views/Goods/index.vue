<template>
  <div class="home-wrapper">
      <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">  
      </div> <!--头像-->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- 满减折扣内容，可能没有，所以需要控制显示或隐藏，或者可以使用监听 -->
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count"  @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--公告区-->
    <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
    </div>  
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <!-- 设置渐变：fade,写fade-transition,fade-enter,fade-leave样式 -->
    <div class="detail" v-show="detailShow"  transition="fade">
      <!-- sticky-footer常用布局 -->
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <star :size="48" :score="seller.score"></star>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supList">
            <li v-for="(item,index) in seller.supports" :key="index">
              <i class="iconList" :class="classMap[item.type]"></i>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin-content">{{seller.bulletin}}</div>
        </div>
      </div>
      <!-- 底部的区域 -->
      <div class="detail-close">
        <i class="icon-close" @click="detailShow = false"></i>
      </div>
    </div>
  </div>
    <van-tabs v-model="active">
      <van-tab title="商品">内容 1</van-tab>
      <van-tab title="评论">内容 2</van-tab>
      <van-tab title="商家">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
// import '@/common/less/mixin.less';
import star from '@/components/star'
export default {
  components:{
    star
  },
  data() {
    return {
      active: 2,
       classMap:[],
      detailShow:false,
      seller:{}
    };
  },
  mounted(){
    this.$axios.get('/api/seller').then(res=>{
      console.log(res)
    })
  },
  methods:{
       showDetail(){
      this.detailShow = true;
    }
  }

};
</script>

<style lang="less" scoped>
.bg-image(@url) {
  background-image: ~"url(@{url}@2x.png)";
  @media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
    background-image:~"url(@{url}@3x.png)";
  }
}
  .header {
    color:#fff;
    background:rgba(7,17,27,0.5) ;
    position: relative;
    overflow: hidden; //隐藏漏出的阴影，filter那里
    .content-wrapper {
      padding:24px 12px 18px 24px;
      display: flex;
      font-size: 0;
      position: relative;
      .avatar {
        margin-right: 16px;
      }
      .content {
        font-size: 12px;
        line-height: 12px;
        .title {
          margin:2px 0 8px 0;
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
          .brand {
            display: inline-block;
            width:30px;
            height:18px;
            vertical-align: top;
            .bg-image('../../assets/img/brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
        }
        .description {
          margin-bottom: 10px;
          font-size: 12px;
          line-height: 12px;
          font-weight: 200;
        }
        .support{
          .icon {
            display: inline-block;
            width:12px;
            height:12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
            &.decrease {
              .bg-image('../../assets/img/decrease_1');
            }
            &.discount {
              .bg-image('../../assets/img/discount_1');
            }
            &.guarantee {
              .bg-image('../../assets/img/guarantee_1');
            }
            &.invoice {
              .bg-image('../../assets/img/invoice_1');
            }
            &.special {
              .bg-image('../../assets/img/special_1');
            }
          }
          .text {
            font-size: 10px;
            font-weight: 200;
          }
        }
      }
      .support-count {
        position: absolute;
        right:12px;
        bottom:14px;
        padding:0 8px;
        height:24px;
        line-height: 24px;
        border-radius:14px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        .count {
          font-size: 10px;
        }
        .icon-keyboard_arrow_right {
          line-height: 24px;
          margin-left: 2px;
          font-size:10px;
        }
      }
    }
    .bulletin-wrapper {
      background: rgba(7,17,27,0.2);;
      // font-size: 0;
      height:28px;
      line-height: 28px;
      padding:0 22px 0 12px;
      // 文本设置超出显示省略号一般是下面三行
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      .bulletin-title {
        display: inline-block;
        vertical-align: top;
        width:22px;
        height:12px;
        margin-top: 8px;
        .bg-image('../../assets/img/bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text {
         font-size:10px;
         font-weight: 200;
         margin:0 4px;
         vertical-align: top;
      }
      .icon-keyboard_arrow_right {
        position: absolute;
        font-size: 10px;
        right:12px;
        top:8px;
      }
    }
    .background {
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:-1;
      // 模糊效果
      filter:blur(10px);
    }
    // 遮罩层
    .detail {
      position: fixed;
      z-index: 100;
      left:0;
      top:0;
      width:100%;
      height:100%;
      overflow: auto;
      transition:all 0.5s;
      background: rgba(7,17,27,0.8);
      backdrop-filter: blur(10px);
      // &.fade-transition {  /*过渡后 */
      //   opacity: 1;
      //   background: rgba(7,17,27,0.8);
      // }
      // &.fade-enter,&.fade-leave {
      //   opacity: 0;
      //   background: rgba(7,17,27,0);
      // }
      .detail-wrapper {
        min-height: 100%;
        width:100%;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .name {
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          .star-wrapper {
            margin:16px auto 28px;
            text-align: center;
          }
          .title {
            display: flex;
            margin:28px auto 24px;
            width:80%;
            .line {
              flex:1;
              position: relative;
              top:-6px;
              border-bottom:1px solid rgba(255,255,255,.2);
            }
            .text {
              font-size: 14px;
              padding:0 12px;
              font-weight: 700;
            }
          }
          .supList {
            width:80%;
            margin:0 auto;
            li {
              padding:0 12px;
              margin-bottom:12px;
              font-size: 0;
              &:last-child{
                margin-bottom: 0;
              }
              .iconList {
                display: inline-block;
                width:16px;
                height:16px;
                // font-size: 12px;
                margin-right:6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                vertical-align: top;
                &.decrease {
                  .bg-image('../../assets/img/decrease_2')
                }
                &.discount {
                  .bg-image('../../assets/img/discount_2')
                }
                &.guarantee {
                  .bg-image('../../assets/img/guarantee_2')
                }
                &.invoice {
                  .bg-image('../../assets/img/invoice_2')
                }
                &.special {
                  .bg-image('../../assets/img/special_2')
                }
              }
              .text {
                font-size: 12px;
                line-height: 16px;
              }
            }
          }
          .bulletin-content{
            width:80%;
            padding:0 12px;
            margin:0 auto;
            font-size: 12px;
            font-weight: 200;
            line-height: 24px;
            box-sizing: border-box;
          }
        
        }
       
      }
      .detail-close {
        position: relative;
        width:32px;
        height:32px;
        margin:-64px auto 0 auto;
        clear:both;
        font-size: 32px;
      }
    }
  }
</style>