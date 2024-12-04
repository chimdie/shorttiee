-- migrate:up
CREATE TABLE tblListingsFacilities (
  facilityId VARCHAR(36) NOT NULL, -- use uuid
  listingId VARCHAR(36) NOT NULL, -- use uuid

  FOREIGN KEY (listingId) REFERENCES tblListings(id) ON DELETE CASCADE,
  FOREIGN KEY (facilityId) REFERENCES tblFacilities(id) ON DELETE CASCADE
  -- PRIMARY KEY (listingId, facilityId)
);
CREATE INDEX listingsFacilitiesId ON tblListingsFacilities (facilityId, listingId);

-- migrate:down
DROP INDEX listingsFacilitiesId ON tblListingsFacilities;
DROP TABLE IF EXISTS tblListingsFacilities;
