<template>
  <div class="imgroot" ref="imgRootRef">
    <img
      ref="imageElementRef"
      :src="photo.src"
      :alt="photo.id"
      @click="enterPhotoDetails"
    />
  </div>
</template>

<script>
export default {
  name: "Photo",
  props: {
    photo: null
  },
  methods: {
    enterPhotoDetails() {
      this.$router.push(`/photo/${this.photo.id}`);
    },
    transformElement(x, y) {
      const element = this.$refs.imageElementRef;

      let box = element.getBoundingClientRect();
      const calcX = -(y - box.y - box.height / 2) / 10;
      const calcY = (x - box.x - box.width / 2) / 10;

      element.style.transform =
        "rotateX(" + -calcX + "deg) " + "rotateY(" + -calcY + "deg) scale(1.05)";
    }
  },
  mounted() {
    const mouseOverContainer = this.$refs.imgRootRef;

    mouseOverContainer.addEventListener("mousemove", e => {
      window.requestAnimationFrame(() => {
        this.transformElement(e.clientX, e.clientY);
      });
    });

    mouseOverContainer.addEventListener("mouseleave", () => {
      window.requestAnimationFrame(() => {
        this.$refs.imageElementRef.style.transform = "rotateX(0) rotateY(0)";
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.imgroot {
  width: 320px;
  display: flex;
  transform-style: preserve-3d;
  perspective: 500px;
  cursor: pointer;
}
img {
  width: 320px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease-out;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  transform-style: preserve-3d;
  //mask: linear-gradient(135deg, #000c 40%, #000, #000c 60%) 100% 100%/240% 240%;
  &:hover {
    //mask-position: 0 0;
  }
}
</style>
