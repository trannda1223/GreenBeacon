if(process.env.NODE_ENV !== 'production') {
  // i.e. you are working from localhost
  module.exports.keys = {
    gitHubClientId: '',
    gitHubSecretKey: '',
    gitCallbackUrl: ''
  }
}