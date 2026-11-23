// donatomartinelli.github.io // terminale interattivo
// Un prompt vero: help, ls, cd, open, cat, pdf, grep, whoami, history, clear... con Tab e frecce.
(function () {
  'use strict';
  var form = document.getElementById('cmdline');
  var input = document.getElementById('cmd-input');
  var out = document.getElementById('cmd-out');
  var idxEl = document.getElementById('site-index');
  if (!form || !input || !out || !idxEl) return;

  var site = JSON.parse(idxEl.textContent);
  var DIRS = { projects: 'projects', articles: 'articles' };
  var SECTION_URL = { projects: '/projects/', articles: '/articles/' };
  var HUB = '/math-hub/';
  var HUB_SECTIONS = ['dispense', 'enunciati', 'grafo', 'lab', 'problemi', 'calcolo', 'stats', 'docs'];
  var courses = null; // slug dei PDF, letti da math-hub/library/manifest.json

  // --- stato: cartella corrente dedotta dalla pagina, cronologia per sessione ---------
  var path = location.pathname;
  var cwd = '~';
  Object.keys(SECTION_URL).forEach(function (d) { if (path.indexOf(SECTION_URL[d]) === 0) cwd = '~/' + d; });
  var history = load('termHistory', []);
  var hpos = history.length;

  function load(k, d) { try { var v = sessionStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage non disponibile */ } }

  // --- output ------------------------------------------------------------------------
  function line(text, cls) {
    var d = document.createElement('div');
    d.className = 'out-line' + (cls ? ' ' + cls : '');
    if (text instanceof Node) d.appendChild(text); else d.textContent = text;
    out.appendChild(d);
    return d;
  }
  function link(text, href, extra) {
    var f = document.createDocumentFragment();
    var a = document.createElement('a'); a.href = href; a.textContent = text; f.appendChild(a);
    if (extra) { var s = document.createElement('span'); s.className = 'dim'; s.textContent = '  ' + extra; f.appendChild(s); }
    return f;
  }
  function echoCmd(cmd) { line(site.handle + ':' + cwd + '$ ' + cmd, 'out-cmd'); }
  function go(url, label) { line('-> ' + (label || url), 'dim'); setTimeout(function () { location.href = url; }, 250); }

  // --- file system virtuale -------------------------------------------------------------
  function entries(dir) {
    return site.pages.filter(function (p) { return p.section === dir; })
      .map(function (p) { return { name: p.name, url: p.url, desc: p.desc || p.title, app: p.app }; });
  }
  function resolveDir(arg) {
    // il file system ha un solo livello: ~ e le sue sottocartelle
    if (!arg || arg === '.') return cwd === '~' ? '' : cwd.slice(2);
    var a = arg.replace(/\/$/, '');
    if (a === '~' || a === '..' || a === '/' || a === '') return '';
    return a.replace(/^~\//, '');
  }
  function find(name) {
    // cerca un file per nome nella cartella corrente, poi ovunque
    var n = (name || '').replace(/^~\//, '').replace(/\/$/, '');
    var parts = n.split('/');
    if (parts.length === 2 && DIRS[parts[0]]) return entries(parts[0]).filter(function (e) { return e.name === parts[1]; })[0];
    var here = cwd === '~' ? [] : entries(cwd.slice(2));
    var all = here.concat(entries('projects'), entries('articles'));
    return all.filter(function (e) { return e.name === n; })[0];
  }

  function loadCourses() {
    if (courses) return Promise.resolve(courses);
    return fetch(HUB + 'library/manifest.json').then(function (r) { return r.json(); })
      .then(function (m) { courses = m.pdfs.map(function (p) { return { slug: p.slug, title: p.title, pages: p.pages }; }); return courses; })
      .catch(function () { courses = []; return courses; });
  }

  // --- comandi --------------------------------------------------------------------------
  var C = {};
  C.help = function () {
    var rows = [
      ['ls [dir]', 'list ~, projects, articles'],
      ['cd <dir>', 'go to a section (cd .. / cd ~)'],
      ['open <name>', 'open a project or article (also: cat)'],
      ['pdf [course]', 'list or open my lecture notes'],
      ['grep <words>', 'search theorems and definitions in math-hub'],
      ['hub [section]', 'math-hub: ' + HUB_SECTIONS.join(', ')],
      ['whoami | contacts | cv', 'about me'],
      ['history | clear | date | pwd', 'the usual'],
    ];
    rows.forEach(function (r) {
      var f = document.createDocumentFragment();
      var b = document.createElement('b'); b.textContent = r[0];
      var d = document.createElement('span'); d.className = 'dim'; d.textContent = r[1];
      f.appendChild(b); f.appendChild(d);
      line(f, 'help-row');
    });
    line('tab completes, ↑/↓ browse history, / focuses the prompt', 'dim');
  };
  C.ls = function (args) {
    var d = resolveDir(args[0]);
    if (d === '') {
      ['projects/', 'articles/', 'contacts', 'cv.pdf'].forEach(function (n) { line(n, n.slice(-1) === '/' ? 'dir' : ''); });
      return;
    }
    if (!DIRS[d]) { line('ls: cannot access \'' + args[0] + '\': no such directory', 'err'); return; }
    var e = entries(d);
    if (!e.length) line('(empty)', 'dim');
    e.forEach(function (x) { line(link(x.name, x.url, x.desc)); });
  };
  C.cd = function (args) {
    var a = args[0] || '~';
    var d = resolveDir(a);
    if (d === '') { cwd = '~'; if (location.pathname !== '/') go('/', '~'); return; }
    if (DIRS[d]) {
      cwd = '~/' + d;
      go(SECTION_URL[d], cwd); return;
    }
    var f = find(a);
    if (f) { line('cd: ' + a + ': not a directory (opening it)', 'dim'); go(f.url, f.name); return; }
    line('cd: ' + a + ': no such file or directory', 'err');
  };
  C.open = C.cat = function (args, name) {
    if (!args[0]) { line(name + ': missing operand. try: ls', 'err'); return; }
    var a = args[0];
    if (a === 'cv.pdf' || a === 'cv') return C.cv();
    if (a === 'contacts') return C.contacts();
    var f = find(a);
    if (!f) { line(name + ': ' + a + ': no such file. try: ls ~/projects', 'err'); return; }
    go(f.url, f.name);
  };
  C.pwd = function () { line(cwd.replace('~', '/home/donato')); };
  C.whoami = function () { line(site.author + '. ' + site.bio); };
  C.contacts = function () { (site.social || []).forEach(function (s) { line(link(s.name, s.url)); }); };
  C.cv = function () { go('/cv.pdf', 'cv.pdf'); };
  C.github = function () { go('https://github.com/donatomartinelli', 'github'); };
  C.linkedin = function () { var s = (site.social || []).filter(function (x) { return x.name === 'linkedin'; })[0]; if (s) go(s.url, 'linkedin'); };
  C.date = function () { line(new Date().toString()); };
  C.echo = function (args) { line(args.join(' ')); };
  C.history = function () { history.forEach(function (h, i) { line(String(i + 1).padStart(4, ' ') + '  ' + h, 'pre'); }); };
  C.clear = function () { out.innerHTML = ''; };
  C.hub = function (args) {
    var s = args[0];
    if (!s) return go(HUB, 'math-hub');
    if (HUB_SECTIONS.indexOf(s) < 0) { line('hub: unknown section. try: ' + HUB_SECTIONS.join(' '), 'err'); return; }
    go(HUB + '#/' + s, 'math-hub/' + s);
  };
  C.cortex = function () { go('/cortex/', 'cortex'); };
  C.pdf = function (args) {
    return loadCourses().then(function (list) {
      if (!list.length) { line('pdf: notes not available right now', 'err'); return; }
      if (!args[0]) { list.forEach(function (c) { line(link(c.slug, HUB + '#/dispense/' + c.slug, c.title + (c.pages ? ' · ' + c.pages + ' pages' : ''))); }); return; }
      var c = list.filter(function (x) { return x.slug === args[0] || x.slug.indexOf(args[0]) === 0; })[0];
      if (!c) { line('pdf: ' + args[0] + ': no such course. try: pdf', 'err'); return; }
      go(HUB + '#/dispense/' + c.slug + (args[1] ? '/' + parseInt(args[1], 10) : ''), c.title);
    });
  };
  C.grep = function (args) {
    var q = args.filter(function (a) { return a[0] !== '-'; }).join(' ');
    if (!q) { line('usage: grep <words>   e.g. grep cauchy', 'err'); return; }
    go(HUB + '#/enunciati?q=' + encodeURIComponent(q), 'math-hub/enunciati "' + q + '"');
  };
  C.neofetch = function () {
    var art = [
      '   ___   ', '  |   |  ', '  | > |  ', '  |___|  '
    ];
    var info = [
      site.handle, '-------------', 'os: hugo on github pages', 'shell: term.js',
      'font: VT323 + JetBrains Mono',
      'projects: ' + entries('projects').length + ' · articles: ' + entries('articles').length
    ];
    for (var i = 0; i < Math.max(art.length, info.length); i++) line((art[i] || '         ') + '  ' + (info[i] || ''), 'pre');
  };
  C.sudo = function () { line('donato is not in the sudoers file. This incident will be reported.', 'err'); };
  C.rm = function () { line('rm: permission denied (nice try)', 'err'); };
  C.exit = function () { line('there is no exit. try: cd ~', 'dim'); };
  C.vim = C.nano = C.emacs = function () { line('this terminal is read-only. try: open math-hub', 'dim'); };

  var ALIASES = { '?': 'help', 'll': 'ls', 'dir': 'ls', 'man': 'help', 'less': 'cat', 'more': 'cat', 'cls': 'clear', 'search': 'grep', 'notes': 'pdf' };

  function run(raw) {
    var cmd = raw.trim();
    echoCmd(cmd);
    if (!cmd) return;
    if (history[history.length - 1] !== cmd) { history.push(cmd); history = history.slice(-100); save('termHistory', history); }
    hpos = history.length;
    var parts = cmd.split(/\s+/);
    var name = (ALIASES[parts[0].toLowerCase()] || parts[0].toLowerCase());
    if (name === 'ls' && parts[1] === '-la') parts.splice(1, 1);
    var fn = C[name];
    if (!fn) { line(parts[0] + ': command not found. try: help', 'err'); return; }
    var r = fn(parts.slice(1), name);
    if (r && r.then) r.then(scroll); else scroll();
  }
  function scroll() { input.scrollIntoView({ block: 'nearest' }); }

  // --- completamento con Tab ----------------------------------------------------------
  function candidates(prefixWords) {
    if (prefixWords.length <= 1) return Object.keys(C).concat(Object.keys(ALIASES));
    var c = prefixWords[0];
    if (c === 'hub') return HUB_SECTIONS;
    if (c === 'pdf') return (courses || []).map(function (x) { return x.slug; });
    if (c === 'cd' || c === 'ls') return ['~', '..', 'projects', 'articles'];
    var names = entries('projects').concat(entries('articles')).map(function (e) { return e.name; });
    return names.concat(['cv.pdf', 'contacts']);
  }
  function complete() {
    var words = input.value.split(/\s+/);
    var last = words[words.length - 1];
    if (words[0] === 'pdf' && !courses) loadCourses();
    var list = candidates(words).filter(function (x) { return x.indexOf(last) === 0; });
    list = list.filter(function (x, i) { return list.indexOf(x) === i; });
    if (list.length === 1) { words[words.length - 1] = list[0]; input.value = words.join(' ') + ' '; }
    else if (list.length > 1) {
      echoCmd(input.value); line(list.join('   '), 'dim');
      var common = list.reduce(function (a, b) { var i = 0; while (i < a.length && a[i] === b[i]) i++; return a.slice(0, i); });
      if (common.length > last.length) { words[words.length - 1] = common; input.value = words.join(' '); }
      scroll();
    }
  }

  // --- eventi -------------------------------------------------------------------------
  form.addEventListener('submit', function (e) { e.preventDefault(); var v = input.value; input.value = ''; run(v); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') { e.preventDefault(); complete(); }
    else if (e.key === 'ArrowUp') { if (hpos > 0) { hpos--; input.value = history[hpos]; e.preventDefault(); } }
    else if (e.key === 'ArrowDown') { if (hpos < history.length) { hpos++; input.value = history[hpos] || ''; e.preventDefault(); } }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); C.clear(); }
    else if (e.key === 'Escape') { input.blur(); }
  });
  document.addEventListener('keydown', function (e) {
    var t = e.target.tagName;
    if ((e.key === '/' || e.key === ':') && t !== 'INPUT' && t !== 'TEXTAREA') { e.preventDefault(); input.focus(); }
  });
  // un click sul terminale della home porta il focus sul prompt (senza rubarlo ai link)
  var term = document.querySelector('.terminal');
  if (term) term.addEventListener('click', function (e) { if (!e.target.closest('a') && !window.getSelection().toString()) input.focus(); });
  document.getElementById('cmd-prompt').textContent = site.handle + ':' + cwd + '$';
  // sulla home, su schermi grandi, il prompt e' subito attivo
  if (document.body.classList.contains('is-home') && window.matchMedia('(min-width: 701px)').matches) input.focus({ preventScroll: true });
})();
