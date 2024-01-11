<template>
  <div class="container" :class="{ dark: $store.getters.currentTheme }">
    <div class="outer" v-if="allPhotoList.length">
      <div class="list" v-for="(list, index) in allPhotoList" :key="index">
        <div class="article">
          {{ list.title }}
        </div>
        <div class="des">
          {{ list.description }}
        </div>
        <div class="grid grid-3_xs-1_sm-2_md-2">
          <Photo
            :key="index"
            v-for="(photo, index) in list.photos"
            class="colu animate__animated animate__fadeInUp"
            :style="{ animationDelay: `${0.1 * index}s` }"
            :photo="photo"
          />
        </div>
      </div>
    </div>
    <Nothing v-else />
  </div>
</template>

<script>
import Nothing from "@/components/Nothing.vue";
import Photo from "@/components/Photo.vue";
import "animate.css";

export default {
  name: "ViewPhotoList",
  components: {
    Nothing,
    Photo
  },
  data() {
    return {
      allPosts: this.getConfig("posts.json").posts,
      curPage: 1,
      config: this.getConfig().config,
      allPhotoList: this.getConfig("photos.json").photoLists
    };
  },
  mounted() {
    console.log(this.allPhotoList);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.dark.container {
  background-color: #18171d;
  .outer {
    background-color: #1b1c20;
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 30px 0px;
  padding-top: 80px;
  background-color: #f7f9fe;
  .outer {
    border-radius: 16px;
    box-shadow: 0 8px 16px -4px #2c2d300c;
    border: 1px solid #e3e8f7;
    background-color: #fff;
    padding: 40px 60px;
    padding-bottom: 50px;
    width: 70%;
    max-width: 1160px;
    .list {
      margin-top: 30px;
    }
    .article {
      position: relative;
      font-size: 35px;
    }

    .des {
      position: relative;
      color: #afafaf;
    }

    .grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0px;
      .colu {
        margin-top: 2vw;
      }
      .center {
      }
    }
    .center {
    }
    .con-pagination {
      margin-top: 10px;
    }
  }
}
</style>
