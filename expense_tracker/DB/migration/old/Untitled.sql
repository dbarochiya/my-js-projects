CREATE TABLE `account` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `last_update` integer
);

CREATE TABLE `account_ledger` (
  `id` integer PRIMARY KEY,
  `account_id` integer,
  `created_at` timestamp DEFAULT (now()),
  `balance` integer NOT NULL,
  `is_journal` boolean NOT NULL
);

CREATE TABLE `ledger` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `delta` integer NOT NULL,
  `description` varchar(255),
  `created_at` timestamp DEFAULT (now()),
  `is_journal` boolean NOT NULL
);

CREATE TABLE `tag` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `ledger_tags` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `tag_id` integer,
  `ledger_id` integer
);

ALTER TABLE `account` ADD FOREIGN KEY (`last_update`) REFERENCES `account_ledger` (`id`);

ALTER TABLE `account_ledger` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

ALTER TABLE `ledger_tags` ADD FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`);

ALTER TABLE `ledger_tags` ADD FOREIGN KEY (`ledger_id`) REFERENCES `ledger` (`id`);

CREATE INDEX `account_index_0` ON `account` (`id`);

CREATE INDEX `account_ledger_index_1` ON `account_ledger` (`account_id`);

CREATE INDEX `ledger_index_2` ON `ledger` (`created_at`);

CREATE INDEX `tag_index_3` ON `tag` (`id`);

CREATE INDEX `ledger_tags_index_4` ON `ledger_tags` (`tag_id`);

CREATE INDEX `ledger_tags_index_5` ON `ledger_tags` (`ledger_id`);
