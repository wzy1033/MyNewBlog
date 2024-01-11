<template>
  <div class="root" :class="{ dark: $store.getters.currentTheme }">
    <img class="avatar" :src="config.avatarPath" alt="头像" />
    <div class="title">关于本站</div>
    <div class="content">
      <div class="row row-1">
        <div
          class="intro item animate__animated animate__fadeInUp"
          :style="{ animationDelay: '0.1s' }"
        >
          <div class="intro-title1">你好，很高兴认识你👋</div>
          <div class="intro-title2">
            我叫{{ config.name }}{{ config.username }}
          </div>
          <div class="intro-title3">
            爱好编程、设计、摄影、旅行
          </div>
        </div>
        <div
          class="location item animate__animated animate__fadeInUp"
          :style="{ animationDelay: '0.2s' }"
        >
          <span class="location-title">
            <span style="font-weight:300;">现居</span> {{ nowHome }}
          </span>
        </div>
      </div>
      <div class="row row-2">
        <div
          class="tech item animate__animated animate__fadeInUp"
          :style="{ animationDelay: '0.3s' }"
        >
          <div class="tech-title1">技术栈</div>
          <div class="tech-title2">开启创造力</div>
          <div class="techList">
            <div class="list1">
              <div
                class="img-container"
                v-for="(item, index) in techList1"
                :style="{ backgroundColor: item.bgColor }"
              >
                <img class="tech-item" :src="item.url" />
              </div>
            </div>
            <div class="list2">
              <div
                class="img-container"
                v-for="(item, index) in techList2"
                :style="{ backgroundColor: item.bgColor }"
              >
                <img class="tech-item" :src="item.url" />
              </div>
            </div>
          </div>
        </div>
        <div
          class="hobby item animate__animated animate__fadeInUp"
          :style="{ animationDelay: '0.4s' }"
        >
          <div class="title-container">
            <div class="hobby-title1">关注偏好</div>
            <div class="hobby-title2">{{ hobby.name }}</div>
          </div>
          <div class="hobby-title3">{{ hobby.description }}</div>
        </div>
      </div>
      <div class="row row-3">
        <div
          class="mbti item animate__animated animate__fadeInUp"
          :style="{ animationDelay: '0.5s' }"
        >
          <div class="mbti-title1">性格</div>
          <div class="mbti-title2">{{ mbti.zh }}</div>
          <div class="mbti-title3">{{ mbti.eng }}</div>
          <div class="mbti-title4">
            在
            <a
              href="https://www.16personalities.com/"
              target="_blank"
              rel="noopener nofollow"
              >16personalities</a
            >
            了解更多关于
            <a
              target="_blank"
              :href="
                `https://www.16personalities.com/ch/${mbti.eng}-%E4%BA%BA%E6%A0%BC`
              "
              >{{ mbti.zh }}</a
            ><br /><a
              target="_blank"
              :href="
                `https://www.16personalities.com/ch/${mbti.eng}-%E4%BA%BA%E6%A0%BC`
              "
              >了解{{ mbti.zh }}高级性格档案</a
            >
            >
          </div>
          <img class="mbti-img" :src="mbti.src" :alt="mbti.eng" />
        </div>
        <div
          class="motto item animate__animated animate__fadeInUp"
          :style="{ animationDelay: '0.6s' }"
        >
          <div class="motto-title1">座右铭</div>
          <div class="motto-title2">{{ motto.title1 }}</div>
          <div class="motto-title3">{{ motto.title2 }}</div>
        </div>
      </div>
      <div class="row row-4">
        <div
          class="game item animate__animated animate__fadeInUp"
          :style="{
            background: `url(${game.cover}) no-repeat center`,
            backgroundSize: 'cover',
            animationDelay: '0.7s'
          }"
        >
          <div class="game-title1">游戏偏好</div>
          <div class="game-title2">{{ game.name }}</div>
        </div>
        <div
          class="music item animate__animated animate__fadeInUp"
          :style="{
            background: `url(${music.cover}) no-repeat 0px -150px`,
            backgroundSize: 'cover',
            animationDelay: '0.8s'
          }"
        >
          <div class="music-title1">音乐偏好</div>
          <div class="music-title2">{{ music.name }}</div>
          <div class="music-title3">
            跟 {{ config.name }}{{ config.username }} 一起欣赏更多音乐
            <div
              class="muisc-button"
              ref="btn"
              @mouseover="btnMouseover"
              @mouseleave="btnMouselevae"
            >
              <router-link :to="`/music?searchKey=${music.singer}`"
                >更多推荐</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "animate.css";

export default {
  name: "About",
  data() {
    return {
      config: this.getConfig().config,
      techList: this.getConfig("tech").tech,
      nowHome: "浙江 绍兴",
      hobby: {
        name: "数码科技",
        description: "手机、电脑软硬件"
      },
      music: {
        name: "R&B、华语流行",
        cover:
          "https://wzy-oss-picbed.oss-cn-hangzhou.aliyuncs.com/img/202401090828262.png",
        singer: "陶喆"
      },
      mbti: {
        eng: "ENFJ",
        zh: "主人公",
        src:
          "https://wzy-oss-picbed.oss-cn-hangzhou.aliyuncs.com/img/202401090049290.png"
      },
      motto: {
        title1: "道阻且长，",
        title2: "行则将至。"
      },
      btnCoverBgColor: "#000000",
      game: {
        name: "金铲铲之战",
        cover: "https://game.gtimg.cn/images/jk/kv/kv-m10s11.jpg"
      }
    };
  },
  methods: {
    btnMouseover() {
      this.$refs.btn.style.backgroundColor = this.btnCoverBgColor;
    },
    btnMouselevae() {
      this.$refs.btn.style.backgroundColor = "#ffffff";
    },
    getBtnCoverBgColor() {
      axios
        .get(`${this.music.cover}?x-oss-process=image/average-hue`)
        .then(response => {
          this.btnCoverBgColor = `#${response.data.RGB.slice(2)}`;
        })
        .catch(error => {
          console.error("请求失败了", error);
        });
    }
  },
  computed: {
    techList1() {
      let firstHalf = this.techList.slice(
        0,
        Math.ceil(this.techList.length / 2)
      );
      return firstHalf.concat(firstHalf);
    },
    techList2() {
      let firstHalf = this.techList.slice(Math.ceil(this.techList.length / 2));
      return firstHalf.concat(firstHalf);
    }
  },
  mounted() {
    console.log(this.techList);
    this.getBtnCoverBgColor();
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #363636;
}
.dark.root {
  background-color: #18171d;
  .title {
    color: #fff;
  }
}

@keyframes rowup {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 40px;
  background-color: #f7f9fe;
  .avatar {
    width: 210px;
    height: 210px;
    object-fit: cover;
    border-radius: 9999px;
    border: 1px solid #ddd;
  }
  .title {
    font-size: 42px;
    font-weight: 900;
    margin-top: 30px;
    color: #363636;
  }
  .content {
    width: 100%;
    margin-top: 30px;
    padding: 0px 6vw;

    .item {
      box-shadow: rgba(44, 45, 48, 0.047) 0px 8px 16px -4px;
      width: 40%;
      min-height: 210px;
      background-color: #fff;
      border-radius: 12px;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      //width: 100%;
      margin-top: 20px;
      .intro {
        width: 59%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        background: linear-gradient(120deg, #5b27ff 0, #00d4ff 100%);
        background-size: 200%;
        padding: 20px 40px;
        .intro-title1 {
          font-size: 16px;
          line-height: 1.3;
          opacity: 0.8;
        }
        .intro-title2 {
          font-size: 36px;
          font-weight: 700;
          margin: 10px 0px;
        }
        .intro-title3 {
          font-size: 16px;
          line-height: 1.3;
          opacity: 0.8;
        }
      }
      .item {
      }
      .location {
        position: relative;
        width: 39%;
        background: url("https://wzy-oss-picbed.oss-cn-hangzhou.aliyuncs.com/img/202401082059377.png");
        background-size: 100%;
        background-position: 10px;
        transition: all 0.7s ease-in-out;
        &:hover {
          background-size: 180%;
          background-position: -150px -200px;
          .location-title {
            bottom: -40px;
            opacity: 0;
          }
        }
        .location-title {
          position: absolute;
          font-size: 20px;
          font-weight: 700;
          backdrop-filter: saturate(180%) blur(20px);
          width: 100%;
          background-color: rgba(255, 255, 255, 0.6);
          padding: 10px 40px;
          bottom: 0;
          color: #363636;
          transition: all 0.7s ease-in-out;
          span {
          }
        }
      }
    }

    .row-1 {
    }

    .row {
      .tech {
        width: 49%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding: 20px 0px;
        .tech-title1 {
          font-size: 12px;
          position: relative;
          left: 43px;
        }
        .tech-title2 {
          font-size: 36px;
          font-weight: 700;
          position: relative;
          left: 40px;
          margin-top: 6px;
        }
        .techList {
          overflow: hidden;
          margin-top: 40px;
          .img-container {
            min-width: 120px;
            min-height: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 30px;
            box-shadow: 0 2px 16px -3px rgba(0, 0, 0, 0.15);
            margin-left: 20px;
          }
          .tech-item {
            width: 76px;
            height: 76px;
          }
          .list1 {
            display: flex;
            animation: rowup 20s linear infinite;
            .img-container {
              .tech-item {
              }
            }
          }
          .list2 {
            display: flex;
            margin-top: 20px;
            position: relative;
            left: -40px;
            animation: rowup 20s linear infinite;
            .img-container {
              .tech-item {
              }
            }
          }
        }
      }
      .item {
      }
      .hobby {
        width: 49%;
        background: url(https://bu.dusays.com/2023/03/12/640dc69d4cf22.png)
          no-repeat;
        color: #fff;
        position: relative;
        .title-container {
          padding: 20px 0px;
          .hobby-title1 {
            font-size: 12px;
            position: relative;
            left: 43px;
          }
          .hobby-title2 {
            font-size: 36px;
            font-weight: 700;
            position: relative;
            left: 40px;
            margin-top: 6px;
          }
        }
        .hobby-title3 {
          position: absolute;
          bottom: 20px;
          left: 40px;
        }
      }
    }
    .row-2 {
      min-height: 450px;
      .item {
        min-height: 450px;
      }
    }
    .row {
      .mbti {
        width: 59%;
        padding: 20px 40px;
        min-height: 250px;
        position: relative;
        overflow: hidden;
        .mbti-title1 {
          font-size: 12px;
          position: relative;
          left: 2px;
        }
        .mbti-title2 {
          font-size: 36px;
          font-weight: 700;
          position: relative;
          left: -1px;
        }
        .mbti-title3 {
          font-weight: 700;
          color: #56a178;
          font-size: 36px;
        }
        .mbti-title4 {
          position: absolute;
          bottom: 35px;
          font-size: 16px;
          color: #999;
          a {
            color: #999999;
          }
          br {
          }
        }
        .mbti-img {
          width: 220px;
          position: absolute;
          bottom: -110px;
          right: 60px;
          transition: transform 2s cubic-bezier(0.13, 0.45, 0.21, 1.02);
        }
        &:hover {
          .mbti-img {
            transform: rotate(-5deg) scale(1.08);
          }
        }
      }
      .item {
      }
      .motto {
        width: 39%;
        padding: 20px 40px;
        .motto-title1 {
          font-size: 12px;
          position: relative;
          left: 3px;
        }
        .motto-title2 {
          font-size: 36px;
          font-weight: 700;
          opacity: 0.6;
        }
        .motto-title3 {
          font-size: 36px;
          font-weight: 700;
        }
      }
    }
    .row-3 {
    }
    .row {
      .game {
        width: 49%;
        color: #fff;
        padding: 20px 40px;
        .game-title1 {
        }
        .game-title2 {
          font-size: 36px;
          font-weight: 700;
        }
      }
      .item {
      }
      .music {
        width: 49%;
        padding: 20px 40px;
        color: #fff;
        position: relative;
        .music-title1 {
          font-size: 12px;
        }
        .music-title2 {
          font-size: 36px;
          font-weight: 700;
        }

        .music-title3 {
          font-size: 16px;
          width: 88%;
          position: absolute;
          bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .muisc-button {
          }
        }

        .muisc-button {
          padding: 10px 15px;
          background-color: #fff;
          color: #363636;
          border-radius: 12px;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          &::before {
            font-family: "iconfont2";
            content: "\e023";
            margin-right: 0.5em;
            color: #363636;
            align-items: center;
          }
          &:hover {
            color: #fff;
            &::before {
              color: #fff;
            }
            a {
              color: #fff;
            }
          }
        }
      }
      @media (max-width: 880px) {
        .item {
          width: 100%;
          margin-top: 20px;
        }
      }
    }
    @media (max-width: 880px) {
      .row {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 0px;
      }
    }
    .row-4 {
      min-height: 450px;
      .item {
        min-height: 450px;
      }
    }
  }

  @media (max-width: 1400px) {
    .content {
      padding: 0px 30px;
    }
  }
}
</style>
