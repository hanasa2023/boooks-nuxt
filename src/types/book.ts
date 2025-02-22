export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  category: string[];
  format: "pdf" | "epub" | "doc" | "docx" | "pptx" | "ppt" | "xls" | "xlsx";
  size: number;
  downloadUrl: string;
  uploadTime: string;
  downloads: number;
}

export interface BookCategory {
  name: string;
  count: number;
}
