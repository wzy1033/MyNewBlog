<template>
  <div class="container" :class="{ dark: $store.getters.currentTheme }">
    <div class="outer">
      <div class="grid-4_xs-1_sm-2_md-2" v-if="tags.length">
        <div v-for="(tag, index) in tags" :key="index" class="col animate__animated animate__fadeInUp"
        :style="{ animationDelay: `${0.1 * index}s` }" >
          <router-link :to="`/tags/${tag.name}`">
            <vs-card type="3" class="center">
              <template #title>
                <h3 class="title">{{ tag.name }}</h3>
              </template>
              <template #text>
                <p>
                  {{ tag.posts.length }} post{{
                    `${tag.posts.length !== 1 ? "s" : ""}`
                  }}
                </p>
              </template>
            </vs-card>
          </router-link>
        </div>
      </div>
      <Nothing v-else />
    </div>
  </div>
</template>

<script>
import Nothing from "@/components/Nothing.vue";
import "animate.css";


export default {
  name: "ViewTags",
  mounted() {},
  components: {
    Nothing
  }
};
</script>

<style lang="scss" scoped>
.title{

}
.dark.container {
  background-color: #18171d;
  .outer {
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  position: relative;
  padding: 30px 0px;
  padding-top: 80px;
  background-color: #f7f9fe;
  .outer {
    border-radius: 16px;
    //box-shadow: 0 8px 16px -4px #2c2d300c;
    //border: 1px solid #e3e8f7;
    //background-color: #fff;
    padding: 40px 60px;
    padding-bottom: 50px;
    width: 90%;
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
