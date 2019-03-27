### Problem Tracker For fauxcil.com

Documenting the overhaul of the Salon's website

### The Scenario

- There's two main domains related to the salon, Fauxcil

    > An informative site about the salon:
    > ```
    > https://www.fauxcillashstudio.com
    >
    > Provider:     Wix
    > Registrar:    Wix ( via Network Solutions )
    > DNS:          Wix's NS ( 23.236.62.147 )
    > ```
    >
    > A webstore for products being sold by the salon's owner:
    > ```
    > https://www.fauxcil.com/
    >
    > Provider:     Volusion
    > Registrar:    GoDaddy
    > DNS:          Cloudflare via Volusion
    > ```
    >
    > The Salon's owner leases space in her Salon to beauticians, Fauxcil acting as a parent entity
    >
    > The people leasing spaces of the Salon are affiliated with Fauxcil, but are wholy separate from <br>
    > the company itself ( and the owner ), they're in charge of the services they offer
    >
    > The owner established a line of products and wanted to keep those products separated from the   <br>
    > leasees, hence the two domains

- One of the Salon's leasees accidentally claimed ownership of Fauxcil via Google

    > The leasee was attempting to register the space she's leasing as her own under the Fauxcil brand<br>
    > but instead claimed ownership of the Salon proper

- The owner is unsure of how to proceed with correcting and updating the Salon's online presence

- The main goal is to merge the two functionalities served at each of the domains

- The `fauxcillashstudio.com` domain should be retired and 301 redirected to `fauxcil.com`

- All services should be hosted at the `fauxcil.com` domain

- For the sake of usabilitiy and ease of maintenance, Wix should be used to host `fauxcil.com`

    > Originally, the plan was to spin up a Linode server for the owner and re-build the site in a    <br>
    > Node.js environment, but after taking maintenance and the cost associated with such a task, the <br>
    > site will just be set up on Wix
    >
    > This way I don't have to worry about providing continued support <br>
    > ( Salon owner is family and I'm doing this for free )

- The Volusion account currently serving `fauxcil.com` should be retired

- The site itself also needs a complete redesign

<br>

### The Changes

<b>Some JavaScript - manual redirect module</b> `public/wixFunctions.js`<br>
Wix isn't catching every 301 for `fauxcillashstudio` often enough that it needs
to be addressed

    ```javascript
    /** Wix module */
    import wixLocation from 'wix-location';

    /** I want the host of the request */
    let baseUrl = wixLocation.baseUrl;

    const doWork = () => {
        if (baseUrl === 'https://www.fauxcillashstudio.com') {
            console.log('Wrong URL, Wix must not have caught the 301. Redirecting...');
            wixLocation.to('/');
            let msg = `Had to redirect from ${baseUrl}`;
            return msg;
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
    ```

<br>

<b>Some JavaScript - code shared site-wide</b>

    `github.com/jsore/fauxcil/blob/master/siteCode.js`<br>
    ```javascript
    /** because there's so many damn POST failures */
    let arbitrarySeparator = '- - - - - - - -  user code  - - - - - - - -';
    console.log(`${arbitrarySeparator}`);

    console.log('begin importing imports...');

    /** runs and redirects if required */
    import {urlSanity} from 'public/wixFunctions.js';

    /** log the results */
    console.log(urlSanity());

    console.log(`${arbitrarySeparator}`);
    ```

<br>

<b>Some npm modules I might want to use</b>

    Wix supports a handful of npm packages in its environment ( Wix is Node.js based? ):

    https://www.wix.com/code/reference/npm-modules.html

    ```
    validator @ 9.4.0
    string validation and sanitation

        - base snippets: https://www.npmjs.com/package/validator
    ```
    ```
    square-connect @ 2.20190213.0
    connect to Square's API ( funky ass version numbers though )

        - base snippets: https://www.npmjs.com/package/square-connect
        - API Documents: https://docs.connect.squareup.com/
    ```


    `square-connect`

    > B
    > A

    

<br>

<b>GoDaddy TODO's</b>
- [ ] Point DNS to Wix NS ( Note: not transfer, just point )

    > ```
    > Wix NS
    > ns6.wixdns.net @ 216.239.32.100
    > ns7.wixdns.net @ 216.239.34.100
    > ```

<br>

<b>Volusion TODO's</b>
- [x] Export customer order records
- [x] Export payment records for Volusion account
- [ ] Retire account ( `My Account >> dot menu top right >> Cancel My Store )

<br>

<b>Wix TODO's</b>
- [ ] Set DNS for `fauxcil.com`
    - [x] Propagation checks: `dig fauxcil.com -t ns`, `dig fauxcil.com +nssearch`
    - [x] Strip `fauxcil.com` from Volusion account
    - [x] Add `fauxcil.com` to the Wix domain list
    - [x] Set Wix's NS to be authoritative for `fauxcil.com`
    - [ ] Update MX and remaining records for `fauxcil.com`
- [ ] ~~Rebuild site with proper name, details~~ New site costs money
- [x] Assign `fauxcil.com` as main domain for new site
- [ ] 301 redirects
    - [x] `fauxcillashstudio.com` to `fauxcil.com`
    - [ ] subpages for old domain to `fauxcil.com`
- [x] Logo
- [ ] Favicon
- [ ] Optimize background image + Lazy Load
- [ ] Redisgn the site
    - [ ] Homepage
    - [ ] About us
    - [ ] Contact us
    - [ ] Services
    - [ ] Gallery
    - [ ] Training
    - [ ] Leasing
    - [ ] Update the site's Title ( should be `Fauxcil` not `beauty` )
    - [ ] Set all pages to cache their content
    - [ ] SEO: Titles, descriptions ( meta tags ) need to be filled out for all pages
    - [ ] SEO: Set logo and Facebook username under `Social Share`
    - [ ] SEO: `sitemap.xml`
    - [ ] Copyright statement
- [ ] Create webstore for owner's products
    - [ ] Set subdomain for owner's separation concerns ( https://bit.ly/2Ez0RlM )
    - [ ] Design layout
    - [ ] Confirm payment processer ( Square ) is connected and working

<br>

<b>Wix - Construction Page TODO's</b>
- [x] Set as default ( home ), redirect all others here
- [x] Hide navigation for sub-pages
- [x] Password protect access to all other pages
- [x] Include contact info
- [x] Link to Facebook for alternative contact
- [x] Implement minor SEO improvements
- [x] Redirect `fauxcillashstudio.com` and all subpages to this page

<br>

<b>Google TODO's</b>
- [ ] Confirm ownership of the website in the Search Console
    - ( https://support.google.com/webmasters/answer/9008080 )
- [ ] Prove ownership of the property
- [ ] Add Fauxcil property to Google Search Console
    - ( https://support.google.com/webmasters/answer/34592 )
- [ ] Remove `Beleza Salon inside ...` from title of physical property within Google's search results

<br>

<b>Meta TODO's</b>
```html
/** don't show Google's custom search for this domain */
<meta name="google" content="nositelinkssearchbox" />
/** tell Google you own this site */
<meta name="google-site-verification" content="..." />
/** mobile friendly */
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

<br>

### Pending Questions, Recommendations

- Bug: Media share previews are still showing old data after fauxcil DNS update

- ~~Is it "Faux Cil" or "Fauxcil"?~~ It's "Fauxcil"

    > Logo, Store Name: https://admin.volusion.com/settings/detail

- Logo & Favicon

    > Is this still the logo you want to use? https://bit.ly/2Hdsu6G

- Get away from Yahoo for email, buy a mailbox from Wix

    > ```
    > Dashboard -> Domains -> Site: Fauxcil -> Buy a Mailbox
    > Manage via Dashboard -> Business Email
    > Each leasee in your salon can have their own '@fauxcil.com' email
    > ```

- Do you have a return policy for your products? Set it in `Advanced Settings -> Store Settings`