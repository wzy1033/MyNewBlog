<template>
  <div class="container" :class="{ dark: $store.getters.currentTheme }">
    <div class="outer" v-if="allPosts.length">
      <div class="article">Tag &nbsp;{{ tagName }}</div>
      <div class="grid grid-3_xs-1_sm-2_md-2">
        <div
          :key="index"
          v-for="(post, index) in getPosts()"
          class="col center"
        >
          <PostCard class="card" :post="post" />
        </div>
      </div>
      <div class="center con-pagination">
        <vs-pagination
          v-model="curPage"
          :length="allPosts.length"
          not-margin
          progress
        />
      </div>
    </div>
    <Nothing v-else />
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import Nothing from "@/components/Nothing.vue";

export default {
  name: "ViewTag",
  components: {
    PostCard,
    Nothing
  },
  data() {
    return {
      allPosts: this.getConfig("posts.json").posts,
      curPage: 1,
      config: this.getConfig().config,
      tagName: this.$route.params.tag
    };
  },
  mounted() {
    this.changeTitle("Posts");
    const posts = this.allPosts;
    this.allPosts = [];
    for (let i = 0; i < posts.length; i += 9)
      this.allPosts.push(posts.slice(i, i + 9));
  },
  methods: {
    getPosts() {
      try {
        return this.allPosts[this.curPage - 1].slice().reverse();
      } catch (e) {
        return [];
      }
    }
  },
  computed: {
    tag() {
      for (var i = 0; i < this.tags.length; i++) {
        // match current tag
        if (this.tags[i].name === this.tagName) {
          return this.tags[i];
        }
      }
      return null;
    }
  }
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
    padding: 40px 40px;
    padding-bottom: 50px;
    width: 75%;
    .article {
      font-size: 35px;
      position: relative;
      left: 10px;
      .len {
        font-size: 18px;
        position: relative;
        bottom: 1em;
        color: #afafaf;
      }
    }
    .grid {
      .col {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .card {
          margin-top: 1.5vw;
        }
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
