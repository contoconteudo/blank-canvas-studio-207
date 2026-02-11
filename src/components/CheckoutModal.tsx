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

const AC_API_KEY = "e36fc9bf06cd078e2da948e9ee37e1a80d5aa3902f6b7ef70c8c319da6f59f7dd02a439a";
const AC_BASE = "https://residentelitemarketing.api-us1.com";

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

  const sendToActiveCampaign = useCallback(() => {
    // Use AC v1 API with form-encoded POST (simple request, no preflight, bypasses CORS)
    const body = new URLSearchParams();
    body.set("api_key", AC_API_KEY);
    body.set("api_action", "contact_add");
    body.set("api_output", "json");
    body.set("email", email.trim());
    body.set("first_name", name.trim());
    if (phone.trim()) body.set("phone", phone.trim());

    // UTM fields (field IDs 1-5)
    const utmFieldMap: Record<string, string> = {
      utm_source: "1",
      utm_content: "2",
      utm_medium: "3",
      utm_term: "4",
      utm_campaign: "5",
    };
    Object.entries(utms).forEach(([key, value]) => {
      const fieldId = utmFieldMap[key];
      if (fieldId && value) {
        body.set(`field[${fieldId},0]`, value);
      }
    });

    // Send as simple request — browser sends it even without CORS headers in response
    // We don't need to read the response, just fire and forget
    fetch(`${AC_BASE}/admin/api.php`, {
      method: "POST",
      body: body.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: "no-cors",
    }).catch(() => {
      // Silently fail — redirect will happen regardless
    });
  }, [email, name, phone, utms]);

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

    // Fire AC request (fire-and-forget)
    sendToActiveCampaign();

    // Redirect to checkout after small delay to let request go out
    setTimeout(() => {
      window.location.href = buildCheckoutUrl();
    }, 800);
  }, [name, email, sendToActiveCampaign, buildCheckoutUrl]);

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
