<template>
  <div class="container">
    <div class="grid-3_xs-1_sm-2_md-2" v-if="tags.length">
      <div v-for="(tag, index) in tags" :key="index" class="col">
        <router-link :to="`/tags/${tag.name}`">
          <vs-card type="3" class="center">
            <template #title>
              <h3>{{ tag.name }}</h3>
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
</template>

<script>
import Nothing from "@/components/Nothing.vue";

export default {
  name: "ViewTags",
  mounted() {
    this.changeTitle("Tags");
    console.log(this.tags);
  },
  components: {
    Nothing
  }
};
</script>

<style lang="scss">
  .container{
    
  }
</style>
