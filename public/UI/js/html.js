window.getHTML = (function () {
    let header = function () {
        return `
            <button class="new-photo"></button>
            <h1 class="title">Postogram</h1>
            <div class="userblock flex">
                <div class="username"></div>
                <button class="button-exit"></button>
            </div>
        `;
    };
    let footer = function () {
        return `
            <div class="link flex">
                <div>By Ksenia Karabanova group 5 curse 2</div>
                <div>
                    <a href="#">postogram.com</a>
                </div>
            </div>
            <div class="contact flex">
                <div>contact
                    <a href="mailto:karabanova.ksyusha41@gmail.com">karabanova.ksyusha41@gmail.com</a>
                </div>
                <div>16.02.2018</div>
            </div>
        `;
    };
    let main = function () {
        return `
            <div class="search-line">
                <div name="searchBox" class="searchBox">
                    <span class="icon">
                        <i class="fa fa-search"></i>
                    </span>
                    <input type="date" class="searchDate" />
                </div>
                <div class="searchBox">
                    <span class="icon">
                        <i class="fa fa-search"></i>
                    </span>
                    <input type="search" class="searchHashtag" placeholder="#hashtag..." />
                </div>
                <div class="searchBox">
                    <span class="icon">
                        <i class="fa fa-search"></i>
                    </span>
                    <input type="search" class="searchAuthor" placeholder="Username..." />
                </div>
            </div>
            <div class="content"></div>
            <button class="more-button">More</button>
        `;
    };
    let addEdit = function () {
        return `
            <div class="create-photo"></div>
            <input class="input-photo-link" type="file">
            <div class="hashtagsArea">
                <div class="hashtag">Hashtags</div>
                <input type="text" class="inputHashtags" />
            </div>
            <div class="descriptionArea">
                <div class="description">Description</div>
                <input type="text" class="inputDescription" />
            </div>
            <button class="more-button">Done</button>
        `;
    };
    let login = function () {
        return `
        <div class="form">
            <div class="log">log in</div>
            <div class="login">
                <div class="inputTitle">Login</div>
                <input minlength="6" maxlength="30" type="text" id="login-input" class="input">
            </div>
            <div class="password">
                <div class="inputTitle">Password</div>
                <input minlength="6" maxlength="30" type="password" id="password-input" class="input">
            </div>
            <button class="log-more-button">Done</button>
        </div>
        `;
    };
    return {
        header,
        footer,
        main,
        addEdit,
        login
    }
})();