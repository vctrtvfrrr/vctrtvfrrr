<script setup lang="ts">
import { format } from "date-fns";
import type { ParsedContent, QueryBuilderParams } from "@nuxt/content";

const query: QueryBuilderParams = {
  path: "",
  where: [{ hidden: { $ne: true }, listed: { $ne: false } }],
  sort: [{ date: -1 }],
};

function getYear(date: string) {
  return format(date, "yyyy");
}

function shouldDisplayYear(list: ParsedContent[], date: string, index: number) {
  const currentYear = getYear(date);
  const prevYear = index > 0 ? getYear(list[index - 1].date) : null;
  return currentYear !== prevYear;
}
</script>

<template>
  <main>
    <div class="mx-auto max-w-[1330px] md:p-4">
      <ContentList :query="query">
        <template #not-found>
          <p>Nenhum post encontrado.</p>
        </template>

        <template #default="{ list }">
          <div
            v-for="(article, index) in list"
            :key="article._path"
            class="mb-2 ml-4 lg:ml-0"
          >
            <div
              v-if="shouldDisplayYear(list, article.date, index)"
              class="mb-4"
            >
              <span class="text-4xl font-bold">{{
                getYear(article.date)
              }}</span>
            </div>

            <NuxtLink
              :to="`/blog${article._path}`"
              class="text-gray-700 underline decoration-dashed underline-offset-4"
            >
              <span>{{ format(article.date, 'yyyy-MM-dd') }}</span> &middot;
              <span>{{ article.title }}</span>
            </NuxtLink>

            <span v-if="article.tags && article.tags.length > 0"
              >&nbsp; &middot;</span
            >

            <NuxtLink
              v-for="tag in article.tags"
              :key="tag"
              :to="`/tags/${tag}`"
              class="bg-gray-200 rounded-full px-1.5 py-1 text-xs font-semibold text-gray-700 mx-1.5"
            >
              {{ tag }}
            </NuxtLink>
          </div>
        </template>
      </ContentList>
    </div>
  </main>
</template>
