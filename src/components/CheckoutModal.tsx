import { useEffect, useRef, useState, useCallback } from "react";
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

const CheckoutModal = ({ open, onOpenChange, checkoutUrl }: CheckoutModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);
  const utmParamsRef = useRef<Record<string, string>>({});

  // Capture UTMs once
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
      const value = params.get(key);
      if (value) utms[key] = value;
    });
    utmParamsRef.current = utms;
  }, []);

  const buildCheckoutUrl = useCallback((formEl: HTMLFormElement): string => {
    const url = new URL(checkoutUrl);
    const name = (formEl.querySelector('input[name="fullname"]') as HTMLInputElement)?.value;
    const email = (formEl.querySelector('input[name="email"]') as HTMLInputElement)?.value;
    const phone = (formEl.querySelector('input[name="phone"]') as HTMLInputElement)?.value;
    if (name) url.searchParams.set("name", name);
    if (email) url.searchParams.set("email", email);
    if (phone) url.searchParams.set("phone", phone);
    Object.entries(utmParamsRef.current).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return url.toString();
  }, [checkoutUrl]);

  const robustRedirect = useCallback((url: string) => {
    try { window.location.href = url; } catch (e) { /* fallback */ }
    setTimeout(() => { try { window.location.replace(url); } catch (e) { /* */ } }, 100);
    setTimeout(() => {
      try {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_self";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) { /* */ }
    }, 200);
  }, []);

  useEffect(() => {
    if (!open) {
      setInitialized(false);
      return;
    }

    if (!containerRef.current || initialized) return;

    const container = containerRef.current;

    // Build form HTML
    container.innerHTML = `
<form id="_form_7_" class="_form _form_7 _inline-form _dark" novalidate>
  <input type="hidden" name="u" value="7" />
  <input type="hidden" name="f" value="7" />
  <input type="hidden" name="s" value="" />
  <input type="hidden" name="c" value="0" />
  <input type="hidden" name="m" value="0" />
  <input type="hidden" name="act" value="sub" />
  <input type="hidden" name="v" value="2" />
  <input type="hidden" name="or" value="a]f6f454dcb1acb7b64e14e88f76a8a3" />
  <div class="_form-content">
    <div class="_form_element _full_width">
      <label for="ac_fullname" class="_form-label">Nome completo</label>
      <div class="_field-wrapper">
        <input type="text" id="ac_fullname" name="fullname" placeholder="Digite seu nome completo" />
      </div>
    </div>
    <div class="_form_element _full_width">
      <label for="ac_email" class="_form-label">Email<span class="field-required">*</span></label>
      <div class="_field-wrapper">
        <input type="text" id="ac_email" name="email" placeholder="Digite seu email" required />
      </div>
    </div>
    <div class="_form_element _full_width">
      <label for="ac_phone" class="_form-label">Telefone</label>
      <div class="_field-wrapper">
        <input type="text" id="ac_phone" name="phone" placeholder="+55 11 99999-9999" />
      </div>
    </div>
    <div class="_button-wrapper _full_width">
      <button id="_form_7_submit" class="_submit" type="submit">QUERO ENTRAR</button>
    </div>
  </div>
  <div class="_form-thank-you" style="display:none;"></div>
</form>`;

    // Add UTM hidden fields
    const form = container.querySelector("#_form_7_") as HTMLFormElement;
    Object.entries(utmParamsRef.current).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    // Serialize form to query string
    const serializeForm = (f: HTMLFormElement): string => {
      const q: string[] = [];
      for (let i = 0; i < f.elements.length; i++) {
        const el = f.elements[i] as HTMLInputElement;
        if (!el.name) continue;
        if (el.type === "text" || el.type === "hidden") {
          // Skip phone if empty (AC requires +XXXX format)
          if (el.name === "phone" && !el.value.trim()) continue;
          q.push(el.name + "=" + encodeURIComponent(el.value));
        }
      }
      return q.join("&");
    };

    // Handle submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
      if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        emailInput.style.border = "1px solid #EF4444";
        return;
      }

      // Format phone with + prefix if provided
      const phoneInput = form.querySelector('input[name="phone"]') as HTMLInputElement;
      if (phoneInput.value.trim()) {
        let phone = phoneInput.value.trim().replace(/[^0-9+]/g, "");
        if (!phone.startsWith("+")) {
          phone = "+" + phone;
        }
        phoneInput.value = phone;
      }

      const submitBtn = form.querySelector("#_form_7_submit") as HTMLButtonElement;
      submitBtn.disabled = true;
      submitBtn.classList.add("processing");

      const serialized = serializeForm(form);
      const scriptUrl = "https://residentelitemarketing.activehosted.com/proc.php?" + serialized + "&jsonp=true";

      // JSONP submission
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.type = "text/javascript";
      script.charset = "utf-8";
      document.head.appendChild(script);

      // Build checkout URL and redirect after a short delay
      const finalUrl = buildCheckoutUrl(form);

      // Give AC time to process, then redirect
      setTimeout(() => {
        try { sessionStorage.setItem("checkout_redirect_url", finalUrl); } catch (err) { /* */ }
        robustRedirect(finalUrl);
      }, 1500);
    });

    setInitialized(true);
  }, [open, initialized, buildCheckoutUrl, robustRedirect]);

  // Load AC form CSS
  useEffect(() => {
    const styleId = "ac-form-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        #_form_7_ { font-size:14px; line-height:1.6; font-family:arial,helvetica,sans-serif; margin:0; }
        #_form_7_ input[type="text"] { padding:10px 12px; height:auto; border:#d1d5db 1px solid; border-radius:6px; color:#000 !important; font-size:14px; box-sizing:border-box; width:100%; transition: border-color 0.2s; }
        #_form_7_ input[type="text"]:focus { outline:none; border-color:#305CA9; box-shadow: 0 0 0 2px rgba(48,92,169,0.15); }
        #_form_7_ ._form-label { font-weight:600; margin-bottom:6px; display:block; color:#374151; font-size:14px; }
        #_form_7_ ._submit { cursor:pointer; font-size:16px; text-align:center; background:#305CA9 !important; border:0 !important; border-radius:8px !important; width:100%; color:#FFFFFF !important; padding:14px !important; font-weight:600; margin-top:8px; transition: opacity 0.2s; }
        #_form_7_ ._submit:hover { opacity:0.9; }
        #_form_7_ ._submit:disabled { cursor:not-allowed; opacity:0.4; }
        #_form_7_ ._submit.processing { position:relative; color:transparent !important; }
        #_form_7_ ._submit.processing::before { content:""; width:1.2em; height:1.2em; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border:3px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:_acspin 600ms linear infinite; }
        @keyframes _acspin { 0%{transform:translate(-50%,-50%) rotate(0deg)} 100%{transform:translate(-50%,-50%) rotate(360deg)} }
        #_form_7_ ._form_element { position:relative; margin-bottom:14px; }
        #_form_7_ ._form_element * { font-size:14px; }
        #_form_7_ .field-required { color:#EF4444; margin-left:2px; }
        #_form_7_ ._form-thank-you { text-align:center; font-size:16px; padding:20px 0; color:#16a34a; font-weight:600; }
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
        <div ref={containerRef} />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
