require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/Wf-E58fgbUJHPLm_e1YRJA-oAnSNGbPN',
      accounts: ['e3af85dda09d1f32acbb9f466d332e54f96e6136622b7a9122b438089edc5979'],
    },
  },
};