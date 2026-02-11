import { useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

  // Formata o telefone para o ActiveCampaign (Adiciona +55 se for BR)
  const formattedPhone = useMemo(() => {
    const clean = phone.replace(/\D/g, "");
    if (clean.length >= 10 && clean.length <= 11) {
      return `+55${clean}`;
    }
    return clean;
  }, [phone]);

  const buildCheckoutUrl = () => {
    try {
      const url = new URL(checkoutUrl);
      if (name) url.searchParams.set("name", name.trim());
      if (email) url.searchParams.set("email", email.trim());
      if (phone) url.searchParams.set("phone", phone.replace(/\D/g, ""));
      Object.entries(utms).forEach(([k, v]) => url.searchParams.set(k, v));
      return url.toString();
    } catch (e) {
      console.error("URL Error", e);
      return checkoutUrl;
    }
  };

  const handleNativeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!name || !email) {
      e.preventDefault();
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);

    // Backup via sendBeacon para garantir envio mesmo se a página fechar
    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        navigator.sendBeacon("https://residentelitemarketing.activehosted.com/proc.php", formData);
      }
    } catch (err) {
      console.log("Beacon error", err);
    }

    // O envio nativo via form -> iframe acontece automaticamente (sem preventDefault)

    setTimeout(() => {
      window.location.href = buildCheckoutUrl();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white text-center">
            Quase lá!
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-center">
            Preencha seus dados para liberar seu acesso exclusivo.
          </DialogDescription>
        </DialogHeader>

        <form
          ref={formRef}
          action="https://residentelitemarketing.activehosted.com/proc.php"
          method="POST"
          target="hidden_iframe"
          onSubmit={handleNativeSubmit}
          className="space-y-4 mt-4"
        >
          {/* Campos Ocultos de Configuração */}
          <input type="hidden" name="u" value="7" />
          <input type="hidden" name="f" value="7" />
          <input type="hidden" name="s" />
          <input type="hidden" name="c" value="0" />
          <input type="hidden" name="m" value="0" />
          <input type="hidden" name="act" value="sub" />
          <input type="hidden" name="v" value="2" />
          <input type="hidden" name="or" value="f5ed6570-3047-4163-9976-b8d190598eb4" />

          {/* Telefone formatado com +55 enviado ao AC */}
          <input type="hidden" name="phone" value={formattedPhone} />

          {/* Campos Ocultos de UTM */}
          <input type="hidden" name="field[2]" value={utms.utm_source || ""} />
          <input type="hidden" name="field[4]" value={utms.utm_medium || ""} />
          <input type="hidden" name="field[5]" value={utms.utm_campaign || ""} />
          <input type="hidden" name="field[6]" value={utms.utm_content || ""} />
          <input type="hidden" name="field[7]" value={utms.utm_term || ""} />

          {/* Inputs Visíveis */}
          <div className="space-y-1.5">
            <Label htmlFor="fullname" className="text-zinc-300">Nome Completo</Label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-blue-600"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-zinc-300">Melhor Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-blue-600"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone_view" className="text-zinc-300">WhatsApp</Label>
            <Input
              id="phone_view"
              name="phone_view"
              type="tel"
              placeholder="(84) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-blue-600"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          >
            {isSubmitting ? "Processando..." : "QUERO ENTRAR AGORA"}
          </Button>
        </form>

        <iframe name="hidden_iframe" style={{ display: "none" }} title="hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
