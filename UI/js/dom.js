let content;
let filter = false;

window.dom = (function () {
    let handler = function () {
        dom.changeUser('undefined');
        content = document.querySelector('.content');
        content.innerHTML = "";
        dom.getPhotoPosts();
    };
    let handler2 = function () {
        setLogInPage();
        filter = false;
    };
    function editPage() {
        filter = false;
        const id = event.target.parentNode.parentNode.id;
        const description = document.getElementById(id).querySelector('.description').textContent;
        const hashtags = document.getElementById(id).querySelector('.hashtags').textContent;
        const photoLink = document.getElementById(id).querySelector('.photo').src;
        setAddEditPage();
        document.getElementsByClassName('inputDescription')[0].value = description;
        document.getElementsByClassName('inputHashtags')[0].value = hashtags;
        document.getElementsByClassName('more-button')[0].setAttribute("id", id);
        document.getElementsByClassName('create-photo')[0].style.backgroundImage = 'url(' + photoLink + ')';
        setEditListeners();
    }
    function setLike() {
        if (localStorage.user !== 'undefined') {
            photoPosts = JSON.parse(localStorage.getItem('posts'), function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            const id = event.target.parentNode.parentNode.id;
            const indexOfPost = photoPosts.findIndex(elem => elem.id == id);
            if (photoPosts[indexOfPost].likes.includes(localStorage.user)) {
                document.getElementById(id).getElementsByClassName('like button')[0].style.backgroundImage = 'url("img/Like.png")';
                photoPosts[indexOfPost].likes = photoPosts[indexOfPost].likes.filter(elem => elem !== localStorage.user);
            } else {
                document.getElementById(id).getElementsByClassName('like button')[0].style.backgroundImage = 'url("img/activeLike.png")';
                photoPosts[indexOfPost].likes.push(localStorage.user);
            }
            localStorage.setItem('posts', JSON.stringify(photoPosts));
        }
    }
    let changeUser = function (userName) {
        if (userName !== 'undefined' && userName.length !== 0) {
            document.querySelector('.username').innerHTML = userName;
            document.querySelector('.button-exit').innerHTML = 'Exit';
            if (document.querySelector('.new-photo') === null) {
                let newPhoto = document.createElement('button');
                newPhoto.className = 'new-photo';
                document.querySelector('header').insertBefore(newPhoto, document.querySelector('.title'));
            }
            document.querySelector('.button-exit').removeEventListener('click', handler2);
            document.querySelector('.button-exit').addEventListener('click', handler);
            localStorage.setItem('user', userName);
        } else if (userName === 'undefined') {
            document.querySelector('.username').innerHTML = "";
            document.querySelector('.button-exit').innerHTML = 'Sign in';
            localStorage.setItem('user', 'undefined');
            if (document.querySelector('.new-photo')) {
                document.querySelector('header').removeChild(document.querySelector('.new-photo'));
            }
            document.querySelector('.button-exit').removeEventListener('click', handler);
            document.querySelector('.button-exit').addEventListener('click', handler2);

        }
    };
    let makePhotoPost = function (photoPost) {
        let post = document.createElement('div');
        let photo = document.createElement('img');
        let redactArea = document.createElement('div');
        let redactButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        let infoArea = document.createElement('div');
        let likeButton = document.createElement('button');
        let nickName = document.createElement('div');
        let date = document.createElement('time');
        let description = document.createElement('div');
        let hashtags = document.createElement('p3');
        post.className = 'container';
        photo.className = "photo";
        photo.src = photoPost.photoLink;
        photo.alt = 'Photo1';

        redactArea.className = 'redactArea';
        if (photoPost.author === localStorage.user) {
            redactButton.className = 'redact button';
            redactButton.addEventListener("click", function () {
                editPage();
            });
            deleteButton.className = 'delete button';
            deleteButton.addEventListener("click", function () {
                const id = event.target.parentNode.parentNode.id;
                removePhotoPost(id);
            });
        } else {
            redactArea.style.visibility = 'hidden';
        }
        redactArea.append(redactButton, deleteButton);
        infoArea.className = 'info';

        likeButton.className = 'like button';
        likeButton.addEventListener("click", function () {
            setLike();
        });
        if (photoPost.likes.includes(localStorage.user)) {
            likeButton.style.backgroundImage = 'url("img/activeLike.png")';
        } else {
            likeButton.style.backgroundImage = 'url("img/Like.png")';
        }

        nickName.className = "user-name";
        nickName.innerHTML = photoPost.author;
        date.className = "date";
        date.dataType = (photoPost.createdAt);
        date.innerHTML = ('0' + photoPost.createdAt.getDate()).slice(-2) + '.' +
            ('0' + (photoPost.createdAt.getMonth() + 1)).slice(-2) + '.' +
            photoPost.createdAt.getFullYear();
        description.className = 'description';
        description.textContent = photoPost.description;
        hashtags.className = 'hashtags';
        hashtags.innerHTML = photoPost.hashTags.join(' ');
        post.id = photoPost.id;
        infoArea.appendChild(likeButton)
        infoArea.appendChild(nickName);
        infoArea.appendChild(date);

        post.appendChild(photo);
        post.appendChild(redactArea);
        post.appendChild(infoArea);
        post.appendChild(description);
        post.appendChild(hashtags);
        return post;
    };
    let addPhotoPost = function (photoPost) {
        if (mod.addPhotoPost(photoPost)) {
            return true;
        }
        return false;
    };
    let getPhotoPosts = function (skip = 0, top = 10, filterConfig) {
        let photoposts = mod.getPhotoPosts(skip, top, filterConfig);
        if(skip+top>=photoPosts.length) document.getElementsByClassName('more-button')[0].style.visibility = 'hidden';
        photoposts.forEach(item => { content.appendChild(makePhotoPost(item)) });
    };
    let editPhotoPost = function (id, photoPost) {
        if (mod.editPhotoPost(id, photoPost)) {
            return true;
        }
        return false;

    };
    let removePhotoPost = function (id) {
        if (mod.getPhotoPost(id).author == localStorage.user) {
            if (mod.removePhotoPost(id)) {
                content = document.querySelector('.content');
                let post = document.getElementById(id);
                if (post) {
                    content.removeChild(post);
                    if (!filter) {
                        dom.getPhotoPosts(document.getElementsByClassName('container').length, 1);
                    }
                }
            }
            return true;
        }
        return false;

        content = document.querySelector('.content');
        let post = document.getElementById(id);
        if (post) {
            content.removeChild(post);
            if (!filter) {
                dom.getPhotoPosts(document.getElementsByClassName('container').length, 1);
            }
            return true;
        }
        return false;
    };
    return {
        handler,
        handler2,
        changeUser,
        addPhotoPost,
        getPhotoPosts,
        editPhotoPost,
        removePhotoPost,
    }

})();

function addPhotoPost(photoPost) {
    if (dom.addPhotoPost(photoPost)) {
        return true;
    }
    return false;
}
function editPhotoPost(id, photoPost) {
    if (dom.editPhotoPost(id, photoPost)) {
        return true;
    }
    return false;
}

setMainPage();
content = document.querySelector('.content');
dom.getPhotoPosts(0, 10);
setMainListeners();