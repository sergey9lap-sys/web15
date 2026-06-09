"use client";

import { useEffect } from "react";
import { saveTrackingParamsFromLocation } from "./tracking";

export function TrackingParams() {
  useEffect(() => {
    saveTrackingParamsFromLocation();
  }, []);

  return null;
}
