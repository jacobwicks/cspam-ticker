let theme = parseInt(localStorage.getItem('theme') || "0", 10);

const themes = [
    'light.css',
    'incorrect.css',
    'correct.css'
]

const toggleBtn = document.getElementById('theme-toggle')
const cssLink = document.getElementById('theme-css') as HTMLLinkElement
console.log('foo')

if (toggleBtn && cssLink) {
    setHref()
    toggleBtn.onclick = (() => {
        theme = theme + 1
        console.log(theme)
        localStorage.setItem('theme', (theme).toString())
        setHref()
    })
}

function setHref() {
    console.log(themes[theme % 3])
    cssLink.href = themes[theme % 3]
}

