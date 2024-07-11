const apiUrl = '/api/crypto'; // Use relative path for API calls
const cryptoListElement = document.getElementById('crypto-list');
const gainersTab = document.getElementById('gainers-tab');
const losersTab = document.getElementById('losers-tab');
let activeTab = 'gainers';

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

function fetchCryptos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Filter to include only specific coins
            //const filteredData = data.filter(crypto => specificCoins.includes(crypto.symbol));
            const filteredData = data;

            let cryptosToDisplay;

            if (activeTab === 'gainers') {
                // Filter and sort based on positive min1 performance
                cryptosToDisplay = filteredData.filter(crypto => crypto.performance && crypto.performance.min1 >= 0.20)
                    .sort((a, b) => b.performance.min1 - a.performance.min1);
            } else {
                // Filter and sort based on negative min1 performance
                cryptosToDisplay = filteredData.filter(crypto => crypto.performance && crypto.performance.min1 <= -0.20)
                    .sort((a, b) => a.performance.min1 - b.performance.min1);
            }

            displayCryptos(cryptosToDisplay);
        })
        .catch(error => {
            console.error('Error fetching crypto data:', error);
        });
}

function displayCryptos(cryptos) {
    cryptoListElement.innerHTML = ''; // Clear existing list
    cryptos.forEach(crypto => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-start';
        listItem.innerHTML = `
      <div class="ms-2 me-auto">
        <div class="fw-bold"><img style="margin-right: 10px;" src="https://cryptobubbles.net/backend/${crypto.image}" alt="${crypto.name}" width="30" height="30">${crypto.name} (${crypto.symbol})</div>
        Market Cap: ${crypto.marketcap.toLocaleString()}
      </div>
      <span class="badge text-bg-primary rounded-pill fs-5">${crypto.performance.min1}%</span>
    `;
        cryptoListElement.appendChild(listItem);
    });
}

gainersTab.addEventListener('click', () => {
    activeTab = 'gainers';
    gainersTab.classList.add('active');
    losersTab.classList.remove('active');
    fetchCryptos();
});

losersTab.addEventListener('click', () => {
    activeTab = 'losers';
    gainersTab.classList.remove('active');
    losersTab.classList.add('active');
    fetchCryptos();
});

// Fetch the data immediately on load
fetchCryptos();

// Fetch the data every 60 seconds
setInterval(fetchCryptos, 60000);