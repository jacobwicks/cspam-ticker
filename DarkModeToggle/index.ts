let darkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');

const toggleBtn = document.getElementById('dark-mode-toggle')
const cssLink = document.getElementById('theme-css') as HTMLLinkElement

if (toggleBtn && cssLink) {
    setHref()
    toggleBtn.onclick = (() => {
        localStorage.setItem('darkMode', (!darkMode).toString())
        darkMode = !darkMode
        setHref()
    })
}

function setHref() {
    cssLink.href = darkMode ? 'dark.css' : 'light.css'
}

