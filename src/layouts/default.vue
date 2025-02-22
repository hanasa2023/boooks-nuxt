<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const toggleColorMode = () => {
  colorMode.value = isDark.value ? "light" : "dark";
};

// 使用useHead来动态设置头部信息
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Boooks` : "Boooks - HEU15系资源导航";
  },
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/img/boooks.svg",
    },
  ],
});
</script>

<template>
  <Toaster />
  <div class="flex min-h-screen flex-col">
    <header
      class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <nav class="container flex items-center justify-between h-14">
        <div class="flex items-center gap-6 md:gap-8">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <img src="/img/boooks.svg" alt="Boooks" width="32" height="32" />
            <span class="hidden font-bold sm:inline-block">Boooks</span>
          </NuxtLink>
          <ul class="hidden md:flex space-x-6">
            <li>
              <NuxtLink
                to="/"
                class="transition-colors hover:text-foreground/80"
                >主页</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/books"
                class="transition-colors hover:text-foreground/80"
                >图书</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/request"
                class="transition-colors hover:text-foreground/80"
                >资源请求</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="transition-colors hover:text-foreground/80"
                >关于</NuxtLink
              >
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
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
          <!-- 移动端菜单按钮 -->
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" class="md:hidden">
                <Icon icon="radix-icons:hamburger-menu" class="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav class="flex flex-col gap-4">
                <NuxtLink to="/" class="flex items-center">主页</NuxtLink>
                <NuxtLink to="/books" class="flex items-center">图书</NuxtLink>
                <NuxtLink to="/request" class="flex items-center"
                  >资源请求</NuxtLink
                >
                <NuxtLink to="/about" class="flex items-center">关于</NuxtLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="border-t py-6">
      <div
        class="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row"
      >
        <p
          class="text-center text-sm leading-loose text-muted-foreground md:text-left"
        >
          Built by hanasaki. The source code is available on GitHub.
        </p>
        <p class="text-center text-sm text-muted-foreground md:text-left">
          © 2024-2025 Boooks
        </p>
      </div>
    </footer>
  </div>
</template>
