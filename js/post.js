var photoPosts = [
    {
        id: '1',
        description: 'blablabla',
        createdAt: new Date('2018-03-04'),
        author: "user1",
        photoLink: 'http://postogram.com/photo1',
        hashTags: ['#hashtag', '#cool', '#lovely', '#savetheworld'],
        likes: ['someName', 'spider-man']
    }, {
        id: '2',
        description: 'blablabla',
        createdAt: new Date('2018-03-04'),
        author: "spider-man",
        photoLink: 'http://postogram.com/photo1',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: '3',
        description: 'blablabla',
        createdAt: new Date('2018-03-04'),
        author: "iron-man",
        photoLink: 'http://postogram.com/photo1',
        hashTags: ['#hashtag', '#cool', '#lovely', '#savetheworld'],
        likes: ['someName', 'spider-man']
    }, {
        id: '4',
        description: 'blablabla',
        createdAt: new Date('2018-03-05'),
        author: "wonder-woman",
        photoLink: 'http://postogram.com/photo1',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: '5',
        description: 'blablabla',
        createdAt: new Date('2018-03-05'), author: "spider-man",
        photoLink: 'http://postogram.com/photo1',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: '6',
        description: 'blablabla',
        createdAt: new Date('2018-03-06'),
        author: "thor",
        photoLink: 'http://postogram.com/photo1',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: '7',
        description: 'blablabla',
        createdAt: new Date('2018-03-06'),
        author: "thor",
        photoLink: 'http://postogram.com/photo1',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: '8',
        description: 'blablabla',
        createdAt: new Date('2018-03-07'),
        author: "batman",
        photoLink: 'http://postogram.com/photo1',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: '9',
        description: 'blablabla',
        createdAt: new Date('2018-03-07'),
        author: "superman",
        photoLink: 'http://postogram.com/photo1',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }, {
        id: '10',
        description: 'blablabla',
        createdAt: new Date('2018-03-07'),
        author: "batman",
        photoLink: 'http://postogram.com/photo1',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    }

];


var count = 11;
while (count != 21) {
    photoPosts.push({
        id: count,
        description: 'blablabla',
        createdAt: new Date('2018-03-01'),
        author: "someName",
        photoLink: 'http://postogram.com/photo1',
        hashTags: ['#hashtag', "#spider", '#savetheworld'],
        likes: ['someName', 'iron-man']
    });
    count++;
}

let mod = (function () {
    photoPosts[0].hashTags.includes
    var getPhotoPosts = function (skip, top, filterConfig) {
        var result = false;
        if (arguments.length < 3) {
            if (typeof(skip) !== 'number' || typeof(top) !== 'number') {
                console.log('Wrong arguments');
                return [];
            }
            result = photoPosts.slice(skip, skip + top);
        } else if (filterConfig !== undefined && filterConfig === 'object') {
            if (filterConfig.author) {
                result = photoPosts.filter(function (el) {
                    return el.author === filterConfig.author;
                })
            }
            if (filterConfig.createdAt) {
                result = photoPosts.filter(function (el) {
                    return el.createdAt.year === filterConfig.createdAt.year &&
                        el.createdAt.month === filterConfig.createdAt.month &&
                        el.createdAt.day === filterConfig.createdAt.day;
                })
            }
            if (filterConfig.hashTags) {
                result = photoPosts.filter(function (value) {
                    return filterConfig.hashTags.every(function (element) {
                        return value.hashTags.includes(elemet);
                    })
                })
            }
        }
        result.sort(function (a, b) {
            return Date.parse(a.createdAt) - Date.parse(b.createdAt);
        })
        return result;
    }

    var getPhotoPost = function (id) {
        return photoPosts.find((element) => {
            return element.id == id;});
    }

    var validatePhotoPost = function (photoPost) {
        if (typeof photoPost !== 'object')
            return false;
        if (typeof photoPost.id !== 'string' && typeof photoPost.id !== 'number' ||
            photoPost.id == "") {
            console.log("wrong id")
            return false;
        }
        if (!photoPost.createdAt instanceof Date) {
            console.log("wrong date")
            return false;
        }
        if (typeof photoPost.author !== 'string') {
            console.log("wrong author")
            return false;
        }
        if (typeof photoPost.description !== 'string') {
            console.log("wrong descriptioni")
            return false;
        }
        if (typeof photoPost.hashTags === undefined) {
            console.log("wrong hashTags")
            return false;
        }
        if (typeof photoPost.likes === null)
            return false;
        if (typeof photoPost.photoLink !== 'string')
            return false;
        return true;


    }

    var addPhotoPost = function (photoPost) {
        if (validatePhotoPost(photoPost)) {
            photoPosts.push(photoPost);
            return true;
        }
        return false;
    }

    var editPhotoPost = function (id, photoPost) {
        var post = getPhotoPost(id);
        if (typeof id !== 'string' && typeof id !== 'number') {
            return false;
        }
        if(photoPost.photoLink){
            post.photoLink = photoPost.photoLink;
        }
        if(photoPost.description){
            post.description = photoPost.description;
        }
        if(photoPost.hashTags){
            post.hashTags = photoPost.hashTags;
        }
        photoPosts[photoPosts.findIndex(item => item.id === id)] = post;
        return true;

    }

    var removePhotoPost = function (id) {
        let index = photoPosts.findIndex(function (el) {
            if (el.id !== id) {
                return false;
            }
            return true;
        });
        if (index === -1)
            return false;
        photoPosts.splice(index, 1);
        return true;
    }
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
    photoLink: 'http://postogram.com/photo1',
    hashTags: ['#hashtag', "#ironman", '#loveMary-Jane'],
    likes: ['someName', 'wonder-woman']
}));
console.log(mod.getPhotoPost(21));
console.log("test editPhotoPost, id = 3");
console.log(mod.getPhotoPost(3));
console.log(mod.editPhotoPost(3 ,{
    description: "So Lucky",
    hashTags: ['#ironManLoosr']
}));
console.log(mod.getPhotoPost(3));
console.log("test removaPhotoPost, id = 20");
console.log(mod.removePhotoPost(20));
console.log(mod.getPhotoPost(20));
console.log("everything is working!");