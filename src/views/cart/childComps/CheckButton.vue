<template>
  <div>
    <div class="icon-selector"
        :class="{'selector-active':ischecked}"
        @click="btnChange">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ischecked: this.value
    }
  },
  methods: {
    btnChange() { //点击时是改变itemInfo这个对象的checked值，不是单纯改变ischecked这个数值，所以发送出去
      this.$emit('changeCheck')
    }
  },
  watch: {
    value(newValue) {
      this.ischecked=newValue
    }
  }
}
</script>

<style scoped>
  .icon-selector {
    width: 20px;
    height: 20px;
    position: relative;
    top: 50%;
    margin-top: -10px;
    border: 2px solid #ccc;
    border-radius: 50%;
  }

  .selector-active {
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>