import { AuthTable } from "./auth.db";

export interface Database {
  tblAuthentications: AuthTable;
}
