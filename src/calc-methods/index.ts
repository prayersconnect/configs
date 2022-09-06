import methodsData from './methods';

export const methods = methodsData.shared.methods;

export const getMethodByName = (name: string) => {
  return methods.find((method) => method.name === name);
}