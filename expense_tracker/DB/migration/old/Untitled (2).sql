CREATE TABLE "account" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "last_update" integer
);

CREATE TABLE "account_ledger" (
  "id" integer PRIMARY KEY,
  "account_id" integer,
  "created_at" timestamp DEFAULT (now()),
  "balance" integer NOT NULL,
  "is_journal" boolean NOT NULL
);

CREATE TABLE "ledger" (
  "id" SERIAL PRIMARY KEY,
  "delta" integer NOT NULL,
  "description" varchar,
  "created_at" timestamp DEFAULT (now()),
  "is_journal" boolean NOT NULL
);

CREATE TABLE "tag" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL
);

CREATE TABLE "ledger_tag" (
  "tag_id" integer,
  "ledger_id" integer
);

ALTER TABLE "account" ADD FOREIGN KEY ("last_update") REFERENCES "account_ledger" ("id");

ALTER TABLE "account_ledger" ADD FOREIGN KEY ("account_id") REFERENCES "account" ("id");

ALTER TABLE "ledger_tag" ADD FOREIGN KEY ("tag_id") REFERENCES "tag" ("id");

ALTER TABLE "ledger_tag" ADD FOREIGN KEY ("ledger_id") REFERENCES "ledger" ("id");

CREATE INDEX ON "account" ("id");

CREATE INDEX ON "account_ledger" ("account_id");

CREATE INDEX ON "ledger" ("created_at");

CREATE INDEX ON "tag" ("id");

CREATE INDEX ON "ledger_tag" ("tag_id");

CREATE INDEX ON "ledger_tag" ("ledger_id");
