import {
  CalculationParameters,
  Coordinates,
  MidnightMethod,
  Prayer,
  PrayerTimes,
  SunnahTimes,
} from 'adhan-extended';
import { DateTime } from 'luxon';
import {
  IAdhanCalculatedType,
  PrayerTimesOptions,
  FormatOptions,
} from './types';
import { ValueOf } from 'adhan-extended/lib/types/TypeUtils';

export class PrayerAndSunnahTimes {
  public prayerTimes: PrayerTimes;
  public sunnahTimes: SunnahTimes;
  public options: PrayerTimesOptions;
  public dateTime: DateTime;

  private _fajr: DateTime | undefined;
  private _sunrise: DateTime | undefined;
  private _dhuhr: DateTime | undefined;
  private _asr: DateTime | undefined;
  private _sunset: DateTime | undefined;
  private _maghrib: DateTime | undefined;
  private _isha: DateTime | undefined;
  private _midnight: DateTime | undefined;
  private _tahajjud: DateTime | undefined;

  constructor(date: DateTime, options: PrayerTimesOptions) {
    this.options = options;
    this.dateTime = date;
    this.prayerTimes = new PrayerTimes(
      options.coordinates,
      date.toJSDate(),
      options.calculationParameters
    );

    this.sunnahTimes = new SunnahTimes(
      this.prayerTimes,
      MidnightMethod[options.midnightMethod as keyof typeof MidnightMethod]
    );
  }

  get coordinates(): Coordinates {
    return this.coordinates;
  }

  get calculationParameters(): CalculationParameters {
    return this.prayerTimes.calculationParameters;
  }

  get date(): DateTime {
    return DateTime.fromJSDate(this.prayerTimes.date);
  }

  get fajr(): DateTime {
    return DateTime.fromJSDate(this.prayerTimes.fajr);
  }

  set fajr(value: DateTime) {
    this._fajr = value;
  }

  get sunrise(): DateTime {
    return DateTime.fromJSDate(this.prayerTimes.sunrise);
  }

  set sunrise(value: DateTime) {
    this._sunrise = value;
  }

  get dhuhr(): DateTime {
    return DateTime.fromJSDate(this.prayerTimes.dhuhr);
  }

  set dhuhr(value: DateTime) {
    this._dhuhr = value;
  }

  get asr(): DateTime {
    return DateTime.fromJSDate(this.prayerTimes.asr);
  }

  set asr(value: DateTime) {
    this._asr = value;
  }

  get sunset(): DateTime {
    return DateTime.fromJSDate(this.prayerTimes.sunset);
  }

  set sunset(value: DateTime) {
    this._sunset = value;
  }

  get maghrib(): DateTime {
    return DateTime.fromJSDate(this.prayerTimes.maghrib);
  }

  set maghrib(value: DateTime) {
    this._maghrib = value;
  }

  get isha(): DateTime {
    return DateTime.fromJSDate(this.prayerTimes.isha);
  }

  set isha(value: DateTime) {
    this._isha = value;
  }

  get midnight(): DateTime {
    return DateTime.fromJSDate(this.sunnahTimes.middleOfTheNight).plus({
      minutes: this.options.midnightAdjustment,
    });
  }

  set midnight(value: DateTime) {
    this._midnight = value;
  }

  get tahajjud(): DateTime {
    return DateTime.fromJSDate(this.sunnahTimes.lastThirdOfTheNight);
  }

  set tahajjud(value: DateTime) {
    this._tahajjud = value;
  }

  timeForPrayer(prayer: ValueOf<typeof Prayer>): DateTime | null {
    const date = this.prayerTimes.timeForPrayer(prayer);
    return date ? DateTime.fromJSDate(date) : null;
  }

  currentPrayer(
    date: DateTime = DateTime.now()
  ): 'none' | 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' {
    return this.prayerTimes.currentPrayer(date.toJSDate());
  }

  nextPrayer(
    date: DateTime = DateTime.now()
  ): 'none' | 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' {
    return this.prayerTimes.nextPrayer(date.toJSDate());
  }

  format(options: FormatOptions): IAdhanCalculatedType {
    const timezone = options.timezone || 'UTC';
    const formatString = options.use24HourFormat ? 'HH:mm' : 'h:mm a';

    const formatTime = (time: DateTime) => {
      return time.setZone(timezone).toFormat(formatString);
    };

    return {
      fajr: formatTime(this.fajr),
      sunrise: formatTime(this.sunrise),
      dhuhr: formatTime(this.dhuhr),
      asr: formatTime(this.asr),
      sunset: formatTime(this.sunset),
      maghrib: formatTime(this.maghrib),
      isha: formatTime(this.isha),
      midnight: formatTime(this.midnight),
      tahajjud: formatTime(this.tahajjud),
    };
  }
}
