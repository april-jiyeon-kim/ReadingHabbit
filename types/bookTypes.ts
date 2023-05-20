export interface Book {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  link: string;
  description: string;
  genres: string[];
  totalPages?: number;
  image: string;
  reading: {
    status: ReadingStatus;
    currentPage?: number;
    startDate?: string;
    endDate?: string;
  };
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
  id: number;
  noteType: NoteType;
  title: string;
  text: string;
  page: string[];
  image: string;
}

export enum NoteType {
  NOTES = "NOTES",
  QUOTES = "QUOTES",
}

export enum PageType {
  SINGLE = "Single",
  RANGE = "Range",
}
