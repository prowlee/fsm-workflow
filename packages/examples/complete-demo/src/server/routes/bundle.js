import express from 'express'
import path from 'path'
import webpack from 'webpack'
import config from '../webpack.config'

const router = express.Router();

router.get('/bundle.js', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    webpack(config, (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings)
      }

      console.log('webpack compiled successfully; sending new bundle.js');
      res.sendFile(path.resolve(__dirname, '../../../www/bundle.js'));
    })
  } else {
    res.sendFile(path.resolve(__dirname, '../../../www/bundle.js'));
  }
})

export default router;
