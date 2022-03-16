Table account {
  id integer [pk,increment]
  name varchar
  last_update integer [ref: - account_ledger.id]
  indexes{
    id
  }
}

Table account_ledger {
  id integer [pk] 
  account_id integer [ref: > account.id]
  created_at timestamp [default: `now()`]
  value integer [ not null]
  is_journal boolean [ not null]
  indexes{
    account_id
  }
}

Table ledger {
  id integer [pk, increment]
  delta integer [not null]
  description varchar 
  created_at timestamp [default: `now()`]
  is_journal boolean [ not null]
  indexes{
    created_at
  }
}

Table tag{
  id integer [pk, increment]
  name varchar [not null]
  indexes{
    id
  }
}

Table ledger_tags {
  id integer [pk, increment]
  tag_id integer [ref: > tag.id]
  ledger_id integer [ref: > ledger.id]
  indexes{
    tag_id
    ledger_id
  }
}
