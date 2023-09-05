import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import arraySupport from 'dayjs/plugin/arraySupport';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import calendar from 'dayjs/plugin/calendar';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import isMoment from 'dayjs/plugin/isMoment';
import isoWeek from 'dayjs/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isYesterday from 'dayjs/plugin/isYesterday';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import objectSupport from 'dayjs/plugin/objectSupport';
import pluralGetSet from 'dayjs/plugin/pluralGetSet';
import preParsePostFormat from 'dayjs/plugin/preParsePostFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import toArray from 'dayjs/plugin/toArray';
import toObject from 'dayjs/plugin/toObject';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

dayjs.extend(advancedFormat);
dayjs.extend(arraySupport);
dayjs.extend(buddhistEra);
dayjs.extend(calendar);
dayjs.extend(customParseFormat);
dayjs.extend(dayOfYear);
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(isLeapYear);
dayjs.extend(isMoment);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);
dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(minMax);
dayjs.extend(objectSupport);
dayjs.extend(pluralGetSet);
dayjs.extend(preParsePostFormat);
dayjs.extend(quarterOfYear);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(toArray);
dayjs.extend(toObject);
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(weekday);

dayjs.tz.setDefault('UTC');
