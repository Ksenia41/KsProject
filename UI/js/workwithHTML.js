function setMainPage() {
    let header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = getHTML.header();
    document.body.appendChild(header);
    let mainPart = document.createElement('div');
    mainPart.className = 'main';
    mainPart.innerHTML = getHTML.main();
    document.body.appendChild(mainPart);
    let footer = document.createElement('footer');
    footer.innerHTML = getHTML.footer();
    document.body.appendChild(footer);
    dom.changeUser(localStorage.user);
}
function setAddEditPage() {
    const newPhotoButton = document.getElementsByClassName('new-photo')[0];
    document.getElementsByClassName('header')[0].removeChild(newPhotoButton);
    let addEditMain = document.createElement('div');
    addEditMain.className = 'add-edit-main';
    addEditMain.innerHTML = getHTML.addEdit();
    const mainPart = document.getElementsByClassName('main')[0];
    document.body.removeChild(mainPart);
    document.body.insertBefore(addEditMain, document.querySelector('footer'));
}
function reloadMain() {
    const newPhotoButton = document.createElement('button');
    newPhotoButton.className = 'new-photo';
    document.querySelector('header').insertBefore(newPhotoButton, document.querySelector('.title'));
    let mainPart = document.createElement('div');
    mainPart.className = 'main';
    mainPart.innerHTML = getHTML.main();
    document.body.removeChild(document.querySelector('.add-edit-main'));
    document.body.insertBefore(mainPart, document.querySelector('footer'));
    setMainListeners();
}
function setLogInPage(){
    let logInMain = document.createElement('div');
    logInMain.className = 'log-main';
    logInMain.innerHTML = getHTML.login();
    const logOutButton = document.getElementsByClassName('button-exit')[0];
    document.getElementsByClassName('userblock flex')[0].removeChild(logOutButton);
    document.body.removeChild(document.querySelector('.main'));
    document.body.removeChild(document.querySelector('footer'));
    document.body.appendChild(logInMain);
    setLoginListeners();
}