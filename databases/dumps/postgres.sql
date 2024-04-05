DROP SCHEMA IF EXISTS brain_agriculture cascade;
CREATE SCHEMA brain_agriculture;
CREATE TABLE brain_agriculture.farmers (
  id UUID PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  tax_id text UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
