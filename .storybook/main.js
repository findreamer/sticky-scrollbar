module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {}
  },
  docs: {
    autodocs: true
  },
  webpackFinal: async (config, { configType }) => {
    // 添加对less文件的支持
    config.module.rules.push({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader'
      ],
    });
    return config;
  }
};