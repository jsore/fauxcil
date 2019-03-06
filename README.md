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

<b>GoDaddy</b>
- [ ] Point DNS to Wix NS ( Note: not transfer, just point )

    > ```
    > Wix NS
    > ns6.wixdns.net @ 216.239.32.100
    > ns7.wixdns.net @ 216.239.34.100
    > ```

<br>

<b>Volusion</b>
- [ ] Export customer order records
- [ ] Retire account

<br>

<b>Wix</b>
- [ ] Set DNS for `fauxcil.com`
    - [ ] Add `fauxcil.com` to the domain list
    - [ ] Set Wix's NS to be authoritative for `fauxcil.com`
    - [ ] Update MX records for `fauxcil.com`
- [ ] 301 redirect `fauxcillashstudio.com` to `fauxcil.com`
- [ ] Logo
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

<b>Wix - Construction Page</b>
- [x] Set as default ( home ), redirect all others here
- [x] Hide navigation for sub-pages
- [x] Password protect access to all other pages
- [x] Include contact info
- [x] Link to Facebook for alternative contact
- [x] Implement minor SEO improvements
- [x] Redirect `fauxcillashstudio.com` and all subpages to this page

<br>

<b>Google</b>
- [ ] Confirm ownership of the website in the Search Console
    - ( https://support.google.com/webmasters/answer/9008080 )
- [ ] Prove ownership of the property
- [ ] Add Fauxcil property to Google Search Console
    - ( https://support.google.com/webmasters/answer/34592 )
- [ ] Remove `Beleza Salon inside ...` from title of physical property within Google's search results

<br>

<b>Meta</b>
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

- Is it "Faux Cil" or "Fauxcil"?

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