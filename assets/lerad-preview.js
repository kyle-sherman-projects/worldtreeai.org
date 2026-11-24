'use strict';
/* Interactive Lerad product preview, shared by the homepage hero (compact)
   and the Lerad page (wide, desktop layout). Synthetic fixture cast only,
   mirroring lerad/samples — no real student data ever appears in marketing.
   Every count and chip is DERIVED from the submission rows below, the same way
   the real product must compute them, so the preview can't show a number it
   can't back up. Mount by adding [data-lerad-preview] with data-variant. */
(function () {
  /* Updated 2026-11-24 to match the real dashboard (lerad/web.py) on the current
     samples/ fixtures: MESA's 0-4 scale with LG titles, an A-D Culminating Task,
     and lerad/dashboard.py's counting rules, so the numbers here are the ones
     `lerad serve` shows for the same data (8 / 2 / 2 / 1). Only the connectors
     that exist are shown as connected; Google Classroom and PLTW / KITE are
     marked "coming soon", matching what the site now says. */
  var TODAY = '2026-06-30'; // Tue Jun 30 2026, the fixtures' clock
  var WINDOW_START = '2026-06-16'; // Overdue looks back 14 days
  var SRC = { ps: 'PowerSchool', ap: 'AP Classroom' };
  var STATUS = {
    missing: 'missing', none: 'no submission', not_started: 'not started', in_progress: 'in progress',
    turned_in: 'turned in · to grade', graded: 'graded', excused: 'excused'
  };
  var ORDER = { missing: 0, none: 1, not_started: 2, in_progress: 3, turned_in: 4, graded: 5, excused: 6 };
  var LANES = ['Overdue', 'Today', 'Tomorrow', 'This week', 'Later', 'No date', 'Earlier'];

  var CONNECTORS = [
    { name: 'AP Classroom',     kind: 'CSV import', status: 'ok',   detail: '1h ago' },
    { name: 'PowerSchool',      kind: 'CSV import', status: 'ok',   detail: '20h ago' },
    { name: 'Google Classroom', kind: 'live API',   status: 'soon', detail: 'coming soon' },
    { name: 'PLTW / KITE',      kind: 'CSV import', status: 'soon', detail: 'coming soon' }
  ];
  var LIVE = CONNECTORS.filter(function (c) { return c.status !== 'soon'; });
  var HEALTHY = LIVE.filter(function (c) { return c.status === 'ok'; }).length;

  // subs: [name, status, score, late]. A name starting with '?' is a platform record
  // not yet matched to a student (no email in the export): shown, never counted as Overdue.
  var A = [
    { src: 'ps', course: 'Intro to Programming · P1', title: 'LG2: Ch. 5 Homework: Loops & Conditionals', due: '2026-06-30', pts: 4,
      subs: [['Aaliyah Torres','graded','3'],['Marcus Webb','graded','4'],['Jonah Kim','graded','3',1],['Sofia Delgado','missing'],['Tyrell Jackson','graded','3'],['Dmitri Volkov','graded','4'],['Janelle Osei','not_started']] },
    { src: 'ap', course: 'AP CSP · P3', title: 'Free Response Set B', due: '2026-06-30', pts: 25,
      subs: [['Aaliyah Torres','graded','21'],['Marcus Webb','turned_in'],['Priya Raman','in_progress'],['Mei Lin Chen','graded','24'],['Fatima Al-Rashid','not_started'],['?Carlos Mendoza','in_progress'],['Janelle Osei','graded','19'],['Jonah Kim','not_started']] },
    { src: 'ps', course: 'AP CS A · P5', title: 'LG2/LG3: Unit 3 Quiz — Functions', due: '2026-06-26', pts: 4,
      subs: [['Priya Raman','graded','4'],['Mei Lin Chen','graded','4'],['Fatima Al-Rashid','graded','3'],['Aaliyah Torres','graded','3'],['Tyrell Jackson','missing']] },
    { src: 'ap', course: 'AP CSP · P3', title: 'Unit 6 Progress Check: MCQ Part A', due: '2026-06-24', pts: 45,
      subs: [['Aaliyah Torres','graded','38'],['Marcus Webb','graded','41'],['Priya Raman','graded','35'],['Mei Lin Chen','graded','44'],['Fatima Al-Rashid','graded','33'],['?Carlos Mendoza','graded','29'],['Janelle Osei','in_progress'],['Jonah Kim','graded','36']] },
    { src: 'ps', course: 'AP CS A · P5', title: 'Recursion Practice Set', due: '2026-07-02', pts: 4,
      subs: [['Priya Raman','not_started'],['Mei Lin Chen','graded','4'],['Fatima Al-Rashid','not_started'],['Aaliyah Torres','graded','3'],['Tyrell Jackson','not_started'],['An Nguyen','none']] },
    { src: 'ap', course: 'AP CSP · P3', title: 'Practice MCQ Bank', due: null, pts: 60,
      subs: [['Aaliyah Torres','in_progress'],['Marcus Webb','not_started'],['Priya Raman','in_progress'],['Mei Lin Chen','graded','52'],['Fatima Al-Rashid','not_started'],['?Carlos Mendoza','not_started'],['Janelle Osei','in_progress'],['Jonah Kim','not_started']] },
    { src: 'ps', course: 'Intro to Programming · P1', title: 'LG1: Ch. 4 Vocabulary Check', due: '2026-06-23', pts: 4,
      subs: [['Aaliyah Torres','graded','4'],['Marcus Webb','graded','3'],['Jonah Kim','graded','3'],['Sofia Delgado','graded','2',1],['Tyrell Jackson','graded','4'],['Dmitri Volkov','excused','EX'],['Janelle Osei','graded','3']] },
    { src: 'ps', course: 'Intro to Programming · P1', title: 'Culminating Task: Text Adventure Game', due: '2026-06-29', pts: null,
      subs: [['Aaliyah Torres','graded','A'],['Marcus Webb','graded','B'],['Jonah Kim','graded','C',1],['Sofia Delgado','graded','D'],['Tyrell Jackson','graded','B'],['Dmitri Volkov','graded','A'],['Janelle Osei','graded','B']] }
  ];

  // ── derivations: lerad/dashboard.py's rules ──
  function matched(s) { return s[0].charAt(0) !== '?'; }
  function name(s) { return matched(s) ? s[0] : s[0].slice(1); }
  function isOut(s) { return s[1] === 'missing' || s[1] === 'none' || s[1] === 'not_started' || s[1] === 'in_progress'; }
  function view(a) {
    var v = { a: a, turned: 0, ungraded: 0, started: 0, out: 0 };
    a.subs.forEach(function (s) {
      if (s[1] === 'turned_in' || s[1] === 'graded') v.turned++;
      if (s[1] === 'turned_in') v.ungraded++;
      if (s[1] === 'in_progress' || s[1] === 'turned_in' || s[1] === 'graded') v.started++;
      if (matched(s) && isOut(s)) v.out++;
    });
    v.pastDue = !!a.due && a.due < TODAY;
    v.overdue = v.pastDue && a.due >= WINDOW_START && v.out > 0;
    return v;
  }
  // The real list's order: due date (undated last), then course, then title.
  var V = A.map(view).sort(function (x, y) {
    return (x.a.due === null) - (y.a.due === null) || (x.a.due || '').localeCompare(y.a.due || '') ||
      x.a.course.localeCompare(y.a.course) || x.a.title.localeCompare(y.a.title);
  });

  function stats() {
    return {
      total: V.length,
      dueToday: V.filter(function (v) { return v.a.due === TODAY; }).length,
      overdue: V.filter(function (v) { return v.overdue; }).length,
      ungraded: V.filter(function (v) { return v.ungraded > 0; }).length
    };
  }

  // ── HTML builders ──
  function tile(n, label, hot) {
    return '<div class="esp-stat' + (hot ? ' hot' : '') + '"><div class="n">' + n + '</div><div class="l">' + label + '</div></div>';
  }

  function statsHTML(variant) {
    var s = stats();
    var sync = HEALTHY + '/' + LIVE.length;
    if (variant === 'wide') {
      return tile(s.total, 'Assignments') + tile(s.dueToday, 'Due today') + tile(s.overdue, 'Overdue', true) + tile(s.ungraded, 'Ungraded') + tile(sync, 'In sync');
    }
    return tile(s.dueToday, 'Due today') + tile(s.overdue, 'Overdue', true) + tile(s.ungraded, 'Ungraded') + tile(sync, 'In sync');
  }

  function railHTML() {
    var conns = CONNECTORS.map(function (c) {
      return '<div class="esp-conn' + (c.status === 'bad' ? ' err' : c.status === 'soon' ? ' soon' : '') + '">' +
        '<div class="nm"><span class="dot ' + c.status + '"></span>' + c.name + '</div>' +
        '<div class="st">' + c.kind + ' · ' + c.detail + '</div></div>';
    }).join('');
    return '<aside class="esp-rail"><h5>Connected platforms <b>' + HEALTHY + ' / ' + LIVE.length + ' in sync</b></h5>' +
      '<div class="esp-conns">' + conns + '</div>' +
      '<div class="esp-note">1 platform record waiting to be matched to a student. Lerad asks instead of guessing by name.</div>' +
      '<div class="esp-note">Least-privilege connectors, imports minimized and NY Ed Law §2-d-ready by design.</div></aside>';
  }

  function chips(v) {
    var c;
    if (v.overdue) c = '<span class="esp-chip miss">' + v.out + ' missing</span>';
    else if (v.started === 0) c = '<span class="esp-chip">not started</span>';
    else if (v.turned === 0) c = '<span class="esp-chip">in progress</span>';
    else if (v.pastDue && !v.ungraded) c = '<span class="esp-chip done">graded</span>';
    else c = '<span class="esp-chip">' + v.turned + ' turned in</span>';
    if (v.ungraded) c += ' <span class="esp-chip ung">' + v.ungraded + ' to grade</span>';
    return c;
  }

  function detail(a) {
    var rows = a.subs.slice().sort(function (x, y) {
      return ORDER[x[1]] - ORDER[y[1]] || name(x).localeCompare(name(y));
    }).map(function (s) {
      var v = STATUS[s[1]];
      if (s[1] === 'graded') v = /^\d+(\.\d+)?$/.test(s[2]) && a.pts !== null ? s[2] + ' / ' + a.pts : s[2];
      else if (s[1] === 'excused' && s[2]) v = 'excused (' + s[2] + ')';
      if (s[3]) v += ' · late';
      var who = name(s) + (matched(s) ? '' : ' <span class="esp-um">not matched</span>');
      return '<tr><td>' + who + '</td><td>' + v + '</td></tr>';
    }).join('');
    return '<div class="esp-det"><table>' + rows + '</table></div>';
  }

  function card(v) {
    var a = v.a;
    return '<div class="esp-a" tabindex="0">' +
      '<div class="r1"><span class="esp-src ' + a.src + '">' + SRC[a.src] + '</span><span class="t">' + a.title + '</span></div>' +
      '<div class="r2">' + chips(v) + '</div>' + detail(a) + '</div>';
  }

  function lane(v) {
    if (v.overdue) return 'Overdue';
    if (!v.a.due) return 'No date';
    var days = Math.round((new Date(v.a.due + 'T12:00') - new Date(TODAY + 'T12:00')) / 86400000);
    if (days < 0) return 'Earlier';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return days <= 7 ? 'This week' : 'Later';
  }

  function groupsHTML(groupBy) {
    var m = new Map();
    V.forEach(function (v) {
      var label, order;
      if (groupBy === 'platform') { label = SRC[v.a.src]; order = 0; }
      else if (groupBy === 'course') { label = v.a.course; order = 0; }
      else { label = lane(v); order = LANES.indexOf(label); }
      if (!m.has(label)) m.set(label, { label: label, order: order, items: [] });
      m.get(label).items.push(v);
    });
    var groups = Array.from(m.values()).sort(function (x, y) { return x.order - y.order || x.label.localeCompare(y.label); });
    return groups.map(function (g) {
      return '<div class="esp-grp"><h4 class="' + (g.label === 'Overdue' ? 'od' : '') + '">' + g.label +
        '<span class="c">' + g.items.length + '</span></h4>' + g.items.map(card).join('') + '</div>';
    }).join('');
  }

  function shell(variant) {
    var bar = '<div class="esp-bar"><span class="esp-dots"><i></i><i></i><i></i></span>' +
      '<span class="esp-brand">' +
      '<img class="esp-logo" src="/assets/lerad-icon.png" width="96" height="96" alt="" />' +
      '<span class="esp-title">Lerad</span></span>' +
      '<span class="esp-badge">Live view</span></div>';
    var greet = '<div class="esp-greet">Good morning, Ms. Rivera<span>Tuesday, June 30 · ' +
      HEALTHY + ' of ' + LIVE.length + ' platforms in sync</span></div>';
    var statsRow = '<div class="esp-stats">' + statsHTML(variant) + '</div>';
    var controls = '<div class="esp-controls"><span>Group by</span><div class="esp-seg">' +
      '<button type="button" data-g="due" class="on">Due date</button>' +
      '<button type="button" data-g="platform">Platform</button>' +
      '<button type="button" data-g="course">Course</button></div></div>';
    var list = '<div class="esp-list"></div>';
    if (variant === 'wide') {
      return bar + '<div class="esp-body">' + greet + statsRow +
        '<div class="esp-cols">' + railHTML() + '<div class="esp-main">' + controls + list + '</div></div></div>';
    }
    return bar + '<div class="esp-body">' + greet + statsRow + controls + list + '</div>';
  }

  // ── autoplay: a ghost cursor that clicks through the app, until a real
  //    user takes over. Skipped entirely under prefers-reduced-motion. ──
  function autoplay(root, seg, listEl) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var cursor = document.createElement('div');
    cursor.className = 'esp-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="ring"></span>' +
      '<svg viewBox="0 0 24 24"><path d="M4 2 L4 20 L9 15 L12.5 22 L15 21 L11.5 14 L18 14 Z" ' +
      'fill="#fff" stroke="#2f2c27" stroke-width="1.3" stroke-linejoin="round"/></svg>';
    root.appendChild(cursor);

    var steps = [
      function () { return seg.querySelectorAll('button')[1]; }, // Platform
      function () { return seg.querySelectorAll('button')[2]; }, // Course
      function () { return seg.querySelectorAll('button')[0]; }, // Due date
      function () { return listEl.querySelector('.esp-a'); },    // open first card
      function () { return listEl.querySelector('.esp-a'); }     // close it again
    ];
    var i = 0, stopped = false, timers = [];
    function wait(fn, ms) { timers.push(setTimeout(fn, ms)); }

    function place(el) {
      var r = el.getBoundingClientRect(), rr = root.getBoundingClientRect();
      cursor.style.left = (r.left - rr.left + Math.min(r.width / 2, 26)) + 'px';
      cursor.style.top = (r.top - rr.top + r.height / 2) + 'px';
    }

    function step() {
      if (stopped) return;
      var el = steps[i]();
      i = (i + 1) % steps.length;
      if (!el) { wait(step, 400); return; }
      place(el);
      wait(function () {
        if (stopped) return;
        cursor.classList.add('press');
        wait(function () {
          cursor.classList.remove('press');
          el.click();
          wait(step, 950);
        }, 240);
      }, 780);
    }

    function stop() {
      if (stopped) return;
      stopped = true;
      timers.forEach(clearTimeout);
      cursor.remove();
    }
    root.addEventListener('pointerenter', stop);
    root.addEventListener('pointerdown', stop);

    // start centred, then begin once the hero has settled in
    cursor.style.left = '50%';
    cursor.style.top = '58%';
    requestAnimationFrame(function () { cursor.classList.add('shown'); });
    wait(step, 1600);
  }

  function mount(root) {
    var variant = root.getAttribute('data-variant') === 'wide' ? 'wide' : 'compact';
    root.classList.add('esp', 'esp--' + variant);
    root.innerHTML = shell(variant);

    var seg = root.querySelector('.esp-seg');
    var listEl = root.querySelector('.esp-list');
    function draw(g) { listEl.innerHTML = groupsHTML(g); }

    seg.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      seg.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      draw(b.getAttribute('data-g'));
    });
    listEl.addEventListener('click', function (e) {
      var a = e.target.closest('.esp-a');
      if (a) a.classList.toggle('open');
    });
    listEl.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var a = e.target.closest('.esp-a');
      if (a) { e.preventDefault(); a.classList.toggle('open'); }
    });

    draw('due');
    if (root.hasAttribute('data-autoplay')) autoplay(root, seg, listEl);
  }

  document.querySelectorAll('[data-lerad-preview]').forEach(mount);
})();
