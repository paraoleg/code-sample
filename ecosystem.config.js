const env = require('dotenv').config();
module.exports = {
  apps: [
    {
      name: 'server',
      script: './dist/main.js',
      instances: 1,
      instance_var: 'server',
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      // production mode
      // pm2 start ecosystem.config.js
      ignore_watch: ['node_modules', 'src', 'dist/logs/*', 'logs/*', 'public', '.git', '.idea', '.history'],
      env: env.parsed,
      // development mode
      // pm2 start ecosystem.config.js --env development
      env_development: env.parsed,
      output: './src/logs/debug/pm2.console.log',
      error: './src/logs/error/pm2.consoleError.log',
    },
  ],
  deploy: {
    production: {
      // sample
      user: 'node',
      host: '123.12.123.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
