import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative min-w-0">
      <pre className="overflow-x-auto rounded-md border border-border bg-muted/30 p-4 text-xs leading-relaxed">
        <code lang={lang}>{code}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? <Check size={10} /> : <Copy size={10} />}
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
