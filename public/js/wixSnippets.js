/**
 * public/js/wixSnippets.js
 *
 * my research on dealing with Wix's environment
 */

/*----------  wrapper for mobile device-only code  ----------*/

import wixWindow from 'wix-window';
if (wixWindow.formFactor === 'Mobile') {
    // do stuff
}