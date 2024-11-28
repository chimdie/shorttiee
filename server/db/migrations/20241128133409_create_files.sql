-- migrate:up
CREATE TABLE IF NOT EXISTS tblFiles (
  path VARCHAR(36) PRIMARY KEY NOT NULL, -- 
  type TEXT NOT NULL CHECK(type IN ('FILE','URL')), -- url, file
  contentType TEXT UNIQUE NOT NULL,
  filename TEXT, 
  checksum TEXT, 
  size TEXT, 
  ownerId VARCHAR(36) NOT NULL,
  
  createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),

  FOREIGN KEY (ownerId) REFERENCES tblUsers(id) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS trgFilesUpdatedAt AFTER UPDATE ON tblUsers 
BEGIN 
  UPDATE tblFiles SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
END;

-- migrate:down
DROP TRIGGER IF EXISTS trgFilesUpdatedAt;
DROP TABLE IF EXISTS tblFiles;
