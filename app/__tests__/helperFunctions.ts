import { checkSunriseOrSunset, convertTimestamp } from "@/app/utils/convertTimeStamp";


describe('convertTimeStamp', () => {
  it('converts timestamp correctly', () => {
    const timestamp = 1616064000; 
    const timezone = 3600; 
    const result = convertTimestamp(timestamp, timezone);
    expect(result).toEqual('11:40 am');
  });
});

describe('checkSunriseOrSunset', () => {
  it('returns sunrise when current time is between sunrise and sunset', () => {
    const sunriseTimestamp = 1616049600; 
    const sunsetTimestamp = 1616092800; 
    const timezone = 0; 
    const result = checkSunriseOrSunset(sunriseTimestamp, sunsetTimestamp, timezone);
    expect(result).toEqual('sunset');
  });

});