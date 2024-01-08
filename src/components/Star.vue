<template>
  <div class="star">
    <img
      v-for="(item, index) in itemClasses"
      :key="index"
      :src="imgUrl(item)"
      :alt="item"
    />
  </div>
</template>
<script>
// 星星长度

export default {
  name: "Star",
  data() {
    return {
      length: 5
    };
  },
  props: {
    score: Number
  },
  computed: {
    itemClasses() {
      let result = [];
      //写代码如果this.score为字符串则先转为数字
      let score;
      if (typeof this.score === "string") {
        score = parseInt(this.score);
      }

      score = Math.floor(this.score * 2) / 2;

      // 半星 (通过跟1取余判断是否为小数)
      let hasDecimal = score % 1 !== 0;

      // 全星 （向下取整，获取全星部分）
      let integer = Math.floor(score);

      // 遍历全星
      for (let i = 0; i < integer; i++) {
        result.push("on");
      }

      // 处理半星
      if (hasDecimal) {
        result.push("half");
      }

      // 补齐
      while (result.length < this.length) {
        // 到这里还不够五颗星，则凑空星
        result.push("off");
      }
      console.log(result);
      return result;
    }
  },
  methods: {
    imgUrl(item) {
      if (item == "on")
        return "https://wzy-oss-picbed.oss-cn-hangzhou.aliyuncs.com/img/allstar.png";
      if (item == "half")
        return "https://wzy-oss-picbed.oss-cn-hangzhou.aliyuncs.com/img/halfstar.png";
      if (item == "off")
        return "https://wzy-oss-picbed.oss-cn-hangzhou.aliyuncs.com/img/whitestar.png";
      return "";
    }
  }
};
</script>

<style scoped>
.star {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  padding: 20px;
  img {
    width: 20px;
  }
}
</style>
