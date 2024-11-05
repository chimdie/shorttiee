-- migrate:up
CREATE TABLE IF NOT EXISTS tblAuthentications (
  id VARCHAR(36) PRIMARY KEY NOT NULL, -- use uuid
  hash VARCHAR(255) NOT NULL,
  userId FOREIGN KEY REFERENCES tblUsers(id) ON DELETE CASCADE,

  createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW'))
);

CREATE TRIGGER IF NOT EXISTS trgUpdatedAt AFTER UPDATE ON tblAuthentications 
BEGIN 
  UPDATE tblAuthentications SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
END;

-- migrate:down
DROP TRIGGER IF EXISTS trgUpdatedAt;
DROP TABLE IF EXISTS tblAuthentications;
