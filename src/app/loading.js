import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
      <div className="animate-spin text-[#1A4D2E]">
        <Loader2 size={48} />
      </div>
      <p className="text-[#1A4D2E] font-bold mt-4 animate-pulse">Schephino's...</p>
    </div>
  );
}