<script setup lang="ts">
const route = useRoute();
const config = useAppConfig();
const slug = route.params.slug as string[];

// detect if we are on a special page like:
// /tags/something/page/2
// /archives/page/1
const isTag = slug[0] === "tags";
const isArchives = slug[0] === "archives";

let doc = null;
let docs = null;
let page = 1;
let totalNumberOfPages = 1;
let theme = "default";
let category = "";
let tag = "";
const numberOfPostsPerPage = config.pagination?.per_page || 10;

// if (isCategory) {
//   category = slug[1];

//   const title = "Category: " + category;
//   const description = title;

//   useHead({
//     title: "Archives",
//     meta: [
//       { name: "description", content: description },
//       { name: "og:title", content: title },
//       { name: "og:description", content: description },
//       { name: "twitter:title", content: title },
//       { name: "twitter:description", content: description },
//     ],
//   });

//   page = Number.parseInt(slug[3]) || 1;

//   const where = {
//     categories: { $in: category },
//     hidden: { $ne: true },
//     listed: { $ne: false },
//   };

//   const result = await useAsyncData(route.path, async () => {
//     let queryBuilder = queryContent("").where(where).sort({ date: -1 });

//     if (numberOfPostsPerPage != -1) {
//       queryBuilder = queryBuilder
//         .limit(numberOfPostsPerPage)
//         .skip((page - 1) * numberOfPostsPerPage);
//     }

//     return await queryBuilder.find();
//   });

//   totalNumberOfPages = await queryContent("").where(where).count();
//   docs = result.data;
//   theme = "category";
// } else
if (isArchives) {
  const title = "Archives";
  const description = "Archives";

  useHead({
    title: "Archives",
    meta: [
      { name: "description", content: description },
      { name: "og:title", content: title },
      { name: "og:description", content: description },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  });

  page = Number.parseInt(slug[2]) || 1;

  const where = { hidden: { $ne: true }, listed: { $ne: false } };

  const result = await useAsyncData(route.path, async () => {
    let queryBuilder = queryContent("").where(where).sort({ date: -1 });

    if (numberOfPostsPerPage != -1) {
      queryBuilder = queryBuilder
        .limit(numberOfPostsPerPage)
        .skip((page - 1) * numberOfPostsPerPage);
    }

    return await queryBuilder.find();
  });

  totalNumberOfPages = await queryContent("").where(where).count();
  docs = result.data;
  theme = "archive";
} else if (isTag) {
  tag = slug[1];

  const title = "Tag: " + tag;
  const description = title;

  useHead({
    title: "Archives",
    meta: [
      { name: "description", content: description },
      { name: "og:title", content: title },
      { name: "og:description", content: description },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  });

  page = Number.parseInt(slug[2]) || 1;

  const where = {
    tags: { $in: tag },
    hidden: { $ne: true },
    listed: { $ne: false },
  };

  const result = await useAsyncData(route.path, async () => {
    let queryBuilder = queryContent("").where(where).sort({ date: -1 });

    if (numberOfPostsPerPage != -1) {
      queryBuilder = queryBuilder
        .limit(numberOfPostsPerPage)
        .skip((page - 1) * numberOfPostsPerPage);
    }

    return await queryBuilder.find();
  });

  totalNumberOfPages = await queryContent("").where(where).count();
  docs = result.data;
  theme = "tag";
} else {
  const result = await useAsyncData(route.path, async () => {
    return await queryContent("").where({ _path: route.path }).findOne();
  });

  doc = result.data;

  if (doc.value?.layout) {
    theme = String(doc.value.layout);
  }

  if (doc.value?.redirect_to_domain) {
    const redirect = doc.value?.redirect_to_domain + doc.value?._path;
    useHead({
      script: [
        {
          innerHTML: `window.location = "${redirect || "/"}"`,
        },
      ],
    });
  }

  if (doc.value?.redirect_to_full_url) {
    const redirect = doc.value?.redirect_to_full_url;
    useHead({
      script: [
        {
          innerHTML: `window.location = "${redirect || "/"}"`,
        },
      ],
    });
  }

  if (doc.value) {
    useContentHead(doc.value);
  }

  const url = useAppConfig().url.replace(/\/$/, "");
  const postLink = url + doc.value?._path;

  useHead({
    meta: [
      { key: "og:type", name: "og:type", content: "article" },
      {
        key: "og:url",
        name: "og:url",
        content: postLink,
      },
      { name: "twitter:text:title", content: doc.value?.title },
      { name: "twitter:card", content: "summary" },
      {
        name: "article:article:tag",
        content: doc.value?.tags ? doc.value.tags?.toString() : "",
      },
    ],
    link: [
      {
        rel: "canonical",
        href: postLink,
      },
    ],
  });

  if (doc.value?.alternates) {
    const alternates =
      doc.value?.alternates?.map((alternate: any) => {
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
      hreflang: doc.value?.language || "en",
    });

    useHead({
      link: alternates,
    });
  }

  if (doc.value?.cover) {
    useHead({
      meta: [
        {
          key: "og:image",
          name: "og:image",
          content: url + "/images/" + doc.value?.cover,
        },
        { name: "og:image:alt", content: doc.value?.title },
        {
          name: "twitter:image",
          content: url + "/images/" + doc.value?.cover,
        },
      ],
    });
  }

  if (doc.value?.date) {
    useHead({
      meta: [
        {
          name: "article:published_time",
          content: new Date(doc.value?.date).toISOString(),
        },
        {
          name: "article:article:modified_time",
          content: new Date(doc.value?.date).toISOString(),
        },
      ],
    });
  }
}
</script>

<template>
  <NuxtLayout
    :name="theme"
    :doc="doc"
    :docs="docs"
    :current-page="page"
    :total="totalNumberOfPages"
    :category="category"
    :tag="tag"
  />
</template>
