import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {
  return (
    <main className="text-white">
      <div>
        <h1 className="text-9xl mt-36 text-center font-palettemosaic font-bold">
          おんピシャ
        </h1>
      </div>
      <div className="mt-20 w-72 mx-auto text-2xl font-palettemosaic text-slate-300">
        <Select>
          <SelectTrigger className="w-288px]">
            <SelectValue placeholder="モードせんたく"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">つうじょうモード</SelectItem>
            <SelectItem value="dark">れんしゅうモード</SelectItem>
            <SelectItem value="system">ハモりモード</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-20 w-16 mx-auto font-palettemosaic">
        <Button variant="outline">START</Button>
      </div>
    </main>
  );
}