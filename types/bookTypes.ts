export interface Book {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  pubdate: string;
  link: string;
  description: string;
  genres: string[];
  totalPages: number;
  image: string;
  status: ReadingStatus;
  currentPage?: number;
  startDate?: string;
  endDate?: string;
  quotes?: Quote[];
  notes?: Note[];
  discount?: string;
  isFavorite: boolean;
  isWishList: boolean;
  pageCount?: number;
}

export enum ReadingStatus {
  TO_READ = "TO_READ",
  READING = "READING",
  READ = "READ",
}

export interface Quote {
  id: string;
  bookId: string;
  content: string;
  page: number;
}

export interface Note {
  id: string;
  bookId: string;
  content: string;
  pageRange: string;
}