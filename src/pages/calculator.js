import React, { useState } from 'react';
import './calculator.css';

const Calculator = () => {
  const [currency, setCurrency] = useState('XCD');
  const [monthlyIncome, setMonthlyIncome] = useState(3000);
  const [equityAvailable, setEquityAvailable] = useState(50000);
  const [interestRate, setInterestRate] = useState(5);
  const [downpaymentRequirement, setDownpaymentRequirement] = useState(30);
  const [monthlyContributionLimit, setMonthlyContributionLimit] = useState(40);
  const [loanPeriod, setLoanPeriod] = useState(15);
  const [borrowingPower, setBorrowingPower] = useState(200000);
  const [monthlyPayment, setMonthlyPayment] = useState(1200);
  const [totalRepayment, setTotalRepayment] = useState(216000);

  const exchangeRate = 2.7;

  const handleCurrencyChange = (newCurrency) => {
    const rate = currency === 'USD' ? exchangeRate : 1 / exchangeRate;
    setMonthlyIncome((prev) => (prev * rate).toFixed(0));
    setEquityAvailable((prev) => (prev * rate).toFixed(0));
    setCurrency(newCurrency);
    calculateBorrowingPower();
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
    setMonthlyPayment(monthlyPay.toFixed(0));

    const totalRepay = monthlyPay * totalMonths;
    setTotalRepayment(totalRepay.toFixed(0));
  };

  return (
    <div className="calculator">
      <h1>Loan Borrowing Power Calculator</h1>
      <div className="form-group">
        <label htmlFor='currency'>Currency:</label>
        <select id='currency' value={currency} onChange={(e) => handleCurrencyChange(e.target.value)}>
          <option value="XCD">XCD</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor='monthly-income'>Monthly Income:</label>
        <input
          id='monthly-income'
          type="number"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label htmlFor='equity-available'>Downpayment / Equity Available:</label>
        <input
          id='equity-available'
          type="number"
          value={equityAvailable}
          onChange={(e) => setEquityAvailable(Number(e.target.value))}
        />
      </div>

      <button className="toggle-advanced" onClick={() => document.getElementById('advanced-settings').classList.toggle('hidden')} onKeyDown={() => document.getElementById('advanced-settings').classList.toggle('hidden')}>
        &#9660; Advanced Settings
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