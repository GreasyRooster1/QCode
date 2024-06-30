class NavComponent extends HtmlComponent{
    createContent() {
        return `
            <div class="navbar">
                <div class="home-link">Home</div>
                <div class="points-display">
                    Points: <span class="points-display-num">0</span>
                </div>
                <div class="account-dropdown-wrapper">
                    <div class="account-dropdown">
                        <div class="username-link">Login</div>
                        <div class="account-options">
                            <div class="logout-button option">Logout</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar-visibility-button">
                ^
            </div>
            <div class="nav-shift-fix"></div>
        `;
    }
}

ComponentRegistry.registerHtmlComponent(NavComponent);