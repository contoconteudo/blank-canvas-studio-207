import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutUrl: string;
}

const AC_FORM_HTML = `
<form method="POST" action="https://residentelitemarketing.activehosted.com/proc.php" id="_form_7_" class="_form _form_7 _inline-form _dark" novalidate data-styles-version="5">
  <input type="hidden" name="u" value="7" />
  <input type="hidden" name="f" value="7" />
  <input type="hidden" name="s" />
  <input type="hidden" name="c" value="0" />
  <input type="hidden" name="m" value="0" />
  <input type="hidden" name="act" value="sub" />
  <input type="hidden" name="v" value="2" />
  <input type="hidden" name="or" value="a]f6f454dcb1acb7b64e14e88f76a8a3" />
  <div class="_form-content">
    <div class="_form_element _x55498498 _full_width">
      <label for="fullname" class="_form-label">Nome completo</label>
      <div class="_field-wrapper">
        <input type="text" id="fullname" name="fullname" placeholder="Digite seu nome completo" />
      </div>
    </div>
    <div class="_form_element _x03498498 _full_width">
      <label for="email" class="_form-label">
        Email<span class="field-required">*</span>
      </label>
      <div class="_field-wrapper">
        <input type="text" id="email" name="email" placeholder="Digite seu email" required />
      </div>
    </div>
    <div class="_form_element _field1 _full_width">
      <label for="phone" class="_form-label">Telefone</label>
      <div class="_field-wrapper">
        <input type="text" id="phone" name="phone" placeholder="Digite seu telefone" />
      </div>
    </div>
    <div class="_button-wrapper _full_width">
      <button id="_form_7_submit" class="_submit" type="submit">QUERO ENTRAR</button>
    </div>
    <div class="_clear-element"></div>
  </div>
  <div class="_form-thank-you" style="display:none;"></div>
</form>
`;

const AC_SCRIPT = `
(function() {
  window.cfields = [];
  window._show_thank_you = function(id, message, trac498, currentUrl) {
    var form = document.getElementById('_form_' + id + '_');
    var thank_you = form.querySelector('._form-thank-you');
    form.querySelector('._form-content').style.display = 'none';
    thank_you.innerHTML = message;
    thank_you.style.display = 'block';
    var v498 = trac498 || currentUrl;
    if (typeof(googletag) != 'undefined') { googletag.pubads().refresh(); }
    if (vC498) { window.location = vCurrent; }
  };
  window._show_error = function(id, message, html) {
    var form = document.getElementById('_form_' + id + '_');
    var err = document.createElement('div');
    err.className = '_error-inner _form_error _no_arrow';
    err.innerHTML = message;
    var button = form.querySelector('._button-wrapper');
    var old_error = form.querySelector('._form_error');
    if (old_error) old_error.parentNode.removeChild(old_error);
    button.parentNode.insertBefore(err, button);
  };
  window._load_script = function(url, callback, is498) {
    var s = document.createElement('script');
    s.src = url;
    s.type = 'text/javascript';
    s.async = true;
    if (callback) {
      if(s.readyState) {
        s.onreadystatechange = function() {
          if (this.readyState == 'complete' || this.readyState == 'loaded') { callback(); }
        };
      } else {
        s.onload = callback;
      }
    }
    document.head.appendChild(s);
  };

  var form_to_submit = document.getElementById('_form_7_');
  if (!form_to_submit) return;
  var allInputs = form_to_submit.querySelectorAll('input, textarea, select');
  var submitted = false;
  var iti;

  var remove_tooltips = function() {
    var tooltips = document.querySelectorAll('._error');
    for (var i = 0; i < tooltips.length; i++) {
      tooltips[i].parentNode.removeChild(tooltips[i]);
    }
  };

  var create_tooltip = function(elem, text) {
    var tooltip = document.createElement('div');
    tooltip.className = '_error';
    tooltip.innerHTML = '<div class="_error-inner _below"><div class="_error-arrow"></div><div class="_error-inner">' + text + '</div></div>';
    elem.parentNode.appendChild(tooltip);
    return tooltip;
  };

  var resize_tooltip = function(tooltip) { return; };
  var resize_tooltips = function() { return; };

  var addEvent = function(element, event, func) {
    if (element.addEventListener) { element.addEventListener(event, func); }
    else if (element.attachEvent) { element.attachEvent('on' + event, func); }
  };

  var validate_field = function(elem, remove) {
    var no_error = true;
    if (remove) remove_tooltips();
    var value = elem.value || '';
    if (elem.getAttribute('required') !== null && value === '') {
      elem.className = elem.className + ' _has_error';
      no_error = false;
      create_tooltip(elem, "Campo obrigatório");
    }
    if (no_error && elem.name === 'email' && !value.match(/^[\\+_a-z0-9-'&=]+(\\.[\\+_a-z0-9-']+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,})$/i)) {
      elem.className = elem.className + ' _has_error';
      no_error = false;
      create_tooltip(elem, "Digite um email válido");
    }
    return no_error;
  };

  var needs_validate = function(el) {
    if (el.getAttribute('required') !== null) return true;
    if (el.name === 'email' && el.value !== '') return true;
    return false;
  };

  var validate_form = function(e) {
    var no_error = true;
    if (!submitted) {
      submitted = true;
      for (var i = 0; i < allInputs.length; i++) {
        var input = allInputs[i];
        if (needs_validate(input)) {
          if (input.type == 'text' || input.type == 'tel') {
            addEvent(input, 'blur', function() { this.value = this.value.trim(); validate_field(this, true); });
            addEvent(input, 'input', function() { validate_field(this, true); });
          }
        }
      }
    }
    remove_tooltips();
    for (var i = 0; i < allInputs.length; i++) {
      var elem = allInputs[i];
      if (needs_validate(elem)) {
        if (elem.tagName.toLowerCase() !== 'select') elem.value = elem.value.trim();
        validate_field(elem) ? true : no_error = false;
      }
    }
    if (!no_error && e) e.preventDefault();
    return no_error;
  };

  var _form_serialize = function(form) {
    if (!form || form.nodeName !== 'FORM') return;
    var q = [];
    for (var i = 0; i < form.elements.length; i++) {
      var el = form.elements[i];
      if (el.name === '') continue;
      switch (el.type) {
        case 'text': case 'tel': case 'hidden': case 'password': case 'submit':
          q.push(el.name + '=' + encodeURIComponent(el.value));
          break;
        case 'checkbox': case 'radio':
          if (el.checked) q.push(el.name + '=' + encodeURIComponent(el.value));
          break;
      }
      if (el.tagName === 'TEXTAREA') q.push(el.name + '=' + encodeURIComponent(el.value));
      if (el.tagName === 'SELECT') q.push(el.name + '=' + encodeURIComponent(el.value));
    }
    return q.join('&');
  };

  var form_submit = function(e) {
    e.preventDefault();
    if (validate_form()) {
      var submitButton = form_to_submit.querySelector('#_form_7_submit');
      submitButton.disabled = true;
      submitButton.classList.add('processing');
      var serialized = _form_serialize(form_to_submit).replace(/%0A/g, '\\\\n');
      var err = form_to_submit.querySelector('._form_error');
      if (err) err.parentNode.removeChild(err);
      _load_script('https://residentelitemarketing.activehosted.com/proc.php?' + serialized + '&jsonp=true', null, true);
    }
    return false;
  };

  addEvent(form_to_submit, 'submit', form_submit);
})();
`;

const CheckoutModal = ({ open, onOpenChange, checkoutUrl }: CheckoutModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!open || !containerRef.current) {
      setScriptLoaded(false);
      return;
    }

    // Inject UTM params into hidden fields
    const params = new URLSearchParams(window.location.search);
    const form = containerRef.current.querySelector("#_form_7_") as HTMLFormElement | null;
    if (form) {
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
      utmKeys.forEach((key) => {
        const value = params.get(key);
        if (value) {
          let input = form.querySelector(`input[name="${key}"]`) as HTMLInputElement | null;
          if (!input) {
            input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            form.appendChild(input);
          }
          input.value = value;
        }
      });
    }

    // Execute the AC script after a small delay to ensure DOM is ready
    if (!scriptLoaded) {
      const timer = setTimeout(() => {
        try {
          // eslint-disable-next-line no-eval
          eval(AC_SCRIPT);
          setScriptLoaded(true);
        } catch (err) {
          console.error("Error initializing AC form script:", err);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open, scriptLoaded]);

  // Load AC form CSS
  useEffect(() => {
    const styleId = "ac-form-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        #_form_7_ { font-size:14px; line-height:1.6; font-family:arial,helvetica,sans-serif; margin:0; box-shadow:none; }
        #_form_7_ input[type="text"], #_form_7_ input[type="tel"] { padding:10px 12px; height:auto; border:#979797 1px solid; border-radius:6px; color:#000 !important; font-size:14px; box-sizing:border-box; width:100%; }
        #_form_7_ ._form-label { font-weight:bold; margin-bottom:5px; display:block; color:#374151; font-size:14px; }
        #_form_7_ ._submit { cursor:pointer; font-size:16px; text-align:center; background:#305CA9 !important; border:0 !important; border-radius:8px !important; width:100%; color:#FFFFFF !important; padding:14px !important; font-weight:600; margin-top:8px; }
        #_form_7_ ._submit:hover { opacity:0.9; }
        #_form_7_ ._submit:disabled { cursor:not-allowed; opacity:0.4; }
        #_form_7_ ._submit.processing { position:relative; color:transparent !important; }
        #_form_7_ ._submit.processing::before { content:""; width:1.2em; height:1.2em; position:absolute; z-index:1; top:50%; left:50%; transform:translate(-50%,-50%); border:3px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:_spin 600ms linear infinite; }
        @keyframes _spin { 0%{transform:translate(-50%,-50%) rotate(0deg)} 100%{transform:translate(-50%,-50%) rotate(360deg)} }
        #_form_7_ ._form_element { position:relative; margin-bottom:14px; font-size:0; max-width:100%; }
        #_form_7_ ._form_element * { font-size:14px; }
        #_form_7_ ._field-wrapper { position:relative; }
        #_form_7_ .field-required { color:#EF4444; margin-left:2px; }
        #_form_7_ input._has_error { border:#EF4444 1px solid !important; }
        #_form_7_ ._error { display:block; position:relative; font-size:12px; color:#EF4444; margin-top:4px; }
        #_form_7_ ._error-inner { color:#EF4444; font-size:12px; }
        #_form_7_ ._form-thank-you { text-align:center; font-size:16px; padding:20px 0; color:#16a34a; font-weight:600; }
        #_form_7_ ._form_error { margin-bottom:8px; text-align:left; color:#EF4444; font-size:13px; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white p-6 md:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center" style={{ color: "#1C233B" }}>
            Preencha seus dados para continuar
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500">
            Seus dados serão usados para agilizar sua inscrição
          </DialogDescription>
        </DialogHeader>

        <div
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: AC_FORM_HTML }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
