import { useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
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

const CheckoutModal = ({ open, onOpenChange, checkoutUrl }: CheckoutModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const utms = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
      const v = params.get(k);
      if (v) out[k] = v;
    });
    return out;
  }, []);

  const buildCheckoutUrl = () => {
    const url = new URL(checkoutUrl);
    if (name) url.searchParams.set("name", name.trim());
    if (email) url.searchParams.set("email", email.trim());
    if (phone) url.searchParams.set("phone", phone.trim());
    Object.entries(utms).forEach(([k, v]) => url.searchParams.set(k, v));
    return url.toString();
  };

  const handleNativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Por favor, preencha nome e email.");
      return;
    }

    setIsSubmitting(true);

    // 1. Dispara o envio nativo para o ActiveCampaign (vai para o iframe oculto)
    if (formRef.current) {
      formRef.current.submit();
    }

    // 2. Aguarda e redireciona para o Checkout
    setTimeout(() => {
      window.location.href = buildCheckoutUrl();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background p-6 md:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center text-foreground">
            Quase lá!
          </DialogTitle>
        </DialogHeader>

        {/* FORMULÁRIO NATIVO REAL */}
        <form
          ref={formRef}
          action="https://residentelitemarketing.activehosted.com/proc.php"
          method="POST"
          target="hidden_iframe"
          onSubmit={handleNativeSubmit}
        >
          {/* Campos Ocultos de Configuração */}
          <input type="hidden" name="u" value="7" />
          <input type="hidden" name="f" value="7" />
          <input type="hidden" name="s" value="" />
          <input type="hidden" name="c" value="0" />
          <input type="hidden" name="m" value="0" />
          <input type="hidden" name="act" value="sub" />
          <input type="hidden" name="v" value="2" />
          {/* HASH CORRIGIDO */}
          <input type="hidden" name="or" value="f5ed6570-3047-4163-9976-b8d190598eb4" />

          {/* Mapeamento de UTMs */}
          <input type="hidden" name="field[2]" value={utms.utm_source || ""} />
          <input type="hidden" name="field[4]" value={utms.utm_content || ""} />
          <input type="hidden" name="field[5]" value={utms.utm_medium || ""} />
          <input type="hidden" name="field[6]" value={utms.utm_term || ""} />
          <input type="hidden" name="field[7]" value={utms.utm_campaign || ""} />

          {/* Campos Visíveis */}
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="checkout-name" className="block text-sm font-semibold text-foreground">
                Nome Completo <span className="text-destructive">*</span>
              </label>
              <Input
                id="checkout-name"
                name="fullname"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
                autoComplete="name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="checkout-email" className="block text-sm font-semibold text-foreground">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                id="checkout-email"
                name="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                autoComplete="email"
                inputMode="email"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="checkout-phone" className="block text-sm font-semibold text-foreground">
                Telefone (Whatsapp)
              </label>
              <Input
                id="checkout-phone"
                name="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-base font-semibold"
            >
              {isSubmitting ? "Processando..." : "QUERO ENTRAR"}
            </Button>
          </div>
        </form>

        {/* Iframe invisível */}
        <iframe
          name="hidden_iframe"
          style={{ display: "none" }}
          tabIndex={-1}
          aria-hidden="true"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
