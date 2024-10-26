export const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export interface StatusOption {
  uid: string;
  name: string;
}
