const pages = {
  home: { file: 'home.html', module: () => window.PageHome },
  cause: { file: 'cause.html', module: () => window.PageCause },
  last: { file: 'last.html', module: null } // static, no JS needed
};

const app = document.getElementById('app');
const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');
let activePage = null;

async function loadPage(name, pushState = true) {
  const page = pages[name];
  if (!page) return;

  // clean up previous page's intervals/listeners
  if (activePage && activePage.module) {
    const mod = activePage.module();
    if (mod && mod.destroy) mod.destroy();
  }

  const res = await fetch(page.file);
  const html = await res.text();
  app.innerHTML = html;

  if (page.module) {
    const mod = page.module();
    if (mod && mod.init) mod.init();
  }

  activePage = page;

  if (pushState) history.pushState({ page: name }, '', `#${name}`);
  window.scrollTo(0, 0);
}

// expose globally so buttons inside fragments can call it
window.goToPage = loadPage;

window.addEventListener('popstate', (e) => {
  const name = (e.state && e.state.page) || location.hash.replace('#', '') || 'home';
  loadPage(name, false);
});

muteBtn.addEventListener('click', () => {
  bgMusic.muted = !bgMusic.muted;
  muteBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
});

// initial load
loadPage(location.hash.replace('#', '') || 'home', false);