<script setup lang="ts">
import type { BlogPost } from "~/types";

const { data: articles } = await useAsyncData("articles", () =>
  queryContent<BlogPost>("blog")
    .where({ published: { $ne: false } })
    .sort({ date: -1 })
    .find()
);

const title = "All Blog Posts";
const description = "Here's a list of all my blog posts";

useHead({
  title,
  meta: [{ name: "description", content: description }],
});
</script>

<template>
  <main>
    <AppTitle>{{ title }}</AppTitle>
    <AppIntro>{{ description }}</AppIntro>
    <Tags />
    <BlogPostList v-if="articles !== null" :list="articles" />
  </main>
</template>
