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

  const buildCheckoutUrl = () => {
    try {
      const url = new URL(checkoutUrl);
      if (name) url.searchParams.set("name", name.trim());
      if (email) url.searchParams.set("email", email.trim());
      if (phone) url.searchParams.set("phone", phone.replace(/\D/g, ""));
      Object.entries(utms).forEach(([k, v]) => url.searchParams.set(k, v));
      return url.toString();
    } catch (e) {
      console.error("Invalid Checkout URL", e);
      return checkoutUrl;
    }
  };

  const handleNativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      return;
    }

    setIsSubmitting(true);

    if (formRef.current) {
      formRef.current.submit();
    }

    setTimeout(() => {
      window.location.href = buildCheckoutUrl();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] bg-zinc-950 border-zinc-800 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl md:text-2xl font-bold text-center text-white">
            Quase lá!
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-zinc-400">
            Preencha seus dados para liberar seu acesso exclusivo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleNativeSubmit} className="px-6 pb-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="modal-name" className="text-zinc-300">Nome Completo</Label>
            <Input
              id="modal-name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-blue-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-email" className="text-zinc-300">Melhor Email</Label>
            <Input
              id="modal-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-blue-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-phone" className="text-zinc-300">WhatsApp</Label>
            <Input
              id="modal-phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-blue-600"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            {isSubmitting ? "Processando..." : "QUERO ENTRAR AGORA"}
          </Button>
        </form>

        {/* Motor oculto ActiveCampaign */}
        <form
          ref={formRef}
          method="POST"
          action="https://residentelitemarketing.activehosted.com/proc.php"
          target="hidden_iframe"
          style={{ display: "none" }}
        >
          <input type="hidden" name="u" value="7" />
          <input type="hidden" name="f" value="7" />
          <input type="hidden" name="s" />
          <input type="hidden" name="c" value="0" />
          <input type="hidden" name="m" value="0" />
          <input type="hidden" name="act" value="sub" />
          <input type="hidden" name="v" value="2" />
          <input type="hidden" name="or" value="f5ed6570-3047-4163-9976-b8d190598eb4" />

          <input type="hidden" name="fullname" value={name} />
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="phone" value={phone} />

          <input type="hidden" name="field[2]" value={utms.utm_source || ""} />
          <input type="hidden" name="field[4]" value={utms.utm_medium || ""} />
          <input type="hidden" name="field[5]" value={utms.utm_campaign || ""} />
          <input type="hidden" name="field[6]" value={utms.utm_content || ""} />
          <input type="hidden" name="field[7]" value={utms.utm_term || ""} />
        </form>

        <iframe name="hidden_iframe" style={{ display: "none" }} title="hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
