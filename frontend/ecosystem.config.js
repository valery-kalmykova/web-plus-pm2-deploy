require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-frontend',
    script: './build/index.html',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/valery-kalmykova/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-setup': `cd && cd /home/valery-kalmykova && rm -rf mesto-frontend`,
      'post-setup': 'cd && cd /home/valery-kalmykova/mesto-frontend/source/frontend && npm i && npm run build',
    },
  },
};