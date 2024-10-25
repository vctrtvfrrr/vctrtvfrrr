<script setup lang="ts">
const config = useAppConfig();
const sharingNetworks = config.sharing_networks || [];

defineProps<{
  title: string;
  cover: string | undefined;
}>();
</script>

<template>
  <div v-if="sharingNetworks.length > 0">
    <span class="text-sm md:text-xl">Share</span>
    <div class="mt-4 flex flex-row gap-2">
      <SharingButtons
        :title="title"
        :cover="cover"
        :styled="true"
        class-button="text-white"
      />
    </div>
  </div>
</template>
