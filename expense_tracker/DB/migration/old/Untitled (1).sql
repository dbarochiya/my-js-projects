CREATE TABLE [account] (
  [id] integer PRIMARY KEY IDENTITY(1, 1),
  [name] nvarchar(255),
  [last_update] integer
)
GO

CREATE TABLE [account_ledger] (
  [id] integer PRIMARY KEY,
  [account_id] integer,
  [created_at] timestamp DEFAULT (now()),
  [balance] integer NOT NULL,
  [is_journal] boolean NOT NULL
)
GO

CREATE TABLE [ledger] (
  [id] integer PRIMARY KEY IDENTITY(1, 1),
  [delta] integer NOT NULL,
  [description] nvarchar(255),
  [created_at] timestamp DEFAULT (now()),
  [is_journal] boolean NOT NULL
)
GO

CREATE TABLE [tag] (
  [id] integer PRIMARY KEY IDENTITY(1, 1),
  [name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ledger_tags] (
  [id] integer PRIMARY KEY IDENTITY(1, 1),
  [tag_id] integer,
  [ledger_id] integer
)
GO

ALTER TABLE [account] ADD FOREIGN KEY ([last_update]) REFERENCES [account_ledger] ([id])
GO

ALTER TABLE [account_ledger] ADD FOREIGN KEY ([account_id]) REFERENCES [account] ([id])
GO

ALTER TABLE [ledger_tags] ADD FOREIGN KEY ([tag_id]) REFERENCES [tag] ([id])
GO

ALTER TABLE [ledger_tags] ADD FOREIGN KEY ([ledger_id]) REFERENCES [ledger] ([id])
GO

CREATE INDEX [account_index_0] ON [account] ("id")
GO

CREATE INDEX [account_ledger_index_1] ON [account_ledger] ("account_id")
GO

CREATE INDEX [ledger_index_2] ON [ledger] ("created_at")
GO

CREATE INDEX [tag_index_3] ON [tag] ("id")
GO

CREATE INDEX [ledger_tags_index_4] ON [ledger_tags] ("tag_id")
GO

CREATE INDEX [ledger_tags_index_5] ON [ledger_tags] ("ledger_id")
GO
