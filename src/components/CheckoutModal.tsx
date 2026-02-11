import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutUrl: string;
}

const CheckoutModal = ({ open, onOpenChange, checkoutUrl }: CheckoutModalProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const utms = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const out: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
      const v = params.get(k);
      if (v) out[k] = v;
    });
    return out;
  }, []);

  // Build the iframe URL with UTMs as query params
  const iframeSrc = useMemo(() => {
    const params = new URLSearchParams(utms);
    const base = "/ac-form.html";
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [utms]);

  // Listen for success message from the iframe form
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "ac-form-success") {
        // Build checkout URL and redirect
        const url = new URL(checkoutUrl);
        Object.entries(utms).forEach(([k, v]) => url.searchParams.set(k, v));
        setTimeout(() => {
          window.location.href = url.toString();
        }, 1000);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [checkoutUrl, utms]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] bg-background p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl md:text-2xl font-bold text-center text-foreground">
            Garanta sua vaga no Intensivão!
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            Preencha seus dados para receber acesso imediato e começar a estudar com foco.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full px-2">
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            className="w-full border-0"
            style={{ height: "480px", minHeight: "400px" }}
            title="Formulário de inscrição"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
