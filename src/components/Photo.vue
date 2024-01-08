<template>
  <div>
    <img :src="photo.src" :alt="photo.id" @click="enterPhotoDetails" />
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
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 320px;
  //height: 200px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease-out;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
