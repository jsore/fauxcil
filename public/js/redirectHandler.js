/**
 * public/redirectHandler.js
 *
 * manually redirect if Wix doesn't catch the 301 from the old
 * domain, fauxcillashstudio.com ( has happened a few times )
 */

/** Wix module */
import wixLocation from 'wix-location';

/** I want the host of the request */
let baseUrl = wixLocation.baseUrl;

const doWork = () => {
    if (baseUrl === 'https://www.fauxcillashstudio.com') {
        try {
            console.log('Opps, Wix didn\'t handle the 301. Redirecting...');
            //window.location.replace("https://www.fauxcil.com");
            wixLocation.to('/');
            let msg = `Had to redirect from ${baseUrl}`;
            return msg;
        } catch (e) { console.log(e); }
    } else {
        let msg = `No redirect required, already at ${baseUrl}`;
        return msg;
    }
};

/**
 * this layer of abstraction just for URL path's probably
 * isn't necessary, but oh well
 */
export let urlSanity = () => {
    console.log('I hate Wix');
    return doWork(baseUrl);
};
