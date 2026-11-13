"use client";

import type { ReactNode } from "react";
import { tilt, untilt } from "./tilt";

/** A static card with tilt and shine on hover. Use ProjectCards for linked cards. */
export function TiltCard({ children }: { children: ReactNode }) {
  return (
    <div className="gslot">
      <div className="lift">
        {/* biome-ignore lint/a11y/noStaticElementInteractions: mouse movement only drives a decorative tilt */}
        <div
          className="tcard tcard-grid"
          style={{ cursor: "default" }}
          onMouseMove={tilt}
          onMouseLeave={untilt}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
