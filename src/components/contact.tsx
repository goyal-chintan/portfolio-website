"use client";

import { profile } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: profile.social.github,
    icon: Github,
    description: "Check out my code",
  },
  {
    name: "LinkedIn",
    href: profile.social.linkedin,
    icon: Linkedin,
    description: "Let's connect professionally",
  },
  {
    name: "Twitter",
    href: profile.social.twitter,
    icon: Twitter,
    description: "Follow my thoughts",
  },
  {
    name: "Email",
    href: `mailto:${profile.social.email}`,
    icon: Mail,
    description: "Get in touch directly",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
        <p className="text-muted-foreground max-w-xl">
          I&apos;m always interested in hearing about new opportunities, interesting projects,
          or just having a conversation about data platforms and engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            target={link.name !== "Email" ? "_blank" : undefined}
            rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group bento-item flex flex-col items-start"
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-accent/20 transition-colors">
                <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground dark:group-hover:text-accent transition-colors" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-medium text-foreground group-hover:text-foreground dark:group-hover:text-accent transition-colors">
              {link.name}
            </h3>
            <p className="text-sm text-muted-foreground">{link.description}</p>
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <Button size="lg" asChild>
          <a href={`mailto:${profile.social.email}`}>
            <Mail className="h-4 w-4 mr-2" />
            Send me an email
          </a>
        </Button>
        <span className="text-sm text-muted-foreground">
          or reach out on any platform above
        </span>
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
        <h3 className="font-semibold text-foreground">Let&apos;s Connect</h3>
        <p className="text-sm text-muted-foreground">
          Open to opportunities and collaborations
        </p>
      </div>
      <div className="flex items-center gap-3">
        {socialLinks.slice(0, 3).map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <link.icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
