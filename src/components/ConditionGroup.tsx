import type { Condition, ConditionGroup } from "@/hooks/useQueryBuilder";
import { Button } from "./ui/button";
import ConditionRow from "./ConditionRow";

interface ConditionGroupProps {
  group: ConditionGroup;
  addCondition: (group: ConditionGroup) => void;
  addGroup: (group: ConditionGroup) => void;
  removeCondition: (group: ConditionGroup, index: number) => void;
  updateCondition: (
    group: ConditionGroup,
    index: number,
    updated: Condition
  ) => void;
  toggleLogic: (group: ConditionGroup) => void;
}

export default function ConditionGroup({
  group,
  addCondition,
  addGroup,
  removeCondition,
  updateCondition,
  toggleLogic,
}: ConditionGroupProps) {
  return (
  <div className="border rounded-lg p-5 mb-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <strong>{group.logic}</strong>
        <Button
          className="cursor-pointer text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 px-3 py-1"
          variant="outline"
          size="sm"
          onClick={() => toggleLogic(group)}
        >
          Switch to {group.logic === "AND" ? "OR" : "AND"}
        </Button>
      </div>
      {group.conditions.map((cond, index) =>
        "logic" in cond ? (
          <ConditionGroup
            key={index}
            group={cond}
            addCondition={addCondition}
            addGroup={addGroup}
            removeCondition={removeCondition}
            updateCondition={updateCondition}
            toggleLogic={toggleLogic}
          />
        ) : (
          <ConditionRow
            key={index}
            condition={cond}
            onChange={(updated) => updateCondition(group, index, updated)}
            onRemove={() => removeCondition(group, index)}
          />
        )
      )}
      <div className="flex gap-3 mt-3">
        <Button
          className="cursor-pointer text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 px-3 py-1"
          variant="secondary"
          onClick={() => addCondition(group)}
        >
          + Add Condition
        </Button>
        <Button
          className="cursor-pointer text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 px-3 py-1"
          variant="outline"
          onClick={() => addGroup(group)}
        >
          + Add Group
        </Button>
      </div>
    </div>
  );
}
