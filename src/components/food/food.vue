<template>
  <transition name="move">
	<div v-show="showFlag" class="food" ref="food">
   <div class="food-content">
     <div class="image-header">
       <img :src="food.image">
       <div class="back" @click="hide">
         <i class="icon-arrow_lift"></i>
       </div>
     </div>
     <div class="content">
       <h1 class="title">{{food.name}}</h1>
       <div class="detail">
         <span class="sellCount">月售{{food.sellCount}}</span>
         <span class="rating">好评率{{food.rating}}%</span>
       </div>
       <div class="price">
         <span class="now">￥{{food.price}}</span>
         <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
       </div>
       <div class="cartcontrol-wrapper">
        <cartcontrol :food="food"></cartcontrol>
       </div>
       <div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
     </div>
     <split v-show="food.info"></split>
     <div class="info" v-show="food.info">
       <h1 class="title">商品信息</h1>
       <p class="text">{{food.info}}</p>
     </div>
     <split></split>
     <div class="rating">
       <h1 class="title">商品评价</h1>
       <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @increment="incrementTotal"></ratingselect>
       <div class="rating-wrapper">
         <ul v-show="food.ratings && food.ratings.length">
           <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
             <div class="user">
               <span class="name">{{rating.username}}</span>
               <img class="avatar" width="12" height="12" :src="rating.avatar">
             </div>
             <div class="time">{{rating.rateTime|formatDate}}</div>
             <p class="text">
               <span :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
             </p>
           </li>
         </ul>
         <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
       </div>
     </div>
   </div> 
  </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import cartcontrol from 'components/cartControl/cartcontrol.vue';
  import split from 'components/split/split.vue';
  import ratingselect from 'components/ratingselect/ratingselect.vue';
  import {formatDate} from '../../common/js/date';
  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    props: {
      food: {
        type: Object
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      incrementTotal(type, data) {
        this[type] = data;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('increment', event.target);
        Vue.set(this.food, 'count', 1);
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(100%, 0, 0)
    .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_lift
            display: block
            padding: 10px
            font-size: 20px
            color: #fff
    .content
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        font-size: 0
        height 10px
        .sellCount, .rating
          display inline-block
          font-size: 10px
          color: rgb(147, 151, 159)
        .sellCount
          margin-right: 12px
      .price
        font-weight 700px
        line-height 24px
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          font-size 10px
          color rgb(147, 153, 159)
          text-decoration line-through
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        padding: 0 12px
        box-sizing: border-box
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        font-size: 10px
        border-radius: 12px
        color: #fff
        background: rgb(0, 160, 220)
    .info
      padding: 18px
      .title
        margin-bottom: 6px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        padding: 0 8px
        font-size: 12px
        line-height: 24px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        margin-left: 18px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          padding 16px 0
          border-1px(rgba(1, 17, 27, 0.1))
          .user
            position absolute
            right 0
            top 16px
            font-size 0
            line-height 12px
            .name
              display inline-block
              vertical-align top
              font-size 10px
              color rgb(147, 153, 159)
              margin-right 6px
            .avatar
              border-radius 50%
          .time
            margin-bottom: 6px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 12px
          .text
            color: rgb(7, 17, 27)
            font-size: 12px
            line-height: 16px
            .icon-thumb_up, icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-ratings
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>