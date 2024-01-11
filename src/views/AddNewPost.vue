<template>
  <div class="container" :class="{ dark: $store.getters.currentTheme }">
    <div class="outer">
      <div class="article">
        新增文章
      </div>
      <div class="header-container">
        <form class="input-container">
          <div class="row1">
            <vs-input v-model="post.title" class="item" label="标题"></vs-input>
            <vs-input v-model="post.des" label="描述"></vs-input>
            <vs-input
              v-model="post.author"
              class="item"
              label="作者"
            ></vs-input>

            <vs-select filter multiple placeholder="选择标签" v-model="tagList">
              <vs-option
                :label="item"
                :value="item"
                v-for="(item, index) in options"
              >
                {{ item }}
              </vs-option>
            </vs-select>
            <vs-input
              v-model="tag"
              label="新增标签"
              @keyup.enter="addTags"
            ></vs-input>

            <vs-input v-model="post.cover" label="封面" class="item"></vs-input>

            <vs-input
              v-model="post.location"
              label="位置"
              class="item"
            ></vs-input>
          </div>

          <textarea
            class="inputvs-input"
            name=""
            id=""
            cols="80"
            rows="10"
            v-model="content"
          ></textarea>

          <vs-button type="submit" class="btn" color="primary" @click="submitPost"
            >提交</vs-button
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";

export default {
  name: "AddNewPost",
  components: {},
  data() {
    return {
      post: {
        title: "",
        des: "",
        author: "",
        tags: "",
        hot: 0,
        comment: 0,
        date: new Date().toISOString().split("T")[0],
        cover: "",
        location: ""
      },
      content: "",
      options: ["前端", "Vue", "生活", "数码", "算法"],
      tagList: "",
      tag: ""
    };
  },
  mounted() {},
  methods: {
    tagsEnter(e) {
      console.log(e);
    },
    addTags() {
      this.options.push(this.tag);
      this.tag = "";
    },
    submitPost() {
      console.log(this.post);
      // 读取现有数据
      const existingPosts = require("@/../posts/data/posts.json").posts;

      // 自动生成id与日期
      this.post.id = `title-${existingPosts.length + 1}`;
      this.post.date = this.post.date.split("-").map(Number);

      // 将新数据推送到数组
      // existingPosts.push(this.post);

      // // 写入文件
      // const fs = require("fs");
      // const path = require("path");
      // const filePath = path.resolve(__dirname, "@/../posts/data/posts.json");
      // fs.writeFileSync(filePath, JSON.stringify(existingPosts, null, 2));
      console.log(this.tags);

      // 清空表单
      this.post = {
        title: "",
        des: "",
        author: "",
        tags: [],
        hot: 0,
        comment: 0,
        date: new Date().toISOString().split("T")[0],
        cover: "",
        location: ""
      };

      // 可以在这里添加成功提交的提示或导航到其他页面的逻辑
    }
  }
};
</script>

<style lang="scss" scoped>
.btn{
    margin-top: 50px;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  .row1 {
    display: flex;
    flex-wrap: wrap;
    width: 80vh;
    height: 20vh;
    align-items: center;
    justify-content: space-evenly;
  }
  .item {
  }

  .inputvs-input {
    position: relative;
    top: 20px;
  }
}
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .article {
      font-size: 35px;
      position: relative;
      left: 10px;
    }
    .header-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

</style>
