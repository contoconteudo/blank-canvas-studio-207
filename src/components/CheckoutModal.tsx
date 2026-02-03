import { useState, useEffect } from "react";
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

  // Capture UTM parameters on mount
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
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const buildCheckoutUrl = (data: FormData): string => {
    const url = new URL(checkoutUrl);
    
    // Add form data
    if (data.fullname) {
      url.searchParams.set("name", data.fullname);
    }
    if (data.email) {
      url.searchParams.set("email", data.email);
    }
    if (data.phone) {
      url.searchParams.set("phone", data.phone);
    }
    
    // Add UTM parameters
    Object.entries(utmParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    
    return url.toString();
  };

  // Robust redirect function - multiple fallback methods
  const robustRedirect = (url: string) => {
    // Method 1: Standard location assignment
    try {
      window.location.href = url;
    } catch (e) {
      console.log("Method 1 failed, trying alternatives");
    }

    // Method 2: location.replace (doesn't add to history)
    setTimeout(() => {
      try {
        window.location.replace(url);
      } catch (e) {
        console.log("Method 2 failed");
      }
    }, 100);

    // Method 3: Create and click a link element
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
      } catch (e) {
        console.log("Method 3 failed");
      }
    }, 200);

    // Method 4: Open in same window
    setTimeout(() => {
      try {
        window.open(url, "_self");
      } catch (e) {
        console.log("Method 4 failed");
      }
    }, 300);

    // Method 5: Form submission fallback
    setTimeout(() => {
      try {
        const form = document.createElement("form");
        form.method = "GET";
        form.action = url.split("?")[0];
        form.style.display = "none";
        
        const urlParams = new URL(url).searchParams;
        urlParams.forEach((value, key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });
        
        document.body.appendChild(form);
        form.submit();
      } catch (e) {
        console.log("Method 5 failed");
      }
    }, 400);

    // Method 6: Meta refresh as last resort
    setTimeout(() => {
      try {
        const meta = document.createElement("meta");
        meta.httpEquiv = "refresh";
        meta.content = `0;url=${url}`;
        document.head.appendChild(meta);
      } catch (e) {
        console.log("Method 6 failed");
      }
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
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

    // Build checkout URL with all parameters
    const finalUrl = buildCheckoutUrl(result.data);
    
    // Store the URL in sessionStorage as backup
    try {
      sessionStorage.setItem("checkout_redirect_url", finalUrl);
    } catch (e) {
      // sessionStorage might be blocked
    }

    // Execute robust redirect
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
                Redirecionando...
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
