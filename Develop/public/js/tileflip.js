 function attachFlipEventListeners() {
    document.querySelectorAll('.flip-tile').forEach(flipTile => {
      flipTile.addEventListener('click', () => {
        const flipTileInner = flipTile.querySelector('.flip-tile-inner');
        flipTileInner.style.transform = flipTileInner.style.transform === 'rotateY(180deg)' ? '' : 'rotateY(180deg)';
      });
    });
  }

 
  
    // Attach event listeners
    attachFlipEventListeners();