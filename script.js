const apiUrl = '/api/crypto'; // Use relative path for API calls
const cryptoListElement = document.getElementById('crypto-list');
const gainersTab = document.getElementById('gainers-tab');
const losersTab = document.getElementById('losers-tab');
let activeTab = 'gainers';

const specificCoins = [
    'BTC', 'ETH', 'BCH', 'XRP', 'EOS', 'LTC', 'TRX', 'ETC', 'LINK', 'XLM',
    'ADA', 'XMR', 'DASH', 'ZEC', 'XTZ', 'BNB', 'ATOM', 'ONT', 'IOTA', 'BAT',
    'VET', 'NEO', 'QTUM', 'IOST', 'THETA', 'ALGO', 'ZIL', 'KNC', 'ZRX',
    'COMP', 'OMG', 'DOGE', 'SXP', 'KAVA', 'BAND', 'RLC', 'MKR', 'SNX', 'DOT',
    'DEFI', 'YFI', 'BAL', 'CRV', 'TRB', 'RUNE', 'SUSHI', 'EGLD', 'SOL', 'ICX',
    'STORJ', 'BLZ', 'UNI', 'AVAX', 'FTM', 'ENJ', 'FLM', 'REN', 'KSM', 'NEAR',
    'AAVE', 'FIL', 'RSR', 'LRC', 'MATIC', 'BEL', 'AXS', 'ALPHA', 'ZEN', 'SKL',
    'GRT', '1INCH', 'CHZ', 'SAND', 'ANKR', 'LIT', 'UNFI', 'REEF', 'RVN', 'SFP',
    'XEM', 'COTI', 'CHR', 'MANA', 'ALICE', 'HBAR', 'ONE', 'LINA', 'STMX', 'DENT',
    'CELR', 'HOT', 'MTL', 'OGN', 'NKN', '1000SHIB', 'BAKE', 'GTC', 'BTCDOM',
    'IOTX', 'C98', 'MASK', 'ATA', 'DYDX', '1000XEC', 'GALA', 'CELO', 'AR',
    'KLAY', 'ARPA', 'CTSI', 'LPT', 'ENS', 'PEOPLE', 'ROSE', 'DUSK', 'FLOW',
    'IMX', 'API3', 'GMT', 'APE', 'WOO', 'JASMY', 'DAR', 'OP', 'INJ', 'STG',
    'SPELL', '1000LUNC', 'LUNA2', 'LDO', 'ICP', 'APT', 'QNT', 'FET', 'FXS',
    'HOOK', 'MAGIC', 'T', 'RNDR', 'HIGH', 'MINA', 'ASTR', 'PHB', 'GMX', 'CFX',
    'STX', 'BNX', 'ACH', 'SSV', 'CKB', 'PERP', 'TRU', 'LQTY', '', 'ID',
    'ARB', 'JOE', 'TLM', 'AMB', 'LEVER', 'RDNT', 'HFT', 'XVS', 'ETHBTC',
    'BLUR', 'EDU', 'SUI', '1000PEPE', '1000FLOKI', 'UMA', 'KEY', 'COMBO',
    'NMR', 'MAV', 'XVG', 'WLD', 'PENDLE', 'ARKM', 'AGLD', 'YGG', 'DODOX',
    'BNT', 'OXT', 'SEI', 'CYBER', 'HIFI', 'ARK', 'FRONT', 'BICO', 'LOOM',
    'BIGTIME', 'BOND', 'ORBS', 'WAXP', 'BSV', 'RIF', 'POLYX', 'GAS', 'POWR',
    'TIA', 'CAKE', 'MEME', 'TWT', 'TOKEN', 'ORDI', 'STEEM', 'BADGER', 'ILV',
    'NTRN', 'KAS', 'BEAMX', '1000BONK', 'PYTH', 'SUPER', 'USTC', 'ONG',
    'ETHW', 'JTO', '1000SATS', 'AUCTION', '1000RATS', 'ACE', 'MOVR', 'NFP',
    'BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'AI', 'XAI',
    'DOGE', 'WIF', 'MANTA', 'ONDO', 'LSK', 'ALT', 'JUP', 'ZETA',
    'RONIN', 'DYM', 'SUI', 'OM', 'LINK', 'PIXEL', 'STRK',
    'MAVIA', 'ORDI', 'GLM', 'PORTAL', 'TON', 'AXL', 'MYRO',
    '1000PEPE', 'METIS', 'AEVO', 'WLD', 'VANRY', 'BOME',
    'ETHFI', 'AVAX', '1000SHIB', 'BTC', 'ETH', 'ENA',
    'WUSDT', 'WIF', 'BCH', 'TNSR', 'SAGA', 'LTC',
    'NEAR', 'TAO', 'OMNI', 'ARB', 'NEO', 'FIL',
    'MATIC', 'TIA', 'BOME', 'REZ', 'ENA',
    'ETHFI', '1000BONK', 'BB', 'NOT', 'TURBO', 'IOU',
    'ZK', 'MEW', 'LISTA', 'ZRO', 'CRV'
];

function fetchCryptos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Filter to include only specific coins
            const filteredData = data.filter(crypto => specificCoins.includes(crypto.symbol));
            //const filteredData = data;

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