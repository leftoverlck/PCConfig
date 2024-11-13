module.exports = {
    testEnvironment: 'jsdom', // Додаємо це для підтримки DOM
    moduleNameMapper: {
      '\\.module\\.css$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };
  