import { useQueryBuilder } from "@/hooks/useQueryBuilder";
import ConditionGroup from "./ConditionGroup";
import { Button } from "./ui/button";


type Condition = {
  field: string;
  operator: string;
  value: string | number | boolean;
  logic?: "AND" | "OR";
};

type ConditionGroupType = {
  logic: "AND" | "OR";
  conditions: Array<Condition | ConditionGroupType>;
};

const normalizeQueryWithConditionalLogic = (group: ConditionGroupType): ConditionGroupType => {
  const normalizedConditions = group.conditions.map((cond: Condition | ConditionGroupType, index: number) => {
    const isLast = index === group.conditions.length - 1;

    if ("logic" in cond && Array.isArray((cond as ConditionGroupType).conditions)) {
      return normalizeQueryWithConditionalLogic(cond as ConditionGroupType);
    } else {
      return isLast
        ? { ...cond }
        : { ...cond, logic: group.logic};
    }
  });

  return {
    logic: group.logic,
    conditions: normalizedConditions,
  };
};

export default function QueryBuilder() {
  const {
    query,
    addCondition,
    addGroup,
    removeCondition,
    updateCondition,
    toggleLogic,
  } = useQueryBuilder({ logic: "AND", conditions: [] });

  const handleGenerteQuery = () => {
    const normalized = normalizeQueryWithConditionalLogic(query);
    alert(JSON.stringify(normalized, null, 2));
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-4">
        <h1 className="text-2xl font-bold mb-2 text-center">Query Builder</h1>
        <ConditionGroup
          group={query}
          addCondition={addCondition}
          addGroup={addGroup}
          removeCondition={removeCondition}
          updateCondition={updateCondition}
          toggleLogic={toggleLogic}
        />

        <div className="flex justify-center">
          <Button
            className="cursor-pointer mt-4 bg-red-600 text-white hover:bg-red-500"
            onClick={handleGenerteQuery}
          >
            Generate Query JSON
          </Button>
        </div>

        <pre className="mt-4 bg-gray-900 text-white p-3 rounded-md text-sm overflow-x-auto">
          {JSON.stringify([normalizeQueryWithConditionalLogic(query)], null, 2)}
        </pre>
      </div>
    </div>
  );
}

