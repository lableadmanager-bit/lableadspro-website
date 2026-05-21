import { Sparkles } from "lucide-react";

export default function NewLabDetection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-[var(--color-dark)] to-[#1a2d4a] rounded-2xl p-8 md:p-12 text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-8 h-8 text-[var(--color-brand)]" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            New Lab Detection
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            New labs are the hottest commodity in equipment sales — a completely empty lab has to be filled with something. Our proprietary New Lab Detection finds them before the competition does, so you can be the first rep through the door.
          </p>
        </div>
      </div>
    </section>
  );
}
