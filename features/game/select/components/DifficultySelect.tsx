import { Difficult } from "@/types/interface";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface DifficultSelectProps {
  difficulties: Difficult[];
  onSelect: (selectedDifficult: string) => void;
}

const DifficultySelect = ({ difficulties, onSelect }: DifficultSelectProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-full h-16 text-xl text-center mt-2">
        <SelectValue placeholder="難易度を選択してください" />
      </SelectTrigger>
      <SelectContent className="w-72">
        {difficulties.map((difficulty) => (
          <SelectItem key={difficulty.id} value={difficulty.id.toString()} className="text-xl py-3">
            {difficulty.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DifficultySelect