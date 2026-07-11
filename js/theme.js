// Prevent FOUC (Flash of Unstyled Content) by setting dark mode immediately
(function() {
    try {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme === 'dark' || (!savedTheme && systemDark);
        
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.removeAttribute('data-theme');
        }
    } catch (e) {
        console.error("Theme initialization failed", e);
    }
})();

// Attach toggle event listener after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle') || document.getElementById('theme-toggle-standalone');
    
    if (themeToggleBtn) {
        // Set initial icon state based on DOM class
        const isDark = document.documentElement.classList.contains('dark');
        themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun text-xl"></i>' : '<i class="fas fa-moon text-xl"></i>';
        
        // Handle click
        themeToggleBtn.addEventListener('click', () => {
            const root = document.documentElement;
            if (root.classList.contains('dark')) {
                root.classList.remove('dark');
                root.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fas fa-moon text-xl"></i>';
            } else {
                root.classList.add('dark');
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fas fa-sun text-xl"></i>';
            }
        });
    }
});
