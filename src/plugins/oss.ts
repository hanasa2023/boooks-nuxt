import COS from "cos-js-sdk-v5";
import type { Book } from "~/types/book";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  class IOSS {
    private client: COS | null = null;

    getClient() {
      if (!this.client) {
        this.client = new COS({
          SecretId: runtimeConfig.public.cosSecretID,
          SecretKey: runtimeConfig.public.cosSecretKey,
        });
      }
      return this.client;
    }

    async listBooks(prefix: string = "books/"): Promise<Book[]> {
      const client = this.getClient();
      const result = await client.getBucket({
        Bucket: runtimeConfig.public.cosBucket,
        Region: runtimeConfig.public.cosRegion,
        Prefix: prefix,
        MaxKeys: 1000,
      });

      return Promise.all(
        result.Contents?.slice(1, result.Contents.length).map(async (obj) => {
          const fileName = obj.Key?.split("/").pop() || "";
          const categories = await client.getObjectTagging({
            Bucket: runtimeConfig.public.cosBucket,
            Region: runtimeConfig.public.cosRegion,
            Key: obj.Key || "",
          });

          // 分类标签的处理
          const categoryTags =
            categories.Tags?.filter(
              (tag) =>
                tag.Key.toLowerCase() === "categroies" ||
                tag.Key.toLowerCase() === "categories"
            ) || [];

          const categoryValues =
            categoryTags.length > 0 ? categoryTags.map((tag) => tag.Value) : [];

          return {
            id: obj.Key || "",
            title: fileName.replace(/\.(pdf|epub|doc|pptx)$/, "").trim(),
            format: fileName.split(".").pop() as
              | "pdf"
              | "epub"
              | "doc"
              | "docx"
              | "pptx"
              | "ppt"
              | "xls"
              | "xlsx",
            size: Number(obj.Size),
            downloadUrl: await new Promise((resolve) => {
              client.getObjectUrl(
                {
                  Bucket: runtimeConfig.public.cosBucket,
                  Region: runtimeConfig.public.cosRegion,
                  Key: obj.Key,
                  Sign: true,
                },
                function (err, data) {
                  resolve(data.Url);
                }
              );
            }),
            uploadTime: obj.LastModified,
            author: "待补充",
            cover: "",
            description: "待补充",
            category: categoryValues,
            downloads: 0,
          };
        }) || []
      );
    }

    async getBookCover(book: Book): Promise<string> {
      const client = this.getClient();
      const baseUrl = `https://${runtimeConfig.public.cosBucket}.cos.${runtimeConfig.public.cosRegion}.myqcloud.com`;
      try {
        if (book.format === "pdf") {
          await client.headObject({
            Bucket: runtimeConfig.public.cosBucket,
            Region: runtimeConfig.public.cosRegion,
            Key: `covers/${book.title}.jpg`,
          });
          return `${baseUrl}/covers/${book.title}.jpg`;
        } else if (book.format === "epub") {
          await client.headObject({
            Bucket: runtimeConfig.public.cosBucket,
            Region: runtimeConfig.public.cosRegion,
            Key: `covers/${book.title}.jpg`,
          });
          return `${baseUrl}/covers/${book.title}.jpg`;
        } else if (book.format === "doc" || book.format === "docx") {
          return `${baseUrl}/covers/word.png`;
        } else if (book.format === "ppt" || book.format === "pptx") {
          return `${baseUrl}/covers/powerpoint.png`;
        } else if (book.format === "xls" || book.format === "xlsx") {
          return `${baseUrl}/covers/excel.png`;
        } else {
          return `${baseUrl}/covers/default-cover.png`;
        }
      } catch {
        return `${baseUrl}/covers/default-cover.png`;
      }
    }

    getPreviewUrl(bookId: string): string {
      const ext = bookId.split(".").pop();
      const baseUrl = `https://${runtimeConfig.public.cosBucket}.cos.${runtimeConfig.public.cosRegion}.myqcloud.com`;
      if (ext === "pdf") {
        return `https://g.alicdn.com/teambition/pdfviewer/1.2.0/index.html?file=${baseUrl}/${bookId}`;
      } else if (ext === "epub") {
        return `https://alist-org.github.io/static/epub.js/viewer.html?url=${baseUrl}/${bookId}`;
      } else if (
        ext === "doc" ||
        ext === "docx" ||
        ext === "ppt" ||
        ext === "pptx" ||
        ext === "xls" ||
        ext === "xlsx"
      ) {
        return `https://view.officeapps.live.com/op/view.aspx?src=${baseUrl}/${bookId}`;
      } else {
        return `https://g.alicdn.com/teambition/pdfviewer/1.2.0/index.html?file=${baseUrl}/${bookId}`;
      }
    }
  }

  return {
    provide: {
      ossClient: new IOSS(),
    },
  };
});
