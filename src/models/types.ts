// DataDashboard ~~ MIT License

export type Json = string | number | boolean | null | undefined | JsonObject | Json[];
export type JsonObject = { [key: string]: Json };
export type JsonArray = Json[];
export type JsonData = JsonObject | Json[];
