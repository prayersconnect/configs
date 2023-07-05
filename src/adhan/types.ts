export interface ICoords {
  latitude: number;
  longitude: number;
}

export interface IAdhanCalculationExtras {
  calculation_method_meta?: {
    fajr?: number;
    isha?: number;
  };
  highLatRule?: string;
}
