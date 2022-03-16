const model = require('../DB/model.js');


async function getLedgerEntries(id = '') {
    let ledgers ;
    if(id === ''){
        ledgers = await model.getLedgers();
    }else{
        ledgers = await model.getLedgerById(id);
    }
    
    for (const id in ledgers) {
        await model.getTagEntries(ledgers[id]['id']).then((ret) => { 
            const tags = ret.map( item => { return item['tag_id']});
            ledgers[id]['tags'] =  tags;
        });
    }
    return ledgers;
}

async function recordTransaction(acc,credit,debit,desc,tags) {
    if( credit != 0 && debit != 0 ){
        console.log('both creadit and can not be given at same time');
    }

    await model.createTag(tags);
    const ledgerRet = await model.createLedger(acc,credit,debit,desc,0)
    await model.createTagEntries(ledgerRet[0],tags);

    return ledgerRet[0];
}

async function recordTransfer(fromAcc,toAcc,amount) {
    
    const acc1 = await model.getAccount(fromAcc).then( ret => ret[0]);
    const acc2 = await model.getAccount(toAcc).then( ret => ret[0]);

    const rec1 = await recordTransaction(acc1.id,0,amount,`transfer from ${acc1.name} to ${acc2.name}`,[`acc:${acc1.name}:${acc2.name}`]);
    const rec2 = await recordTransaction(acc2.id,amount,0,`transfer from ${acc1.name} to ${acc2.name}`,[`acc:${acc1.name}:${acc2.name}`]);

    return [rec1, rec2]
}


async function getAccounts(id='') {
    if(id === ''){
        return await model.getAccounts();
    }else{
        return await model.getAccount(id);
    }
}


async function createNewAccount(name,inital_bal = 0) {
    const accountRet = await model.createAccount(name);
    const account_id = accountRet[0];

    await recordTransaction(account_id,inital_bal,0,`account initiated with ${inital_bal} balance`,[`acc:${name}`]);
    
    return account_id;
}


// async function getLedgerEntriesByAccount(id) {
//     let ledgers = await model.getLedgersByAccount(id);
    
//     for (const id in ledgers) {
//         await model.getTagEntries(ledgers[id]['id']).then((ret) => { 
//             const tags = ret.map( item => { return item['tag_id']});
//             ledgers[id]['tags'] =  tags;
//         });
//     }

//     return ledgers;
// }

// async function getLedgerEntrybyId(id) {
//     let ledger = await model.getLedgerById(id);

//     await model.getTagEntries(id).then((ret) => { 
//         const tags = ret.map( item => { return item['tag_id']});
//         ledger['tags'] =  tags;
//     });

//     return ledger;
// }


module.exports = {
    getLedgerEntries,
    recordTransaction,
    recordTransfer,
    getAccounts,
    createNewAccount,
}


// Test code 
const test = async() => {

    // const ledgers = await getLedgerEntries(1);
    // const ledgers = await getLedgerEntries();
    // console.log(ledgers);

    // const txId = await recordTransaction(2,50,0,'testing ledger entry',['test1','test2','test3']);
    // console.log(txId);

    // const transId = await recordTransfer(6,5,500);
    // console.log(transId);

    // const accounts = await getAccounts();
    // console.log(accounts);

    // const id = await createNewAccount('IDFC bank', 9000);
    // console.log('new acconunt',id);

    // let ret = getLedgerEntriesByAccount(1);
    // let ret = getLedgerEntrybyId(17);

}

// test();