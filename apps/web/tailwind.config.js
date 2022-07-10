const { join } = require('path');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    )
  ],
  theme: {
    extend: {
      colors: {
        'light-yellow': 'rgb(252, 227, 138)',
        'light-yellow-06': 'rgba(252, 227, 138, 0.6)',
        'black-06': 'rgba(0, 0, 0, 0.6)'
      }
    }
  },
  plugins: []
};
