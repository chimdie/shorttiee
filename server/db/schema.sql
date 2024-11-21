CREATE TABLE IF NOT EXISTS "schema_migrations" (version varchar(128) primary key);
CREATE TABLE tblUsers (
  id VARCHAR(36) PRIMARY KEY NOT NULL, -- use uuid
  firstName VARCHAR(128) NOT NULL,
  lastName VARCHAR(128) NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,

  mobileNumber VARCHAR(15) NOT NULL,
  businessName VARCHAR(255),
  referrerCode VARCHAR(8),
  address VARCHAR(255),
  gender TEXT CHECK(gender IN ('M','F')),

  createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW'))
);
CREATE TRIGGER trgUsersUpdatedAt AFTER UPDATE ON tblUsers
BEGIN
  UPDATE tblUsers SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
END;
CREATE TABLE tblAuthentications (
  id VARCHAR(36) PRIMARY KEY NOT NULL, -- use uuid
  hash VARCHAR(255) NOT NULL,
  otp VARCHAR(40),
  otpTTL DATETIME,
  userId VARCHAR(36) UNIQUE NOT NULL,
  nonce VARCHAR(40) NOT NULL,

  createdAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
  updatedAt DATETIME DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),

  FOREIGN KEY (userId) REFERENCES tblUsers(id) ON DELETE CASCADE
);
CREATE TRIGGER trgAuthenticationsUpdatedAt AFTER UPDATE ON tblAuthentications
BEGIN
  UPDATE tblAuthentications SET updatedAt=(STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')) WHERE id=OLD.id;
END;
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20241103205641'),
  ('20241105194003');
