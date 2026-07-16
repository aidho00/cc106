(function () {
  if (window.__cc106ImageLightboxInstalled) return;
  window.__cc106ImageLightboxInstalled = true;

  var emptyPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  var overlay = document.createElement('div');
  overlay.className = 'image-lightbox';
  overlay.setAttribute('data-image-lightbox', '');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Fullscreen image preview');
  overlay.innerHTML =
    '<button class="image-lightbox__close" type="button" aria-label="Close fullscreen image">&times;</button>' +
    '<figure class="image-lightbox__figure">' +
      '<img class="image-lightbox__image" src="' + emptyPixel + '" alt="" />' +
      '<figcaption class="image-lightbox__caption"></figcaption>' +
    '</figure>';
  document.body.appendChild(overlay);

  var preview = overlay.querySelector('.image-lightbox__image');
  var caption = overlay.querySelector('.image-lightbox__caption');
  var closeButton = overlay.querySelector('.image-lightbox__close');
  var activeSource = null;

  function prepareImage(img) {
    if (!img || img.dataset.lightboxReady === 'true') return;
    img.dataset.lightboxReady = 'true';
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Open image fullscreen: ' + (img.alt || 'visual reference'));
    img.setAttribute('draggable', 'false');
  }

  function openImage(img) {
    activeSource = img;
    preview.src = img.currentSrc || img.src;
    preview.alt = img.alt || 'Fullscreen visual reference';
    caption.textContent = img.alt || 'Visual reference';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('image-lightbox-open');
    closeButton.focus({ preventScroll: true });
  }

  function closeImage() {
    if (!overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('image-lightbox-open');
    preview.src = emptyPixel;
    if (activeSource && document.contains(activeSource)) activeSource.focus({ preventScroll: true });
    activeSource = null;
  }

  document.querySelectorAll('.slide img').forEach(prepareImage);

  document.addEventListener('click', function (event) {
    var img = event.target.closest && event.target.closest('.slide img[data-lightbox-ready="true"]');
    if (!img) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openImage(img);
  }, true);

  document.addEventListener('keydown', function (event) {
    if (overlay.classList.contains('is-open')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.key === 'Escape') closeImage();
      return;
    }

    var target = event.target;
    if (target && target.matches && target.matches('.slide img[data-lightbox-ready="true"]') &&
        (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      openImage(target);
    }
  }, true);

  closeButton.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    closeImage();
  });

  overlay.addEventListener('click', function (event) {
    if (event.target === overlay || event.target === preview) closeImage();
  });

  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (!node || node.nodeType !== 1) return;
        if (node.matches && node.matches('.slide img')) prepareImage(node);
        if (node.querySelectorAll) node.querySelectorAll('.slide img').forEach(prepareImage);
      });
    });
  }).observe(document.body, { childList: true, subtree: true });
})();
