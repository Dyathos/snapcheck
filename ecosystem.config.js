module.exports = {
  apps: [{
    name: 'snapcheck',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
