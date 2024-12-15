import { db } from "../config/db.config";
import { FileDto } from "../dto/file.dto";

export function createFileQuery() {
  return db.prepare<FileDto & { type: "FILE" }>(
    "INSERT INTO tblFiles (path, filename, contentType, checksum, size, ownerId) VALUES(@path, @filename, @contentType, @checksum, @size, @ownerId)"
  );
}

export function findAllFileByChecksumQuery(list: Array<string>) {
  const query = `SELECT path, checksum FROM tblFiles WHERE checksum IN (${list.map((_) => "?").join()})`;
  return db
    .prepare<string[][], Pick<FileDto, "path" | "checksum">>(query)
    .all(list);
}

export function findFileByPathQuery(path: string) {
  const query = "SELECT path, checksum, filename FROM tblFiles WHERE path=?";
  return db
    .prepare<string[], Pick<FileDto, "path" | "filename" | "checksum">>(query)
    .get(path);
}
