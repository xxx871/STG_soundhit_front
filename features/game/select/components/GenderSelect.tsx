import { Gender } from '@/types/interface'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface GenderSelectProps {
  genders: Gender[];
  onSelect: (selectedGender: string) => void;
}

const GenderSelect = ({ genders, onSelect }: GenderSelectProps) => {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-full text-lg text-center justify-center mt-1">
        <SelectValue placeholder="性別を選択してください" />
      </SelectTrigger>
      <SelectContent className="w-60">
        {genders.map((gender) => (
          <SelectItem key={gender.id} value={gender.id.toString()}>
            {gender.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GenderSelect;