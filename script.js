const apiUrl = '/api/crypto'; // Use relative path for API calls
const cryptoListElement = document.getElementById('crypto-list');
const gainersTab = document.getElementById('gainers-tab');
const losersTab = document.getElementById('losers-tab');
const timeFrameSelect = document.getElementById('time-frame-select');
let activeTab = 'gainers';
let selectedTimeFrame = 'min1';

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
    'CELR', 'HOT', 'MTL', 'OGN', 'NKN', 'SHIB', 'BAKE', 'GTC', 'BTCDOM',
    'IOTX', 'C98', 'MASK', 'ATA', 'DYDX', 'XEC', 'GALA', 'CELO', 'AR',
    'KLAY', 'ARPA', 'CTSI', 'LPT', 'ENS', 'PEOPLE', 'ROSE', 'DUSK', 'FLOW',
    'IMX', 'API3', 'GMT', 'APE', 'WOO', 'JASMY', 'DAR', 'OP', 'INJ', 'STG',
    'SPELL', 'LUNC', 'LUNA2', 'LDO', 'ICP', 'APT', 'QNT', 'FET', 'FXS',
    'HOOK', 'MAGIC', 'T', 'RNDR', 'HIGH', 'MINA', 'ASTR', 'PHB', 'GMX', 'CFX',
    'STX', 'BNX', 'ACH', 'SSV', 'CKB', 'PERP', 'TRU', 'LQTY', '', 'ID',
    'ARB', 'JOE', 'TLM', 'AMB', 'LEVER', 'RDNT', 'HFT', 'XVS', 'ETHBTC',
    'BLUR', 'EDU', 'SUI', 'PEPE', 'FLOKI', 'UMA', 'KEY', 'COMBO',
    'NMR', 'MAV', 'XVG', 'WLD', 'PENDLE', 'ARKM', 'AGLD', 'YGG', 'DODOX',
    'BNT', 'OXT', 'SEI', 'CYBER', 'HIFI', 'ARK', 'FRONT', 'BICO', 'LOOM',
    'BIGTIME', 'BOND', 'ORBS', 'WAXP', 'BSV', 'RIF', 'POLYX', 'GAS', 'POWR',
    'TIA', 'CAKE', 'MEME', 'TWT', 'TOKEN', 'ORDI', 'STEEM', 'BADGER', 'ILV',
    'NTRN', 'KAS', 'BEAMX', 'BONK', 'PYTH', 'SUPER', 'USTC', 'ONG',
    'ETHW', 'JTO', 'SATS', 'AUCTION', 'RATS', 'ACE', 'MOVR', 'NFP',
    'BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'AI', 'XAI',
    'DOGE', 'WIF', 'MANTA', 'ONDO', 'LSK', 'ALT', 'JUP', 'ZETA',
    'RONIN', 'DYM', 'SUI', 'OM', 'LINK', 'PIXEL', 'STRK',
    'MAVIA', 'ORDI', 'GLM', 'PORTAL', 'TON', 'AXL', 'MYRO',
    'PEPE', 'METIS', 'AEVO', 'WLD', 'VANRY', 'BOME',
    'ETHFI', 'AVAX', 'SHIB', 'BTC', 'ETH', 'ENA',
    'WUSDT', 'WIF', 'BCH', 'TNSR', 'SAGA', 'LTC',
    'NEAR', 'TAO', 'OMNI', 'ARB', 'NEO', 'FIL',
    'MATIC', 'TIA', 'BOME', 'REZ', 'ENA',
    'ETHFI', 'BONK', 'BB', 'NOT', 'TURBO', 'IOU',
    'ZK', 'MEW', 'LISTA', 'ZRO', 'CRV'
];

function fetchCryptos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Filter to include only specific coins
            const filteredData = data.filter(crypto => specificCoins.includes(crypto.symbol));
            let cryptosToDisplay;

            if (activeTab === 'gainers') {
                // Filter and sort based on positive performance for the selected time frame
                cryptosToDisplay = filteredData.filter(crypto => crypto.performance && crypto.performance[selectedTimeFrame] >= 0.20)
                    .sort((a, b) => b.performance[selectedTimeFrame] - a.performance[selectedTimeFrame]);
            } else {
                // Filter and sort based on negative performance for the selected time frame
                cryptosToDisplay = filteredData.filter(crypto => crypto.performance && crypto.performance[selectedTimeFrame] <= -0.20)
                    .sort((a, b) => a.performance[selectedTimeFrame] - b.performance[selectedTimeFrame]);
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
        const price = crypto.marketcap / crypto.circulating_supply;

        listItem.className = 'list-group-item d-flex justify-content-between align-items-start';
        listItem.innerHTML = `
            <div class="ms-2 me-auto">
                <div class="fw-bold">
                    <img style="margin-right: 10px;" src="https://cryptobubbles.net/backend/${crypto.image}" alt="${crypto.name}" width="30" height="30">
                    ${crypto.name} (${crypto.symbol})
                </div>
                 <div class="d-flex flex-wrap mt-2">
                <div class="me-3">Market Cap: $${crypto.marketcap.toLocaleString()}</div>
                <div class="me-3">Price (Calculated): $${price.toFixed(2)}</div>
                <div class="me-3">Price (API): $${crypto.price.toFixed(2)}</div>
                <div class="me-3">Volume (24h): $${crypto.volume.toLocaleString()}</div>

            </div>
            </div>
            <span class="badge text-bg-primary rounded-pill fs-5">${crypto.performance[selectedTimeFrame]}%</span>
        `;

        /*  `                <div class="me-3">Circulating Supply: ${crypto.circulating_supply.toLocaleString()} ${crypto.symbol}</div>
                 <div class="me-3">Performance (1 min): ${crypto.performance.min1}%</div>
                 <div class="me-3">Performance (1 hour): ${crypto.performance.hour}%</div>
                 <div class="me-3">Performance (1 day): ${crypto.performance.day}%</div>` */
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

timeFrameSelect.addEventListener('change', (event) => {
    selectedTimeFrame = event.target.value;
    fetchCryptos();
});

// Fetch the data immediately on load
fetchCryptos();

// Fetch the data every 60 seconds
setInterval(fetchCryptos, 60000);