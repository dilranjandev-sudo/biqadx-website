import type { ReactNode } from "react";
import { Container } from "./Container";

/** Paper-toned content section (the default subpage surface, brief §3). */
export function PaperSection({
  children,
  className = "",
  containerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section className={`bg-paper text-ink ${className}`}>
      <Container className={`py-16 sm:py-24 ${containerClassName}`}>
        {children}
      </Container>
    </section>
  );
}

/** A short Void-toned band used to close a subpage with a single line, echoing
 *  Home's dark surface and the through-line motif. */
export function VoidBand({ children }: { children: ReactNode }) {
  return (
    <section className="bg-void">
      <Container className="py-20 text-center sm:py-24">{children}</Container>
    </section>
  );
}
