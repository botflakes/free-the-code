(function() {
  try {
    // Inject a Back to PSA top nav
    const nav = document.createElement('div');
    nav.className = 'chat-top-nav';
    nav.innerHTML = `
      <div class="brand">Discrub Chat Export</div>
      <a class="back-link" href="../../index.html">← Back to PSA</a>
    `;
    document.documentElement.appendChild(nav);

    // Offset body for fixed nav
    document.body.classList.add('chat-offset');
  } catch (e) {
    // no-op
  }
})();


