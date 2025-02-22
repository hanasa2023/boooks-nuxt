<script lang="ts" setup>
import { Icon } from "@iconify/vue";

definePageMeta({
  title: "Boooks - HEU15系资源导航",
});
</script>

<template>
  <div class="container py-8">
    <div class="mb-16 text-center">
      <h1
        class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        Welcome to Boooks
      </h1>
      <p class="mt-4 text-lg text-muted-foreground">
        一个专注于哈尔滨工程大学核专业的资源导航网站
      </p>
      <div class="mt-8 flex justify-center space-x-4">
        <Button size="lg" variant="default">
          <Icon icon="ic:baseline-search" class="mr-2 h-5 w-5" />
          <NuxtLink to="/books"> 开始探索 </NuxtLink>
        </Button>
        <Button size="lg" variant="outline">
          <Icon icon="ic:baseline-help" class="mr-2 h-5 w-5" />
          <NuxtLink to="/about"> 关于网站 </NuxtLink>
        </Button>
      </div>
    </div>

    <div class="space-y-16">
      <div
        class="grid md:grid-cols-2 sm:grid-cols-1 gap-8 items-center rounded-xl bg-card p-6 shadow-lg dark:shadow-white/40"
      >
        <img
          src="https://picsum.photos/600/400"
          alt="Book Collection"
          class="w-full rounded-lg object-cover shadow-md dark:shadow-white/40 transition-transform hover:scale-105"
        />
        <div class="space-y-4">
          <h2 class="text-2xl font-bold">专业书籍收录</h2>
          <p class="text-lg text-muted-foreground">
            精心收集和整理本专业教材、参考书籍和学习资料。持续更新，助力你的学习。
          </p>
          <ul class="ml-6 list-disc space-y-2 text-muted-foreground">
            <li>覆盖本科阶段的专业课程</li>
            <li>包含中英文版本的经典教材</li>
            <li>提供相关习题解答和学习指导</li>
          </ul>
          <Button variant="link" class="p-0">
            <NuxtLink to="/books"> 浏览书籍库 </NuxtLink>
            <Icon icon="ic:round-arrow-forward" class="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        class="grid md:grid-cols-2 sm:grid-cols-1 gap-8 items-center rounded-xl bg-card p-6 shadow-lg dark:shadow-white/40"
      >
        <div class="space-y-4">
          <h2 class="text-2xl font-bold">资源请求</h2>
          <p class="text-lg text-muted-foreground">
            找不到需要的资源？提交请求，我们会尽快为你寻找并上传。
          </p>
          <ul class="ml-6 list-disc space-y-2 text-muted-foreground">
            <li>快速响应资源需求</li>
            <li>支持批量资源请求</li>
            <li>提供替代资源推荐</li>
          </ul>
          <Button variant="link" class="p-0">
            <NuxtLink to="/request"> 提交请求 </NuxtLink>
            <Icon icon="ic:round-arrow-forward" class="ml-2 h-4 w-4" />
          </Button>
        </div>
        <img
          src="https://preview.hanasaki.tech/images/request-page.png"
          alt="Resource Request"
          class="w-full rounded-lg object-cover shadow-md dark:shadow-white/40 transition-transform hover:scale-105"
        />
      </div>
    </div>

    <!-- <div class="mt-16 grid grid-cols-4 gap-4 rounded-xl bg-muted p-6">
      <div class="text-center">
        <h3 class="text-3xl font-bold">500+</h3>
        <p class="text-sm text-muted-foreground">收录书籍</p>
      </div>
      <div class="text-center">
        <h3 class="text-3xl font-bold">15+</h3>
        <p class="text-sm text-muted-foreground">覆盖专业</p>
      </div>
      <div class="text-center">
        <h3 class="text-3xl font-bold">1000+</h3>
        <p class="text-sm text-muted-foreground">活跃用户</p>
      </div>
      <div class="text-center">
        <h3 class="text-3xl font-bold">98%</h3>
        <p class="text-sm text-muted-foreground">请求完成率</p>
      </div>
    </div> -->
  </div>
</template>
