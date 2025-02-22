<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/vue";
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
const selectedBook = ref<Book | null>(null);
const showPreview = ref(false);

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
</script>

<template>
  <div class="container py-8">
    <!-- 头部搜索和筛选 -->
    <div class="mb-8 flex items-center justify-between">
      <div class="flex-1 max-w-md">
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
        <SelectTrigger class="w-[180px]">
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
    <div v-if="!isLoading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card
        v-for="book in filteredBooks"
        :key="book.id"
        class="overflow-hidden hover:shadow-lg dark:hover:shadow-white/40 transition-shadow"
      >
        <div class="aspect-[3/4] relative">
          <img
            :src="book.cover"
            :alt="book.title"
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
              <a
                :href="book.downloadUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
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
    </div>

    <!-- 加载状态 -->
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
