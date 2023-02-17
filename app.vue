<script setup>
const { data: navigation } = await useAsyncData("navigation", () => {
  return fetchContentNavigation();
});
</script>

<template>
  <div>
    <header>
      <nav>
        <AppNavigation :navigation-tree="navigation" />
      </nav>
    </header>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>
