// Navigasi & slider — DLH Kabupaten Kepahiang
document.addEventListener('DOMContentLoaded', function () {
  // menu mobile
  var tgl = document.getElementById('tglMobile');
  var menu = document.querySelector('nav.utama > div > ul');
  if (tgl) tgl.addEventListener('click', function () { menu.classList.toggle('buka'); });
  // dropdown di layar kecil
  document.querySelectorAll('nav.utama li').forEach(function (li) {
    var sub = li.querySelector('ul');
    if (!sub) return;
    li.querySelector('a').addEventListener('click', function (e) {
      if (window.innerWidth <= 820) { e.preventDefault(); li.classList.toggle('buka'); }
    });
  });

  // slider beranda
  var slides = document.querySelectorAll('.hero .slide');
  if (slides.length) {
    var i = 0, timer;
    var titik = document.querySelectorAll('.hero .titik button');
    function tampil(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('tampil', k === i); });
      titik.forEach(function (t, k) { t.classList.toggle('on', k === i); });
    }
    function otomatis() { clearInterval(timer); timer = setInterval(function () { tampil(i + 1); }, 6000); }
    document.querySelector('.hero .prev').addEventListener('click', function () { tampil(i - 1); otomatis(); });
    document.querySelector('.hero .next').addEventListener('click', function () { tampil(i + 1); otomatis(); });
    titik.forEach(function (t, k) { t.addEventListener('click', function () { tampil(k); otomatis(); }); });
    tampil(0); otomatis();
  }

  // tab berita (beranda & halaman berita)
  document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
    var btns = wrap.querySelectorAll('.tabs button');
    var target = document.querySelectorAll(wrap.dataset.tabs);
    function pilih(kat) {
      btns.forEach(function (b) { b.classList.toggle('on', b.dataset.kat === kat); });
      target.forEach(function (el) {
        el.style.display = (kat === 'semua' || el.dataset.kat === kat) ? '' : 'none';
      });
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { pilih(b.dataset.kat); }); });
    // buka tab sesuai #hash (mis. berita.html#pengumuman)
    var h = location.hash.replace('#', '');
    var ada = Array.prototype.some.call(btns, function (b) { return b.dataset.kat === h; });
    pilih(ada ? h : btns[0].dataset.kat);
    window.addEventListener('hashchange', function () {
      var h2 = location.hash.replace('#', '');
      if (Array.prototype.some.call(btns, function (b) { return b.dataset.kat === h2; })) pilih(h2);
    });
  });
});
