let createBtn = document.querySelector('.header__create-btn');
let containerForItems = document.querySelector('.main__body');
let arr = [];
update();
function createItem(xxx, tit = 'Title', desc = 'Description', idd) {
    let itemBlock = document.createElement('div');
    itemBlock.classList.add('itemBlock');
    itemBlock.style.height = 203 + 'px';
    itemBlock.style.width = 600 + 'px';
    //itemBlock.style.border = '3px solid blueviolet';
    itemBlock.style.background = 'blueviolet';
    itemBlock.style.margin = '10px auto';
    let titleField = document.createElement('input');
    titleField.classList.add('titleField');
    titleField.value = tit;
    let descriptionField = document.createElement('textarea');
    descriptionField.classList.add('descriptionField');
    descriptionField.value = desc;
    let delBtn = document.createElement('button');
    delBtn.innerHTML = 'Delete';
    delBtn.classList.add('delBtn');
    let saveBtn = document.createElement('button');
    saveBtn.innerHTML = 'Save';
    saveBtn.classList.add('saveBtn');
    let id = document.createElement('div');
    id.classList.add('id');
    if (idd != undefined) {
        id.innerHTML = idd;
    }
    else{
        id.innerHTML = createId();
    }
    appendItemToDocument(itemBlock, titleField, descriptionField, delBtn, saveBtn, id);
}
//createBtn.onclick = createItem;//
createBtn.addEventListener('click', createItem);

function update() {
    let localArrObjects = JSON.parse(localStorage.getItem('todoist'));
        if (localArrObjects != null) {
            for (let i = 0; i < localArrObjects.length; i++) {
            let desc = localArrObjects[i].descript;
            let tit = localArrObjects[i].title;
            let idd = localArrObjects[i].id;
        createItem('xxx', tit, desc, idd);
        }
    }
}

function appendItemToDocument(...args) {
    args[0].append(args[1]);
    args[0].append(args[2]);
    args[0].append(args[3]);
    args[0].append(args[4]);
    args[0].append(args[5]);
    containerForItems.prepend(args[0]);
}
function createId() {
    let localarrCollectionIds = JSON.parse(localStorage.getItem('id'));
    if (localarrCollectionIds == undefined) {
        let uniqueId = 1;
        localStorage.setItem('id', JSON.stringify(uniqueId));
        return uniqueId;
    }
    if (localarrCollectionIds) {
        let lastNum = localarrCollectionIds;
        lastNum++;
        localStorage.setItem('id', JSON.stringify(lastNum));
        return lastNum; 
    }
}

containerForItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('saveBtn')) {
        saveItemValues(event);
    }
});
containerForItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('delBtn')) {
        delFromLocalStor(event);
        delFromPage(event);
    }
});


function saveItemValues(event) {
    let obj = {};
    let id = event.target.parentNode.children[4].innerHTML;
    let titleValue = event.target.parentNode.children[0].value;
    let descriptionValue = event.target.parentNode.children[1].value;
    obj.id = id;
    obj.title = titleValue;
    obj.descript = descriptionValue;
    saveItemToLocalStor(obj);
}
function saveItemToLocalStor(obj) {
    let localArrObjects = JSON.parse(localStorage.getItem('todoist'));
    if (localArrObjects != null) {
        for (let i = 0; i < localArrObjects.length; i++) {
            if (obj.id == localArrObjects[i].id) {
                localArrObjects.splice(i, 1, obj);
                localStorage.setItem('todoist', JSON.stringify(localArrObjects));
                return;
            }
        }
        localArrObjects.push(obj);
        localStorage.setItem('todoist', JSON.stringify(localArrObjects));
        return;
    }
    if(localArrObjects == undefined) {
        arr.push(obj);
        localStorage.setItem('todoist', JSON.stringify(arr));
        return;
    }
}


function delFromLocalStor(event) {
    let id = event.target.parentNode.children[4].innerHTML;
    let localArrObjects = JSON.parse(localStorage.getItem('todoist'));
    if (localArrObjects != null) {
        for (let i = 0; i < localArrObjects.length; i++) {
            if (localArrObjects[i].id == id) {
                localArrObjects.splice(i, 1);
                localStorage.setItem('todoist', JSON.stringify(localArrObjects));
                return;
            }
        }
    } 
}
function delFromPage(event) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);    
}
