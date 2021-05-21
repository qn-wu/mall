<template>
  <div class="params-info" v-if="Object.keys(paramsInfo).length != 0">
    <table class="info-sizes"
          v-for="item in paramsInfo.sizes"
          :key="item.acm">
      <tr v-for="selt in item" :key="selt.acm">
        <td v-for="num in selt" :key="num.acm"> {{num}} </td>
      </tr>
    </table>
    <table class="info-params">
      <tr v-for="item in paramsInfo.infos" :key="item.acm">
        <td class="params-key"> {{item.key}} </td>
        <td class="params-value"> {{item.value}} </td>
      </tr>
    </table>
    <div class="info-img" v-if="paramsInfo.img.length != 0">
      <img :src="paramsInfo.img" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamsInfo',
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .params-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .params-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .params-info table tr {
    height: 42px;
  }

  .params-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-params {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .params-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .params-value {
    color: #eb4869;
  }

  .info-img img {
    width: 100%;
  }
</style>