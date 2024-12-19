import { AnimatedCTAInput } from "@/components/ui/animated-cta-input";

interface CTAButtonProps {
  onSubmit: (username: string) => void;
}

export function CTAButton({ onSubmit }: CTAButtonProps) {
  return <AnimatedCTAInput onSubmit={onSubmit} />;
}
