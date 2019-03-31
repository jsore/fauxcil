# Problem Tracker For fauxcil.com

Documenting the overhaul of the Salon's website

## The Scenario

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

## The Changes

Wix apparently provides solutions ( hacks ) to inject JS into the site you
template with them.

A lot of the code I'll be writing relies on their API's or, because Wix and its
engine is apparently Node.js based, `import` statements for the npm modules they support.

I can **not** attest to the reliability of their modules or npm compatibility at this time.

<br>

### Manual redirect module

`public/wixFunctions.js`

Wix isn't catching every `301 Redirect` for `fauxcillashstudio.com` often enough
that it needs to be addressed

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
 * this layer of abstraction just for URL paths probably
 * isn't necessary, but oh well
 */
export let urlSanity = () => {
    console.log('I hate Wix');
    return doWork(baseUrl);
};
```

<br>

### Site-wide globally scoped code

`github.com/.../fauxcil/public/js/siteCode.js`

Everything here will reach all site pages and `public/` files

```javascript
/** because there's so many damn POST failures on page load... */
let arbitrarySeparator = '- - - - - - - -  user code  - - - - - - - -';

console.log(`${arbitrarySeparator}`);
console.log('begin importing imports...');

/** calls urlSanity export and redirects if required */
import {urlSanity} from 'public/wixFunctions.js';

/** log the results */
console.log(urlSanity());
console.log(`${arbitrarySeparator}`);
```

<br>

### Some npm modules I ( might ) want to use

Just bring these in with `import` statements:

> ```javascript
> // https://www.wix.com/code/reference/npm-modules.html
> 
> // Site Editor >> Backend >> ( gear wheel ) >> Install Node Package
> 
> // import per module's docs
> import example from 'example';
> 
> export function getAnExample() {
>     return example.functions.findExample();
> }
> ```

<br>

A note to self regarding ANYTHING related to payment processing for the site's store:

> The Payment Card Industry (PCI) Council has mandated that early versions
> of TLS be retired from service. All organizations that handle credit card
> information are required to comply with this standard.
>
> - For HTTPS, TLS 1.2 connections are required.
>
> - For HTTP, HTTP/1.1 should be the minimun for all connections.

<br>

    /*----------  top contenders  ----------*/

    total.js ( 3.0.0 )

        - JS framework that includes a ton of modules
        - home: https://github.com/totaljs/framework
        - available modules: https://github.com/totaljs/modules
        - snippets: https://github.com/totaljs/examples



    passport ( 0.4.0 )

        - user authentication
        - base snippets: https://www.npmjs.com/package/passport
        - API documents: http://www.passportjs.org/docs/
        - better API docs: https://github.com/jwalton/passport-api-docs



    form-data ( 2.3.2 )

        - create `multipart/form-data` streams for form submissions to other web apps
        - base snippets: https://www.npmjs.com/package/form-data



    axios ( 0.18.0 )

        - HTTP client ( `GET/POST` and `XMLHttpRequests` ) with auto JSON transformation
        - base snippets: https://www.npmjs.com/package/axios



    /*----------  others that are interesting  ----------*/

    fontkit ( 1.7.7 )

        - advanced font support
        - base snippets: https://www.npmjs.com/package/fontkit

    validator ( 9.4.0 )

        - string validation and sanitation
        - base snippets: https://www.npmjs.com/package/validator



    square-connect ( 2.20190213.0 )

        - connect to Square's API
        - base snippets: https://www.npmjs.com/package/square-connect
        - Square API Documents: https://docs.connect.squareup.com/



    paypal-checkout ( 4.0.202 )

        - simple PayPal integration
        - base snippets: https://www.npmjs.com/package/paypal-checkout
        - API documents: https://developer.paypal.com/



    handlebars ( 4.0.11 )

        - templating language for separating views from code
        - base snippets: https://www.npmjs.com/package/handlebars
        - API documents: http://handlebarsjs.com/



    mysql ( 2.15.0, 2.11.1 )

        - db schema
        - base snippets: https://www.npmjs.com/package/mysql



    request ( 2.83.0 )

        - simple HTTP/HTTPS calls
        - base snippets: https://www.npmjs.com/package/request



    request-promise ( 4.2.2 )

        - HTTP request + support for Promises ( adds .then(...) support )
        - base snippets: https://www.npmjs.com/package/request-promise



    body-parser ( 1.18.3 ) [this is a very hard maybe]

        - base snippets: https://www.npmjs.com/package/body-parser



    node-oauth ( 0.9.15 )

        - User authentication for providers that use OAuth ( 2.0 )
        - base snippets: https://www.npmjs.com/package/oauth
        - API documents: https://oauth.net/articles/authentication/
        - https://en.wikipedia.org/wiki/List_of_OAuth_providers


<br>

### GoDaddy TODO's
- [x] Point DNS to Wix NS ( Note: not transfer, just point )

    > ```
    > Wix NS
    > ns6.wixdns.net @ 216.239.32.100
    > ns7.wixdns.net @ 216.239.34.100
    > ```

<br>

### Volusion TODO's
- [x] Export customer order records
- [x] Export payment records for Volusion account
- [x] Retire account ( `My Account >> dot menu top right >> Cancel My Store )

<br>

### Wix TODO's
- [x] Set main DNS for `fauxcil.com`
    - [x] Propagation checks: `dig fauxcil.com -t ns`, `dig fauxcil.com +nssearch`
    - [x] Strip `fauxcil.com` from Volusion account
    - [x] Add `fauxcil.com` to the Wix domain list
    - [x] Set Wix's NS to be authoritative for `fauxcil.com`
- [ ] MX records
    - [ ] Update DNS for `fauxcil.com` <strong>ORuse Wix ( `@fauxcil.com` ) email</strong>
        - `fauxcillashstudio.com   mx5.biz.mail.yahoo.com  10`
        - `fauxcillashstudio.com   mx1.biz.mail.yahoo.com  20`
- [ ] ~~Rebuild site with proper name, details~~ New site costs money
- [x] Assign `fauxcil.com` as main domain for new site
- [x] 301 redirect for `fauxcillashstudio.com` to `fauxcil.com`
- [ ] 301 redirect for subpages on old wix domain to `fauxcil.com`
- [x] Logo
- [x] Favicon
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
- [ ] Wireframe webstore for owner's products
    - [ ] Set subdomain for owner's separation concerns ( https://bit.ly/2Ez0RlM )
    - [ ] Design layout
    - [ ] Confirm payment processer ( Square? ) is connected and working

<br>

### Wix - Construction Page TODO's
- [x] Set as default ( home ), redirect all others here
- [x] Hide navigation for sub-pages
- [x] Password protect access to all other pages
- [x] Include contact info
- [x] Link to Facebook for alternative contact
- [x] Implement minor SEO improvements
- [x] Redirect `fauxcillashstudio.com` and all subpages to this page

<br>

### Development TODO's
- [ ] npm package research, document possible modules I want to use
- [ ] User authentication for access to store shopping cart, payments
- [ ] User authentication training, studio space lease opportunities

### Google & other misc TODO's
- [ ] Google searches for `fauxcil lash studio`:
    - [ ] change the media preview from the old logo
    - [ ] Confirm ownership of the website ( 'property' ) in the Search Console
        - ( https://support.google.com/webmasters/answer/9008080 )
        - ( https://support.google.com/webmasters/answer/34592 )
    - [ ] After proving ownership, submit sitemap ( from Google Search Console hom page )
    - [x] Remove `Beleza Salon inside ...` from title of physical property within Google's search results
    - 
- [ ] Yelp: update website link from `fauxcillashroom.wix.com/beauty`
    - https://www.yelp.com/biz/faux-cil-lash-studio-arlington
- [ ] Facebook: shut down the Legacy Salons page
    - https://www.facebook.com/pages/Faux-Cil-Lash-Beauty-Bar/430692230617316


<br>

### Meta TODO's
```html
/** don't show Google's custom search for this domain */
<meta name="google" content="nositelinkssearchbox" />
/** tell Google you own this site */
<meta name="google-site-verification" content="..." />
/** mobile friendly */
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

<br>

## Pending Questions, Recommendations

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