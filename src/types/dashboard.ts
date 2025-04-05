
export type FeedItemType = "order" | "shop" | "product" | "user";

export interface FeedItem {
  id: string;
  type: FeedItemType;
  message: string;
  time: string;
  status?: "pending" | "approved" | "rejected" | "flagged" | "completed";
}
