// State detail page script — reads `data/states.json` and renders details for the requested state
(function(){
  function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  const root = document.getElementById('state-detail');
  if (!root) return;

  const nameParam = getQueryParam('name') || getQueryParam('state');
  if (!nameParam) {
    root.innerHTML = '<p>No state specified. Return to <a href="index.html#destinations">Destinations</a>.</p>';
    return;
  }

  async function load() {
    root.innerHTML = '<p>Loading state information...</p>';
    try {
      // Read the local JSON file and find the matching state
      const res = await fetch('/data/states.json');
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      const s = (data || []).find(x => (x.name || '').toLowerCase() === (nameParam || '').toLowerCase());
      if (s) return renderState(s);
      root.innerHTML = `<p>Could not find state information for <strong>${nameParam}</strong>. Return to <a href='index.html#destinations'>Destinations</a>.</p>`;
    } catch (err) {
      // final fallback: nothing else to load, show an error
      root.innerHTML = `<p>Unable to load state information. Try again later or return to <a href='index.html#destinations'>Destinations</a>.</p>`;
    }
  }

  function renderState(s) {
    const images = s.images || [s.image || '/images/img1.png'];
    const popular = (s.popular || []).slice(0, 12);

    root.innerHTML = `
      <div class="state-detail-hero">
        <div class="state-image-wrap">
          <img src="${images[0]}" alt="${s.name}" />
        </div>
        <div class="state-header">
          <h1>${s.name}</h1>
          <p class="state-intro">${s.intro || ''}</p>
        </div>
      </div>
      <div class="state-detail-grid">
        <div class="state-main">
          <section class="state-block">
            <h3>About</h3>
            <p>${s.about || s.intro || ''}</p>
          </section>
          <section class="state-block">
            <h3>Culture</h3>
            <p>${s.culture || 'Information not available.'}</p>
          </section>
          <section class="state-block">
            <h3>Tourist Places</h3>
            <ul class="places-list">
              ${popular.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </section>
        </div>
        <aside class="state-aside">
          <div class="gallery">
            ${images.map(img => `<div class="gallery-item"><img src="${img}" alt="${s.name}" loading="lazy" /></div>`).join('')}
          </div>
          <div style="margin-top: 12px;">
            <a href="index.html#destinations" class="submit">Back to All States</a>
          </div>
        </aside>
      </div>
    `;
  }

  load();
})();
