// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const cron = require('node-cron');
const { exec } = require('child_process');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');

    const fetchAndSaveYoutubeList = () => {
      exec('node utils/serverScript/fetchAndSaveYoutubeList.js', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error executing script: ${err}`);
          return;
        }
        console.log(`Script output: ${stdout}`);
        if (stderr) {
          console.error(`Script error output: ${stderr}`);
        }
      });
    };

    fetchAndSaveYoutubeList();

    // Cron job to run fetchAndSaveYoutubeList script every day at midnight
    cron.schedule('0 0 * * *', () => {
      console.log('Running cron job to fetch YouTube list');
      fetchAndSaveYoutubeList();
    });
  });
});
