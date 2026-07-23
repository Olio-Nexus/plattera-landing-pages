"use client";

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/tracking";

/** Persists first-touch UTM / ad params on load. Renders nothing. */
export function TrackingInit() {
  useEffect(() => {
    captureFirstTouch();
  }, []);
  return null;
}
