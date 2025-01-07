import React, { useState } from 'react';
import './calculator.css';

const Calculator = () => {
  const [currency, setCurrency] = useState('USD');
  const [monthlyIncome, setMonthlyIncome] = useState(3000);
  const [equityAvailable, setEquityAvailable] = useState(50000);
  const [interestRate, setInterestRate] = useState(5);
  const [downpaymentRequirement, setDownpaymentRequirement] = useState(30);
  const [monthlyContributionLimit, setMonthlyContributionLimit] = useState(40);
  const [loanPeriod, setLoanPeriod] = useState(15);
  const [borrowingPower, setBorrowingPower] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);

  const exchangeRate = 2.7;

  const handleCurrencyChange = (newCurrency) => {
    const rate = currency === 'USD' ? exchangeRate : 1 / exchangeRate;
    setMonthlyIncome((prev) => (prev * rate).toFixed(2));
    setEquityAvailable((prev) => (prev * rate).toFixed(2));
    setCurrency(newCurrency);
  };

  const calculateBorrowingPower = () => {
    const monthlyRepaymentLimit = monthlyIncome * (monthlyContributionLimit / 100);
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanPeriod * 12;
    const maxLoan = monthlyRate
      ? (monthlyRepaymentLimit * (1 - Math.pow(1 + monthlyRate, -totalMonths))) / monthlyRate
      : monthlyRepaymentLimit * totalMonths;
    const equityBasedLoan = equityAvailable / (downpaymentRequirement / 100);
    const loan = Math.min(maxLoan, equityBasedLoan);

    const roundedBorrowingPower = Math.floor((loan + equityAvailable) / 5000) * 5000;
    setBorrowingPower(roundedBorrowingPower);

    const monthlyPay = monthlyRate
      ? loan * monthlyRate / (1 - Math.pow(1 + monthlyRate, -totalMonths))
      : loan / totalMonths;
    setMonthlyPayment(monthlyPay.toFixed(2));

    const totalRepay = monthlyPay * totalMonths;
    setTotalRepayment(totalRepay.toFixed(2));
  };

  return (
    <div className="calculator">
      <h1>Loan Borrowing Power Calculator</h1>
      <div className="form-group">
        <label>Currency:</label>
        <select value={currency} onChange={(e) => handleCurrencyChange(e.target.value)}>
          <option value="USD">USD</option>
          <option value="XCD">XCD</option>
        </select>
      </div>

      <div className="form-group">
        <label>Monthly Income:</label>
        <input
          type="number"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Downpayment / Equity Available:</label>
        <input
          type="number"
          value={equityAvailable}
          onChange={(e) => setEquityAvailable(Number(e.target.value))}
        />
      </div>

      <button className="toggle-advanced" onClick={() => document.getElementById('advanced-settings').classList.toggle('hidden')}>
        Advanced Settings
      </button>

      <div id="advanced-settings" className="advanced hidden">
        <div className="form-group">
          <label>Interest Rate (%):</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Loan Period (years):</label>
          <select value={loanPeriod} onChange={(e) => setLoanPeriod(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>

        <div className="form-group">
          <label>Downpayment / Equity Requirements (%):</label>
          <input
            type="number"
            value={downpaymentRequirement}
            onChange={(e) => setDownpaymentRequirement(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Monthly Contribution Limit (%):</label>
          <input
            type="number"
            value={monthlyContributionLimit}
            onChange={(e) => setMonthlyContributionLimit(Number(e.target.value))}
          />
        </div>
      </div>

      <button onClick={calculateBorrowingPower}>Calculate Borrowing Power</button>

      <div className="output">
        <p>Maximum Borrowing Power: {borrowingPower} {currency}</p>
        <p>Monthly Payment: {monthlyPayment} {currency}</p>
        <p>Total Repayment: {totalRepayment} {currency}</p>
      </div>
    </div>
  );
};

export default Calculator;