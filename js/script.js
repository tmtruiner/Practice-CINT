const dropArea = document.querySelector('.drop-area');
const fileList = document.getElementById('file-list');
const groups = [];

dropArea.classList.remove('active');

["dragover", "drop"].forEach((event) => {
    document.addEventListener(event, (evt) => {
        evt.preventDefault()
    })
})

dropArea.addEventListener('dragenter', () => {
    dropArea.classList.add('active')
})

dropArea.addEventListener('dragover', () => {
    dropArea.classList.add('active')
})

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('active')
})

dropArea.addEventListener('drop', (event) => {
    dropArea.classList.remove('active')
    const files = event.dataTransfer.files;
    handleFiles(files);
})

function handleFiles(files) {
    for (let file of files) {
        let name = file.name;
        let groupName = name.split('-')[0];

        if (!groups[groupName]) {
            groups[groupName] = [];
        }

        if (groups[groupName].includes(file)) {
            continue; 
        }

        groups[groupName].push(name);
        displayGroups(groups);
    }
}

function displayGroups(groups) {
    fileList.innerHTML = '';
    for (const group in groups) {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('group');
        groupDiv.style.display = 'inline-block';
        groupDiv.innerHTML = `<strong>${group}</strong>: ${groups[group].length} файлов<br>${groups[group].join(', ')}`; 
        fileList.appendChild(groupDiv);
    }
}

