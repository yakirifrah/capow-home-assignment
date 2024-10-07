export function cleanUpdateData<T extends object>(originalData: Partial<T>, updatedData: T): Partial<T> {
  const result: Partial<T> = {};
  for (const key in updatedData) {
    if (updatedData[key] !== originalData[key]) {
      result[key] = updatedData[key];
    }
  }
  return result;
}