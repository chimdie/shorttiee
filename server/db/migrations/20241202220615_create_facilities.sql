-- migrate:up
CREATE TABLE tblFacilities (
  id VARCHAR(36) PRIMARY KEY NOT NULL, -- use uuid
  name varchar(50) UNIQUE NOT NULL,
  icon varchar(50) NOT NULL,
  comment TEXT,
  color TEXT,

  createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW'))
);

CREATE TRIGGER IF NOT EXISTS trgFacilitiesUpdatedAt AFTER UPDATE ON tblFacilities
BEGIN 
  UPDATE tblFacilities SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
END;

-- migrate:down
DROP TRIGGER IF EXISTS trgFacilitiesUpdatedAt;
DROP TABLE IF EXISTS tblFacilities;
