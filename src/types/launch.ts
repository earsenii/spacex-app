export interface ILaunch {
    name: string;
    rocket: string;
    date_unix: number;
    date_utc: string;
    launchpad: string;
    flight_number: number;
    links: object;
    success: boolean;
    upcoming: boolean;
  }