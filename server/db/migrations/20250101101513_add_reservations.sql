-- migrate:up
CREATE TABLE tblReservations (
  id VARCHAR(36) PRIMARY KEY NOT NULL, -- use uuid
  code varchar(50) NOT NULL,
  amount INT NOT NULL,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,

  -- timestamp
  createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),

  -- ref
  userId VARCHAR(36) NOT NULL,
  listingId varchar(50) NOT NULL,
  listingOwnerId varchar(50) NOT NULL,
  
  FOREIGN KEY (userId) REFERENCES tblUsers(id) ON DELETE CASCADE,
  FOREIGN KEY (listingId) REFERENCES tblListings(id) ON DELETE CASCADE,
  FOREIGN KEY (listingOwnerId) REFERENCES tblUsers(id) ON DELETE CASCADE
);


CREATE TRIGGER IF NOT EXISTS trgReservationsUpdatedAt AFTER UPDATE ON tblReservations
BEGIN 
  UPDATE tblReservations SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
END;

-- migrate:down
DROP TRIGGER IF EXISTS trgReservationsUpdatedAt;
DROP TABLE IF EXISTS tblReservations;

