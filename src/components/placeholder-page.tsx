import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface PlaceholderPageProps {
  title: string;
  message: string;
  icon?: ReactNode;
  backLink?: string;
  actionText?: string;
  actionLink?: string;
}

export function PlaceholderPage({
  title,
  message,
  icon,
  backLink = "/",
  actionText,
  actionLink,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        {icon && (
          <div className="text-muted-foreground flex justify-center">
            {icon}
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-foreground">
            {title}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild>
            <Link href={backLink}>
              ← Back to Home
            </Link>
          </Button>

          {actionText && actionLink && (
            <Button asChild>
              <a href={actionLink} target="_blank" rel="noopener noreferrer">
                {actionText}
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

