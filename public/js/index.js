const downloadButton = document.getElementById('download-button')
const resultImage = document.getElementById('result-image')

downloadButton.addEventListener('click', () => {
    saveAs(resultImage.getAttribute('src'), 'Elemented.png')
})