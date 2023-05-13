import { ReadingStatus } from "./types/bookTypes";

export function translateReadingStatus(type: ReadingStatus): string {
  switch (type) {
    case ReadingStatus.TO_READ:
      return "Planning to Read";
    case ReadingStatus.READING:
      return "Reading";
    case ReadingStatus.READ:
      return "Finished";
    default:
      return "";
  }
}
