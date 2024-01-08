<template>
  <div class="footer">
    <div class="container">
      <div class="circle"></div>
      <div class="info">
        <div class="usernameLogo">{{ config.username }}</div>
        <div class="description">
          来自 {{ config.name }}{{ config.username }} 的最新设计与科技文章
        </div>
        <button class="button" @click="$router.push('/posts')">了解更多</button>
      </div>

      <div class="contact">
        <a
          class="link"
          :href="item.link"
          target="_blank"
          v-for="(item, index) in contacts.slice(
            0,
            Math.ceil(contacts.length / 2)
          )"
          :key="index"
        >
          <img class="icon" :src="item.iconUrl" alt="图标" />
        </a>
        <img class="link" :src="config.avatarPath" alt="头像" />
        <a
          class="link"
          :href="item.link"
          target="_blank"
          v-for="(item, index) in contacts.slice(
            Math.ceil(contacts.length / 2)
          )"
          :key="index"
        >
          <img class="icon scrollTop" :src="item.iconUrl" alt="图标" />
        </a>
      </div>
    </div>
    <!-- 年份 -->
    <div class="copyright">
      <div v-if="curYear === config.blogStartYear">
        &copy; {{ curYear }} Designed By {{ config.name
        }}{{ config.username }}.&nbsp;
      </div>
      <div v-else>
        &copy; {{ config.blogStartYear }} - {{ curYear }} Designed By
        {{ config.name }}{{ config.username }}.&nbsp;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      contacts: this.getConfig().contacts,
      config: this.getConfig().config,
      curYear: new Date().getFullYear(),
      hovered: false
    };
  },
  methods: {
    getYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="scss" scoped>
.copyright {
  width: 100%;
  height: 7dvh;
  box-shadow: rgba(38, 38, 38, 0.1) 0px 6px 24px 0px;
  display: flex;
  align-items: center;
  padding: 0 1vw;
  font-family: "PingFang light";
  font-size: 16px;
  color: #bbbbbb;
}
.contact {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 50vw;
  z-index: 2;
  margin-top: -30px;
  .link {
    border-radius: 999px;
    background-color: #363636;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-out 0s;
    .icon {
      width: 25px;
      height: 25px;
    }

    &:hover {
      transform: scale(1.2);
      background-color: #1a5cff;
      cursor: pointer;
    }
  }
  img.link {
    width: 55px;
    height: 55px;
    border: 1px solid #dddddd;
  }
}

.circle {
  //background-color: #f1f1fb;
  background-image: linear-gradient(to right, #fcf7f7 0%, #eeeefb 100%);
  height: 130vh;
  width: 130vh;
  border-radius: 9999px;
  position: absolute;
  bottom: -45vh;
  left: -5vh;
  z-index: 0;
}

.footer {
  background-color: #ffffff;
  height: 40vh;
  width: 100%;
  border-radius: 14px 14px 0 0;
  position: relative;
  z-index: 1;
  //overflow: hidden;
  bottom: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.info {
  height: 16vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.button {
  width: 95px;
  height: 43px;
  background-color: #f7f7f9;
  border: 1px solid #dddddd;
  color: #363636;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "PingFang Light";
  font-size: 14px;

  transition: all 0.3s ease-out 0s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    background-color: #1a5cff;
    color: #fff;
  }
}
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  z-index: 1;
  position: relative;
  overflow: hidden;
  background-color: #fbfbfb;
  .usernameLogo {
    color: #000;
    font-size: 35px;
    font-weight: 900;
    font-family: "Aqum-2-Classic-2";
    //margin: 15px 0;
  }
  .description {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    color: #3c3c43cc;
    margin-top: -10px;
  }
}
</style>
