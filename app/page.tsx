import ModeSelect from "@/features/game/select/components/ModeSelect";
import { getModes } from "@/lib/api/getModes";
import { Mode } from "@/types/interface";

export default async function Home() {
  const modes: Mode[] = await getModes();

  return (
    <main className="text-white flex flex-col items-center justify-center mt-16">
      <div className="text-center">
        <h1 className="text-8xl font-palettemosaic font-bold">
          おんぴしゃ
        </h1>
        <p className="mt-4 text-xl">
          ～発声直後の声の高さをドンピシャで当てる音声測定サービス～
        </p>
      </div>
      <div className="mt-10">
      <ModeSelect modes={modes} />
      </div>
    </main>
  )
};