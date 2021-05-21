<template>
  <div id="toast" v-show="isShow">
      <div>
        {{msg}}
      </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      msg: '',
      isShow: false
    }
  },
  methods: {
    show(msg,timeOut=2000) {
      this.msg = msg
      this.isShow = true

      setTimeout(() => {
        this.isShow = false
        this.msg = ''
      }, timeOut);
    }
  }
}
</script>

<style scoped>
  #toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 7px 10px;
    color: #fff;
    background-color: rgba(0,0,0,.7);
    border-radius: 5px;
    z-index: 10;
  }
</style>