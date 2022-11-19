import { getConfigByISOName } from './index';

export function formatDistance(
  distanceInMile: number,
  country: string
): string {
  const config = getConfigByISOName(country);
  let localDistance: number;
  if (config.intl.distanceUnit === 'mi') {
    localDistance = distanceInMile;
  } else {
    localDistance = distanceInMile * 1.60934;
  }

  localDistance = +localDistance.toFixed(2);

  if (config.intl.distanceUnit === 'mi') {
    return `${localDistance} ${localDistance > 1 ? 'miles' : 'mile'}`;
  } else {
    return `${localDistance} ${localDistance > 1 ? 'kilometers' : 'kilometer'}`;
  }
}
