<template>
	<div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent='decreaseCart'>
        <transition name="inner">
          <span class="inner icon-remove_circle_outline"></span>
        </transition>
      </div> 
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
	export default {
		props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count ++;
        }
        this.$emit('increment', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
	};
</script>
<style lang='stylus' rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease, .cart-add
      display: inline-block
      padding: 6px
      transition: all 0.4s linear  
      &.move-leave-active, &.move-enter-active
        opacity: 1
        transform: translate3D(0, 0, 0)
        .inner
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-leave-active, &.move-enter
        opacity: 0
        transform: translate3D(24px, 0, 0)
        .inner
          transform  rotate(180deg)
      .inner
        display: inline-block
        font-size: 24px
        line-height: 24px
        vertical-align top
        color: rgb(0, 160, 220)
    .cart-count
      display inline-block
      font-size 10px
      line-height 24px
      width 12px
      vertical-align top
      padding-top 6px
      text-align center
      color rgb(147, 153, 159)
    .cart-add
      display: inline-block
      vertical-align top
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)

</style>