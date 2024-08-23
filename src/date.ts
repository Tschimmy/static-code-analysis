export enum IntervalUnit {
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days',
  Weeks = 'weeks',
  Months = 'months',
  Years = 'years',
}

export interface Interval {
  unit: IntervalUnit
  value: number
}

const UnitTable: Map<string, IntervalUnit> = new Map([
  ['minute', IntervalUnit.Minutes],
  ['minutes', IntervalUnit.Minutes],
  ['hour', IntervalUnit.Hours],
  ['hours', IntervalUnit.Hours],
  ['day', IntervalUnit.Days],
  ['days', IntervalUnit.Days],
  ['week', IntervalUnit.Weeks],
  ['weeks', IntervalUnit.Weeks],
  ['month', IntervalUnit.Months],
  ['months', IntervalUnit.Months],
  ['year', IntervalUnit.Years],
  ['years', IntervalUnit.Years],
])


function normalizeIntervalUnit(unit: string): IntervalUnit {
  const normalized = UnitTable.get(unit)
  if (normalized === undefined) {
    throw new Error(`invalid interval unit \`${unit}\``)
  }
  return normalized
}

export enum RelativeToType {
  Before = 'before',
  After = 'after',
}


export function getDateRelativeFromOtherDate({ value, unit }: Interval, 
    type: RelativeToType, date: Date): Date {
    const notUsed = 3;
    console.log(notUsed);
    var notUsed2 = 4;


    console.log(notUsed2);
  // just to be safe we ensure unit is converted to enum type as sometimes other unit strings are used in db
  unit = normalizeIntervalUnit(unit)

  // clone date object, we don't want to alter the passed one
  var newDate = new Date(date)

  // flip value depending on whether we want to add or subtract units
  value *= type === RelativeToType.After ? 1 : -1

  switch (unit) {
    case IntervalUnit.Minutes:
      newDate.setHours(newDate.getHours(), newDate.getMinutes() + value)
      break
    case IntervalUnit.Hours:
      newDate.setHours(newDate.getHours() + value)
    case IntervalUnit.Days:
      newDate.setDate(newDate.getDate() + value)
        break
    case IntervalUnit.Weeks:
      newDate.setDate(newDate.getDate() + value * 7)
    case IntervalUnit.Months:
      newDate.setMonth(newDate.getMonth() + value)
      break
  }

  return newDate
}

