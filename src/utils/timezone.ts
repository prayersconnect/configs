import { ICoords } from '../adhan/types';
import { TimeZoneType } from './timezonetype';
import tzlookup from '@photostructure/tz-lookup';

export function timeZoneLookup(location: ICoords): TimeZoneType | undefined {
  try {
    return tzlookup(location.latitude, location.longitude) as TimeZoneType;
  } catch (error) {
    console.error('TZ Error occurred:', error);
    return undefined;
  }
}
