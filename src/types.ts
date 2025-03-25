export type Note = {
  id: string;
  content: string;
  categories: string[];
  createdAt: number;
};

export type Category = {
  name: string;
  isSuggested: boolean;
};
