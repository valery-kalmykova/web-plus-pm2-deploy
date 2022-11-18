require('dotenv').config({ path: '.env.deploy' });

console.log(process.env);

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-frontend',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/valery-kalmykova/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-setup': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-setup': 'cd backend && npm i && npm run build',
    },
  },
};
