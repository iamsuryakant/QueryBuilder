import { useQueryBuilder } from "@/hooks/useQueryBuilder";
import ConditionGroup from "./ConditionGroup";
import { Button } from "./ui/button";

export default function QueryBuilder() {
  const {
    query,
    addCondition,
    addGroup,
    removeCondition,
    updateCondition,
    toggleLogic,
  } = useQueryBuilder({ logic: "AND", conditions: [] });

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Query Builder</h1>
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
            className="mt-4 text-white"
            onClick={() => alert(JSON.stringify(query, null, 2))}
          >
            Generate Query JSON
          </Button>
        </div>

        <pre className="mt-4 bg-gray-900 text-white p-3 rounded-md text-sm overflow-x-auto">
          {JSON.stringify(query, null, 2)}
        </pre>
      </div>
    </div>
  );
}
