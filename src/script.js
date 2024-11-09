let currentPage = 1;
  const gallery = document.getElementById('gallery');
  let loadedImages = [];

  
  async function loadImages() {
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=4`);
      const images = await response.json();
      loadedImages.push(...images);
      renderImages();
      currentPage++;
    } catch (error) {
      console.error('Помилка завантаження зображень:', error);
    }
  }

  
  function renderImages() {
    gallery.innerHTML = '';
    loadedImages.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = `${image.download_url}`;
      imgElement.alt = `Image by ${image.author}`;
      gallery.appendChild(imgElement);
    });
  }

  
  function loadMoreImages() {
    loadImages();
  }


  function clearGallery() {
    loadedImages = [];
    renderImages();
  }

 
  function removeLastImage() {
    if (loadedImages.length > 0) {
      loadedImages.pop();
      renderImages();
    }
  }


  function reverseGallery() {
    loadedImages.reverse();
    renderImages();
  }


  window.onload = loadImages;