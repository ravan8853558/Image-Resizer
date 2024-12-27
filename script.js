const uploadInput = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const resizeBtn = document.getElementById('resize-btn');
const downloadBtn = document.getElementById('download-btn');
const preview = document.getElementById('preview');

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        preview.innerHTML = ''; // Clear previous preview
        preview.appendChild(img);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please upload a valid image file.');
  }
});

resizeBtn.addEventListener('click', () => {
  const img = preview.querySelector('img');
  if (!img) {
    alert('Please upload an image first.');
    return;
  }

  const width = parseInt(widthInput.value, 10);
  const height = parseInt(heightInput.value, 10);

  if (!width || !height) {
    alert('Please enter valid dimensions.');
    return;
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  const resizedImageURL = canvas.toDataURL('image/png');

  // Update the download button
  downloadBtn.href = resizedImageURL;
  downloadBtn.style.display = 'inline-block';
  downloadBtn.textContent = 'Download Resized Image';
});
