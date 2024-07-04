const dropArea = document.querySelector('.drop-area');
const fileInput = document.querySelector('.file-input');
const fileInputButton = document.querySelector('.file-input-button');
const fileList = document.querySelector('.file-list');
const clearListButton = document.querySelector('.clear-list-button');
const uploadButton = document.querySelector('.clear-list-button');
const groups = new Map();

function handleFiles(files) {
    for (let file of files) {
        let name = file.name;
        let groupName = name.split('-')[0];

        if (!groups.has(groupName)) {
            groups.set(groupName, []);
        }

        groups.get(groupName).push(name);
    }
    displayGroups(groups);
}

function displayGroups(groups) {
    fileList.innerHTML = '';
    for (let [group, files] of groups) {
        let groupDiv = document.createElement('div');
        groupDiv.classList.add('group');

        let groupHeader = document.createElement('strong');
        groupHeader.textContent = group + ': ' + files.length + ' файлов';
        groupDiv.appendChild(groupHeader);

        let fileListText = document.createElement('div');
        files.forEach(file => {
            let fileElement = document.createElement('div');
            fileElement.textContent = file;
            fileListText.appendChild(fileElement);
        });

        groupDiv.appendChild(fileListText);
        fileList.appendChild(groupDiv);
    }
}

function uploadFiles(files) {
    ///
}

["dragover", "drop"].forEach((event) => {
    document.addEventListener(event, (evt) => {
        evt.preventDefault();
    });
});

dropArea.addEventListener('dragenter', () => {
    dropArea.classList.add('active');
    fileInputButton.classList.add('active');
});

dropArea.addEventListener('dragover', () => {
    dropArea.classList.add('active');
    fileInputButton.classList.add('active');
});

dropArea.addEventListener('dragleave', (event) => {
    if (!dropArea.contains(event.relatedTarget)) {
        dropArea.classList.remove('active');
        fileInputButton.classList.remove('active');
    }
});

dropArea.addEventListener('drop', (event) => {
    dropArea.classList.remove('active');
    fileInputButton.classList.remove('active');
    const files = event.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files);
});

clearListButton.addEventListener('click', () => {
    groups.clear();
    fileList.innerHTML = '';
});

uploadButton.addEventListener('click', () => {
    const files = fileInput.files;
    uploadFiles(files);
});


