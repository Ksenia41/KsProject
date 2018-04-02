if (localStorage.getItem('posts') === null) {
    var posts = `[{"id":20,"description":"blablabla","createdAt":"2018-03-31T00:00:00.000Z","author":"ksenia.karabanova","photoLink":"img/photo.png","hashTags":["#hashtag","#cool","#lovely","#savetheworld"],"likes":["someName","spider-man","ksenia."]},{"id":19,"description":"blablabla","createdAt":"2018-03-30T00:00:00.000Z","author":"spiderMan","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":18,"description":"blablabla","createdAt":"2018-03-29T00:00:00.000Z","author":"iron-man","photoLink":"img/photo.png","hashTags":["#hashtag","#cool","#lovely","#savetheworld"],"likes":["someName","spider-man"]},{"id":17,"description":"blablabla","createdAt":"2018-03-28T00:00:00.000Z","author":"wonder-woman","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":16,"description":"blablabla","createdAt":"2018-03-27T00:00:00.000Z","author":"spider-man","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":15,"description":"blablabla","createdAt":"2018-03-25T00:00:00.000Z","author":"thor","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":14,"description":"blablabla","createdAt":"2018-03-24T00:00:00.000Z","author":"thor","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":13,"description":"blablabla","createdAt":"2018-03-23T00:00:00.000Z","author":"batman","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":12,"description":"blablabla","createdAt":"2018-03-20T00:00:00.000Z","author":"superman","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":11,"description":"blablabla","createdAt":"2018-03-19T00:00:00.000Z","author":"batman","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":10,"description":"blablabla","createdAt":"2018-03-17T00:00:00.000Z","author":"ksenia.karabanova","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":9,"description":"blablabla","createdAt":"2018-03-15T00:00:00.000Z","author":"ksenia.karabanova","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":8,"description":"blablabla","createdAt":"2018-03-14T00:00:00.000Z","author":"ksenia.karabanova","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":7,"description":"blablabla","createdAt":"2018-03-13T00:00:00.000Z","author":"ksenia.karabanova","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":6,"description":"blablabla","createdAt":"2018-03-10T00:00:00.000Z","author":"ksenia.karabanova","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":5,"description":"blablabla","createdAt":"2018-03-08T00:00:00.000Z","author":"ksenia.karabanova","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":4,"description":"blablabla","createdAt":"2018-03-07T00:00:00.000Z","author":"ksenia.karabanova","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":3,"description":"blablabla","createdAt":"2018-03-05T00:00:00.000Z","author":"ksenia.karabanova","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":2,"description":"blablabla","createdAt":"2018-03-03T00:00:00.000Z","author":"ksenia.karabanova","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]},{"id":1,"description":"blablabla","createdAt":"2018-03-01T00:00:00.000Z","author":"ksenia.karabanova","photoLink":"img/photo.png","hashTags":["#hashtag","#spider","#savetheworld"],"likes":["someName","iron-man"]}]`;
    localStorage.setItem('posts', posts);
    localStorage.setItem('id', 21);
    localStorage.setItem('user', 'undefined');
}
let photoPosts = [];

let mod = (function () {

    function compareByDate(photoPostA, photoPostB) {
        return Date.parse(photoPostB.createdAt) - Date.parse(photoPostA.createdAt);
    }

    function validTypeOfArray(array) {
        if (Array.isArray(array)) {
            return array.every(function (item) {
                return typeof (item) === 'string';
            });
        }
        return false;
    }

    let getPhotoPosts = function (skip, top, filterConfig) {
        photoPosts = JSON.parse(localStorage.getItem('posts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        let posts = photoPosts;
        if (typeof (skip) !== 'number' || typeof (top) !== 'number') {
            return [];
        }
        if (filterConfig) {
            if (filterConfig.author && (typeof (filterConfig.author) !== 'string' || filterConfig.author.length === 0) ||
                filterConfig.createdAt && !filterConfig.createdAt instanceof Date ||
                filterConfig.hashTags && !validTypeOfArray(filterConfig.hashTags)) {
                return [];
            }
            if (filterConfig.author) {
                posts = posts.filter(function (item) {
                    return item.author === filterConfig.author;
                });
            }

            if (filterConfig.createdAt) {
                posts = posts.filter(function (item) {
                    return Date.parse(item.createdAt) === Date.parse(filterConfig.createdAt);
                });
            }

            if (filterConfig.hashTags) {
                posts = posts.filter(function (postItem) {
                    if (typeof (postItem.hashTags) === 'undefined') {
                        return false;
                    }
                    return filterConfig.hashTags.every(function (item) {
                        return postItem.hashTags.includes(item);
                    })
                })
            }
        }
        posts = posts.slice(skip, skip + top);
        return posts;
    };

    let getPhotoPost = function (id) {
        return photoPosts.find(item => item.id == id);
    };

    let validatePhotoPost = function (photoPost, status) {
        if (!photoPost) {
            return false;
        }

        if ((status && !photoPost.description || photoPost.description &&
            typeof (photoPost.description) === 'string' &&
            photoPost.description.length <= 200) &&

            (status && !photoPost.photoLink || photoPost.photoLink &&
                typeof (photoPost.photoLink) === 'string' &&
                photoPost.photoLink.length !== 0) &&

            (typeof (photoPost.hashTags) === 'undefined' || validTypeOfArray(photoPost.hashTags)) &&

            (status || photoPost.id &&
                photoPosts.findIndex(item => item.id === photoPost.id) === -1 &&
                typeof (photoPost.id) === 'string' &&
                photoPost.createdAt &&
                photoPost.createdAt instanceof Date &&
                typeof (photoPost.author) === 'string' &&
                photoPost.author.length !== 0 &&
                (typeof (photoPost.likes) === 'undefined' || validTypeOfArray(photoPost.likes))
            )
        ) {
            return true;
        }
        return false;


    }

    let addPhotoPost = function (photoPost) {
        if (validatePhotoPost(photoPost)) {
            photoPosts = JSON.parse(localStorage.getItem('posts'), function (key, value) {
                if (key == 'createdAt') return new Date(value);
                return value;
            });
            photoPosts.push(photoPost);
            photoPosts.sort(compareByDate);
            localStorage.setItem('posts', JSON.stringify(photoPosts));
            return true;
        }
        return false;
    }

    let editPhotoPost = function (id, photoPost) {
        photoPosts = JSON.parse(window.localStorage.getItem('posts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        let post = getPhotoPost(id);
        if (typeof (post) === 'undefined' || !validatePhotoPost(photoPost, 'changes')) {
            return false;
        }
        if (photoPost.photoLink) {
            post.photoLink = photoPost.photoLink;
        }
        if (photoPost.description) {
            post.description = photoPost.description;
        }
        if (photoPost.hashTags) {
            post.hashTags = photoPost.hashTags;
        }
        photoPosts[photoPosts.findIndex(function (item) {
            return item.id === id
        }
        )] = post;
        localStorage.setItem('posts', JSON.stringify(photoPosts));
        return true;

    }

    let removePhotoPost = function (id) {
        photoPosts = JSON.parse(window.localStorage.getItem('posts'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        let index = photoPosts.findIndex(function (el) {
            return (el.id == id);
        });
        if (index === -1)
            return false;
        photoPosts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(photoPosts));
        return true;
    };

    return {
        getPhotoPost,
        getPhotoPosts,
        addPhotoPost,
        editPhotoPost,
        removePhotoPost,
        validatePhotoPost
    }
})();