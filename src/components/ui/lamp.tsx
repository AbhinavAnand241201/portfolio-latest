import React from "react";

export function LampContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[300px] py-8">
      {/* Lamp effect background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gradient-to-b from-white/80 to-black/0 rounded-full blur-2xl opacity-80 pointer-events-none" />
      {children}
    </div>
  );
} 