export interface BookRequest {
  id?: string;
  title: string;
  author: string;
  isbn?: string;
  description: string;
  requestDate?: Date;
  status?: "pending" | "approved" | "rejected";
  requester?: string;
  notes?: string;
  url?: string;
}
