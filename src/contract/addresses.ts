export const addresses = {
    arbitrum: {
        contracts: {
            cryptoSwap: "0x60299BCad6F56DFC0232ccE758514f02d2dA5f6a",
            yieldStrategyManager: "0x6f376c17Cc423194205Fe74633A746526A53A4Df",
            priceFeedManager: "0x08751fAC1dA7D063daF6a2a6B5D6770F2f5517f7",
        },
        tokens: [
            { value: 0, address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", label: "USDC" },
            { value: 1, address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", label: "USDT" },
            { value: 2, address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", label: "DAI" },
            { value: 3, address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", label: "ETH" },
            { value: 4, address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f", label: "BTC" },
        ],
        priceFeeds: [
            { value: 0, address: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612", label: "ETH" },
            { value: 1, address: "0x6ce185860a4963106506C203335A2910413708e9", label: "BTC" },
            { value: 2, address: "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3", label: "USDC" },
            { value: 3, address: "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7", label: "USDT" },
            { value: 4, address: "0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB", label: "DAI" },
            { value: 5, address: "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6", label: "ARB" },
            { value: 6, address: "0x8d0CC5f38f9E802475f2CFf4F9fc7000C2E1557c", label: "APPL" }
        ]
    },
    matic: {
        contracts: {
            cryptoSwap: "0xeD3B4562B7afE306A405462160c7EedDbF6D7e91",
            yieldStrategyManager: "0x1f210E83247d7AbFde6104a3ccA461FEbb68e3ef",
            priceFeedManager: "0xF9B85094B9A975022C8840B511bD9a445EAa25a0",
            chainlink: "0xb0897686c545045aFc77CF20eC7A532E3120E0F1"
        },
        tokens: [
            { value: 0, address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", label: "USDC" },
            { value: 1, address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", label: "WETH" },
            { value: 2, address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", label: "WBTC" },
        ],

        priceFeeds: [
            { value: 0, address: "0x0f9E4D49f25de22c2202aF916B681FBB3790497B", label: "ETH" },
            { value: 1, address: "0xc907E116054Ad103354f2D350FD2514433D57F6f", label: "BTC" },
            { value: 2, address: "0x82a6c4AF830caa6c97bb504425f6A66165C2c26e", label: "BNB" },
            { value: 3, address: "0x7E7B45b08F68EC69A99AAb12e42FcCB078e10094", label: "APPL" },
            { value: 4, address: "0xC43081d9EA6d1c53f1F0e525504d47Dd60de12da", label: "MSFT" },
            { value: 5, address: "0x1b32682C033b2DD7EFdC615FA82d353e254F39b5", label: "GOOGL" }
        ]
    },
    avalanche: {
        // contracts: [
        //     cryptoSwap: "<address>",
        //     yieldStrategyManager: "<address>",
        //     priceFeedManager: "<address>",
        // ],
        // tokens: [
        //     usdc: "<address>",
        //     weth: "<address>",
        //     wbtc: "<address>",
        // ],
        priceFeeds: [
            { value: 0, address: "0x976B3D034E162d8bD72D6b9C989d545b839003b0", label: "ETH" },
            { value: 1, address: "0x2779D32d5166BAaa2B2b658333bA7e6Ec0C65743", label: "BTC" },
            { value: 2, address: "0x3E54eB0475051401D093702A5DB84EFa1Ab77b14", label: "MKR" },
            { value: 3, address: "0x28043B1Ebd41860B93EC1F1eC19560760B6dB556", label: "YFI" },
        ]
    }
};
