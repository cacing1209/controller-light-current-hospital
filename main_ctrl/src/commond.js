function checkWindowSize() {
    var minWidth = 1024, minHeight = 768;

    let warning = document.getElementById('warning');
    let content = document.querySelector('.content');

    if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
        warning.style.display = 'block';
        content.style.display = 'none';
    } else {
        warning.style.display = 'none';
        content.style.display = 'flex';
        content.style.flexDirection = (window.innerWidth < 1024) ? 'column' : 'row';
    }
}

// Jalankan saat halaman dimuat dan saat ukuran layar berubah
window.addEventListener('resize', checkWindowSize);
window.addEventListener('load', checkWindowSize);
