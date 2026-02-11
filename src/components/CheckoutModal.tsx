import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

const formSchema = z.object({
  fullname: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().trim().max(30, "Telefone muito longo").optional(),
});

type FormData = z.infer<typeof formSchema>;

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutUrl: string;
}

const CheckoutModal = ({ open, onOpenChange, checkoutUrl }: CheckoutModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    utmKeys.forEach((key) => {
      const value = params.get(key);
      if (value) {
        utms[key] = value;
      }
    });
    setUtmParams(utms);
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const buildCheckoutUrl = (data: FormData): string => {
    const url = new URL(checkoutUrl);
    if (data.fullname) url.searchParams.set("name", data.fullname);
    if (data.email) url.searchParams.set("email", data.email);
    if (data.phone) url.searchParams.set("phone", data.phone);
    Object.entries(utmParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return url.toString();
  };

  const robustRedirect = (url: string) => {
    try {
      window.location.href = url;
    } catch (e) {
      console.log("Method 1 failed");
    }
    setTimeout(() => {
      try { window.location.replace(url); } catch (e) { console.log("Method 2 failed"); }
    }, 100);
    setTimeout(() => {
      try {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_self";
        link.rel = "noopener noreferrer";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) { console.log("Method 3 failed"); }
    }, 200);
    setTimeout(() => {
      try { window.open(url, "_self"); } catch (e) { console.log("Method 4 failed"); }
    }, 300);
  };

  const submitToActiveCampaign = useCallback((data: FormData): Promise<void> => {
    return new Promise((resolve) => {
      // Build the query string exactly like AC's _form_serialize does
      const params: string[] = [];

      // AC hidden fields (matching the original form exactly)
      params.push("u=7");
      params.push("f=7");
      params.push("s=");
      params.push("c=0");
      params.push("m=0");
      params.push("act=sub");
      params.push("v=2");
      params.push("or=" + encodeURIComponent("a]f6f454dcb1acb7b64e14e88f76a8a3"));

      // User fields
      params.push("fullname=" + encodeURIComponent(data.fullname));
      params.push("email=" + encodeURIComponent(data.email));
      if (data.phone) {
        params.push("phone=" + encodeURIComponent(data.phone));
      }

      // UTM fields
      Object.entries(utmParams).forEach(([key, value]) => {
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
      });

      const serialized = params.join("&");
      const scriptUrl = "https://residentelitemarketing.activehosted.com/proc.php?" + serialized + "&jsonp=true";

      // Use JSONP approach (same as AC's _load_script) - this bypasses CORS
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.type = "text/javascript";
      script.charset = "utf-8";

      script.onload = () => {
        console.log("ActiveCampaign submission successful");
        // Clean up script tag
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        resolve();
      };

      script.onerror = () => {
        console.log("ActiveCampaign JSONP script error, proceeding anyway");
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        resolve();
      };

      document.head.appendChild(script);

      // Safety timeout - resolve after 5 seconds regardless
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  }, [utmParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Submit to ActiveCampaign via JSONP
    await submitToActiveCampaign(result.data);

    // Then redirect to checkout
    const finalUrl = buildCheckoutUrl(result.data);

    try {
      sessionStorage.setItem("checkout_redirect_url", finalUrl);
    } catch (e) {
      // sessionStorage might be blocked
    }

    robustRedirect(finalUrl);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white p-6 md:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center" style={{ color: "#1C233B" }}>
            Preencha seus dados para continuar
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullname" className="font-semibold text-gray-700">
              Nome completo
            </Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Digite seu nome"
              value={formData.fullname}
              onChange={(e) => handleInputChange("fullname", e.target.value)}
              className={`h-12 ${errors.fullname ? "border-red-500" : ""}`}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold text-gray-700">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className={`h-12 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-semibold text-gray-700">
              Telefone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Digite seu telefone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="h-12"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base md:text-lg font-semibold rounded-lg transition-all duration-300"
            style={{ backgroundColor: "#305CA9", color: "white" }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                Enviando...
              </span>
            ) : (
              "QUERO ENTRAR"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
