import { SOCIALS } from "@/lib/socials";

export default function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-xl px-6 py-4 text-center text-xs text-muted-foreground">
      <div className="space-y-1">
        <p>
          made by{" "}
          <a
            href="https://atyb.me"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            atyb
          </a>
          . open sourced on{" "}
          <a
            href={SOCIALS.site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
