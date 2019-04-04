/**
 * public/js/wixSnippets.js
 *
 * my research on dealing with Wix's environment
 *
 * https://support.wix.com/en/wix-code/advanced
 */

/*==============================
=            non-JS            =
==============================*/
/*

~~~~~~~~~~~~~~~~~~~~~~
enable and create custom member signup forms

https://support.wix.com/en/article/wix-code-enabling-custom-site-registration

    - create a members only page
      (https://support.wix.com/en/article/creating-members-only-pages-596999)
    - in the wix page editor, add a lightbox
    - create the form
      (support.wix.com/en/article/wix-code-tutorial-creating-a-custom-registration-form-with-code)
    - Enable custom signup settings:
        - Click Menus & Pages﻿ on the left side of the Editor.
        - Hover over any of your members-only pages and click the Show More icon﻿
          (this affects all members pages)
        - Click Settings >> Permissions tab
        - Select Members Only.
        - Click Member Signup Settings.
        - Click Enable custom signup.
        - Click the toggle to enable custom signup settings.
        - For What does it link to, click Choose a lightbox.
        - In the dropdown, select the lightbox with your custom signup form.
        - Click Done and Save.



~~~~~~~~~~~~~~~~~~~~~~
wix database model planning

https://support.wix.com/en/widget/cb6480f3-768b-4737-ab8f-10fe2e4fa2ab/article/6323fef0-3d2a-4859-821a-2efe500b4c58

    Considerations for Storing User Input
    
    If you want to have a form for your users to fill out, you will need to create a collection for storing the information they supply. Best practice is to have each form connect only to one collection, and then connect each user input element 
        ( https://support.wix.com/en/article/working-with-user-input-elements-2499809 )
    to a field in that collection. 

    Also, make sure you give collections that will store user input the appropriate permissions 
        ( https://support.wix.com/en/widget/cb6480f3-768b-4737-ab8f-10fe2e4fa2ab/article/about-database-collection-permissions )
    , so that your users can save their information.



~~~~~~~~~~~~~~~~~~~~~~
collection fields
    https://support.wix.com/en/article/about-your-database-collection-fields

    Field Name

    The Field Name is the label you see at the top of the column in the Data Manager. The Field Name is also used in the connect panel for elements you can connect to a dataset in the Editor.

    For example, when connecting a text element to a field from your collection, you use the Field Name in the Connect Text panel.

    ﻿
    ﻿
    When you add a new field in the Data Manager, you specify the Field Name. You can change the Field Name after the field has been created, and all connections to that field will be updated. 
    (Wix Code users only) Field Key
    The Field Key is used when referring to the field in code using the Data API or Dataset API. 

    For example, if you want to insert an item using the Data API, you use the Field Key.

        wixData.insert("CollectionName", {"fieldKey": "value"});

    When you add a new field in the Content Manager, the Field Key is created automatically based on the Field Name. You can specify your own field key, if you wish. 

    Note:
    You cannot change the Field Key once the field has been created.  




    Field Type      Limitations

    Reference       - Specify the desired item using the Data Manager interface 
                        (select from the list or paste a value).
                    - Must be an item that is stored in the referenced collection. 

    Text            - None

    Image           - .jpg, .png, and .gif. 
                    - You can also add a link to an image. 
                    - You can connect image elements, page backgrounds, repeater item backgrounds, and column backgrounds (in strips) to Image fields.
                    - Max size: 15 MB

    Boolean         - Select the value using the Data Manager interface.

    Number          - (negative) -2147483647 to 2147483647

    Date and Time   - Select the date and time using the Data Manager interface. 

    Rich Text       - None

    URL             - http://, https://, ftp://, mailto:, sms:, tel:
                    - Web addresses must be in the format http:// or https://. 
                    - Entries that start with www. are converted to http://.

    Document        - doc & .docx, .xls & .xlsx, .ppt & .pptx, .odt, .odp, and .pdf. 
                    - You cannot upload password protected documents.
                    - You can connect elements to Document fields to allow your visitors to upload files to your collection and download files from your collection.

    Video

    Media Gallery   - .jpg, .png, and .gif. 
                    - You can connect a Gallery element to an Media Gallery field.
                    - Max size of each image: 15 MB

    Time            - HH: Hours in 24-hour format (16:00, not 4:00)
                    - mm: minutes
                    - ss: seconds (optional)
                    - SSS: milliseconds (optional)


    

    https://support.wix.com/en/article/working-with-user-input-elements-9560341

    The element you choose mostly depends on the type of information you want to capture or display, and whether you want to give your visitor options to choose from. You'll need to add a submit button to your site to store the data your users enter.


    Creating a Form with User Input Elements:
    https://support.wix.com/en/article/creating-a-form-with-user-input-elements


~~~~~~~~~~~~~~~~~~~~~~
permission presets

Type                            Read        Create          Update
Site Content                    Anyone      Admin           Admin
Form Submission                 Admin       Anyone          Admin
Member-Generated Content        Anyone      Site member     Site member author
Members-Only-Content            Site member Admin           Admin
Members-Only Form Submission    Admin       Site member     Admin
Private Data                    Admin       Admin           Admin


    Wix Code users: Authorization Suppression

    When interacting with your collections using the Data API, you can choose to bypass the permissions model in certain cases. The optional WixDataOptions argument can be sent to the API function call with the suppressAuth property set to true. This will cause the function to run without checking if the current user has the correct permissions. You can only bypass permissions when making API calls from backend code. Client-side API calls will always run permission checks, regardless of what options are passed


~~~~~~~~~~~~~~~~~~~~~~
member contacts

https://support.wix.com/en/article/about-your-contact-list
https://www.wix.com/code/reference/wix-crm-backend.html





*/
/*===================================
=            wix modules            =
===================================*/

/*----------  web modules (backend code)  ----------*/
    /*
    - backend code on wix = 'Web Modules'
    - anything that needs to run server side should be a web module
    - importing server side code to client side = CMLHttpRequest to invoke backend func
    - example usage: hitting a 3rd party API to do something for your user
    - web modules can be imported to other backend scripts too
    - web module files must have a .jsw extension
    */


    /*----------  basic exporting backend functions  ----------*/

    /**
     * web modules always return a Promise that resolves to a value
     */
    // backend file aModule.jsw
    export function multiply(factor1, factor2) {
        return factor1 * factor2;
    }

    // frontend file
    import {multiply} from 'backend/aModule';
    multiply(4,5).then(function(product) {
        console.log(product);
        // Logs: 20
    });


    /*----------  hitting 3rd party APIs  ----------*/

    /**
     * backend/sendEmail.jsw
     *
     * web module for users to send email from 3rd party provider
     */
    // wix-fetch is the API we provide to make https calls in the backend
    import {fetch} from 'wix-fetch';
    const API_KEY = '3rd-party-API-key';
    export function sendEmail (address, subject, body) {
        return fetch('https://apiaddress' + API_KEY, {
            method: 'post',
            body: JSON.stringify({address, subject, body})
        }).then(function(response) {
            if (/* handle response.status */) {
                return response.text();
            } /* else error */
        });
    }

    /**
     * public/someFile.js
     */
    import {sendEmail} from 'backend/sendEmail.jsw';
    export function sendButton_onClick(event) {
        sendEmail(
            $w("#addressInput").value,
            $w("#subjectInput").value,
            $w("#bodyInput").value).then(function() {
                console.log("email was sent");
            }
        );
    }

/*----------  wrapper for mobile device-only code  ----------*/

    import wixWindow from 'wix-window';
    if (wixWindow.formFactor === 'Mobile') {

        // do stuff

    }


/*----------  show something hidden on mouse event  ----------*/

    /**
     * say there's an image #hiddenText with these properties
     * set via the wix page editor:
     *
     *  - id="hiddenText"
     *  - Hidden on load
     *  - onMouseIn: image_mouseIn
     *  - onMouseOut: image_mouseOut
     *  - onClick: image_click
     */
    import wixWindow from 'wix-window';
    export function image_mouseIn(event) {
        $w('#hiddenText').show('fade');
    }
    export function image_mouseOut(event) {
        $w('#hiddenText').hide('fade');
    }
    export function image_click(event) {

        // do something

        // or handle mobile specific click events
        if (wixWindow.forFactor === 'Mobile' || wixWindow.formFactor === 'tablet') {
            if ($w('#hiddenText').hidden) {
                $w('#hiddenText').show('fade');
            }
            else {
                $w('#hiddenText').hide('fade');
            }
        }
    }


/*----------  input validation with $w().onCustomValidation()  ----------*/

/**
 * @value
 *     - value of element to validate
 *
 * @reject
 *     - callback to call to invalidate an elm
 *
 * @valid
 *     - property indicating if elm value is valid
 *
 * @validity
 *     - property returning ValidityState Obj of why elm is invalid
 *
 * @validationMessage
 *     - property returns message why elm is invalid
 *
 * @resetValidityIndication()
 *     - clear visual cue of elm being invalid
 *
 * @updateValidityIndication()
 *     - update visual cue signifying if elm is invalid based on current validity state
 */
$w.onReady(function () {
    $w("#textInput1").onCustomValidation((value, reject) => {
        /** reject if value doesn't end with wix.com */
        if( !value.endsWith("@wix.com") ) {
            reject("Email address must be a wix.com address.");
        }
    });
});


/*========================================
=            wix and Promises            =
========================================*/

    console.log('this prints 1st');

    $w.onReady( function() {
        // run a query on database collection myCollection
        wixData.query('myCollection')
            // returns a Promise
            .find()
            // also returns a Promise
            .then((results) => {
                console.log('this block runs only after Promise is resolved');
                // printing tow a table
                $w('#myTable').rows = results.items;
            });
        // runs before query returns results
        console.log('this prints 2nd just before Promise resolves');
    });


/*----------  then() chaining  ----------*/

    // returns a Promise of data in 'response'
    fetch(url, {method: 'get'})
        // also returns a Promise, the JSON parsed data
        .then(response => response.json())
        // take that returned Promise and do something with it:
        .then((json) => {
            // do something with JSONified response
        });


/*----------  returning Promise data  ----------*/

    // import the wix-data module up top
    import wixData from 'wix-data'

    /*----------  then()  ----------*/

    // user selects from dropdwon, run a query for selection
    export function modelDropdown_change() {
        let model = $w("#modelDropdown").value;

        // don't try to print the Promise...
        //$w("#resultsTable").rows = queryCars(model);
        // ...get the data from the Promise then print that:
        queryCars(model)
            .then((items) => {
                $w.('#resultsTable').rows = items;
            });
    }
    // gets the specific model of dropdown selection
    function queryCars(model) {
        // new query for wix Collection 'cars'
        return wixData.query('cars')    // returns WixDataQuery Obj
            // modify the query
            .eq('model', model)         // returns WixDataQuery Obj
            // execute the query
            .find()                     // returns Promise
            // returns Promise of returned results
            .then((results) => {
                return results.items;
            });
    }

    /*----------  async/await  ----------*/

    import wixData from 'wix-data';

    // returns a Promise
    $w.onReady( async function () {
        const results = await wixData.query("myCollection").find();
        // runs after query finished
        $w("#table1").rows = results.items;
    });


    /**
     * another example, query collection to find an item
     */
    async function findName(name) {
        const results = await wixData.query("myCollection")
            .eq("name", name)
            .find();
        return results.items[0];
    }
    // call with a then():
    $w.onReady(function () {
        findName("Bob")
        .then(item => console.log(item));
    });
    // or async():
    $w.onReady(async function () {
        const item = await findName("Bob");
        console.log(item);
    });


// try/catch for error handling
/*
    import wixData from 'wix-data';
    
    $w.onReady( async function () { 
      try {
        const results = await wixData.query("myCollection").find(); 
        $w("#table1").rows = results.items;
      }
      catch(error) {
        // handle the error here
      }
    } );
*/