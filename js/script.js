const dropArea = document.querySelector('.drop-area');
dropArea.classList.remove('active');

["dragover", "drop"].forEach(function(event) {
    document.addEventListener(event, function(evt) {
    evt.preventDefault()
    })
})

dropArea.addEventListener('dragenter', function() {
    dropArea.classList.add('active')
})

dropArea.addEventListener('dragover', function() {
    dropArea.classList.add('active')
})

dropArea.addEventListener('dragleave', function() {
    dropArea.classList.remove('active')
})

dropArea.addEventListener('drop', function() {
    dropArea.classList.remove('active')
})
