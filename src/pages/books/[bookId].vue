<script lang="ts" setup>
const route = useRoute();
const { $ossClient } = useNuxtApp();
const previewUrl = ref(
  $ossClient.getPreviewUrl(("books/" + route.params.bookId) as string)
);
</script>

<template>
  <div class="flex flex-col h-full p-4">
    <h2
      class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-4"
    >
      {{ $route.params.bookId }}
    </h2>
    <div class="flex-1 min-h-0">
      <iframe
        :src="previewUrl"
        class="w-full h-full min-h-[calc(100vh-256px)] rounded-md"
      ></iframe>
    </div>
  </div>
</template>
