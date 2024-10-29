<script setup lang="ts">
const route = useRoute();

const { data } = await useAsyncData(route.path, async () => {
  const _path = route.path.replace(/^\/blog/, "");
  return await queryContent("").where({ _path }).findOne();
});

const doc = data.value;

if (doc?.redirect_to_domain) {
  const redirect = doc?.redirect_to_domain + doc?._path;
  useHead({
    script: [
      {
        innerHTML: `window.location = "${redirect || "/"}"`,
      },
    ],
  });
}

if (doc?.redirect_to_full_url) {
  const redirect = doc?.redirect_to_full_url;
  useHead({
    script: [
      {
        innerHTML: `window.location = "${redirect || "/"}"`,
      },
    ],
  });
}

if (doc) {
  useContentHead(doc);
}

const url = useAppConfig().url.replace(/\/$/, "");
const postLink = url + doc?._path;

useHead({
  meta: [
    { key: "og:type", name: "og:type", content: "article" },
    {
      key: "og:url",
      name: "og:url",
      content: postLink,
    },
    { name: "twitter:text:title", content: doc?.title },
    { name: "twitter:card", content: "summary" },
    {
      name: "article:article:tag",
      content: doc?.tags ? doc.tags?.toString() : "",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: postLink,
    },
  ],
});

if (doc?.alternates) {
  const alternates =
    doc?.alternates?.map((alternate: any) => {
      const key = Object.keys(alternate)[0];
      const value = alternate[key];
      return {
        rel: "alternate",
        href: value,
        hreflang: key,
      };
    }) || [];

  alternates.push({
    rel: "alternate",
    href: postLink,
    hreflang: doc?.language || "en",
  });

  useHead({
    link: alternates,
  });
}

if (doc?.cover) {
  useHead({
    meta: [
      {
        key: "og:image",
        name: "og:image",
        content: url + "/images/" + doc?.cover,
      },
      { name: "og:image:alt", content: doc?.title },
      {
        name: "twitter:image",
        content: url + "/images/" + doc?.cover,
      },
    ],
  });
}

if (doc?.date) {
  useHead({
    meta: [
      {
        name: "article:published_time",
        content: new Date(doc?.date).toISOString(),
      },
      {
        name: "article:article:modified_time",
        content: new Date(doc?.date).toISOString(),
      },
    ],
  });
}

const isTocEnabled =
  doc?.body?.toc?.links.length &&
  doc?.body.toc?.links.length > 0 &&
  doc?.table_of_contents;
</script>

<template>
  <main>
    <div v-if="doc">
      <div
        v-if="doc?.cover"
        class="md:flex justify-center mt-24 hidden lg:h-[500px]"
      >
        <NuxtImg
          :src="'/images/' + doc?.cover"
          :alt="doc?.title"
          fit="cover"
          placeholder
        />
      </div>
      <div class="px-4 mx-auto sm:px-6 xl:max-w-7xl xl:px-0 mt-10">
        <ArticleHeader :article="doc" />

        <div class="text-left mx-auto">
          <div class="flex flex-wrap lg:flex-row-reverse py-12">
            <div v-if="isTocEnabled" class="w-full lg:w-1/4 px-5">
              <PageSidebar :toc="doc?.body?.toc?.links" />
            </div>

            <div
              class="w-full px-5 max-w-none centered-image"
              :class="isTocEnabled ? 'lg:w-3/4 ' : ''"
            >
              <ContentRenderer
                id="nuxtContent"
                :value="doc"
                class="prose text-sm md:text-xl min-w-full md:p-10 mx-auto"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center mb-6">
          <NuxtLink
            v-for="tag in doc?.tags"
            :key="tag"
            :to="`/tags/${tag}`"
            class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mx-2"
          >
            {{ tag }}
          </NuxtLink>
        </div>

        <hr class="mb-8" />

        <ShareSection :title="doc?.title || ''" :cover="doc?.cover" />

        <CommentSystem :id="doc?.id" :nocomments="doc?.nocomments" />
      </div>
    </div>
  </main>
</template>
