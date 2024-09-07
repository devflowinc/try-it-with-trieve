import { getCustomDateRange } from "../createURLfromSearch";

describe("getCustomDateRange", () => {
  it("should return correct date range string", () => {
    const start = "1725328800"; // 2024-09-02 00:00:00 UTC
    const end = "1725674400"; // 2024-09-06 00:00:00 UTC

    const result = getCustomDateRange(start, end);
    const expectedDateRange = JSON.stringify({
      gt: "2024-09-02",
      lt: "2024-09-06",
    });
    expect(result).toBe(expectedDateRange);
  });

  it("should handle null start date", () => {
    const start = null;
    const end = "1640995200"; // 2022-01-01 00:00:00 UTC

    const result = getCustomDateRange(start, end);
    const expectedDateRange = null;

    expect(result).toBe(expectedDateRange);
  });

  it("should handle null end date", () => {
    const start = "1609459200"; // 2021-01-01 00:00:00 UTC
    const end = null;

    const result = getCustomDateRange(start, end);
    const expectedDateRange = null;

    expect(result).toBe(expectedDateRange);
  });

  it("should handle both null dates", () => {
    const start = null;
    const end = null;

    const result = getCustomDateRange(start, end);
    const expectedDateRange = null;
    expect(result).toBe(expectedDateRange);
  });
});
