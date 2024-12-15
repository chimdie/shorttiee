-- migrate:up
ALTER TABLE tblUsers ADD COLUMN photo TEXT;

-- migrate:down
ALTER TABLE tblUsers DROP COLUMN photo;
