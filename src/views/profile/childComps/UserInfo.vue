<template>
  <div class="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <svg class="privateImage left">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
        </svg>
      </slot>
      <div class="login left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone"> 
          <svg data-v-735ff1be="" fill="#fff" class="icon-mobile">
            <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
          </svg>
          <slot name="user-phone">暂未绑定手机号</slot>
        </div>
      </div>
      <svg data-v-735ff1be="" fill="#fff" class="arrow right">
        <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: 'UserInfo'
}
</script>

<style scoped>
  .user-info {
    background-color: var(--color-tint);
    margin-top: -5px;
    padding: 15px;
  }

  .privateImage {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .login {
    margin-left: 10px;
    margin-top: 10px;
    color: #fff;
  }
  .login .phone {
    position: relative;
    margin-left: 15px;

    margin-top: 10px;
    font-size: 13px;
    font-weight: 300;
  }
  .login .phone .icon-mobile {
    width: 12px;
    height: 15px;
    position: absolute;
    top: 0;
    left: -15px;
  }

  .arrow {
    width: 11px;
    height: 22px;
    margin-top: 20px;
  }

</style>