import { useCallback, useMemo, useState } from "react";
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

const AC_API_URL = "https://residentelitemarketing.api-us1.com/api/3/contacts";
const AC_API_KEY = "e36fc9bf06cd078e2da948e9ee37e1a80d5aa3902f6b7ef70c8c319da6f59f7dd02a439a";

const CheckoutModal = ({ open, onOpenChange, checkoutUrl }: CheckoutModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = useCallback(async () => {
    if (!email.trim()) {
      setError("Preencha seu email");
      return;
    }
    if (!name.trim()) {
      setError("Preencha seu nome");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const fieldValues: { field: string; value: string }[] = [];
    if (utms.utm_source) fieldValues.push({ field: "1", value: utms.utm_source });
    if (utms.utm_content) fieldValues.push({ field: "2", value: utms.utm_content });
    if (utms.utm_medium) fieldValues.push({ field: "3", value: utms.utm_medium });
    if (utms.utm_term) fieldValues.push({ field: "4", value: utms.utm_term });
    if (utms.utm_campaign) fieldValues.push({ field: "5", value: utms.utm_campaign });

    try {
      await fetch(AC_API_URL, {
        method: "POST",
        headers: {
          "Api-Token": AC_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: {
            email: email.trim(),
            firstName: name.trim(),
            phone: phone.trim() || undefined,
            fieldValues: fieldValues.length > 0 ? fieldValues : undefined,
          },
        }),
      });
    } catch {
      // Even if AC fails, redirect to checkout
      console.warn("AC request failed, redirecting anyway");
    }

    // Redirect to checkout
    const finalUrl = buildCheckoutUrl();
    window.location.href = finalUrl;
  }, [name, email, phone, utms, buildCheckoutUrl]);

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
  );
};

export default CheckoutModal;
