let user1  = 'user1';
let filterConfig= {author: "wonder-woman"};
let loadMoreButton= document.querySelector('.more-button');
let content = document.querySelector('.content');

 window.dom = (function () {
     loadMoreButton.style.visibily = 'hidden'; //элемент невидим
     let userName = document.querySelector('.username').innerHTML;
     console.log(userName);
     let exitButton = document.querySelector('.button-exit');

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
         if(photoPost.author === userName){
             redactButton.className = 'redact button';
             deleteButton.className = 'delete button'
         } else {
             redactArea.style.visibility = 'hidden';
         }
         redactArea.append(redactButton, deleteButton);
         infoArea.className = 'info';
         likeButton.className = 'like button';
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

     let addPhotoPost = function (photoPost){
         content.insertBefore(makePhotoPost(photoPost), content.children[0]);
     };

     let getPhotoPosts = function (skip = 0, top = 10, filterConfig) {
         let photoPosts = mod.getPhotoPosts(skip, top, filterConfig);
         photoPosts.forEach(item => { content.appendChild(makePhotoPost(item) )});
     };

     let editPhotoPost = function (id, photoPost) {
         let post = document.getElementById(id);
         if (post) {
             content.replaceChild(makePhotoPost(mod.getPhotoPost(id)), post);
             return true;
         }
         return false;
     };
     let removePhotoPost = function (id) {
         let post = document.getElementById(id);
         if (post) {
             content.removeChild(post);
             return true;
         }
         return false;
     };
     let deleteAllPosts = function () {
         let items = document.getElementsByClassName('post');
         items = Array.prototype.slice.call(items);
         items.forEach(function (item) {
             content.removeChild(document.getElementById(item.id));
         });
         return true;
     };
     return {
         addPhotoPost,
         getPhotoPosts,
         editPhotoPost,
         removePhotoPost,
         deleteAllPosts
     }

 })();

function showPhotoPosts(skip, top) {
    dom.deleteAllPosts();
    dom.getPhotoPosts(skip, top, filterConfig);
    let posts = mod.getPhotoPosts(0, photoPosts.length, filterConfig).length;
    if (posts === 0) {
       content.innerHTML = 'No such posts';
    }
    if (skip + top >= posts) {
        loadMoreButton.style.visibility = 'hidden';
    } else {
        loadMoreButton.style.visibility = 'visible';
    }
}
function addPhotoPost(photoPost) {
    if (user1 != null) {
        if (mod.addPhotoPost(photoPost)) {
            dom.addPhotoPost(photoPost);
            return true;
        }
    }
    return false;
}
function editPhotoPost(id, photoPost) {
    if (mod.editPhotoPost(id, photoPost)) {
        dom.editPhotoPost(id, photoPost);
        return true;
    }
    return false;
}
function removePhotoPost(id) {
    if (mod.getPhotoPost(id).author == user) {
        if (mod.removePhotoPost(id)) {
            if (dom.removePhotoPost(id)) {
                let length = document.getElementsByClassName('post').length;
                let posts = mod.getPhotoPosts(0, photoPosts.length, filterConfig);
                if (length < posts.length && length < 10) {
                    dom.addPhotoPost(posts[length]);
                }
                if (length + 1 >= posts.length) {
                    loadMoreButton.style.visibility = 'hidden';
                }
            }
            return true;
        }
    }
    return false;
}

loadMoreButton.addEventListener('click', function () {
    let length = document.getElementsByClassName('post').length;
    let posts = mod.getPhotoPosts(0, photoPosts.length, filterConfig);
    if (posts.length > length) {
        dom.getPhotoPosts(length, 10, filterConfig);
        if (posts.length <= length + 10) {
            loadMoreButton.style.visibility = 'hidden';
        }
    }
});

dom.getPhotoPosts(0, 10);