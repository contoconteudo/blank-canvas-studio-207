import { useEffect, useMemo, useRef, useState } from "react";
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

const AC_BASE = "https://residentelitemarketing.activehosted.com";

function toE164BrazilMaybe(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  // Keep digits and +
  let normalized = trimmed.replace(/[^0-9+]/g, "");

  // If user typed + already, keep it
  if (normalized.startsWith("+")) {
    return "+" + normalized.slice(1).replace(/\D/g, "");
  }

  // Pure digits
  const digits = normalized.replace(/\D/g, "");

  // If looks like BR local (10-11 digits), prefix +55
  if (digits.length === 10 || digits.length === 11) {
    return `+55${digits}`;
  }

  // If already includes country code without +, just add +
  if (digits.length >= 8) {
    return `+${digits}`;
  }

  return "";
}

function isValidE164(phone: string): boolean {
  return /^\+[1-9]\d{7,14}$/.test(phone);
}

const CheckoutModal = ({ open, onOpenChange, checkoutUrl }: CheckoutModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const utms = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
      const v = params.get(k);
      if (v) out[k] = v;
    });
    return out;
  }, []);

  const acFormHtml = useMemo(() => {
    // IMPORTANT: no action/method to avoid navigation; submission is handled by our JS (JSONP)
    return `
<form id="_form_7_" class="space-y-4" novalidate>
  <input type="hidden" name="u" value="7" />
  <input type="hidden" name="f" value="7" />
  <input type="hidden" name="s" value="" />
  <input type="hidden" name="c" value="0" />
  <input type="hidden" name="m" value="0" />
  <input type="hidden" name="act" value="sub" />
  <input type="hidden" name="v" value="2" />
  <input type="hidden" name="or" value="a]f6f454dcb1acb7b64e14e88f76a8a3" />

  <div class="space-y-2">
    <label for="ac_fullname" class="block text-sm font-semibold text-foreground">Nome completo</label>
    <input
      id="ac_fullname"
      name="fullname"
      type="text"
      placeholder="Digite seu nome completo"
      class="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      autocomplete="name"
    />
  </div>

  <div class="space-y-2">
    <label for="ac_email" class="block text-sm font-semibold text-foreground">Email <span class="text-destructive">*</span></label>
    <input
      id="ac_email"
      name="email"
      type="email"
      placeholder="Digite seu email"
      required
      class="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      autocomplete="email"
      inputmode="email"
    />
  </div>

  <div class="space-y-2">
    <label for="ac_phone" class="block text-sm font-semibold text-foreground">Telefone</label>
    <input
      id="ac_phone"
      name="phone"
      type="tel"
      placeholder="+55 11 99999-9999"
      class="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      inputmode="tel"
    />
    <p class="text-xs text-muted-foreground">Se preencher, use DDI. Ex: +55...</p>
  </div>

  <button
    id="_form_7_submit"
    type="submit"
    class="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
  >
    QUERO ENTRAR
  </button>
</form>
`;
  }, []);

  useEffect(() => {
    if (!open) {
      setIsSubmitting(false);
      setPhoneError(null);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const form = container.querySelector("#_form_7_") as HTMLFormElement | null;
    if (!form) return;

    // Ensure UTM hidden inputs exist
    Object.entries(utms).forEach(([key, value]) => {
      let input = form.querySelector(`input[name="${key}"]`) as HTMLInputElement | null;
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        form.appendChild(input);
      }
      input.value = value;
    });

    const serialize = (f: HTMLFormElement): string => {
      const pairs: string[] = [];
      for (let i = 0; i < f.elements.length; i++) {
        const el = f.elements[i] as HTMLInputElement;
        if (!el?.name) continue;

        // Skip empty phone entirely (AC can validate and block it)
        if (el.name === "phone" && !el.value.trim()) continue;

        // We only have inputs
        pairs.push(`${encodeURIComponent(el.name)}=${encodeURIComponent(el.value)}`);
      }
      return pairs.join("&");
    };

    const buildCheckout = (f: HTMLFormElement): string => {
      const url = new URL(checkoutUrl);
      const name = (f.querySelector('input[name="fullname"]') as HTMLInputElement | null)?.value?.trim();
      const email = (f.querySelector('input[name="email"]') as HTMLInputElement | null)?.value?.trim();
      const phone = (f.querySelector('input[name="phone"]') as HTMLInputElement | null)?.value?.trim();
      if (name) url.searchParams.set("name", name);
      if (email) url.searchParams.set("email", email);
      if (phone) url.searchParams.set("phone", phone);
      Object.entries(utms).forEach(([k, v]) => url.searchParams.set(k, v));
      return url.toString();
    };

    const robustRedirect = (url: string) => {
      try {
        window.location.href = url;
        return;
      } catch {
        // ignore
      }
      setTimeout(() => {
        try {
          window.location.replace(url);
        } catch {
          // ignore
        }
      }, 80);
    };

    const onSubmit = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      setPhoneError(null);

      const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement | null;
      if (!emailInput?.value?.trim()) {
        emailInput?.focus();
        return;
      }

      const phoneInput = form.querySelector('input[name="phone"]') as HTMLInputElement | null;
      if (phoneInput?.value?.trim()) {
        const e164 = toE164BrazilMaybe(phoneInput.value);
        if (!e164 || !isValidE164(e164)) {
          setPhoneError("Forneça um número de telefone válido (formato +XXXXXXXXXXXXX)");
          phoneInput.focus();
          return;
        }
        phoneInput.value = e164;
      }

      setIsSubmitting(true);
      const submitBtn = form.querySelector("#_form_7_submit") as HTMLButtonElement | null;
      if (submitBtn) submitBtn.disabled = true;

      const qs = serialize(form);
      const scriptUrl = `${AC_BASE}/proc.php?${qs}&jsonp=true`;

      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.onload = () => {
        // cleanup
        script.remove();
      };
      script.onerror = () => {
        script.remove();
      };
      document.head.appendChild(script);

      const finalUrl = buildCheckout(form);
      try {
        sessionStorage.setItem("checkout_redirect_url", finalUrl);
      } catch {
        // ignore
      }

      // give AC a short moment, then redirect
      setTimeout(() => {
        robustRedirect(finalUrl);
      }, 1200);
    };

    form.addEventListener("submit", onSubmit);

    return () => {
      form.removeEventListener("submit", onSubmit);
    };
  }, [open, checkoutUrl, utms]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background p-6 md:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center text-foreground">
            Preencha seus dados para continuar
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            Seus dados serão usados para agilizar sua inscrição
          </DialogDescription>
        </DialogHeader>

        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: acFormHtml }} />

        {phoneError && (
          <p className="mt-2 text-sm font-medium text-destructive" role="alert">
            {phoneError}
          </p>
        )}

        {/* keep UX responsive even if user double-clicks */}
        {isSubmitting && (
          <p className="mt-2 text-xs text-muted-foreground">Enviando... aguarde</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
