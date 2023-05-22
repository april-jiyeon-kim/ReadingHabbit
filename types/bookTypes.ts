export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  pubdate: string;
  link: string;
  description: string;
  genres: string[];
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
  uid: string;
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
  page: string[]; //single page or page range
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
