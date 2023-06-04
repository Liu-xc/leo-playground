module.exports = class LeoPlugin {
  apply (compiler) {
    compiler.hooks.run.tap('LeoPlugin', () => {
      console.log('LeoPlugin compiler run');
    });

    compiler.hooks.compile.tap('LeoPlugin', () => {
      console.log('LeoPlugin compiler compile');
    });

    compiler.hooks.compilation.tap('LeoPlugin', (compilation) => {
      compilation.hooks.buildModule.tap('LeoPlugin', () => {
        console.log('LeoPlugin compilation buildModule');
      });

      compilation.hooks.seal.tap('LeoPlugin', () => {
        console.log('LeoPlugin compilation seal');
      });

      compilation.hooks.succeedModule.tap('LeoPlugin', () => {
        console.log('LeoPlugin compilation succeedModule');
      });
    })
  }
}