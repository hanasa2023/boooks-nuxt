import { z } from "zod";

const requestSchema = z.object({
  title: z.string().min(1, "请输入书名"),
  author: z.string().min(1, "请输入作者"),
  isbn: z.string().optional().nullable(),
  description: z.string().min(10, "请详细描述您的需求"),
  url: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || /^https?:\/\/.*/.test(val), {
      message: "请输入有效的URL",
    }),
  contact: z.string().min(1, "请输入联系方式"),
  notes: z.string().optional().nullable(),
});

export default defineEventHandler(async (event) => {
  const { sendMail } = useNodeMailer();

  try {
    const body = await readBody(event);
    const data = await requestSchema.parseAsync(body);

    await sendMail({
      to: "hanasa@hrbeu.edu.cn",
      subject: `新的图书请求: ${data.title}`,
      html: `
        <h2>新的图书请求</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>书名</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.title}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>作者</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${
              data.author
            }</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>ISBN</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${
              data.isbn || "未提供"
            }</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>联系方式</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${
              data.contact
            }</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>描述</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${
              data.description
            }</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>资源链接</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${
              data.url || "未提供"
            }</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>备注</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${
              data.notes || "无"
            }</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>请求时间</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
      `,
    });

    return { success: true, message: "请求已发送" };
  } catch (error) {
    console.error("Error processing request:", error);
    throw createError({
      statusCode: 400,
      message: error instanceof Error ? error.message : "请求处理失败",
    });
  }
});
