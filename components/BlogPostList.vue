<script setup lang="ts">
import type { BlogPostPreview } from "~/types";

defineProps<{
  list: Array<BlogPostPreview>;
}>();
</script>

<template>
  <ul class="py-6 m-auto max-w-4xl">
    <li v-for="item in list" :key="item._path" class="py-4 border-b">
      <BlogPostPreview :post="item" />
    </li>
  </ul>
</template>
