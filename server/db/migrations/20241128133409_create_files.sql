-- migrate:up
CREATE TABLE IF NOT EXISTS tblFiles (
  path VARCHAR(36) PRIMARY KEY NOT NULL, -- 
  filename TEXT UNIQUE NOT NULL, 
  checksum TEXT UNIQUE NOT NULL, 
  contentType TEXT NOT NULL,
  size TEXT NOT NULL, 
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
