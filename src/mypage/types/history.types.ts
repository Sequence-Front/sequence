// 2024-11-18 18:09 승균 작성
export type HistoryItemType = {
  title: string;
  category: string;
  period: string;
  description?: string;
};

export type HistoryDataType = {
  introduction: string;
  activities: HistoryItemType[];
  career: HistoryItemType[];
  certification: HistoryItemType[];
  portfolio: string[];
}; 