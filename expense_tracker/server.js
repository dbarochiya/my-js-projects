require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const service = require('./service/service');

const app = express();
const port = process.env.PORT || 3001 ;
app.use(morgan("dev"))
app.use(express.json())

app.get("/api/accounts", async (req,res) => {
    const result = await service.getAccounts();
    res.status(200).json({result});
});

app.get("/api/accounts/:id", async (req,res) => {
    const result = await service.getAccounts(req.params.id);
    res.status(200).json({result});
});

app.post("/api/accounts", async (req,res) => {
    const result = await service.createNewAccount(req.body.name,req.body.balance);
    res.status(201).json({result})
});

// app.put("/api/accounts/:id", async (req,res) => {
//     const result = await model.updateAccount(req.params.id,req.body)
//     res.status(201).json({result});
// });

// app.delete("/api/accounts/:id", async (req,res) => {
//     const result = await model.deleteAccount(req.params.id)
//     res.status(204).json({result});
// });

app.get("/api/ledgers", async (req,res) => {
    const result = await service.getLedgerEntries();
    res.status(200).json({result});
});

app.get("/api/ledgers/:id", async (req,res) => {
    const result = await service.getLedgerEntries(req.params.id);
    res.status(200).json({result});
});

app.post("/api/ledgers/:type", async (req,res) => {
    let result;
    if(req.params.type === 'transaction'){
        result = await service.recordTransaction(req.body.account,req.body.credit,req.body.debit,req.body.description,req.body.tags);
    }
    else if(req.params.type === 'transfer'){
        result = await service.recordTransfer(req.body.fromAcc,req.body.toAcc,req.body.amount);
    }
    res.status(201).json({result})
});


app.listen(port, () => {
    console.log(`server is up ${port}`);
});