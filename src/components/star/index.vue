<template>
  <div class="star-wrapper" :class="starType">
    <span class="stars" v-for="(item,index) in starClasses" :key="index" :class="item"></span>
  </div>
</template>

<script>
const ON = 'on';
const OFF = 'off';
const HALF = 'half';
export default {
  
  props:['size','score'],
  computed:{
    starType(){
      return 'star-' + this.size;
    },
    starClasses(){
      let starList = [];
      let score = Math.floor(this.score*2)/2; //4.5
      //全星
      let allStar = Math.floor(score);
      //半星(true/false )
      let halfStar = score%1 !== 0;
      for(let i = 0;i<allStar;i++){
        starList.push(ON);
      }
      if(halfStar){
          starList.push(HALF);
      }
      if(starList.length<5){
        starList.push(OFF);
      }
      return starList;
      },
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/mixin.less";
  .star-wrapper {
    font-size: 0;
    .stars {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .stars{
        width:20px;
        height:20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          .bg-image('../../assets/img/star48_on');
        }
        &.half {
          .bg-image('../../assets/img/star48_half');
        }
        &.off {
          .bg-image('../../assets/img/star48_off');
        }
      }
    }
    &.star-36 {
      .stars{
        width:15px;
        height:15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          .bg-image('../../assets/img/star36_on');
        }
        &.half {
          .bg-image('../../assets/img/star36_half');
        }
        &.off {
          .bg-image('../../assets/img/star36_off');
        }
      }
    }
    &.star-24 {
      .stars{
        width:10px;
        height:10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          .bg-image('../../assets/img/star24_on');
        }
        &.half {
          .bg-image('../../assets/img/star24_half');
        }
        &.off {
          .bg-image('../../assets/img/star24_off');
        }
      }
    }
  }
