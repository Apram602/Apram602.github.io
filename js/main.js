(function(){
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Scroll-linked reveals: each element glides in as it travels up
       through the lower part of the viewport. Pure inline transforms —
       content is never hidden, only offset while it is entering. */
    var revealEls = document.querySelectorAll('[data-reveal]');
    function updateReveals(){
      if (reduce) return;
      var vh = window.innerHeight;
      revealEls.forEach(function(el){
        var r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) return;
        var p = (vh - r.top) / (vh * 0.38);
        p -= parseFloat(el.getAttribute('data-delay') || '0');
        p = Math.max(0, Math.min(1, p));
        var eased = 1 - Math.pow(1 - p, 2);
        var d = (1 - eased) * 36;
        var dir = el.getAttribute('data-reveal');
        el.style.transform = dir === 'left' ? 'translateX(' + (-d).toFixed(1) + 'px)'
          : dir === 'right' ? 'translateX(' + d.toFixed(1) + 'px)'
          : 'translateY(' + d.toFixed(1) + 'px)';
        if (p >= 0.98) el.classList.add('in');
      });
    }

    /* Animated stat counters */
    function runCount(el){
      var target = parseFloat(el.getAttribute('data-count'));
      var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var from = parseFloat(el.getAttribute('data-from') || '0');
      if (reduce) { el.textContent = target.toFixed(dec) + suffix; return; }
      var start = null, dur = 1300;
      function step(ts){
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (from + (target - from) * eased).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var counters = document.querySelectorAll('[data-count]');
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function(el){ cio.observe(el); });
    } else {
      counters.forEach(runCount);
    }

    /* Scroll progress bar + hero parallax */
    var bar = document.querySelector('.scroll-progress');
    var char = document.querySelector('.hero-char');
    var giant = document.querySelector('.giant');
    var ticking = false;
    function onScroll(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        ticking = false;
        var y = window.scrollY || window.pageYOffset || 0;
        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
        if (!reduce && y < window.innerHeight * 1.2) {
          if (char) char.style.translate = '0 ' + (y * 0.10).toFixed(1) + 'px';
          if (giant) giant.style.translate = '0 ' + (y * 0.22).toFixed(1) + 'px';
        }
        updateReveals();
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  })();

(function(){
    var buttons = document.querySelectorAll('.filter');
    var cards = document.querySelectorAll('#projectGrid .proj-card');
    buttons.forEach(function(btn){
      btn.addEventListener('click', function(){
        buttons.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter');
        cards.forEach(function(card){
          var cats = card.getAttribute('data-cat') || '';
          var show = f === 'all' || cats.indexOf(f) !== -1;
          card.classList.toggle('hidden', !show);
        });
      });
    });
  })();
