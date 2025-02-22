<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { useToast } from "~/components/ui/toast";

definePageMeta({
  title: "资源请求",
});

const schema = z.object({
  title: z.string().min(1, "请输入书名"),
  author: z.string().min(1, "请输入作者"),
  isbn: z.string().optional(),
  description: z.string().min(10, "请详细描述您的需求"),
  url: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/.*/.test(val), {
      message: "请输入有效的URL",
    }),
  contact: z.string().min(1, "请输入联系方式"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    title: "",
    author: "",
    isbn: "",
    contact: "",
    description: "",
    url: "",
    notes: "",
  },
});

const isSubmitting = ref(false);
const { toast } = useToast();

const onSubmit = form.handleSubmit(async (data: FormData) => {
  isSubmitting.value = true;
  try {
    await $fetch("/api/book-request", {
      method: "POST",
      body: data,
    });

    toast({
      title: "提交成功",
      description: "我们会尽快处理您的请求",
    });
    form.resetForm();
  } catch (error) {
    toast({
      title: "提交失败",
      description: error instanceof Error ? error.message : "请稍后重试",
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="container py-8 max-w-2xl">
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl font-semibold tracking-tight">资源请求</h2>
        <p class="text-muted-foreground">
          找不到想要的书籍？提交请求，我们会尽快处理。
        </p>
      </div>

      <form @submit="onSubmit">
        <div class="space-y-4">
          <div class="grid gap-4 grid-cols-2">
            <FormField v-slot="{ field }" name="title">
              <FormItem>
                <FormLabel>书名</FormLabel>
                <FormControl>
                  <Input v-bind="field" placeholder="输入书名" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="author">
              <FormItem>
                <FormLabel>作者</FormLabel>
                <FormControl>
                  <Input v-bind="field" placeholder="输入作者" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <FormField v-slot="{ field }" name="isbn">
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input v-bind="field" placeholder="选填" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="contact">
            <FormItem>
              <FormLabel>联系方式</FormLabel>
              <FormControl>
                <Input v-bind="field" placeholder="请输入您的联系方式" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="url">
            <FormItem>
              <FormLabel>资源链接</FormLabel>
              <FormControl>
                <Input
                  v-bind="field"
                  type="url"
                  placeholder="如果您找到了资源链接，可以在这里提供（选填）"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="description">
            <FormItem>
              <FormLabel>详细说明</FormLabel>
              <FormControl>
                <Textarea
                  v-bind="field"
                  placeholder="请详细描述您的需求，包括具体版本、用途等信息"
                  rows="4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ field }" name="notes">
            <FormItem>
              <FormLabel>备注</FormLabel>
              <FormControl>
                <Textarea
                  v-bind="field"
                  placeholder="其他补充信息（选填）"
                  rows="2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <Button type="submit" :disabled="isSubmitting" class="w-full mt-6">
          <Icon
            v-if="isSubmitting"
            icon="eos-icons:loading"
            class="mr-2 h-4 w-4 animate-spin"
          />
          {{ isSubmitting ? "提交中..." : "提交请求" }}
        </Button>
      </form>
    </div>
  </div>
</template>
