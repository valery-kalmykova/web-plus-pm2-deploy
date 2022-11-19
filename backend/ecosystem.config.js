require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: './dist/app.js',
    cron_restart: '0 0 * * *',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/valery-kalmykova/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      // 'pre-deploy': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': `cd && cd ${DEPLOY_PATH}/source/backend && npm i && npm run build && pm2 start dist/app.js --cron-restart="0 0 * * *"  && pm2 save`,
    },
  },
};
