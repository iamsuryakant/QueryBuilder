import type { Condition } from "../hooks/useQueryBuilder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { fieldOptions, operatorOptions } from "@/data/queryOptions";
import { Button } from "./ui/button";

interface ConditionRowProps {
  condition: Condition;
  onChange: (updated: Condition) => void;
  onRemove: () => void;
}

export default function ConditionRow({
  condition,
  onChange,
  onRemove,
}: ConditionRowProps) {
  const handleChange = (key: keyof Condition, value: string) => {
    onChange({ ...condition, [key]: value });
  };

  return (
  <div className="flex items-center gap-4 mb-3 bg-gray-50 p-3 rounded-md border">
      <Select
        onValueChange={(value) => handleChange("field", value)}
        value={condition.field}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Field" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(fieldOptions).map((field) => (
            <SelectItem key={field} value={field}>
              {field}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleChange("operator", value)}
        value={condition.operator}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Operator" />
        </SelectTrigger>
        <SelectContent>
          {operatorOptions.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleChange("value", value)}
        value={condition.value}
        disabled={!condition.field}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Value" />
        </SelectTrigger>
        <SelectContent>
          {condition.field &&
            fieldOptions[condition.field as keyof typeof fieldOptions]?.map(
              (val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              )
            )}
        </SelectContent>
      </Select>

      <Button
        className="cursor-pointer text-white hover:text-white bg-red-600 hover:bg-red-500  px-3 py-1"
        variant="ghost"
        onClick={onRemove}
      >
        Remove
      </Button>
    </div>
  );
}
