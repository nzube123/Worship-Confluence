import { useMutation } from "@tanstack/react-query"

export const useCustomMutation = <T,>(mutateFn: (variables: T) => Promise<any>) => {
  return useMutation({
    mutationKey: ["data"],
    mutationFn: mutateFn,
  })}