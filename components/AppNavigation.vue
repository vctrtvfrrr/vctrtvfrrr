<script setup lang="ts">
defineProps({
  navigationTree: {
    type: Array<{ _path: string; title: string; children: array }>,
    default: () => [],
  },
});
</script>

<template>
  <ul class="navigation">
    <li v-for="(item, index) in navigationTree" :key="index">
      <NuxtLink :to="item._path">
        {{ item.title }}
      </NuxtLink>
      <AppNavigation
        v-if="item.children"
        :navigation-tree="item.children"
        class="sub-navigation"
      />
    </li>
  </ul>
</template>

<style scoped>
.navigation ul {
  margin-left: 0.8rem;
}
</style>
