module.exports = {
    runtimeCompiler: true,
    publicPath: process.env.NODE_ENV === 'admin' ? '/madmin/' : '/'
  }