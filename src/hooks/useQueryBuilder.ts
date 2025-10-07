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

  const addCondition = (group: ConditionGroup) => {
    group.conditions.push({ field: "", operator: "", value: "" });
    setQuery({ ...query });
  };

  const addGroup = (group: ConditionGroup) => {
    group.conditions.push({ logic: "AND", conditions: [] });
    setQuery({ ...query });
  };

  const removeCondition = (group: ConditionGroup, index: number) => {
    group.conditions.splice(index, 1);
    setQuery({ ...query });
  };

  const updateCondition = (
    group: ConditionGroup,
    index: number,
    updated: Condition
  ) => {
    group.conditions[index] = updated;
    setQuery({ ...query });
  };

  const toggleLogic = (group: ConditionGroup) => {
    group.logic = group.logic === "AND" ? "OR" : "AND";
    setQuery({ ...query });
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
