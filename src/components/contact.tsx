"use client";

import { content } from "@/config/content.generated";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, X, ArrowUpRight } from "lucide-react";

const copy = content.copy;

const socialLinks = [
  {
    name: copy.contact.platform.github,
    href: content.profile.social.github,
    icon: Github,
    description: copy.contact.cards.github,
  },
  {
    name: copy.contact.platform.linkedin,
    href: content.profile.social.linkedin,
    icon: Linkedin,
    description: copy.contact.cards.linkedin,
  },
  {
    name: copy.contact.platform.twitter,
    href: content.profile.social.twitter,
    icon: X,
    description: copy.contact.cards.twitter,
  },
  {
    name: copy.contact.platform.email,
    href: `mailto:${content.profile.social.email}`,
    icon: Mail,
    description: copy.contact.cards.email,
  },
].filter((link) => Boolean(link.href));

export function ContactSection() {
  return (
    <section id="contact" className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">{copy.contact.title}</h2>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          {copy.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {socialLinks.map((link) => {
          const isMail = link.href.startsWith("mailto:");
          return (
          <a
            key={link.name}
            href={link.href}
            target={isMail ? undefined : "_blank"}
            rel={isMail ? undefined : "noopener noreferrer"}
            className={cn(
              "group relative p-8 rounded-[2rem] transition-all duration-500",
              "card-glass hover:bg-glass-panel/60 hover:border-primary/30",
              "shadow-xl shadow-black/5"
            )}
          >
            <div className="flex items-center justify-between w-full mb-6">
              <div className="p-3 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                <link.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-xl tracking-tight text-foreground">
                {link.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {link.description}
              </p>
            </div>
          </a>
        );
        })}
      </div>

      {/* Primary CTA */}
      <div className="flex flex-col md:flex-row items-center gap-6 pt-8">
        <Button
          size="lg"
          className="rounded-full px-10 h-16 text-lg font-semibold bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-primary/20"
          asChild
        >
          <a href={`mailto:${content.profile.social.email}`}>
            <Mail className="h-5 w-5 mr-3" />
            {copy.contact.primaryCta}
          </a>
        </Button>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{copy.contact.responseLatency}</span>
          <span className="text-xs text-muted-foreground">{copy.contact.responseNote}</span>
        </div>
      </div>
    </section>
  );
}

export function ContactPreview() {
  return (
    <div className="flex flex-col justify-center items-center h-full text-center space-y-4">
      <div className="p-3 rounded-full bg-muted/50">
        <Mail className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-foreground">{copy.contact.title}</h3>
        <p className="text-sm text-muted-foreground">
          {copy.contact.subtitle}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {socialLinks.slice(0, 3).map((link) => (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <link.icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}






