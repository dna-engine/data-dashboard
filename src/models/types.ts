// DataDashboard ~~ MIT License

export type Json = string | number | boolean | null | undefined | Json[] | { [key: string]: Json };
export type JsonObject = { [key: string]: Json };
export type JsonArray = Json[];
export type JsonData = JsonObject | JsonArray;
