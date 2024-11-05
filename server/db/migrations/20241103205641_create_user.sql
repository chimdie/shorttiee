-- migrate:up
CREATE TABLE IF NOT EXISTS tblUsers (
  id VARCHAR(36) PRIMARY KEY NOT NULL, -- use uuid
  firstName VARCHAR(128) NOT NULL,
  lastName VARCHAR(128) NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,

  mobileNumber VARCHAR(15) NOT NULL,
  businessName VARCHAR(255),
  referrerCode VARCHAR(8),
  address VARCHAR(255),

  createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW'))
);

CREATE TRIGGER IF NOT EXISTS trgUpdatedAt AFTER UPDATE ON tblUsers 
BEGIN 
  UPDATE tblUsers SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
END;

-- migrate:down
DROP TRIGGER IF EXISTS trgUpdatedAt;
DROP TABLE IF EXISTS tblUsers;
