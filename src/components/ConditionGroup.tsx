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
    <div className="border rounded-lg p-4 mb-3 bg-white shadow-sm">
      <div className="flex justify-between mb-3">
        <strong>{group.logic}</strong>
        <Button
          className="text-white bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
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
      <div className="flex gap-2 mt-2">
        <Button variant="secondary" onClick={() => addCondition(group)}>
          Add Condition
        </Button>
        <Button variant="outline" onClick={() => addGroup(group)}>
          Add Group
        </Button>
      </div>
    </div>
  );
}
