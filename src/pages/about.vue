<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { Analytics } from "@vercel/analytics/nuxt";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";

definePageMeta({
  title: "关于 - Boooks",
});

const teamMembers = [
  {
    name: "Hanasaki",
    role: "发起者 & 开发者",
    avatar: "https://cravatar.cn/avatar/2652ab380725cbe9e65da5222a7a9efe",
    github: "https://github.com/hanasa2023",
    email: "mailto:hanasakayui2022@gmail.com",
  },
];
</script>

<template>
  <div class="container py-8">
    <!-- 项目介绍 -->
    <section class="mb-16">
      <h1 class="mb-6 text-4xl font-bold">关于 Boooks</h1>
      <Card class="p-6">
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold">项目初衷</h2>
          <p class="text-muted-foreground">
            Boooks
            项目始于2024年中，旨在为哈尔滨工程大学核专业的学生提供一个便捷的专业资源获取平台。我们希望通过这个平台，让更多的同学能够方便地获取到优质的学习资源。
          </p>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg bg-muted p-4">
              <h3 class="mb-2 font-semibold">我们的愿景</h3>
              <p class="text-sm text-muted-foreground">
                打造最全面的核专业资源导航平台，助力每一位同学的学习成长。
              </p>
            </div>
            <div class="rounded-lg bg-muted p-4">
              <h3 class="mb-2 font-semibold">核心价值</h3>
              <p class="text-sm text-muted-foreground">
                开放、共享、互助，让知识的传递不再受限。
              </p>
            </div>
          </div>
        </div>
      </Card>
    </section>

    <!-- 团队介绍 -->
    <section class="mb-16">
      <h2 class="mb-6 text-2xl font-bold">团队成员</h2>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="member in teamMembers"
          :key="member.name"
          class="overflow-hidden"
        >
          <div class="p-6">
            <div class="mb-4 flex items-center space-x-4">
              <img
                :src="member.avatar"
                :alt="member.name"
                class="h-16 w-16 rounded-full"
              />
              <div>
                <h3 class="font-semibold">{{ member.name }}</h3>
                <p class="text-sm text-muted-foreground">{{ member.role }}</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <a
                  :href="member.github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon="radix-icons:github-logo" class="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a :href="member.email">
                  <Icon
                    icon="radix-icons:envelope-closed"
                    class="mr-2 h-4 w-4"
                  />
                  Email
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="mb-16">
      <h2 class="mb-6 text-2xl font-bold">技术栈</h2>
      <Card class="p-6">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div class="flex items-center space-x-2">
            <Icon icon="logos:nuxt-icon" class="h-8 w-8" />
            <span>Nuxt 3</span>
          </div>
          <div class="flex items-center space-x-2">
            <Icon icon="logos:typescript-icon" class="h-8 w-8" />
            <span>TypeScript</span>
          </div>
          <div class="flex items-center space-x-2">
            <Icon icon="logos:tailwindcss-icon" class="h-8 w-8" />
            <span>Tailwind CSS</span>
          </div>
          <div class="flex items-center space-x-2">
            <Icon icon="logos:vitejs" class="h-8 w-8" />
            <span>Vite</span>
          </div>
        </div>
      </Card>
    </section>

    <!-- 联系我们 -->
    <section>
      <h2 class="mb-6 text-2xl font-bold">联系我们</h2>
      <Card class="p-6">
        <div class="space-y-4">
          <p class="text-muted-foreground">
            如果你有任何问题、建议或者想要参与项目开发，欢迎通过以下方式联系我们：
          </p>
          <div class="flex space-x-4">
            <Button variant="outline" asChild>
              <a
                href="https://github.com/hanasa2023/boooks-nuxt"
                target="_blank"
              >
                <Icon icon="radix-icons:github-logo" class="mr-2 h-5 w-5" />
                GitHub Issues
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:hanasa@hrbeu.edu.cn">
                <Icon icon="radix-icons:envelope-closed" class="mr-2 h-5 w-5" />
                Email Us
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  </div>

  <!-- Vercel Components -->
  <SpeedInsights />
  <Analytics />
</template>
