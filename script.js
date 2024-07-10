const apiUrl = '/api/crypto'; // Use relative path for API calls
const cryptoListElement = document.getElementById('crypto-list');

const specificCoins = [
    'BTC', 'ETH', 'BCH', 'XRP', 'EOS', 'LTC', 'TRX',
    'ETC', 'LINK', 'XLM', 'ADA', 'XMR', 'DASH', 'ZEC',
    'XTZ', 'BNB', 'ATOM', 'ONT', 'IOTA', 'BAT', 'VET',
    'NEO', 'QTUM', 'IOST', 'THETA', 'ALGO', 'ZIL', 'KNC',
    'ZRX', 'COMP', 'OMG', 'DOGE', 'SXP', 'KAVA', 'BAND',
    'RLC', 'MKR', 'SNX', 'DOT', 'DEFI', 'YFI', 'BAL',
    'CRV', 'TRB', 'RUNE', 'SUSHI', 'EGLD', 'SOL', 'ICX', 'STORJ', 'FIL', 'STMX', 'PUNDIX', 'FLOKI', 'SHIB', 'SAND',
    'MATIC', 'CHZ', 'TWT', 'CRO', 'LUNA', 'DGB',
    'GRT', 'CTXC', 'ANKR', 'RAY', 'MITH', 'KSM',
    'CVC', 'CELR', 'BLZ', 'BTT', 'MITH', 'LEND',
    'CTXC', 'RLC', 'YFI', 'STMX', 'COTI', 'HBAR',
    'XTZ', 'TRBUSD', 'SAND', 'PUNDIX', 'RLC', 'CVC',
    'CTXC', 'REN', 'PERL', 'SKL', 'SRM', 'CVC',
    'VET', 'MDX', 'OGN', 'KDA', 'KSM', 'PHA', 'NOT', 'BOME', 'TIA', 'DYDX', 'JTO', 'GALA', 'JASMY', 'WLD', 'LEVER', 'PENDLE', 'ENA', 'COMBO', 'REEF', 'TNSR',
    'XAI', 'ORDI', 'SAGA', 'OM', 'AEVO', 'CHR', 'AAVE', 'UNFI', 'REZ', 'MKR', 'DOT', 'HIGH', 'TRU', 'PEPE', 'FTM', 'BLZ', 'LPT',
    'PIXEL', 'W', 'GLM', 'MANTA', 'SEI', 'GLMR', 'EGLD', 'AVAX', 'INJ', '1INCH'
];

function fetchTopGainingCryptos() {
    console.log(apiUrl)
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Filter to include only specific coins
            const filteredData = data.filter(crypto => specificCoins.includes(crypto.symbol));
            // Filter and sort based on positive min1 performance
            const gainingCryptos = filteredData.filter(crypto => crypto.performance && crypto.performance.min1 >= 0.20)
                .sort((a, b) => b.performance.min1 - a.performance.min1);

            displayCryptos(gainingCryptos);
        })
        .catch(error => {
            console.error('Error fetching crypto data:', error);
        });
}

function displayCryptos(cryptos) {
    cryptoListElement.innerHTML = ''; // Clear existing list
    cryptos.forEach(crypto => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
      <img src="https://cryptobubbles.net/${crypto.image}" alt="${crypto.name}" width="20" height="20">
      ${crypto.name} (${crypto.symbol}) - Market Cap: ${crypto.marketcap.toLocaleString()} - 1 Min Gain: ${crypto.performance.min1}%
    `;
        cryptoListElement.appendChild(listItem);
    });
}

// Fetch the data immediately on load
fetchTopGainingCryptos();

// Fetch the data every 60 seconds
setInterval(fetchTopGainingCryptos, 60000);
