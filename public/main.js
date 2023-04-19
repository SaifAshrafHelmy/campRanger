const mapContainer = document.getElementById('cluster-map');
const overlay = document.createElement('div');
mapContainer.appendChild(overlay);


overlay.style.position = 'absolute';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.opacity = 0;
overlay.style.pointerEvents = 'auto';



function handleClick() {
  mapContainer.style.pointerEvents = 'auto';
  overlay.remove();
}

overlay.addEventListener('click', handleClick);
