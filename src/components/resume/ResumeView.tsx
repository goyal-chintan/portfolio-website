"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Building2, Twitter } from "lucide-react";
import { content } from "@/config/content.generated";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
};

export function ResumeView() {
    const profile = content.profile;
    const resume = content.resume;
    const socialButtons = [
        {
            label: "GitHub",
            href: profile.social.github,
            icon: Github,
        },
        {
            label: "LinkedIn",
            href: profile.social.linkedin,
            icon: Linkedin,
        },
        {
            label: "X",
            href: profile.social.twitter,
            icon: Twitter,
        },
    ].filter((item) => Boolean(item.href));

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn(
                "max-w-4xl mx-auto p-8 md:p-12 rounded-3xl",
                "bg-card/80 backdrop-blur-xl border border-border", // Basic structure
                "shadow-lift transition-shadow duration-500",

                // Light Mode: "Sheet of Paper"
                "light:bg-white light:shadow-2xl light:shadow-black/5 light:border-black/5",

                // Dark Mode: "Holographic Tablet"
                "dark:bg-glass-panel dark:border-glass-border dark:shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
            )}
        >
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-12 border-b border-border pb-8">
                <div className="space-y-2">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold tracking-tight text-primary"
                        variants={itemVariants}
                    >
                        {profile.name}
                    </motion.h1>
                    <motion.p
                        className="text-xl text-muted-foreground font-medium"
                        variants={itemVariants}
                    >
                        {profile.title}
                    </motion.p>
                    <motion.div
                        className="flex items-center gap-4 text-sm text-muted-foreground pt-2"
                        variants={itemVariants}
                    >
                        <span>{profile.location}</span>
                        <span>•</span>
                        <a href={`mailto:${profile.social.email}`} className="hover:text-primary transition-colors">
                            {profile.social.email}
                        </a>
                    </motion.div>
                </div>

                <motion.div className="flex flex-wrap gap-3 items-start" variants={itemVariants}>
                    {socialButtons.map((button) => {
                        const Icon = button.icon;
                        return (
                            <Button key={button.label} variant="outline" size="sm" asChild>
                                <a href={button.href} target="_blank" rel="noopener noreferrer">
                                    <Icon className="w-4 h-4 mr-2" />
                                    {button.label}
                                </a>
                            </Button>
                        );
                    })}
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
                {/* LEFT COLUMN: EXPERIENCE */}
                <div className="space-y-10">
                    <motion.div variants={itemVariants}>
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-accent" />
                            Experience
                        </h2>

                        <div className="relative border-l border-border ml-2 space-y-10">
                            {resume.experience.map((job, idx) => (
                                <div key={idx} className="relative pl-8">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-background" />

                                    <div className="space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                            <h3 className="text-lg font-bold text-foreground">{job.role}</h3>
                                            <span className="text-sm font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                                                {job.period}
                                            </span>
                                        </div>

                                        <div className="text-base font-medium text-primary/80">{job.company}</div>

                                        <ul className="space-y-2 text-muted-foreground leading-relaxed">
                                            {job.highlights.map((highlight) => (
                                                <li key={highlight}>• {highlight}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: SKILLS & SUMMARY */}
                <div className="space-y-10">
                    <motion.div variants={itemVariants}>
                        <h2 className="text-xl font-semibold mb-6">About</h2>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            {resume.summary}
                        </p>
                    </motion.div>

                    {/* Iterate over Tech Categories */}
                    {resume.skills.map((cat) => (
                        <motion.div key={cat.category} variants={itemVariants}>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                {cat.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.items.map((item) => (
                                    <Badge
                                        key={item}
                                        variant="secondary"
                                        className="bg-secondary/50 hover:bg-secondary transition-colors"
                                    >
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
