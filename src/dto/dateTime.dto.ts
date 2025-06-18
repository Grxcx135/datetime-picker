import { isNil } from 'lodash';

interface DateType {
  day: string;
  month: string;
  year: string;
}

interface TimeType {
  hour: string;
  minute: string;
  meridiemType?: string;
}

class dateTime {
  date: DateType = { day: '', month: '', year: '' };
  time: TimeType = {
    hour: '',
    minute: '',
    meridiemType: ''
  };

  constructor(dateTime?: {
    date: DateType;
    time: TimeType;
  }) {
    if (dateTime) {
      this.date = dateTime.date;
      this.time = dateTime.time;
    }
  }

  isDateUnitYear(dateUnit: string): boolean {
    return dateUnit === 'year';
  }
}

export default dateTime;
