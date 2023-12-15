import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const containerStyle = {
  textAlign: "center",
  padding: "20px",
};

const inputStyle = {
  width: "280px",
  height: "30px",
  padding: "10px",
  marginBottom: "10px",
  outline: "none",
  borderRadius: "5px",

  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
  border: "none",
};

const buttonStyle = {
  width: "160px",
  padding: "10px",
  backgroundColor: "#4caf50",
  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
  marginTop: "20px",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const resultStyle = {
  marginTop: "20px",
  marginBottom: "20px",
  fontSize: "18px",
  fontWeight: "bold",
  fontFamily: "Times New Roman",
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          `https://open.er-api.com/v6/latest/${fromCurrency}`
        );
        setExchangeRate(response.data.rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleConvert = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      setResult("Please enter a valid amount.");
      return;
    }

    const convertedAmount = (amount * exchangeRate).toFixed(2);
    setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleConvert}>
        <h2
          style={{
            fontFamily: "TimesNewRoman",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          Currency Converter{" "}
        </h2>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />
        <div className="Select">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="AUD">AUD</option>
            <option value="INR">INR</option> {/* Add India (INR) */}
            {/* Add more currency options */}
          </select>
          <span>&rarr;</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="AUD">AUD</option>
            <option value="INR">INR</option> {/* Add India (INR) */}
            {/* Add more currency options */}
          </select>
        </div>
        <button type="submit" style={buttonStyle}>
          Convert
        </button>
        
        {result && <div style={resultStyle}>{result}</div>}
      </form>
    </div>
  );
};

export default CurrencyConverter;
