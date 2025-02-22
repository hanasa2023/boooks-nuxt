<script setup lang="ts">
import type { Book } from "~/types/book";

const props = defineProps<{
  book: Book;
  show: boolean;
}>();

const emit = defineEmits<{
  "update:show": [value: boolean];
}>();

const { $ossClient } = useNuxtApp();
const previewUrl = ref("");
const isLoading = ref(true);

watch(
  () => props.show,
  async (newVal) => {
    if (newVal) {
      isLoading.value = true;
      try {
        previewUrl.value = $ossClient.getPreviewUrl(props.book.id);
      } catch (error) {
        console.error("Failed to get preview URL:", error);
      } finally {
        isLoading.value = false;
      }
    }
  }
);
</script>

<template>
  <Dialog :open="show" @update:open="(val) => emit('update:show', val)">
    <DialogContent class="max-w-4xl h-[80vh]">
      <DialogHeader class="flex">
        <DialogTitle>{{ book.title }}</DialogTitle>
        <DialogDescription>预览模式</DialogDescription>
      </DialogHeader>
      <div class="flex h-full overflow-auto">
        <div v-if="isLoading" class="flex items-center justify-center h-full">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
          ></div>
        </div>
        <iframe
          v-else
          :src="previewUrl"
          class="w-full h-full"
          frameborder="0"
        ></iframe>
      </div>
    </DialogContent>
  </Dialog>
</template>
