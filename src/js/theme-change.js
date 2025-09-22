export function themeChange() {
    const themeChangeBtn = document.getElementById('theme-change-btn');

    if (themeChangeBtn) {
        themeChangeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
        });
    }
}