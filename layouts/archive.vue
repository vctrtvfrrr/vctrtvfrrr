<script setup lang="ts">
defineProps<{
  doc: any;
  docs: any;
  currentPage: number;
  total: number;
  category: string;
  tag: string;
}>();
</script>

<template>
  <AppHeader />
  <CenteredTitle clazz="mt-14">Archives</CenteredTitle>
  <FullListOfPosts />
  <AppFooter />
</template>
