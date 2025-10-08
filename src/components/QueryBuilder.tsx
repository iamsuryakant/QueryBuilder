import { useQueryBuilder } from "@/hooks/useQueryBuilder";
import ConditionGroup from "./ConditionGroup";
import { Button } from "./ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatQuery = (group: any): any => {
  return {
    logic: group.logic,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conditions: group.conditions.map((cond: any, i: number) => {
      const isLast = i === group.conditions.length - 1;
      if ("logic" in cond) {
        return formatQuery(cond);
      } else {
        return isLast ? { ...cond } : { ...cond, logic: group.logic };
      }
    }),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pseudoJSONStringify = (obj: any, indent = 2): string => {
  const json = JSON.stringify(obj, null, indent);
  return json.replace(/"([^"]+)":/g, "$1:");
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
    const normalized = [formatQuery(query)];
    alert(pseudoJSONStringify(normalized, 2));
  };

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
          {pseudoJSONStringify([formatQuery(query)], 2)}
        </pre>
      </div>
    </div>
  );
}
