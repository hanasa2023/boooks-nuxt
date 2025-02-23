<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/vue";
import { defineAsyncComponent } from "vue";
import type { Book, BookCategory } from "~/types/book";

definePageMeta({
  title: "图书列表",
});

// 状态管理
const books = ref<Book[]>([]);
const categories = ref<BookCategory[]>([]);
const selectedCategory = ref<string>("all");
const searchQuery = ref("");
const isLoading = ref(true);
const { $ossClient } = useNuxtApp();
const ossClient = $ossClient;
// const selectedBook = ref<Book | null>(null);
// const showPreview = ref(false);

// const handlePreview = (book: Book) => {
//   selectedBook.value = book;
//   showPreview.value = true;
// };

// 获取图书列表
const fetchBooks = async () => {
  try {
    isLoading.value = true;
    const bookList = await ossClient.listBooks();

    // 获取封面
    for (const book of bookList) {
      book.cover = await ossClient.getBookCover(book);
      book.cover = await ossClient.getBookCover(book);
    }

    books.value = bookList;

    // 统计分类
    const categoryMap = new Map<string, number>();
    bookList.forEach((book) => {
      book.category.forEach((cat) => {
        categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
      });
    });

    categories.value = Array.from(categoryMap.entries()).map(
      ([name, count]) => ({
        name,
        count,
      })
    );
  } catch (error) {
    console.error("Failed to fetch books:", error);
  } finally {
    isLoading.value = false;
  }
};

// 过滤图书
const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    // 分类过滤
    const matchesCategory =
      selectedCategory.value === "all" ||
      (book.category &&
        book.category.length > 0 &&
        book.category.includes(selectedCategory.value));

    // 搜索过滤
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.value.toLowerCase());

    return matchesCategory && matchesSearch;
  });
});

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

const handleCategoryChange = (value: string) => {
  selectedCategory.value = value;
};

// 初始化
onMounted(() => {
  fetchBooks();
});

// 懒加载相关状态
const ITEMS_PER_PAGE = 12;
const currentPage = ref(1);
const isLoadingMore = ref(false);

// 分页后的图书列表
const paginatedBooks = computed(() => {
  const start = 0;
  const end = Math.min(
    currentPage.value * ITEMS_PER_PAGE,
    filteredBooks.value.length
  );
  return filteredBooks.value.slice(start, end);
});

// 检查是否还有更多数据
const hasMore = computed(() => {
  return paginatedBooks.value.length < filteredBooks.value.length;
});

// 加载更多
const loadMore = async () => {
  if (!hasMore.value || isLoadingMore.value) return;

  isLoadingMore.value = true;
  currentPage.value++;
  isLoadingMore.value = false;
};

// 重置分页
watch([selectedCategory, searchQuery], () => {
  currentPage.value = 1;
});

const loadingTrigger = ref<HTMLElement | null>(null);
const observerCallback = ([entry]: IntersectionObserverEntry[]) => {
  if (entry.isIntersecting && !isLoading.value && !isLoadingMore.value) {
    loadMore();
  }
};

onMounted(() => {
  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.5,
  });

  if (loadingTrigger.value) {
    observer.observe(loadingTrigger.value);
  }
});

const LazyBookCard = defineAsyncComponent(
  () => import("~/components/BookCard.vue")
);

const showLoadingState = computed(() => {
  return isLoading.value && filteredBooks.value.length === 0;
});
</script>

<template>
  <div class="container py-6 md:py-8">
    <!-- 头部搜索和筛选 -->
    <div
      class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="w-full sm:max-w-md">
        <div class="relative">
          <Icon
            icon="ic:baseline-search"
            class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            v-model="searchQuery"
            class="pl-10"
            placeholder="搜索图书标题或作者..."
          />
        </div>
      </div>
      <Select v-model="selectedCategory" @change="handleCategoryChange">
        <SelectTrigger class="w-full sm:w-[180px]">
          <SelectValue placeholder="选择分类" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部分类</SelectItem>
          <SelectItem
            v-for="category in categories"
            :key="category.name"
            :value="category.name"
          >
            {{ category.name }} ({{ category.count }})
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- 图书网格 -->
    <div
      v-if="!isLoading"
      class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <ClientOnly>
        <template v-for="book in paginatedBooks" :key="book.id">
          <LazyBookCard :book="book" :format-file-size="formatFileSize" />
        </template>
      </ClientOnly>
    </div>

    <!-- 加载更多触发器 -->
    <div
      v-if="hasMore && !isLoading && paginatedBooks.length > 0"
      ref="loadingTrigger"
      class="flex justify-center py-8"
    >
      <Button variant="outline" :disabled="isLoadingMore" @click="loadMore">
        <Icon
          v-if="isLoadingMore"
          icon="eos-icons:loading"
          class="mr-2 h-4 w-4 animate-spin"
        />
        {{
          isLoadingMore
            ? "加载中..."
            : `加载更多 (${paginatedBooks.length}/${filteredBooks.length})`
        }}
      </Button>
    </div>

    <!-- 加载状态 -->
    <div
      v-if="showLoadingState"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <Card v-for="n in 8" :key="n" class="overflow-hidden">
        <div class="aspect-[3/4] bg-muted animate-pulse" />
        <div class="p-4 space-y-3">
          <div class="h-4 bg-muted rounded animate-pulse" />
          <div class="h-4 bg-muted rounded w-2/3 animate-pulse" />
        </div>
      </Card>
    </div>

    <!-- 无结果提示 -->
    <div
      v-if="!isLoading && filteredBooks.length === 0"
      class="text-center py-12"
    >
      <Icon
        icon="ic:baseline-search-off"
        class="h-12 w-12 mx-auto text-muted-foreground"
      />
      <p class="mt-4 text-lg text-muted-foreground">未找到符合条件的图书</p>
    </div>

    <!-- 预览对话框 -->
    <!-- <BookPreviewDialog
      v-if="selectedBook"
      v-model:show="showPreview"
      :book="selectedBook"
    /> -->
  </div>
</template>
