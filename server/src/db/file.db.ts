import { DB } from "../config/db.config";
import { CreateFile } from "../dto/types.dto";

export async function createFileQuery(payload: CreateFile | CreateFile[]) {
  if (Array.isArray(payload) && payload.length === 0) {
    return;
  }

  return await DB.insertInto("tblFiles").values(payload).execute();
  // return db.prepare<FileDto & { type: "FILE" }>(
  //   "INSERT INTO tblFiles (path, filename, contentType, checksum, size, ownerId) VALUES(@path, @filename, @contentType, @checksum, @size, @ownerId)"
  // );
}

export async function findAllFileByChecksumQuery(list: Array<string>) {
  return await DB.selectFrom("tblFiles")
    .select(["path", "checksum"])
    .where("checksum", "in", list)
    .execute();
  // const query = `SELECT path, checksum FROM tblFiles WHERE checksum IN (${list.map((_) => "?").join()})`;
  // return db
  //   .prepare<string[][], Pick<FileDto, "path" | "checksum">>(query)
  //   .all(list);
}

export async function findFileByPathQuery(path: string) {
  return await DB.selectFrom("tblFiles")
    .select(["path", "checksum", "filename"])
    .where("path", "=", path)
    .executeTakeFirst();
  // const query = "SELECT path, checksum, filename FROM tblFiles WHERE path=?";
  // return db
  //   .prepare<string[], Pick<FileDto, "path" | "filename" | "checksum">>(query)
  //   .get(path);
}
