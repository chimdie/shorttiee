-- migrate:up
CREATE TABLE IF NOT EXISTS tblCategories (
  id VARCHAR(36) PRIMARY KEY NOT NULL, -- use uuid
  name varchar(50) NOT NULL UNIQUE,
  comment TEXT,

  createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW'))
);

CREATE TRIGGER IF NOT EXISTS trgCategoriesUpdatedAt AFTER UPDATE ON tblCategories 
BEGIN 
  UPDATE tblCategories SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
END;

-- migrate:down
DROP TRIGGER IF EXISTS trgCategoriesUpdatedAt;
DROP TABLE IF EXISTS tblCategories;
