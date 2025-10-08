import { useState } from "react";

export type Condition = {
  field: string;
  operator: string;
  value: string;
};

export type ConditionGroup = {
  logic: "AND" | "OR";
  conditions: (Condition | ConditionGroup)[];
};

export function useQueryBuilder(initial: ConditionGroup) {
  const [query, setQuery] = useState<ConditionGroup>(initial);

  const updateQuery = (current: ConditionGroup, target: ConditionGroup, updateFn: (g: ConditionGroup) => void): ConditionGroup => {
    if (current === target) {
      const copy = structuredClone(current);
      updateFn(copy);
      return copy;
    }

    return {
      ...current,
      conditions: current.conditions.map((cond) => {
        if ("logic" in cond) {
          return updateQuery(cond, target, updateFn);
        }
        return cond;
      }),
    }
  }

  const addCondition = (group: ConditionGroup) => {
    setQuery((prev) => 
      updateQuery(prev, group, (g) => {
        g.conditions.push({ field: "", operator: "", value: "" });
      })
    );
  };

  const addGroup = (group: ConditionGroup) => {
    setQuery((prev) => 
      updateQuery(prev, group, (g) => {
        g.conditions.push({ logic: "AND", conditions: [] });
      })
    );
  };

  const removeCondition = (group: ConditionGroup, index: number) => {
    setQuery((prev) => 
      updateQuery(prev, group, (g) => {
        g.conditions.splice(index, 1);
      })
    );
  };

  const updateCondition = (
    group: ConditionGroup,
    index: number,
    updated: Condition
  ) => {
    setQuery((prev) => 
      updateQuery(prev, group, (g) => {
        g.conditions[index] = updated;
      })
    );
  };

  const toggleLogic = (group: ConditionGroup) => {
    setQuery((prev) => 
      updateQuery(prev, group, (g) => {
        g.logic = g.logic === "AND" ? "OR" : "AND";
      })
    );
  };

  return {
    query,
    setQuery,
    addCondition,
    addGroup,
    removeCondition,
    updateCondition,
    toggleLogic,
  };
}
