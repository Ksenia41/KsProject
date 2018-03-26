let photoPosts = [
    {
        id: 1,
        description: 'blablabla',
        createdAt: new Date('2018-03-04'),
        author: "ksenia.karabanova",
        photoLink: 'img\\photo.png',
        hashTags: ['#hashtag', '#cool', '#lovely', '#savetheworld'],
        likes: ['someName', 'spider-man']
    }, {
        id: 2,
        description: 'blablabla',
        createdAt: new Date('2018-03-04'),
        author: "spiderMan",
        photoLink: 'img\\photo.png',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: 3,
        description: 'blablabla',
        createdAt: new Date('2018-03-04'),
        author: "iron-man",
        photoLink: 'img\\photo.png',
        hashTags: ['#hashtag', '#cool', '#lovely', '#savetheworld'],
        likes: ['someName', 'spider-man']
    }, {
        id: 4,
        description: 'blablabla',
        createdAt: new Date('2018-03-05'),
        author: "wonder-woman",
        photoLink: 'img\\photo.png',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: 5,
        description: 'blablabla',
        createdAt: new Date('2018-03-05'), author: "spider-man",
        photoLink: 'img\\photo.png',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: 6,
        description: 'blablabla',
        createdAt: new Date('2018-03-06'),
        author: "thor",
        photoLink: 'img\\photo.png',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: 7,
        description: 'blablabla',
        createdAt: new Date('2018-03-06'),
        author: "thor",
        photoLink: 'img\\photo.png',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: 8,
        description: 'blablabla',
        createdAt: new Date('2018-03-07'),
        author: "batman",
        photoLink: 'img\\photo.png',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: 9,
        description: 'blablabla',
        createdAt: new Date('2018-03-07'),
        author: "superman",
        photoLink: 'img\\photo.png',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: 10,
        description: 'blablabla',
        createdAt: new Date('2018-03-07'),
        author: "batman",
        photoLink: 'img\\photo.png',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }

];

let count = 11;
while (count !== 21) {
    photoPosts.push({
        id: count,
        description: 'blablabla',
        createdAt: new Date('2018-03-01'),
        author: "ksenia.karabanova",
        photoLink: 'img\\photo.png',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    });
    count++;
}


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
        let posts = photoPosts;
        if (typeof (skip) !== 'number' || typeof (top) !== 'number') {
            return [];
        }
        if (filterConfig) {
            if (filterConfig.author && (typeof (filterConfig.author) !== 'string' || filterConfig.author.length === 0) ||
                filterConfig.createdAt && !filterConfig.createdAt instanceof Date ||
                filterConfig.hashtags && !validTypeOfArray(filterConfig.hashtags)) {
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

            if (filterConfig.hashtags) {
                posts = posts.filter(function (postItem) {
                    if (typeof (postItem.hashtags) === 'undefined') {
                        return false;
                    }
                    return filterConfig.hashtags.every(function (item) {
                        return postItem.hashtags.includes(item);
                    })
                })
            }
        }
        posts = posts.slice(skip, skip + top);
        return posts;
    };

    let getPhotoPost = function (id) {
        return photoPosts.find(item => item.id === id);
    };

    let validatePhotoPost = function (photoPost, status) {
        if (!photoPost) {
            return false;
        }

        if ((status && !photoPost.description || photoPost.description &&
                typeof (photoPost.description) === 'string' &&
                photoPost.description.length <= 200) &&
            (status && !photoPost.photoLink ||
                photoPost.photoLink && typeof (photoPost.photoLink) === 'string' && photoPost.photoLink.length !== 0) &&
            (typeof (photoPost.hashtags) === 'undefined' || validTypeOfArray(photoPost.hashtags)) &&
            (status ||
                photoPost.id && photoPosts.findIndex(item => item.id === photoPost.id) === -1 &&
                typeof (photoPost.id) === 'string' &&
                photoPost.createdAt && photoPost.createdAt instanceof Date &&
                typeof (photoPost.author) === 'string' && photoPost.author.length !== 0 &&
                (typeof (photoPost.likes) === 'undefined' || validTypeOfArray(photoPost.likes))
            )
        ) {
            return true;
        }
        return false;


    }

    let addPhotoPost = function (photoPost) {
        if (validatePhotoPost(photoPost)) {
            photoPosts.push(photoPost);
            return true;
        }
        return false;
    }

    let editPhotoPost = function (id, photoPost) {
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
        )]
            = post;
        return true;

    }

    let removePhotoPost = function (id) {
        let index = photoPosts.findIndex(function (el) {
            return (el.id !== id);
        });
        if (index === -1)
            return false;
        photoPosts.splice(index, 1);
        return true;
    };
    console.log("10 Posts:");
    console.log(getPhotoPosts(0, 10));

    return {
        getPhotoPost,
        getPhotoPosts,
        addPhotoPost,
        editPhotoPost,
        removePhotoPost,
        validatePhotoPost
    }
})();

console.log('photoPosts: ');
console.log(photoPosts);
console.log("first 10 photoPosts");
console.log(mod.getPhotoPosts(0, 10));
console.log("test getPhotoPost , 3 and 5");
console.log(mod.getPhotoPost(3));
console.log(mod.getPhotoPost(5));
console.log("test addPhotoPost");
console.log(mod.addPhotoPost({
    id: '21',
    description: 'blabla',
    createdAt: new Date('2018-01-01'),
    author: "spider-man",
    photoLink: 'img\\photo.png',
    hashTags: ['#hashtag', "#ironman", '#loveMary-Jane'],
    likes: ['someName', 'wonder-woman']
}));
console.log(mod.getPhotoPost(21));
console.log("test editPhotoPost, id = 3");
console.log(mod.getPhotoPost(3));
console.log(mod.editPhotoPost(3, {
    description: "So Lucky",
    hashTags: ['#ironManLoosr']
}));
console.log(mod.getPhotoPost(3));
console.log("test removePhotoPost, id = 20");
console.log(mod.removePhotoPost(20));
console.log(mod.getPhotoPost(20));
console.log("everything is working!");