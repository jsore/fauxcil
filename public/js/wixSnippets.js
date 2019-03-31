/**
 * public/js/wixSnippets.js
 *
 * my research on dealing with Wix's environment
 */

/*===================================
=            wix modules            =
===================================*/

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




