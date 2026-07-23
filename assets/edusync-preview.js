'use strict';
/* Interactive EduSync product preview, shared by the homepage hero (compact)
   and the EduSync page (wide, desktop layout). Synthetic fixture cast only,
   mirroring edusync/samples — no real student data ever appears in marketing.
   Every count and chip is DERIVED from the submission rows below, the same way
   the real product must compute them, so the preview can't show a number it
   can't back up. Mount by adding [data-edusync-preview] with data-variant. */
(function () {
  var TODAY = new Date(2026, 5, 30); // Tue Jun 30 2026, matching the demo clock
  var SRC = { gc: 'Classroom', ps: 'PowerSchool', ap: 'AP Classroom', kt: 'KITE' };
  var STATUS = {
    graded: 'graded', turned_in: 'turned in · ungraded', in_progress: 'in progress',
    not_started: 'not started', missing: 'missing', excused: 'excused'
  };

  var CONNECTORS = [
    { name: 'Google Classroom', kind: 'live API',   status: 'ok',   detail: 'synced 12 min ago' },
    { name: 'AP Classroom',     kind: 'CSV import',  status: 'ok',   detail: 'imported 6 h ago' },
    { name: 'PowerSchool',      kind: 'CSV import',  status: 'warn', detail: '2 days old' },
    { name: 'PLTW / KITE',      kind: 'CSV import',  status: 'bad',  detail: 'last import failed' }
  ];

  var A = [
    { src: 'gc', course: 'Intro to Programming · P1', title: 'Paired Programming — Planning Doc', due: '2026-06-30', pts: 10,
      subs: [['Aaliyah Torres','turned_in'],['Marcus Webb','turned_in'],['Jonah Kim','turned_in'],['Sofia Delgado','turned_in'],['Tyrell Jackson','turned_in'],['Dmitri Volkov','not_started'],['Janelle Osei','not_started']] },
    { src: 'ps', course: 'Intro to Programming · P1', title: 'Ch. 5 Homework: Loops & Conditionals', due: '2026-06-30', pts: 20,
      subs: [['Aaliyah Torres','graded',18],['Marcus Webb','graded',20],['Jonah Kim','graded',15],['Sofia Delgado','missing'],['Tyrell Jackson','graded',17],['Dmitri Volkov','graded',19],['Janelle Osei','turned_in']] },
    { src: 'ap', course: 'AP CSP · P3', title: 'Free Response Set B', due: '2026-06-30', pts: 25,
      subs: [['Aaliyah Torres','graded',21],['Marcus Webb','turned_in'],['Priya Raman','in_progress'],['Mei Lin Chen','graded',24],['Fatima Al-Rashid','not_started'],['Janelle Osei','graded',19]] },
    { src: 'ps', course: 'AP CS A · P5', title: 'Unit 3 Quiz — Functions', due: '2026-06-26', pts: 30,
      subs: [['Priya Raman','graded',28],['Mei Lin Chen','graded',30],['Fatima Al-Rashid','graded',25],['Aaliyah Torres','graded',27],['Tyrell Jackson','missing']] },
    { src: 'ap', course: 'AP CSP · P3', title: 'Practice MCQ Bank', due: null, pts: 60,
      subs: [['Aaliyah Torres','in_progress'],['Priya Raman','in_progress'],['Mei Lin Chen','graded',52],['Fatima Al-Rashid','not_started'],['Janelle Osei','in_progress']] },
    { src: 'kt', course: 'Principles of Engineering · P2', title: 'POE Classroom Assessment 2', due: null, pts: 40, kite: true,
      subs: [['Marcus Webb','graded',33],['Sofia Delgado','graded',28],['Tyrell Jackson','graded',31],['Janelle Osei','graded',36],['Ethan Brooks','graded',24],['Jonah Kim','missing']] }
  ];

  // ── derivations (mirror the real product's rules) ──
  function dd(a) { return a.due ? new Date(a.due + 'T12:00') : null; }
  function sameDay(d1, d2) { return !!d1 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate(); }
  function isPast(a) { var d = dd(a); return !!d && d < TODAY && !sameDay(d, TODAY); }
  function outstanding(s) { return s[1] === 'missing' || s[1] === 'not_started' || s[1] === 'in_progress'; }
  function isUngraded(s) { return s[1] === 'turned_in' || s[1] === 'in_progress'; }

  var HEALTHY = CONNECTORS.filter(function (c) { return c.status !== 'bad'; }).length;

  function stats() {
    return {
      total: A.length,
      dueToday: A.filter(function (a) { return sameDay(dd(a), TODAY); }).length,
      overdue: A.filter(function (a) { return isPast(a) && a.subs.some(outstanding); }).length,
      toGrade: A.reduce(function (n, a) { return n + a.subs.filter(isUngraded).length; }, 0)
    };
  }

  // ── HTML builders ──
  function tile(n, label, hot) {
    return '<div class="esp-stat' + (hot ? ' hot' : '') + '"><div class="n">' + n + '</div><div class="l">' + label + '</div></div>';
  }

  function statsHTML(variant) {
    var s = stats();
    var sync = HEALTHY + '/' + CONNECTORS.length;
    if (variant === 'wide') {
      return tile(s.total, 'Assignments') + tile(s.dueToday, 'Due today') + tile(s.overdue, 'Overdue', true) + tile(s.toGrade, 'Ungraded') + tile(sync, 'In sync');
    }
    return tile(s.dueToday, 'Due today') + tile(s.overdue, 'Overdue', true) + tile(s.toGrade, 'To grade') + tile(sync, 'In sync');
  }

  function railHTML() {
    var conns = CONNECTORS.map(function (c) {
      return '<div class="esp-conn' + (c.status === 'bad' ? ' err' : '') + '">' +
        '<div class="nm"><span class="dot ' + c.status + '"></span>' + c.name + '</div>' +
        '<div class="st">' + c.kind + ' · ' + c.detail + '</div></div>';
    }).join('');
    return '<aside class="esp-rail"><h5>Connected platforms <b>' + HEALTHY + ' / ' + CONNECTORS.length + ' healthy</b></h5>' +
      '<div class="esp-conns">' + conns + '</div>' +
      '<div class="esp-note">Least-privilege connectors, imports minimized and NY Ed Law §2-d-ready by design.</div></aside>';
  }

  function chips(a) {
    var c = [];
    var miss = a.subs.filter(function (s) { return s[1] === 'missing'; }).length;
    if (miss) c.push('<span class="esp-chip miss">' + miss + ' missing</span>');
    var ung = a.subs.filter(isUngraded).length;
    if (ung) c.push('<span class="esp-chip ung">' + ung + ' to grade</span>');
    var gr = a.subs.filter(function (s) { return s[1] === 'graded'; }).length;
    if (gr === a.subs.length) c.push('<span class="esp-chip done">all graded</span>');
    else if (gr) c.push('<span class="esp-chip">' + gr + '/' + a.subs.length + ' graded</span>');
    return c.join(' ');
  }

  function detail(a) {
    var rows = a.subs.map(function (s) {
      var v = STATUS[s[1]];
      if (s[1] === 'graded') v = s[2] + ' / ' + a.pts;
      else if (s[1] === 'missing' && a.kite) v = 'missing (roster-inferred)';
      return '<tr><td>' + s[0] + '</td><td>' + v + '</td></tr>';
    }).join('');
    return '<div class="esp-det"><table>' + rows + '</table></div>';
  }

  function card(a) {
    return '<div class="esp-a" tabindex="0">' +
      '<div class="r1"><span class="esp-src ' + a.src + '">' + SRC[a.src] + '</span><span class="t">' + a.title + '</span></div>' +
      '<div class="r2">' + chips(a) + '</div>' + detail(a) + '</div>';
  }

  function bucket(a) {
    var d = dd(a);
    if (!d) return ['No due date', 30];
    if (isPast(a)) return a.subs.some(outstanding) ? ['Overdue', 0] : ['Earlier', 25];
    if (sameDay(d, TODAY)) return ['Today', 10];
    return ['Later', 20];
  }

  function groupsHTML(groupBy) {
    var m = new Map();
    A.forEach(function (a) {
      var label, order;
      if (groupBy === 'platform') { label = SRC[a.src]; order = 0; }
      else if (groupBy === 'course') { label = a.course; order = 0; }
      else { var b = bucket(a); label = b[0]; order = b[1]; }
      if (!m.has(label)) m.set(label, { label: label, order: order, items: [] });
      m.get(label).items.push(a);
    });
    var groups = Array.from(m.values()).sort(function (x, y) { return x.order - y.order || x.label.localeCompare(y.label); });
    return groups.map(function (g) {
      return '<div class="esp-grp"><h4 class="' + (g.label === 'Overdue' ? 'od' : '') + '">' + g.label +
        '<span class="c">' + g.items.length + '</span></h4>' + g.items.map(card).join('') + '</div>';
    }).join('');
  }

  function shell(variant) {
    var bar = '<div class="esp-bar"><span class="esp-dots"><i></i><i></i><i></i></span>' +
      '<span class="esp-title">Edu<em>Sync</em></span><span class="esp-badge">Live view</span></div>';
    var greet = '<div class="esp-greet">Good morning, Ms. Rivera<span>Tuesday, June 30 · ' +
      HEALTHY + ' of ' + CONNECTORS.length + ' platforms in sync</span></div>';
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

  document.querySelectorAll('[data-edusync-preview]').forEach(mount);
})();
