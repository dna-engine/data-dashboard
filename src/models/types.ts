// DataDashboard ~~ MIT License

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type JsonData = Json[] | { [key: string]: Json };
