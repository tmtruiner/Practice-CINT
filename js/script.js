const dropArea = document.querySelector('.drop-area');
const fileInput = document.querySelector('.file-input');
const fileInputButton = document.querySelector('.file-input-button');
const fileList = document.querySelector('.file-list');
const clearListButton = document.querySelector('.clear-list-button');
const uploadButton = document.querySelector('.upload-button');

const MAX_FILE_SIZE = 20 * 1024 * 1024; // Максимальный размер файла 20 Мбайт
const fileGroups = new Map();

function handleFiles(files) { // Функция для обработки выбранных файлов
    for (let file of files) {
        if (file.size > MAX_FILE_SIZE) {
            continue; // Пропускаем файлы если их размер превышает MAX_FILE_SIZE
        }

        let name = file.name;
        let groupName = name.split('-')[0]; // Разделение имени файла по символу "-" и извлечение первой части имени файла. К примеру файл с именем "шапка-blue.png" будет 
                                            // присвоен группе с именем "шапка" 
        if (!fileGroups.has(groupName)) {
            fileGroups.set(groupName, []); // Создание новой коллекции если её пока не существует
        } 

        fileGroups.get(groupName).push(name);
    }
    displayGroups(fileGroups);
}

function displayGroups(fileGroups) { // Функция для отображения групп файлов
    fileList.innerHTML = ''; // Очистка списка файлов перед отображением
    for (let [group, files] of fileGroups) {
        let groupDiv = document.createElement('div');
        groupDiv.classList.add('group'); // Создание блока для каждой группы файлов

        let groupHeader = document.createElement('strong');
        groupHeader.textContent = group + ': ' + files.length + ' файлов';
        groupDiv.appendChild(groupHeader);

        let fileListText = document.createElement('div');
        fileListText.classList.add('file-list-text')
        files.forEach((file, index) => {
            let removeButton = document.createElement('button');
            let fileListElement = document.createElement('div');
            fileListElement.classList.add('file-list-element') 

            removeButton.textContent = '✖'; // Кнопка удаления файла
            removeButton.classList.add('remove-button');
            removeButton.onclick = () => {
                files.splice(index, 1); // Удаление файла из группы при нажатии на кнопку удаления removeButton
                if (files.length === 0) {
                    fileGroups.delete(group); // Удаление группы, если в ней больше нет файлов
                }
                displayGroups(fileGroups);
            };

            let fileName = document.createElement('span');
            fileName.textContent = file;

            fileListElement.appendChild(removeButton);
            fileListElement.appendChild(fileName);
            fileListText.appendChild(fileListElement);
        });

        groupDiv.appendChild(fileListText);
        fileList.appendChild(groupDiv);
    }
}

function uploadFiles(files) { //Функция для загрузки файлов на сервер
    ///
}

["dragover", "drop"].forEach((event) => {
    document.addEventListener(event, (evt) => {
        evt.preventDefault(); // Предотвращение стандартного поведения браузера для событий dragover и drop
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
    if (!dropArea.contains(event.relatedTarget)) { // Проверяет, что курсор действительно покинул область dropArea и не находится над её дочерними элементами
        dropArea.classList.remove('active');
        fileInputButton.classList.remove('active');
    }
});

dropArea.addEventListener('drop', (event) => {
    dropArea.classList.remove('active');
    fileInputButton.classList.remove('active');
    const files = event.dataTransfer.files;
    handleFiles(files); // Обработка выбранных файлов после перетаскивания в область dropArea
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files); // Обработка выбранных файлов при выборе через кнопку fileInputButton
});

clearListButton.addEventListener('click', () => { // Очистка групп файлов
    fileGroups.clear();
    fileList.innerHTML = '';
});

uploadButton.addEventListener('click', () => {
    const files = fileInput.files;
    uploadFiles(files);
});