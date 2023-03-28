<script setup lang="ts">
import type { BlogPostPreview } from "~/types";

defineProps<{
  post: BlogPostPreview;
}>();
</script>

<template>
  <article class="grid grid-cols-4 gap-6 auto-cols-[minmax(0,_3fr)] py-4">
    <div class="h-full w-full object-cover">
      <NuxtLink
        :to="post.url || post._path"
        :target="post.url ? '_blank' : '_self'"
      >
        <NuxtImg
          :provider="post.provider"
          :src="post.image || 'default.gif'"
          :alt="post.title"
          :fit="typeof post.provider === 'undefined' ? 'cover' : 'thumb'"
          width="272"
          height="272"
          format="webp"
          class="scale-90 transition-all duration-400 hover:scale-100 rounded"
        />
      </NuxtLink>
    </div>

    <div class="col-span-3">
      <NuxtLink
        :to="post.url || post._path"
        :target="post.url ? '_blank' : '_self'"
      >
        <h2
          class="mb-0 lg:mb-4 text-lg md:text-3xl font-semibold text-gray-800 hover:underline dark:text-white"
        >
          {{ post.title }}
        </h2>
        <p
          class="mt-0 lg:mt-3 mb-3 text-base lg:text-base text-gray-500 dark:text-gray-300 md:text-sm overflow-hidden md:overflow-visible whitespace-nowrap md:whitespace-normal text-ellipsis"
        >
          {{ post.description }}
        </p>
      </NuxtLink>
      <TagsList v-if="post.tags" :tags="post.tags" />
    </div>
  </article>
</template>
