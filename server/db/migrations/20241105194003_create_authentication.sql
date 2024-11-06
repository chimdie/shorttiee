-- migrate:up
CREATE TABLE IF NOT EXISTS tblAuthentications (
  id VARCHAR(36) PRIMARY KEY NOT NULL, -- use uuid
  hash VARCHAR(255) NOT NULL,
  userId VARCHAR(36) UNIQUE NOT NULL,

  createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  
  FOREIGN KEY (userId) REFERENCES tblUsers(id) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS trgAuthenticationsUpdatedAt AFTER UPDATE ON tblAuthentications 
BEGIN 
  UPDATE tblAuthentications SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
END;

-- migrate:down
DROP TRIGGER IF EXISTS trgAuthenticationsUpdatedAt;
DROP TABLE IF EXISTS tblAuthentications;
