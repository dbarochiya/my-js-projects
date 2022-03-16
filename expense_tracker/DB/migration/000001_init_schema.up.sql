CREATE TABLE IF NOT EXISTS "account" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" varchar,
  "balance" integer
);

CREATE TABLE IF NOT EXISTS "ledger" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "description" varchar,
  "credit" integer ,
  "debit" integer , 
  "account_id" integer, 
  "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
  "is_journal" boolean NOT NULL,
  FOREIGN KEY ("account_id") REFERENCES "account" ("id")
);

CREATE TABLE IF NOT EXISTS "tag" (
  "id" varchar PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS "ledger_tag" (
  "tag_id" varchar,
  "ledger_id" integer,
  FOREIGN KEY ("tag_id") REFERENCES "tag" ("id")
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY ("ledger_id") REFERENCES "ledger" ("id")
);


CREATE INDEX IF NOT EXISTS "ledger_created_idx" ON "ledger" ("created_at");
CREATE INDEX IF NOT EXISTS "ledger_account_idx" ON "ledger" ("account_id");
CREATE INDEX IF NOT EXISTS  "ledger_tag_ledger_id_idx"  ON "ledger_tag" ("tag_id");
CREATE INDEX IF NOT EXISTS  "ledger_tag_tag_id_idx" ON "ledger_tag" ("ledger_id");



CREATE TRIGGER IF NOT EXISTS "update_account_current_val"
   AFTER INSERT
   ON "ledger"
BEGIN
   UPDATE account 
   SET balance = balance + new.credit - new.debit
   WHERE id = new.account_id;
END;