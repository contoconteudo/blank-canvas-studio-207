import { useCallback, useMemo, useState, useRef } from "react";
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

const CheckoutModal = ({ open, onOpenChange, checkoutUrl }: CheckoutModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Referência para o formulário oculto
  const formRef = useRef<HTMLFormElement>(null);

  // Captura UTMs da URL atual
  const utms = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
      const v = params.get(k);
      if (v) out[k] = v;
    });
    return out;
  }, []);

  // Constrói a URL do Checkout
  const buildCheckoutUrl = useCallback(() => {
    const url = new URL(checkoutUrl);
    if (name) url.searchParams.set("name", name.trim());
    if (email) url.searchParams.set("email", email.trim());
    if (phone) url.searchParams.set("phone", phone.trim());
    Object.entries(utms).forEach(([k, v]) => url.searchParams.set(k, v));
    return url.toString();
  }, [checkoutUrl, name, email, phone, utms]);

  const handleSubmit = () => {
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

    // 1. Submete o formulário oculto "nativo" (que envia para o iframe)
    if (formRef.current) {
      formRef.current.submit();
    }

    // 2. Aguarda 2 segundos para garantir que o envio saiu do navegador
    // Essa pausa é CRUCIAL para não cancelar a requisição
    setTimeout(() => {
      window.location.href = buildCheckoutUrl();
    }, 2000);
  };

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
            {isSubmitting ? "Redirecionando..." : "QUERO ENTRAR"}
          </Button>
        </div>

        {/* --- FORMULÁRIO OCULTO ENGINE (MOTOR DO ACTIVE CAMPAIGN) --- */}
        {/* Este formulário não aparece na tela, mas envia os dados exatamente como o embed nativo */}
        <form
          ref={formRef}
          method="POST"
          action="https://residentelitemarketing.activehosted.com/proc.php"
          target="hidden_iframe"
          style={{ display: "none" }}
        >
          {/* Campos Ocultos Obrigatórios do AC (IDs atualizados conforme seu código) */}
          <input type="hidden" name="u" value="7" />
          <input type="hidden" name="f" value="7" />
          <input type="hidden" name="s" value="" />
          <input type="hidden" name="c" value="0" />
          <input type="hidden" name="m" value="0" />
          <input type="hidden" name="act" value="sub" />
          <input type="hidden" name="v" value="2" />
          <input type="hidden" name="or" value="f5ed6570-3047-4163-9976-b8d190598eb4" />

          {/* Dados do Usuário (Sincronizados com o State do React) */}
          <input type="hidden" name="fullname" value={name} />
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="phone" value={phone} />

          {/* UTMs (Sincronizados com a URL) */}
          <input type="hidden" name="field[2]" value={utms.utm_source || ""} />
          <input type="hidden" name="field[4]" value={utms.utm_content || ""} />
          <input type="hidden" name="field[5]" value={utms.utm_medium || ""} />
          <input type="hidden" name="field[6]" value={utms.utm_term || ""} />
          <input type="hidden" name="field[7]" value={utms.utm_campaign || ""} />
        </form>

        {/* Iframe invisível que recebe a resposta do formulário para a página não recarregar */}
        <iframe
          name="hidden_iframe"
          style={{ display: "none" }}
          title="hidden_iframe"
        ></iframe>

      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
