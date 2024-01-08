<template>
  <div class="root">
    <svg
      t="1704544672982"
      class="xmarkicon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3664"
      width="24"
      height="24"
      @click="back()"
    >
      <path
        d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z"
        fill="#88888c"
        p-id="3665"
      ></path>
    </svg>
    <div class="image">
      <svg
        t="1704542308368"
        class="icon prev-button"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1674"
        width="40"
        height="40"
        v-show="prevId !== ''"
        @click="prevPhoto"
      >
        <path
          d="M802.909091 487.144727H333.661091l184.762182-170.589091a34.909091 34.909091 0 1 0-47.36-51.269818l-250.391273 231.098182a34.955636 34.955636 0 0 0 0 51.316364l250.391273 231.098181a34.862545 34.862545 0 0 0 49.338182-1.954909 34.909091 34.909091 0 0 0-1.978182-49.338181l-184.762182-170.542546H802.909091a34.909091 34.909091 0 1 0 0-69.818182"
          fill="#797979"
          p-id="1675"
        ></path>
      </svg>

      <img
        ref="bg"
        class="img animate__animated animate__fadeIn"
        :src="photo.src"
      />

      <svg
        t="1704542294845"
        class="icon next-button"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1475"
        width="40"
        height="40"
        v-show="nextId !== ''"
        @click="nextPhoto"
      >
        <path
          d="M244.363636 556.939636h469.248l-184.762181 170.565819a34.909091 34.909091 0 1 0 47.36 51.29309l250.391272-231.121454a34.955636 34.955636 0 0 0 0-51.293091l-250.391272-231.121455a34.862545 34.862545 0 0 0-49.338182 1.95491 34.909091 34.909091 0 0 0 1.978182 49.338181l184.762181 170.565819H244.363636a34.909091 34.909091 0 1 0 0 69.818181"
          fill="#797979"
          p-id="1476"
        ></path>
      </svg>
    </div>
    <div class="info">
      <span class="author">
        {{ photo.author }}
      </span>
      <!-- <span class="score">{{ photo.score }}</span> -->
      <Star class="score" :score="photo.score"></Star>
      <span class="params">
        <span class="focal-length">{{ photo.focalLength }}</span>
        <span class="aperture">{{ photo.aperture }}</span>
        <span class="shutter">{{ photo.shutter }}</span>
        <span class="iso">{{ photo.iso }}</span>
      </span>
      <span class="location">{{ photo.location }}</span>
      <span class="camera">{{ photo.camera }}</span>
      <span class="lens">{{ photo.lens }}</span>
      <span class="date">
        {{ photo.date[0] }}-{{ photo.date[1] }}-{{ photo.date[2] }}
      </span>
    </div>
  </div>
</template>

<script>
import "animate.css";
import Star from "@/components/Star.vue";
export default {
  name: "ViewPhoto",
  components: {
    Star
  },
  inject: ['reload'],
  data() {
    return {
      photoLists: this.getConfig("photos.json").photoLists,
      photo: null,
      photos: [],
      prevId: "",
      nextId: ""
    };
  },
  props: {
    id: ""
  },
  mounted() {
    this.getCurPhoto();
  },
  watch: {
    $route(to, from) {
      this.getCurPhoto();
      //this.reload()
      this.playAnimation();
    }
  },
  methods: {
    playAnimation() {
      const anim = this.$refs.bg;

      // 添加 animate.css 中的类
      //anim.classList.remove("animate__animated");
      anim.classList.add("animate__animated");

      // // 在动画结束后，移除添加的类，以便下次动画播放
      anim.addEventListener("animationend", () => {
        anim.classList.remove("animate__animated");
      });
    },
    nextPhoto() {
      this.$router.replace(`/photo/${this.nextId}`);
    },
    prevPhoto() {
      this.$router.replace(`/photo/${this.prevId}`);
    },
    back() {
      this.$router.back();
    },
    getCurPhoto() {
      for (const list of this.photoLists) {
        for (const photo of list.photos) {
          if (photo.id == this.id) {
            this.photo = photo;
            this.photos = list.photos;
            if (this.photos.indexOf(this.photo) > 0) {
              this.prevId = this.photos[this.photos.indexOf(this.photo) - 1].id;
            }
            if (this.photos.indexOf(this.photo) < this.photos.length - 1) {
              this.nextId = this.photos[this.photos.indexOf(this.photo) + 1].id;
            }
            console.log(this.id);
            console.log(this.photos);
            console.log(this.prevId);
            console.log(this.nextId);
            return;
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.root {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #dddddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .xmarkicon {
    position: absolute;
    top: 20px;
    right: 20px;
    &:hover {
      cursor: pointer;
    }
  }
  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    .icon {
      position: fixed;
      transition: all 0.3s ease-out;
      cursor: pointer;
      top: 45vh;
      z-index: 1;
    }
    .prev-button {
      left: 2vw;
      &:hover {
        transform: scale(1.2) translateX(-5px);
      }
    }
    .next-button {
      right: 2vw;
      &:hover {
        transform: scale(1.2) translateX(5px);
      }
    }
    .img {
      position: relative;
      bottom: 5vh;
      width: 65vw;
      object-fit: cover;
      //box-shadow: rgba(68, 66, 62, 0.3) 0px 16px 100px 0px,rgba(0, 0, 0, 0.1) 0px 6px 20px 0px;
      backdrop-filter: blur(10px);
      box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
      transition: all 0.3s ease-out;
    }
  }
  .info > span {
    padding: 20px;
    border-radius: 8px;
  }
  .info > span:hover {
    box-shadow: 0 12px 30px 0 rgba(0, 0, 0, 0.15);
    background-color: #fff;
  }

  .info {
    display: flex;
    width: 80vw;
    height: 15vh;
    flex-wrap: wrap;
    //background-color: red;
    align-items: center;
    justify-content: space-between;
    //position: relative;
    position: absolute;
    bottom: 10px;
    color: #363636;
    span::before {
      font-family: "iconfont";
      margin-right: 0.25em;
    }

    .author {
      min-width: 120px;
      &::before {
        content: "\E615";
      }
    }
    .score {
      min-width: 165px;
      border-radius: 8px;
      &:hover {
        box-shadow: 0 12px 30px 0 rgba(0, 0, 0, 0.15);
        background-color: #fff;
      }
    }
    .params > span {
      display: flex;
      align-items: center;
      font-size: 12px;
    }
    .params {
      display: flex;
      justify-content: space-between;
      width: 16vw;
      min-width: 220px;
      max-width: 230px;
      .focal-length {
        &::before {
          color: #585858;
          font-family: "icondandy";
          content: "\E901";
        }
      }
      .aperture {
        &::before {
          color: #585858;
          font-family: "icondandy";
          content: "\E900";
        }
      }
      .shutter {
        &::before {
          color: #585858;
          font-family: "icondandy";
          content: "\E902";
        }
      }
      .iso {
        &::before {
          color: #585858;
          font-family: "icondandy";
          content: "\E903";
        }
      }
    }
    .location {
      min-width: 140px;
      &::before {
        content: "\E619";
      }
    }
    .camera {
      min-width: 240px;
      &::before {
        content: "\E7BA";
      }
    }
    .lens {
      min-width: 260px;
      &::before {
        content: "\E604";
      }
    }
    .date {
      min-width: 155px;
      &::before {
        content: "\E65F";
      }
    }
  }
  @media (min-width: 1460px) {
    .info {
      bottom: -10px;
    }
  }
}
</style>
