"use strict";
var id;
var position = 0;
const current = {
    message: "CSPAM TICKER",
};
const runTicker = () => {
    let i;
    let k;
    k = 75 / current.message.length + 1;
    for (i = 0; i <= k; i++)
        current.message += " " + current.message;
    const ticker = document.getElementById("ticker");
    console.log(`ticker is`, ticker, current.message);
    ticker &&
        (ticker.innerText = current.message.substring(position, position + 75));
    if (position++ == 38)
        position = 0;
    id = setTimeout("runTicker()", 1000 / 10);
};
runTicker();
//# sourceMappingURL=index.js.map