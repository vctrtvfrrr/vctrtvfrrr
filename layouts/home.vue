<script setup lang="ts">
defineProps<{
  doc: any;
  docs: any;
  currentPage: number;
  total: number;
  tag: string;
}>();
</script>

<template>
  <AppHeader />

  <HomeLayout>
    <template #posts>
      <LimitedListOfPosts />
    </template>

    <template #sidebar>
      <SideAuthorCard />
    </template>
  </HomeLayout>

  <AppFooter />
</template>
