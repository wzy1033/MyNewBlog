<template>
  <div class="root">
    <div class="site-header">
      <transition name="canvasAnim" appear>
        <canvas id="canvas"></canvas>
      </transition>

      <transition name="fade" v-for="(item, index) in posts" :key="index">
        <img
          class="backGroundImg"
          :src="item.cover"
          v-show="index === curImgIndex"
          :alt="`图片${index}`"
        />
      </transition>
      <div class="home-container">
        <div class="welcome">
          <div
            class="welcome-text-1 animate__animated animate__fadeInUp"
            :style="{ animationDelay: '0.1s' }"
          >
            Hi, 欢迎来到我的小站
          </div>
          <h2
            class="welcome-text-2 animate__animated animate__fadeInUp"
            :style="{ animationDelay: '0.2s' }"
          >
            感谢你在人海中发现了我
          </h2>
        </div>
        <div class="newpost-list">
          <div class="part-title">最新动态</div>
          <span class="news">NEWS</span>
          <!-- 最新动态 -->
          <div
            v-for="(item, index) in posts"
            :key="index"
            class="newpost animate__animated animate__fadeInRight"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @mouseover="handleHover(index)"
            @mouseout="handleLeave"
          >
            <div class="newpost-title">
              <router-link
                style="color: rgb(255, 255, 255, 0.8)"
                :to="`/posts/${item.id}`"
                >{{ item.title }}</router-link
              >
            </div>
            <div class="info">
              <div class="tags">
                <span class="author">{{ item.author }}</span>
                <span v-for="(tag, idx) in item.tags" :key="idx" class="tag">{{
                  tag
                }}</span>
              </div>
              <div class="back">
                <span class="hot">{{ item.hot }}</span>
                <span class="comment">{{ item.comment }}</span>
                <span class="date">{{ calcDateDif(item.date) }}前</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
export default {
  name: "Home",
  data() {
    return {
      posts: this.getConfig("posts.json").posts.slice(0, 3),
      config: this.getConfig().config,
      curImgIndex: -1,
      showImg: 0
    };
  },
  mounted() {
    this.changeTitle("Home");
    this.getCanvas();
    console.log(this.posts, this.config);
  },
  methods: {
    getCanvas() {
      "use strict";
      let canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        w = (canvas.width = window.innerWidth),
        h = (canvas.height = window.innerHeight),
        hue = 217,
        stars = [],
        count = 0,
        maxStars = 1000;
      let canvas2 = document.createElement("canvas"),
        ctx2 = canvas2.getContext("2d");
      canvas2.width = 100;
      canvas2.height = 100;
      let half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
      gradient2.addColorStop(0.025, "#fff");
      gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
      gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
      gradient2.addColorStop(1, "transparent");
      ctx2.fillStyle = gradient2;
      ctx2.beginPath();
      ctx2.arc(half, half, half, 0, Math.PI * 2);
      ctx2.fill();
      function random(min, max) {
        if (arguments.length < 2) {
          max = min;
          min = 0;
        }
        if (min > max) {
          let hold = max;
          max = min;
          min = hold;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      let Star = function() {
        this.orbitRadius = random(w / 2 - 50);
        this.radius = random(100, this.orbitRadius) / 10;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 1000000;
        this.alpha = random(2, 10) / 10;
        count++;
        stars[count] = this;
      };
      Star.prototype.draw = function() {
        let x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
          y = (Math.cos(this.timePassed) * this.orbitRadius) / 2 + this.orbitY,
          twinkle = random(10);
        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(
          canvas2,
          x - this.radius / 2,
          y - this.radius / 2,
          this.radius,
          this.radius
        );
        this.timePassed += this.speed;
      };
      for (let i = 0; i < maxStars; i++) {
        new Star();
      }
      function animation() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 1)";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";
        for (let i = 1, l = stars.length; i < l; i++) {
          stars[i].draw();
        }
        window.requestAnimationFrame(animation);
      }
      animation();
    },
    calcDateDif(date) {
      const currentDate = new Date();
      const inputDateTime = new Date(date[0], date[1] - 1, date[2]);
      const dateDifference =
        (currentDate - inputDateTime) / (1000 * 60 * 60 * 24);

      if (dateDifference > 365) return Math.floor(dateDifference / 365) + "年";
      if (dateDifference > 30) return Math.floor(dateDifference / 30) + "月";
      if (dateDifference > 7) return Math.floor(dateDifference / 7) + "周";

      return Math.floor(dateDifference) + "天";
    },
    handleHover(index) {
      this.curImgIndex = index;
      this.showImg = true;
    },
    handleLeave() {
      this.curImgIndex = -1;
      this.showImg = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.canvasAnim-enter-active {
  animation: shrinkKeyframes 1.5s;
  animation-timing-function: cubic-bezier(0.62, 0.21, 0.25, 1);
}

@keyframes shrinkKeyframes {
  0% {
    opacity: 0;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate__animated {
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.62, 0.21, 0.25, 1);
}

.site-header {
  margin-bottom: -24px;
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  color: rgb(255, 255, 255, 0.8);
  background-color: rgb(5, 12, 25);
  overflow: hidden;
  .fade-enter-active,
  .fade-leave-active {
    transition: 1s;
  }

  .fade-enter,
  .fade-leave-to {
    transform: scale(1.05); /* 调整 scale 值，使得图片变小 */
    opacity: 0;
  }

  #canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    //background-color: #000;
  }
  .backGroundImg {
    position: absolute;
    height: 100vh;
    //width: 100%;
    //height: 100%;
    //max-width: 100vw;
    //max-height: 100vh;
    overflow: hidden;
  }
  .home-container {
    z-index: 1;
    width: 100%;
    height: 100vh;
    padding: 84px 84px 36px 84px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    .welcome {
      .welcome-text-1 {
        font: 400 15px "Microsoft YaHei";
      }
      .welcome-text-2 {
        font: 400 42px "Microsoft YaHei";
        mask: linear-gradient(#000 30%, rgba(0, 0, 0, 0.7) 70%);
      }
    }
    .newpost-list {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      margin-top: 299px;
      margin-bottom: 30px;
      font-weight: 400;

      .part-title {
        text-align: right;
        font-size: 24px;
      }

      .news {
        text-align: right;
        display: block;
        font-size: 39px;
        margin-top: -35px;
        opacity: 0.1;
      }
      .newpost {
        width: 480px;
        height: 110px;
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        margin-bottom: 24px;
        transition: all 0.5s;
        padding: 1.5em;
        &:hover {
          width: 110%;
          background-color: rgba(255, 255, 255, 0.01);
        }

        .newpost-title {
          padding-bottom: 0.5em;
          border-bottom: 1px solid rgb(124 124 124 / 20%);
          font-size: 15px;
          line-height: 2;
        }

        .info {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 12px;
          margin-top: 3px;
          span::before {
            font-family: "iconfont";
            margin-right: 0.25em;
          }

          .tags {
            width: 300px;

            .tag {
              &::before {
                content: "\E634";
              }
              margin-left: 10px;
            }
          }

          .back {
            display: flex;
            width: 200px;
            justify-content: flex-end;

            span {
              margin-right: 10px;
            }
            .date {
              margin-right: 0px;
            }
          }

          .hot {
            &::before {
              content: "\E68E";
            }
          }

          .comment {
            &::before {
              content: "\E61F";
            }
          }

          .date {
            &::before {
              content: "\E65F";
            }
          }
        }
      }
    }
  }
}
</style>
