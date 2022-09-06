import methodsData from './methods';

export const getCalcMethodByName = (name: string) => {
  return methodsData.find((method) => method.name === name);
}

export const getCalcMethods = () => {
  return methodsData.map(({name, label}) => {
    return {name, label}
  });
}