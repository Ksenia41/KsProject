window.handlers = (function () {
    let reloadMainPage = function() {
        filter = false;
        let mainPart = document.createElement('div');
        mainPart.className = 'main';
        mainPart.innerHTML = getHTML.main();
        document.body.removeChild(document.querySelector('.main'));
        document.body.insertBefore(mainPart, document.querySelector('footer'));
        content = document.querySelector('.content');
        dom.getPhotoPosts();
        setMainListeners();
    };
    let returnToMainPage = function() {
        reloadMain();
        content = document.querySelector('.content');
        dom.getPhotoPosts();
    };
    let logOutFromAddEdit = function() {
        reloadMain();
        content = document.querySelector('.content');
        dom.getPhotoPosts();
        dom.changeUser('undefined');
        document.getElementsByClassName('button-exit')[0].removeEventListener("click", logOutFromAddEdit);
        document.getElementsByClassName('button-exit')[0].addEventListener("click", dom.handler2);
    };
    let returnToMainFromLogin = function() {
        document.body.innerHTML = "";
        setMainPage();
        content = document.querySelector('.content');
        dom.getPhotoPosts();
    };
    return{
        reloadMainPage,
        returnToMainPage,
        logOutFromAddEdit,
        returnToMainFromLogin
    }
})();


function setMainListeners() {
    if (document.querySelector('.new-photo')) {
        document.getElementsByClassName("new-photo")[0].addEventListener("click", function () {
            setAddEditPage();
            filter = false;
            setAddListeners();
        });
    }
    document.getElementsByClassName('title')[0].removeEventListener("click", handlers.returnToMainPage);
    document.getElementsByClassName('title')[0].removeEventListener("click", handlers.returnToMainFromLogin);
    document.getElementsByClassName('title')[0].addEventListener("click", handlers.reloadMainPage);
    document.getElementsByClassName('more-button')[0].addEventListener("click", function () {
        let length = document.getElementsByClassName('container').length;
        if (photoPosts.length > length) {
            dom.getPhotoPosts(length, 10);
            if (photoPosts.length <= length + 10) {
                document.getElementsByClassName('more-button')[0].style.visibility = 'hidden';
            }
        }
    });
    function search() {
        if (event.keyCode == 13) {
            let filterConfig = {};
            const author = document.getElementsByClassName('searchAuthor')[0].value || null;
            const hashTags = document.getElementsByClassName('searchHashtag')[0].value.split(' ') || null;
            const createdAt = document.getElementsByClassName('searchDate')[0].value;
            if (createdAt !== '' && createdAt !== null) filterConfig.createdAt = new Date(createdAt);
            if (author) filterConfig.author = author;
            if (JSON.stringify(hashTags)!=='[""]') filterConfig.hashTags = hashTags;
            photoPosts = JSON.parse(localStorage.getItem('posts'), function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            content.innerHTML = "";
            if (JSON.stringify(filterConfig) !== '{}') {
                dom.getPhotoPosts(0, photoPosts.length, filterConfig);
                filter = true;
                document.querySelector('.more-button').style.visibility = 'hidden';
            } else {
                filter = false;
                dom.getPhotoPosts();
                document.querySelector('.more-button').style.visibility = 'visible';
            }
        }
    }
    document.getElementsByClassName('searchDate')[0].addEventListener('keypress', search);
    document.getElementsByClassName('searchHashtag')[0].addEventListener('keypress', search);
    document.getElementsByClassName('searchAuthor')[0].addEventListener('keypress', search);
}

function setAddListeners() {
    document.getElementsByClassName('more-button')[0].addEventListener("click", function () {
        const author = localStorage.user;
        const likes = [];
        const createdAt = new Date();
        const id = localStorage.id;
        const description = document.getElementsByClassName('inputDescription')[0].value;
        let hashTags = document.getElementsByClassName('inputHashtags')[0].value.match(/#[^\s#]*/g);
        if (hashTags === null) {
            hashTags = [];
        }
        let photoLink = document.querySelector('.create-photo').style.backgroundImage.substr(5,
            document.querySelector('.create-photo').style.backgroundImage.length - 7);
        if (photoLink === "") {
            photoLink = undefined;
        }
        const post = { id, description, createdAt, author, photoLink, hashTags, likes };
        if (addPhotoPost(post)) {
            reloadMain();
            content = document.querySelector('.content');
            dom.getPhotoPosts();
            localStorage.setItem('id', JSON.stringify(parseInt(id) + 1));
        }
    });
    document.querySelector('.create-photo').addEventListener("click", function () {
        document.querySelector('.input-photo-link').click();
    });
    document.querySelector('.input-photo-link').addEventListener("change", function () {
        document.querySelector('.create-photo').style.backgroundImage = 'url(' + document.querySelector('.input-photo-link').files[0].name + ')';
    });
    document.getElementsByClassName('title')[0].removeEventListener("click", handlers.reloadMain);
    document.getElementsByClassName('title')[0].addEventListener("click", handlers.returnToMainPage);

    document.getElementsByClassName('button-exit')[0].removeEventListener("click", dom.handler2);
    document.getElementsByClassName('button-exit')[0].addEventListener("click", handlers.logOutFromAddEdit);
}

function setEditListeners() {
    document.getElementsByClassName('more-button')[0].addEventListener("click", function () {
        const id = document.getElementsByClassName('more-button')[0].id;
        const description = document.getElementsByClassName('inputDescription')[0].value;
        let hashTags = document.getElementsByClassName('inputHashtags')[0].value.match(/#[^\s#]*/g);
        if (hashTags === null) {
            hashTags = [];
        }
        let photoLink = document.querySelector('.create-photo').style.backgroundImage.substr(5,
            document.querySelector('.create-photo').style.backgroundImage.length - 7);
        if (photoLink === "") {
            photoLink = undefined;
        }
        const post = { id, description, hashTags, photoLink };
        if (editPhotoPost(id, post)) {
            reloadMain();
            content = document.querySelector('.content');
            dom.getPhotoPosts();
        }
    });
    document.querySelector('.create-photo').addEventListener("click", function () {
        document.querySelector('.input-photo-link').click();
    });
    document.querySelector('.input-photo-link').addEventListener("change", function () {
        document.querySelector('.create-photo').style.backgroundImage = 'url(' + document.querySelector('.input-photo-link').files[0].name + ')';
    });
    document.getElementsByClassName('title')[0].removeEventListener("click", handlers.reloadMainPage);
    document.getElementsByClassName('title')[0].addEventListener("click", handlers.returnToMainPage);

    document.getElementsByClassName('button-exit')[0].removeEventListener("click", dom.handler2);
    document.getElementsByClassName('button-exit')[0].addEventListener("click", handlers.logOutFromAddEdit);
}

function setLoginListeners() {
    document.getElementsByClassName('log-more-button')[0].addEventListener("click", function () {
        const username = document.getElementById('login-input').value;
        localStorage.setItem('user', username);
        document.body.innerHTML = "";
        setMainPage();
        setMainListeners();
        content = document.getElementsByClassName('content')[0];
        dom.getPhotoPosts();
    });
    document.getElementsByClassName('title')[0].removeEventListener("click", handlers.reloadMainPage);
    console.log("+");
    document.getElementsByClassName('title')[0].addEventListener("click", handlers.returnToMainFromLogin);
}