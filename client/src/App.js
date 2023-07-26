import './App.css';
import React, { useState } from 'react';
import fetchStocksService from './services/fetch_stocks_service';

function App() {

    const [stockSymbol, setStockSymbol] = useState('');
    const [date, setDate] = useState('');
    const [stockData, setStockData] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = { stockSymbol, date };
			const response = await fetchStocksService.fetch(data);
            setStockData(response.data);
			setErrorMessage('')
        } catch (error) {
            // console.log(error.response.data.error);
			setStockData(null)
			setErrorMessage(error.response.data.error)
        }
    };

    return (
		<div className="app-container">
		  <h1 className="app-heading">Stock Trade Statistics</h1>
		  <form onSubmit={handleSubmit} className="stock-form">
			<label className="input-label">
			  Stock Symbol:
			  <input
				type="text"
				value={stockSymbol}
				onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
				className="input-field"
				autoFocus
				required
			  />
			</label>
			<label className="input-label">
			  Date:
			  <input
				type="date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				className="input-field"
				required
			  />
			</label>
			<button type="submit" className="submit-button">
			  Fetch Trade Data
			</button>
		  </form>

		  {
			errorMessage && ( 
				<div className="stock-data">
					<strong style={{ color: 'red' }}>{errorMessage}</strong>
				</div>
			)
		  }
	
		  {stockData && (
				<div className="stock-data">
				<h2>Trade Statistics</h2>
				<p>
					<strong>Open :</strong> &nbsp; 
						<span style={{ color: 'green' }}>{stockData.open}</span>
				</p>
				<p>
					<strong>Close :</strong> &nbsp; 
						<span style={{ color: 'red' }}>{stockData.close}</span>
				</p>
				<p>
					<strong>High :</strong> &nbsp; 
						<span style={{ color: 'green' }}>{stockData.high}</span>
				</p>
				<p>
					<strong>Low :</strong> &nbsp; 
						<span style={{ color: 'red' }}>{stockData.low}</span>
				</p>
				<p>
					<strong>Volume :</strong> &nbsp; 
						<span style={{ color: 'orange' }}>{stockData.volume}</span>
				</p>
				</div>
		  )}
		</div>
	  );
	}
	
	
export default App;
