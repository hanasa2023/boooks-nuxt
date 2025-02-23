<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Book } from "~/types/book";

defineProps<{
  book: Book;
  formatFileSize: (bytes: number) => string;
}>();
</script>

<template>
  <Card
    class="overflow-hidden hover:shadow-lg dark:hover:shadow-white/40 transition-shadow h-full"
  >
    <div class="aspect-[3/4] relative">
      <img
        :src="book.cover"
        :alt="book.title"
        loading="lazy"
        class="absolute inset-0 w-full h-full object-cover"
      />
    </div>
    <div class="p-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <h3 class="font-semibold line-clamp-1">{{ book.title }}</h3>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ book.title }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p class="text-sm text-muted-foreground mt-1">{{ book.author }}</p>
      <div class="mt-2 flex items-center justify-between text-sm">
        <span class="text-muted-foreground">
          {{ formatFileSize(book.size) }}
        </span>
        <Badge>{{ book.format.toUpperCase() }}</Badge>
      </div>
      <div class="flex gap-2 mt-4">
        <Button class="flex-1" asChild>
          <a :href="book.downloadUrl" target="_blank" rel="noopener noreferrer">
            下载
          </a>
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" asChild>
                <NuxtLink :to="`/${book.id}`">
                  <Icon icon="ic:baseline-preview" class="h-4 w-4" />
                </NuxtLink>
              </Button>
            </TooltipTrigger>
            <TooltipContent>在线预览</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </Card>
</template>
