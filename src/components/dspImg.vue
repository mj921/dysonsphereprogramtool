<template>
  <img
    :src="imgs[name]"
    :alt="name"
    :style="size ? { width: `${size}px`, height: `${size}px` } : {}"
  />
</template>

<script>
import imgs from "../data/imgs";

export default {
  props: {
    name: String,
    size: Number
  },
  data() {
    return { imgs };
  }
};
</script>

<style></style>
