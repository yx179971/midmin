module.exports = {
  apps: [
    {
      name: 'server',
      exec_mode: 'cluster',
      // instances: 'max',
      env: {
        NODE_ENV: 'production',
      },
      script: './bootstrap.js',
      cwd: '/www',
    },
  ],
};
