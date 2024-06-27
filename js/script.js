const dropArea = document.querySelector('.drop-area');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');
const groups = new Map();

["dragover", "drop"].forEach((event) => {
    document.addEventListener(event, (evt) => {
        evt.preventDefault();
    });
});

dropArea.addEventListener('dragenter', () => {
    dropArea.classList.add('active');
});

dropArea.addEventListener('dragover', () => {
    dropArea.classList.add('active');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('active');
});

dropArea.addEventListener('drop', (event) => {
    dropArea.classList.remove('active');
    const files = event.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files);
});

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
      groupDiv.style.display = 'inline-block';
  
      const groupHeader = document.createElement('strong');
      groupHeader.textContent = group + ': ' + files.length + ' файлов';
      groupDiv.appendChild(groupHeader);
  
      groupDiv.appendChild(document.createElement('br'));

      const fileListText = document.createElement('div');
      fileListText.textContent = files.join(' ');
      groupDiv.appendChild(fileListText);
      
  
      fileList.appendChild(groupDiv);
    }
  }
