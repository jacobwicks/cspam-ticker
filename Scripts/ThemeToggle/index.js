"use strict";
let theme = parseInt(localStorage.getItem('theme') || "0", 10);
const themes = [
    'light.css',
    'incorrect.css',
    'correct.css'
];
const toggleBtn = document.getElementById('theme-toggle');
const cssLink = document.getElementById('theme-css');
if (toggleBtn && cssLink) {
    setHref();
    toggleBtn.onclick = (() => {
        theme = theme + 1;
        localStorage.setItem('theme', (theme).toString());
        setHref();
    });
}
function setHref() {
    cssLink.href = themes[theme % 3];
}
//# sourceMappingURL=index.js.map