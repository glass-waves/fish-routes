const app = require('./lib/app');
const pool = require('./lib/utils/pool');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
    console.log(`We all started up on ${PORT} dude, let's rassle.`)
});

process.on('exit', () => {
    console.log('We about to be dead doggie, see you on the other side.')
    pool.end();
}) 