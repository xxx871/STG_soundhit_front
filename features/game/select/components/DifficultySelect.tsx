import { Difficult } from "@/types/interface";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface DifficultSelectProps {
  difficulties: Difficult[];
  onSelect: (selectedDifficult: string) => void;
}

const DifficultySelect = ({ difficulties, onSelect }: DifficultSelectProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-full text-lg text-center justify-center mt-1">
        <SelectValue placeholder="難易度を選択してください" />
      </SelectTrigger>
      <SelectContent className="w-60">
        {difficulties.map((difficulty) => (
          <SelectItem key={difficulty.id} value={difficulty.id.toString()}>
            {difficulty.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DifficultySelect;