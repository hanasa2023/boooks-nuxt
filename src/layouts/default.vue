<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const toggleColorMode = () => {
  colorMode.value = isDark.value ? "light" : "dark";
};
</script>

<template>
  <Toaster />
  <div class="flex min-h-screen flex-col">
    <header
      class="sticky top-0 z-50 flex items-center justify-between bg-background p-4 shadow-md dark:shadow-white/40"
    >
      <nav class="flex items-center space-x-4">
        <img src="/img/boooks.svg" alt="Boooks" width="40" height="40" />
        <ul class="flex space-x-4">
          <li>
            <NuxtLink to="/" class="p-2 hover:text-secondary-foreground/60"
              >主页</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/books" class="p-2 hover:text-secondary-foreground/60"
              >图书</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/request"
              class="p-2 hover:text-secondary-foreground/60"
              >资源请求</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/about" class="p-2 hover:text-secondary-foreground/60"
              >关于</NuxtLink
            >
          </li>
        </ul>
      </nav>
      <div class="flex items-center justify-center">
        <!-- <Button variant="secondary" class="mx-2 px-3">
          <Icon icon="ic:baseline-search" class="h-5 w-5" />
          <span class="pl-1"> 搜索你想要的书籍 </span>
        </Button> -->
        <Button variant="ghost" size="icon">
          <NuxtLink
            to="https://github.com/hanasa2023/boooks-next"
            target="_blank"
          >
            <Icon icon="radix-icons:github-logo" class="h-5 w-5" />
          </NuxtLink>
        </Button>
        <Button variant="ghost" @click="toggleColorMode" size="icon">
          <Icon
            :icon="isDark ? 'radix-icons:sun' : 'radix-icons:moon'"
            class="h-5 w-5"
          />
        </Button>
      </div>
    </header>
    <main class="flex-1 p-4">
      <slot />
    </main>
    <footer class="flex items-center justify-center bg-background p-4">
      <span>© 2024-2025 Boooks</span>
    </footer>
  </div>
</template>
