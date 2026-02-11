import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutUrl: string;
}

const AC_FORM_ACTION = "https://residentelitemarketing.activehosted.com/proc.php";
const IFRAME_NAME = "ac_hidden_iframe";

const CheckoutModal = ({ open, onOpenChange, checkoutUrl }: CheckoutModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const utms = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
      const v = params.get(k);
      if (v) out[k] = v;
    });
    return out;
  }, []);

  const buildCheckoutUrl = useCallback(() => {
    const url = new URL(checkoutUrl);
    if (name) url.searchParams.set("name", name.trim());
    if (email) url.searchParams.set("email", email.trim());
    if (phone) url.searchParams.set("phone", phone.trim());
    Object.entries(utms).forEach(([k, v]) => url.searchParams.set(k, v));
    return url.toString();
  }, [checkoutUrl, name, email, phone, utms]);

  const sendToActiveCampaign = useCallback(() => {
    // Submit the hidden form targeting the invisible iframe
    // This is a native form POST — immune to AdBlockers and CORS
    formRef.current?.submit();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!name.trim()) {
      setError("Preencha seu nome");
      return;
    }
    if (!email.trim()) {
      setError("Preencha seu email");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    // Fire-and-forget to AC
    sendToActiveCampaign();

    // Redirect immediately — keepalive ensures request completes
    window.location.href = buildCheckoutUrl();
  }, [name, email, sendToActiveCampaign, buildCheckoutUrl]);

  return (
    <>
      {/* Hidden iframe target — form submits here silently */}
      <iframe name={IFRAME_NAME} style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />

      {/* Hidden native form — submitted programmatically, targets the iframe */}
      <form
        ref={formRef}
        action={AC_FORM_ACTION}
        method="POST"
        target={IFRAME_NAME}
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <input type="hidden" name="u" value="7" />
        <input type="hidden" name="f" value="7" />
        <input type="hidden" name="s" value="" />
        <input type="hidden" name="c" value="0" />
        <input type="hidden" name="m" value="0" />
        <input type="hidden" name="act" value="sub" />
        <input type="hidden" name="v" value="2" />
        <input type="hidden" name="or" value="be60195a-cbc0-4161-8d61-8227b9ebd1bc" />
        <input type="hidden" name="fullname" value={name.trim()} />
        <input type="hidden" name="email" value={email.trim()} />
        <input type="hidden" name="phone" value={phone.trim()} />
        {utms.utm_source && <input type="hidden" name="field[2]" value={utms.utm_source} />}
        {utms.utm_content && <input type="hidden" name="field[4]" value={utms.utm_content} />}
        {utms.utm_medium && <input type="hidden" name="field[5]" value={utms.utm_medium} />}
        {utms.utm_term && <input type="hidden" name="field[6]" value={utms.utm_term} />}
        {utms.utm_campaign && <input type="hidden" name="field[7]" value={utms.utm_campaign} />}
      </form>

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

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="checkout-name" className="block text-sm font-semibold text-foreground">
                Nome completo <span className="text-destructive">*</span>
              </label>
              <Input
                id="checkout-name"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="checkout-email" className="block text-sm font-semibold text-foreground">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                id="checkout-email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                autoComplete="email"
                inputMode="email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="checkout-phone" className="block text-sm font-semibold text-foreground">
                Telefone
              </label>
              <Input
                id="checkout-phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-destructive text-center" role="alert">
                {error}
              </p>
            )}

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full h-12 text-base font-semibold"
            >
              {isSubmitting ? "Enviando..." : "QUERO ENTRAR"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutModal;
