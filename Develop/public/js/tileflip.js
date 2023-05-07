document.querySelector('.flip-tile').addEventListener('click', () => {
    const flipTileInner = document.querySelector('.flip-tile-inner');
    flipTileInner.style.transform = flipTileInner.style.transform === 'rotateY(180deg)' ? '' : 'rotateY(180deg)';
});