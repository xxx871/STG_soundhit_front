import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {
  return (
    <main className="text-white">
      <div>
        <h1 className="text-9xl mt-36 text-center font-recursive font-bold">
          音ピシャ
        </h1>
      </div>
      <div className="mt-20 w-44 mx-auto text-2xl">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="モード"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">通常モード</SelectItem>
            <SelectItem value="dark">練習モード</SelectItem>
            <SelectItem value="system">ハモりモード</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-20 w-16 mx-auto">
        <Button variant="outline">START</Button>
      </div>
    </main>
  );
}