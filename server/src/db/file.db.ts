import { db } from "../config/db.config";
import { FileDto } from "../dto/file.dto";

export function createFileQuery() {
  return db.prepare<FileDto & { type: "FILE" }>(
    "INSERT INTO tblFiles (path, filename, type, contentType, checksum, size, ownerId) VALUES(@path, @filename, @type, @contentType, @checksum, @size, @ownerId)"
  );
}
