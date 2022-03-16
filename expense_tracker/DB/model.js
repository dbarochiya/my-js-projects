const db = require('./db.js');

//account
function createAccount(name) {
    let account = {
        "name" : name,
        "balance" : 0
    }
    return db("account").insert(account);
}

function getAccounts() {
    return db("account").select("*");
}

function getAccount(id) {
    return db("account").where("id", id).select("*");
}


//ledger 
function createLedger(acc,credit,debit,desc,is_journal=0) {

    let entry = {
        "account_id" : acc,
        "credit" : credit,
        "debit" : debit,
        "created_at" : (new Date()).toLocaleString("en-US"),
        "is_journal" : is_journal,
        "description" : desc,
    }
    return db("ledger").insert(entry);
}

function getLedgers() {
    return db("ledger").select("*");
}

function getLedgersByAccount(id) {
    return db("ledger").where("account_id",id).select("*");
}

function getLedgerById(id) {
    return db("ledger").where("id", id).select("*");
}

//tags
function createTag(tags) {
    let entry = []
    tags.forEach( tag => {
        let tag_entry = {
            "id" : `${tag.toLowerCase()}`
        }
        entry.push(tag_entry);
    })
    return db("tag").insert(entry).onConflict('id').merge();
}

function getTags() {
    return db("tag").select("*");
}

function getTag(id) {
    return db("tag").where("id",id).select("*");
}


//ledger tag
function createTagEntries(ledger_id,tags) {
    let entry = [ ]
    tags.forEach(tag => {
        let ledger_tag_entry = {
            tag_id : `${tag.toLowerCase()}`,
            ledger_id : ledger_id
        }
        entry.push(ledger_tag_entry);
    });
    return db("ledger_tag").insert(entry);
}

function getTagEntries(ledger_id) {
    return db("ledger_tag").where("ledger_id",ledger_id).select("tag_id");
}

function getLedgersByTag(tag) {
    const subquery = db("ledger_tag").where("tag_id", tag.toLowerCase()).select("ledger_id");
    return db("ledger").where("id",'in',subquery);
}   

module.exports = {
    createAccount,
    getAccounts,
    getAccount,
    createLedger,
    getLedgers,
    getLedgersByAccount,
    getLedgerById,
    createTag,
    getTags,
    createTagEntries,
    getTagEntries,
    getLedgersByTag,
}


// Test code 
// let ret = createAccount('something');
// let ret = getAccounts();
// let ret = getAccount(1);

// let ret = createLedger(1,10,10,'something')
// let ret = getLedgers();
// let ret = getLedgersByAccount(1);
// let ret = getLedgerById(3);

// let ret = createTag(['AAA']);
// let ret = getTags();
// let ret = createTagEntries(6,['X']);
// let ret = getTagEntries(5);
// let ret = getLedgersByTag('X');

// ret.then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.log(err);
//     });