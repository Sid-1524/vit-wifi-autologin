chrome.storage.local.get(
  { username: "", password: "", enabled: true, autoSubmit: false },
  ({ username, password, enabled, autoSubmit }) => {
    if (!enabled || !username || !password) return;

    const setVal = (el, v) => {
      el.focus();
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      setter.call(el, v);
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
      el.dispatchEvent(new Event("blur", { bubbles: true }));
    };

    const findLoginButton = pass => {
      const scope = pass.form || document;
      const all = [...scope.querySelectorAll(
        'button, input[type="submit"], input[type="button"], a, [role="button"]'
      )];
      const byText = all.find(el =>
        /^\s*log\s*in\s*$/i.test((el.value || el.textContent || "").trim())
      );
      return byText || scope.querySelector('button[type="submit"], input[type="submit"]');
    };

    const canAttempt = () => {
      const n = +sessionStorage.getItem("vit_tries") || 0;
      const last = +sessionStorage.getItem("vit_last") || 0;
      if (Date.now() - last > 20000) sessionStorage.setItem("vit_tries", "0");
      const tries = +sessionStorage.getItem("vit_tries") || 0;
      if (tries >= 3) return false;
      sessionStorage.setItem("vit_tries", String(tries + 1));
      sessionStorage.setItem("vit_last", String(Date.now()));
      return true;
    };

    const submit = pass => {
      const btn = findLoginButton(pass);
      if (btn) btn.click();

      // If the page is still here shortly after, try submitting the form directly
      setTimeout(() => {
        if (!document.contains(pass)) return;
        const form = pass.form;
        if (form) {
          try { form.requestSubmit ? form.requestSubmit() : form.submit(); }
          catch (e) { form.submit(); }
        }
      }, 800);
    };

    const run = () => {
      const pass = document.querySelector('input[type="password"]');
      if (!pass) return false;

      const user =
        document.querySelector('input[name="userId"], input[name="username"], input#username') ||
        document.querySelector('input[type="text"]');
      if (!user) return false;

      setVal(user, username);
      setVal(pass, password);

      if (autoSubmit && canAttempt()) {
        // small delay so the page's scripts register the filled values first
        setTimeout(() => submit(pass), 400);
      }
      return true;
    };

    if (!run()) {
      let tries = 0;
      const t = setInterval(() => {
        if (run() || ++tries >= 10) clearInterval(t);
      }, 500);
    }
  }
);