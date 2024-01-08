<template>
  <h2 class="ti">
    <div class="out">
      <Photo :photo="photo"></Photo>
    </div>
  </h2>
</template>

<script>
import "animate.css";
import Photo from "@/components/Photo.vue";
export default {
  name: "Test",
  components: {
    Photo
  },
  data() {
    return {
      score: 4.5,
      photo:{
          "id": "4",
          "src": "https://wzy-oss-picbed.oss-cn-hangzhou.aliyuncs.com/img/photo1.jpg",
          "author": "Young",
          "score": 4,
          "focalLength": "45",
          "aperture": "1/10",
          "iso": "-100",
          "shutter": "1/20",
          "camera": "Canon EOS M50 Mark II",
          "lens": "EF-M 15-45mm f/3.5-6.3",
          "location": "江苏·苏州",
          "date": [2023, 6, 25]
        },
    };
  }
};
</script>
<style lang="scss" scoped>
.out {
  width: 100px;
  height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 50px;
    background: linear-gradient(to right, #ec695c, #ec695c) no-repeat left
      bottom;
    background-size: 100px 2px;
  }
}
</style>
