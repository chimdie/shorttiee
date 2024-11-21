-- migrate:up
create table tblCategories (
  id VARCHAR(36) PRIMARY KEY NOT NULL, -- use uuid
  name varchar(50) NOT NULL UNIQUE,
  comment TEXT,

  createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW'))
);

CREATE TABLE tblListings (
  id VARCHAR(36) PRIMARY KEY NOT NULL, -- use uuid
  name varchar(50) NOT NULL,
  address varchar(50) NOT NULL,
  -- location -- coordinate
  type TEXT CHECK(type IN ("SHORTLET","RENTAL","SALE")) NOT NULL,
  status TEXT CHECK(status IN ("AWAITING_REVIEW","REJECTED","APPROVED")) NOT NULL,
  details TEXT,
  description TEXT,
  price INT,
  rate INT,
  facilities TEXT,
  restrictions TEXT,

  createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),

  userId VARCHAR(36) NOT NULL,
  categoryId VARCHAR(36) NOT NULL,
  
  FOREIGN KEY (userId) REFERENCES tblUsers(id) ON DELETE CASCADE,
  FOREIGN KEY (categoryId) REFERENCES tblCategories(id) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS trgCategoriesUpdatedAt AFTER UPDATE ON tblCategories 
BEGIN 
  UPDATE tblCategories SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS trgListingsUpdatedAt AFTER UPDATE ON tblListings
BEGIN 
  UPDATE tblListings SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
END;

-- migrate:down
DROP TRIGGER IF EXISTS trgListingsUpdatedAt;
DROP TRIGGER IF EXISTS trgCategoriesUpdatedAt;
DROP TABLE IF EXISTS tblListings;
DROP TABLE IF EXISTS tblCategories;
