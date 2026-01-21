-- Add indexes for location-based queries to improve performance
-- These indexes will significantly speed up proximity searches

-- Index for Gig location coordinates
CREATE INDEX IF NOT EXISTS idx_gig_latitude_longitude ON "Gig" (latitude, longitude);

-- Index for Gig musician type filtering
CREATE INDEX IF NOT EXISTS idx_gig_musician_type_needed ON "Gig" ("musicianTypeNeeded");

-- Index for Musician location coordinates
CREATE INDEX IF NOT EXISTS idx_musician_latitude_longitude ON "Musician" (latitude, longitude);

-- Index for Musician location name searches
CREATE INDEX IF NOT EXISTS idx_musician_location_name ON "Musician" ("locationName");

-- Index for Organization location coordinates
CREATE INDEX IF NOT EXISTS idx_organization_latitude_longitude ON "Organization" (latitude, longitude);

-- Index for Organization location name searches
CREATE INDEX IF NOT EXISTS idx_organization_location_name ON "Organization" ("locationName");

-- Composite index for common gig queries (location + type)
CREATE INDEX IF NOT EXISTS idx_gig_location_type ON "Gig" (latitude, longitude, "musicianTypeNeeded");
