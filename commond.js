 function checkWindowSize() {
            var lebar = 1024,
                Tinggi = 768;
            var L_iphone11 = 1170,
                T_iphone11 = 828;
            let darkmode = true;

            if (window.innerWidth < lebar || window.innerHeight < Tinggi) {
                document.getElementById('warning').style.display = 'block';
                document.querySelector('.content').style.display = 'none';
            }
            else {
                document.getElementById('warning').style.display = 'none';
                document.querySelector('.content').style.display = 'flex';
            }

        }
        checkWindowSize();
        window.addEventListener('resize', checkWindowSize);