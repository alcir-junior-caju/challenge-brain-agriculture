DROP SCHEMA IF EXISTS brain_agriculture cascade;
CREATE SCHEMA brain_agriculture;
CREATE TABLE brain_agriculture.farmers (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  document TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
