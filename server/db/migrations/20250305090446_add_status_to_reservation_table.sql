-- migrate:up
ALTER TABLE tblReservations
ADD COLUMN status TEXT CHECK ( status IN ('PENDING','ACCEPTED','REJECTED') ) NOT NULL DEFAULT ('PENDING')

-- migrate:down
ALTER TABLE tblReservations 
DROP COLUMN status
