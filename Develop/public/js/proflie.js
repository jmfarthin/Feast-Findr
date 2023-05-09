document.addEventListener('DOMContentLoaded', () => {
    const profileLink = document.getElementById('profile-link');
    const contentArea = document.getElementById('content-area');

    profileLink.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/userRoutes');
            const profileHtml = await response.text();
            contentArea.innerHTML = profileHtml;
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        }
    });
});