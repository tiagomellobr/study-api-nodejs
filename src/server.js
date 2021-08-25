/* eslint-disable no-console */
const setupApp = require('./app');

const port = process.env.PORT || 3000;

(async () => {
  try {
    const app = await setupApp();
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.map((sig) => process.on(sig, () => server.close((err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      app.database.close(() => {
        console.info('Datavase connection closed!');
        process.exit(1);
      });
    })));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
