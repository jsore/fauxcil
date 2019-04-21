/**
 * fauxcil.com/
 *
 * ( Home )
 */
$w.onReady(function () {
    let navMenuHomeBtn = $w("#navMenuHomeBtn");
    console.log(navMenuHomeBtn);

    let navLine = $w("#navLineHomeTop");
    console.log(navLine);
    let navLinesType = navLine.type;
    console.log(navLinesType);
});

export function showbox(event) {
    setTimeout((box1) => {
        console.log(box1);
    }, 1000);
}