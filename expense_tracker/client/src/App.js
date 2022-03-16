import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let accounts = [ ];

  const fetchAccounts = () => {
    fetch('/api/accounts')
    .then((res) => res.json())
    .then((data) => accounts.push(data.result))
    .then(() => console.log(accounts))
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={fetchAccounts}> click </button>
        {
          accounts.forEach( acc => {(
            <>
            <p> {acc.id}</p>
            <p> {acc.name}</p>
            <p> {acc.balance}</p>
            </>
          )})
        }
      </header>
    </div>
  );
}

export default App;