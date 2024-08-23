import { getDateRelativeFromOtherDate, IntervalUnit, RelativeToType } from "../src/date";

describe("getDateRelativeFromOtherDate functions", () => {
  it("should get 10 days before today", () => {
    const date = getDateRelativeFromOtherDate({ value: 10, unit: IntervalUnit.Days }, RelativeToType.Before, new Date())
        console.log(date);
    expect(date.getDate()).toEqual(13);
  });
});
