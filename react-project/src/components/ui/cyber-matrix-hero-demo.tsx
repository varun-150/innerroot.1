import CyberMatrixHero from "@/components/ui/cyber-matrix-hero";

export default function DemoMatrix() {
  return (
    <main className="bg-black">
      <CyberMatrixHero />
       <div className="h-screen flex items-center justify-center text-white text-4xl text-center p-8 bg-black">
        <p className="max-w-2xl font-black uppercase tracking-tighter">
          This section is a placeholder for the rest of your page content.
        </p>
      </div>
    </main>
  );
}
