export interface IItem {
    id: string;
    name: string;
    date_unix: number;
    success: boolean;
    upcoming?: boolean;
  }