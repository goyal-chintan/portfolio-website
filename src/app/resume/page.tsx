import { Metadata } from "next";
import { ResumeView } from "@/components/resume/ResumeView";

export const metadata: Metadata = {
  title: "Resume | Chintan Goyal",
  description: "Professional experience and skills flight log.",
};

export default function ResumePage() {
  return (
    <div className="container px-4 py-24 min-h-screen">
      <ResumeView />
    </div>
  );
}
