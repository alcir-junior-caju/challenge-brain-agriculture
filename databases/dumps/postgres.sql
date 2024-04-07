DROP SCHEMA IF EXISTS brain_agriculture CASCADE;

CREATE SCHEMA brain_agriculture;

CREATE TABLE brain_agriculture.farmers (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  document TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE brain_agriculture.farms (
  id UUID PRIMARY KEY,
  farmer_id UUID UNIQUE,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  total_area NUMERIC NOT NULL,
  arable_area NUMERIC NOT NULL,
  vegetation_area NUMERIC NOT NULL,
  cultures TEXT[] NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (farmer_id) REFERENCES brain_agriculture.farmers(id) ON DELETE CASCADE
);

INSERT INTO brain_agriculture.farmers (id, name, email, document, created_at, updated_at) VALUES ('6dd7662e-ef6e-476c-974b-0768e2b34f92', 'John Doe', 'johndoe@email.com', '57965506084', NOW(), NOW()),('eddbd630-3de3-4b6f-9229-b255955651f4', 'Jane Doe', 'janedoe@email.com', '40854129065', NOW(), NOW()),('a65ba0f0-8949-4ef3-84e6-111a50ade26f', 'Bob Johnson', 'bobjohnson@email.com', '92603871080', NOW(), NOW()),('ec169453-1874-4e6c-a720-852a36893fbc', 'Alice Brown', 'alicebrown@email.com', '30277594006', NOW(), NOW()),('3684ea25-e46a-4c3e-8e0b-ed1bb40158fc', 'Emily Davis', 'emilydavis@email.com', '02572790000105', NOW(), NOW()),('2a4ce4f0-481d-40da-912d-812de41ab5bc', 'David Garcia', 'davidgarcia@email.com', '27997541000192', NOW(), NOW()),('85dcd398-b84f-4f15-9415-51ed0692e381', 'Sarah Miller', 'sarahmiller@email.com', '98957827000192', NOW(), NOW()),('621752ce-3f63-4d88-9d12-35b8cf5c9923', 'James Wilson', 'jameswilson@email.com', '25291471000127', NOW(), NOW()),('b934b46d-6d69-4fd9-bfe8-a7836ed71c0d', 'Amanda Thompson', 'amandathompson@email.com', '89591781000140', NOW(), NOW());

INSERT INTO brain_agriculture.farms (id, farmer_id, name, city, state, total_area, arable_area, vegetation_area, cultures, created_at, updated_at) VALUES('9a9da3c9-ddba-4011-9875-d39aed3f3984', '6dd7662e-ef6e-476c-974b-0768e2b34f92', 'Farm 1', 'São Paulo', 'SP', 1000, 300, 500, '{soya,cotton}', NOW(), NOW()),('d1342294-3b5e-49e1-b59a-1160d82b0873', 'eddbd630-3de3-4b6f-9229-b255955651f4', 'Farm 2', 'São Paulo', 'SP', 900, 300, 500, '{soya,maize}', NOW(), NOW()),('4845d7c7-c362-47f7-80ef-6fad11ad679a', 'a65ba0f0-8949-4ef3-84e6-111a50ade26f', 'Farm 3', 'Rio de Janeiro', 'RJ', 900, 300, 300, '{sugarcane,cotton,soya}', NOW(), NOW()),('e0eef36b-a6d5-435f-b45f-88b47e5a678c', 'ec169453-1874-4e6c-a720-852a36893fbc', 'Farm 4', 'Minas Gerais', 'MG', 900, 100, 300, '{sugarcane,soya}', NOW(), NOW()),('f7ab06fa-f8aa-4208-a297-1158bf867270', '3684ea25-e46a-4c3e-8e0b-ed1bb40158fc', 'Farm 5', 'Minas Gerais', 'MG', 1000, 100, 300, '{sugarcane,soya}', NOW(), NOW()),('16f923d8-fe72-4809-b083-c3c38e2f0c1f', '2a4ce4f0-481d-40da-912d-812de41ab5bc', 'Farm 6', 'São Paulo', 'SP', 1000, 100, 300, '{soya}', NOW(), NOW()),('b31130b1-2de8-4e09-b37f-24759f9d93be', '85dcd398-b84f-4f15-9415-51ed0692e381', 'Farm 7', 'Goias', 'GO', 1000, 100, 300, '{soya,sugarcane}', NOW(), NOW()),('ff6dece5-cd76-46c5-a52a-8c118e495e9f', '621752ce-3f63-4d88-9d12-35b8cf5c9923', 'Farm 8', 'Mato Grosso do Sul', 'MS', 1000, 100, 300, '{soya,sugarcane,maize}', NOW(), NOW()),('1d035c0a-01fd-4898-874b-fd3dcc70a8bf', 'b934b46d-6d69-4fd9-bfe8-a7836ed71c0d', 'Farm 9', 'Mato Grosso', 'MT', 1000, 100, 300, '{sugarcane,maize}', NOW(), NOW());
