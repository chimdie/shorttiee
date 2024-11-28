import { db } from "../config/db.config";
import { FileDto } from "../dto/file.dto";

export function createFileQuery() {
  return db.prepare<FileDto & { type: "FILE" }>(
    "INSERT INTO tblFiles (path, filename, type, contentType, checksum, size, ownerId) VALUES(@path, @filename, @type, @contentType, @checksum, @size, @ownerId)"
  );
}

export function findFileByChecksumQuery(list: Array<string>) {
  const query =
    "SELECT path, checksum FROM tblFiles WHERE checksum IN (SELECT value FROM json_each(?))";
  return db.prepare<string[], FileDto>(query).all(JSON.stringify(list));
}
