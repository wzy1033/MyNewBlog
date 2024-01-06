<template>
  <div class="root">
    <!-- 图片 -->
    <header class="post-bg">
      <div class="cover-outer" :style="{ backgroundColor: coverBgColor }">
        <div class="cover-container">
          <img :src="post.cover" class="cover" />
        </div>
      </div>
      <!-- 信息 -->
      <div class="post-header" :style="{ color: coverTextColor }">
        <div class="title">{{ post.title }}</div>
        <div class="tags">
          <router-link
            v-for="(item, index) in post.tags"
            :key="index"
            class="tag"
            :to="`/tags/${item}`"
            >{{ item }}</router-link
          >
        </div>
        <div class="info">
          <div class="author">{{ post.author }}</div>
          <div class="hot">{{ post.hot }}</div>
          <div class="location">{{ post.location }}</div>
          <div class="date">
            {{ post.date[0] }}-{{ post.date[1] }}-{{ post.date[2] }}
          </div>
          <div class="comment">{{ post.comment }}</div>
        </div>
      </div>
    </header>

    <!-- 文章内容 -->
    <article class="post">
      <router-view></router-view>
    </article>
    <!-- 前后 -->
  </div>
</template>

<script>
import axios from "axios";
import ColorThief from "colorthief";

export default {
  name: "ViewPost",
  data() {
    return {
      postId: this.$route.path.split("posts/")[1],
      posts: this.getConfig("posts.json").posts,
      post: {
        title: null,
        date: [null, null, null],
        tags: []
      },
      config: this.getConfig().config,
      prevPost: {
        title: null,
        id: null
      },
      nextPost: {
        title: null,
        id: null
      },
      coverBgColor: "#131418",
      coverTextColor: "#000000"
    };
  },
  methods: {
    getPost() {
      // because of markdown file rendering, can't use the triditional dynamic route matching
      this.postId = this.$route.path.split("posts/")[1];
      const curPostIdx = this.posts.findIndex(post => post.id === this.postId);
      if (curPostIdx >= 0) {
        // post found
        this.post = this.posts[curPostIdx];
        this.changeTitle(this.post.title);
        try {
          if (curPostIdx > 0) {
            // has a previous post (not the first one)
            this.nextPost.title = this.posts[curPostIdx - 1].title;
            this.nextPost.id = this.posts[curPostIdx - 1].id;
          } else {
            this.nextPost.id = null;
          }
          if (curPostIdx < this.posts.length - 1) {
            // has a next post (not the last one)
            this.prevPost.title = this.posts[curPostIdx + 1].title;
            this.prevPost.id = this.posts[curPostIdx + 1].id;
          } else {
            this.prevPost.id = null;
          }
        } catch (err) {
          console.log(err); // Handle error
        }
      }
    },
    getCoverBgColor1() {
      axios
        .get(`${this.post.cover}?x-oss-process=image/average-hue`)
        .then(response => {
          this.coverBgColor = `#${response.data.RGB.substring(2)}`;
        })
        .catch(error => {
          console.error("请求失败", error);
        });
      this.getCoverTextColor(this.coverBgColor);
    },
    getCoverTextColor(bgColor) {
      let r = parseInt(bgColor.slice(1, 3), 16);
      let g = parseInt(bgColor.slice(3, 5), 16);
      let b = parseInt(bgColor.slice(5, 7), 16);
      let brightness = (r * 299 + g * 587 + b * 114) / 1000;
      this.coverTextColor = brightness > 128 ? "#363636" : "#ffffff";
      console.log(this.coverTextColor);
    }
    // getCoverBgColor2() {
    //   let imgDom = document.querySelector(".cover");
    //   imgDom.onload = () => {
    //     let colorthief = new ColorThief();
    //     let color = colorthief.getPalette(imgDom);
    //     // if (color) this.coverBgColor = color;
    //     console.log(color);
    //   };
    // }
  },
  mounted: function() {
    this.getPost();
    this.getCoverBgColor1();
    console.log(this.post);
  },
  watch: {
    $route(to, from) {
      this.getPost();
    }
  }
};
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
  .post-bg {
    overflow: hidden;
    height: 60vmin;
    width: 100vw;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .cover-outer {
      height: 60vmin;
      width: 100%;
      position: absolute;
      //background-color: #131418;

      .cover-container {
        width: 70%;
        height: 100%;
        opacity: 0.5;
        transform: rotate(10deg) translateY(-10%) scale(2);
        //position: relative;
        margin: 0 -20% 0 auto;
        filter: blur(8px);
        .cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          min-width: 50vw;
          min-height: 20rem;
          opacity: 0.8;
          transition: all 0.2s ease 0s;
        }
      }
    }
    .post-header {
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 2;
      padding-left: 10vw;
      padding-right: 20vw;
      .title {
        font-size: 50px;
        font-weight: 700;
      }
      .tags {
        display: flex;
        width: 500px;
        align-items: center;
        justify-content: space-between;
        transition: all 0.3s ease-out 0s;
        margin-top: 20px;
        .tag {
          color: #fff;
          border-radius: 12px;
          padding: 10px;
          &::before {
            font-family: "iconfont";
            margin-right: 0.5em;
            content: "\E634";
          }

          &:hover {
            //transform: scale(1.03);
            background-color: #fff;
            color: #363636;
            cursor: pointer;
          }
        }
      }
      .info {
        display: flex;
        //width: 63vw;
        //max-width: 610px;
        align-items: center;
        //justify-content: space-between;
        margin-top: 20px;
        div {
          margin-left: 20px;
          display: inline-block;
          text-align: center;
          //align-items: center;
          //justify-content: center;
          //width: fit-content;
          padding: 18px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.05);
          box-shadow: rgba(38, 38, 38, 0.1) 0px 4.8px 24px 0px;
          transition: all 0.3s ease-out 0s;
          opacity: 0.7;
          &:hover {
            opacity: 1;
          }
          &::before {
            font-family: "iconfont";
            margin-right: 0.25em;
          }
          &:first-child {
            margin-left: 0px;
          }
        }
        .hot {
          &::before {
            content: "\E68E";
          }
        }
        .author {
          &::before {
            content: "\E615";
          }
        }
        .location {
          &::before {
            content: "\E619";
          }
        }
        .date {
          &::before {
            content: "\E65F";
          }
        }
        .comment {
          &::before {
            content: "\E61F";
          }
        }
      }
    }
  }
  .post {
    width: 80vw;
    border-radius: 14px 14px 0 0;
    //box-shadow: rgba(44, 45, 48, 0.047) 0px 8px 16px -4px;
    img {
      display: block;
      margin: 0 auto;
    }
  }
  .frontmatter-markdown img {
    display: block;
    margin: 0 auto;
  }
}
</style>
