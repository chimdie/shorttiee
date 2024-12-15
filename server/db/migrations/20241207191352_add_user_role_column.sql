-- migrate:up
ALTER TABLE tblUsers 
ADD COLUMN role TEXT CHECK (role IN ('ADMIN','USER')) NOT NULL DEFAULT ('USER');

-- migrate:down
ALTER TABLE tblUsers 
DROP COLUMN role;

