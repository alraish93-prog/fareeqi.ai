// مكتبة فريقي: خانة الإيميل والواتساب قبل ما تنفتح الملفات. ترسل لجدول قوقل شيت خاص بصاحب الحساب.
(function () {
  var GATE_URL = '';                                   // رابط Web app من قوقل (يتعبى بعد النشر)
  if (!GATE_URL) return;
  try { if (localStorage.getItem('fareeqi_ok') === '1') return; } catch (e) {}
  var css = '#fq-gate{position:fixed;inset:0;z-index:99;background:rgba(14,18,48,.72);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Alexandria,system-ui,sans-serif}' +
    '#fq-gate form{background:#fff;border-radius:24px;max-width:420px;width:100%;padding:26px 22px;text-align:center;direction:rtl;box-shadow:0 20px 60px rgba(0,0,0,.3)}' +
    '#fq-gate h2{margin:0 0 6px;font-size:24px;color:#0E1230}#fq-gate p{margin:0 0 16px;color:#5B638A;line-height:1.7}' +
    '#fq-gate input{width:100%;box-sizing:border-box;font:inherit;font-size:17px;padding:13px 14px;margin:6px 0;border:1.5px solid #DCE2FA;border-radius:14px;outline:none}' +
    '#fq-gate input:focus{border-color:#2346FF}#fq-gate button{width:100%;margin-top:10px;font:inherit;font-weight:800;font-size:18px;padding:13px;border:0;border-radius:14px;background:#2346FF;color:#fff;cursor:pointer}' +
    '#fq-gate .hp{position:absolute;left:-9999px}#fq-gate small{display:block;margin-top:10px;color:#8A90B0;font-size:12px}#fq-gate .err{color:#C0392B;min-height:20px;font-size:14px}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var d = document.createElement('div'); d.id = 'fq-gate';
  d.innerHTML = '<form novalidate><h2>افتح مكتبة فريقي</h2><p>حط إيميلك ورقم الواتساب، وتنفتح لك الملفات ببلاش.</p>' +
    '<input name="email" type="email" inputmode="email" autocomplete="email" placeholder="الإيميل" dir="ltr" required>' +
    '<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="رقم الواتساب" dir="ltr" required>' +
    '<input name="website" class="hp" tabindex="-1" autocomplete="off"><div class="err"></div><button type="submit">افتح المكتبة</button>' +
    '<small>معلوماتك عندنا بس، وما نعطيها لأحد.</small></form>';
  document.body.appendChild(d);
  var f = d.querySelector('form'), err = d.querySelector('.err');
  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var email = f.email.value.trim(), phone = f.phone.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { err.textContent = 'اكتب إيميل صحيح'; return; }
    if (phone.replace(/\D/g, '').length < 8) { err.textContent = 'اكتب رقم واتساب صحيح'; return; }
    f.querySelector('button').textContent = 'لحظة…';
    var body = new URLSearchParams({ email: email, phone: phone, website: f.website.value, page: location.pathname });
    fetch(GATE_URL, { method: 'POST', mode: 'no-cors', body: body }).catch(function () {}).then(function () {
      try { localStorage.setItem('fareeqi_ok', '1'); } catch (e) {}
      d.remove();
    });
  });
})();
