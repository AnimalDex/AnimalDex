import EXPRESS from 'express';
import PATH from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const APP = EXPRESS();

const __dirname = dirname(fileURLToPath(import.meta.url));

APP.set('port', 8080);

APP.use(EXPRESS.static(PATH.join(__dirname, '../src')));

const SERVER = APP.listen(APP.get('port'), '0.0.0.0', function() {
  console.log('The server is running on http://localhost:' + APP.get('port'));
});
