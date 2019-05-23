import React from "react";
import "./App.css";

export let contracts = [
  {
    id: 0,
    customer: "Industries 5180",
    sapId: 10000,
    contractId: 4012345,
    contractType: "Wartung",
    status: "Aktiv",
    version: 2,
    monthlyCost: 234,
    lastBilledDate: "19.12.2018"
  },
  {
    id: 1,
    customer: "Delivery Batman",
    sapId: 10001,
    contractId: 9843456,
    contractType: "Hosting",
    status: "Wartet auf Aktivierung",
    version: 3,
    monthlyCost: 99,
    lastBilledDate: "03.01.2019"
  },
  {
    id: 2,
    customer: "rebay.com",
    sapId: 10002,
    contractId: 4123456,
    contractType: "AntiSpam",
    status: "Gekündigt",
    version: 1,
    monthlyCost: 42,
    lastBilledDate: "10.01.2019"
  }
];

export const Nav = () => (
  <header style={{ textAlign: "center" }}>
    <div className="logo">Company Name</div>
  </header>
);

export const PageNav = () => (
  <div className="page-nav row">
    <div className="page-title col-md-12">
      <h1>Contracts</h1>
    </div>
  </div>
);
