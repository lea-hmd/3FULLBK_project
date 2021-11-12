module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.'
  },],

  deploy : {
    production : {
      user : 'ubuntu',
      host : '141.94.220.102',
      ref  : 'origin/main',
      repo : 'git@github.com:lea-hmd/3FULLBK_project.git',
      path : '/home/ubuntu/pm2Stuff',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
