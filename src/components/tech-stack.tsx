"use client";

import { techStack } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { staggerItem } from "./motion";

export function TechStack() {
  return (
    <div className="space-y-6 h-full">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">The Stack</h2>
        <p className="text-sm text-muted-foreground">Technologies I work with daily</p>
      </div>
      
      <div className="space-y-4">
        {techStack.slice(0, 3).map((category) => (
          <motion.div
            key={category.name}
            variants={staggerItem}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <category.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{category.name}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {category.items.slice(0, 4).map((item) => (
                <Badge key={item} variant="ghost" className="text-xs">
                  {item}
                </Badge>
              ))}
              {category.items.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{category.items.length - 4}
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TechStackFull() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Tech Radar</h2>
        <p className="text-muted-foreground">
          A curated view of my technical expertise across the data platform landscape
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techStack.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bento-item"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted/50">
                  <category.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <Badge key={item} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

