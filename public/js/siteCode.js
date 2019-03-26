/**
 * https://github.com/jsore/fauxcil/blob/master/siteCode.js
 */

/*
 * $w.onReady(function () { ... });
*/

/** because there's so many damn POST failures */
let arbitrarySeparator = '- - - - - - - -  user code  - - - - - - - -';
console.log(`${arbitrarySeparator}`);

console.log('begin importing imports...');

/** runs and redirects if required */
import {urlSanity} from 'public/wixFunctions.js';

/** log the results */
console.log(urlSanity());

console.log(`${arbitrarySeparator}`);