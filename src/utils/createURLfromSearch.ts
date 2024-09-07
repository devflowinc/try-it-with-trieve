const sortMapping = {
  byPopularity: "relevance",
  Popularity: "relevance",
  byDate: "time_stamp",
  Date: "time_stamp",
};

const typeMapping = {
  Stories: "story",
  story: "story",
  Comments: "comment",
  comment: "comment",
  All: "all",
  all: "all",
  "Ask HN": "ask",
  ask_hn: "ask",
  "Show HN": "show",
  show_hn: "show",
  Jobs: "job",
  job: "job",
  Polls: "poll",
  poll: "poll",
};

export function getCustomDateRange(
  start: string | null,
  end: string | null
): string | null {
  const startDate = start
    ? new Date(parseInt(start) * 1000 - 86400000).toISOString().split("T")[0]
    : "";
  const endDate = end
    ? new Date(parseInt(end) * 1000 - 86400000).toISOString().split("T")[0]
    : "";
  if (startDate && endDate) {
    const dateRange = { gt: startDate, lt: endDate };
    return JSON.stringify(dateRange);
  }
  return null;
}

function getTrieveUrl(
  query: string | null,
  sort: string | null,
  type: string | null,
  dateRange: string | null,
  startDate: string | null,
  endDate: string | null
): string {
  const baseUrl = "https://hn.trieve.ai/";
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (sort) {
    const mappedSort = sortMapping[sort as keyof typeof sortMapping];
    if (mappedSort) {
      params.set("sortby", mappedSort);
    }
  }
  if (type) {
    const mappedType = typeMapping[type as keyof typeof typeMapping];
    if (mappedType) {
      params.set("storyType", mappedType);
    }
  }
  if (dateRange) {
    if (dateRange == "custom" && startDate && endDate) {
      const customDateRange = getCustomDateRange(startDate, endDate);
      if (customDateRange) {
        params.set("dateRange", customDateRange);
      } else {
        params.set("dateRange", startDate + "," + endDate);
      }
    } else {
      params.set("dateRange", dateRange);
    }
  }

  return `${baseUrl}?${params.toString()}`;
}

function getAlgoliaSearchParams(): {
  query: string | null;
  sort: string | null;
  type: string | null;
  dateRange: string | null;
  startDate: string | null;
  endDate: string | null;
} {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;

  const startDate = searchParams.get("dateStart") || null;
  const endDate = searchParams.get("dateEnd") || null;

  const filterContainer = document.querySelectorAll(
    ".SearchFilters_filterContainer"
  );
  const type = filterContainer[0]
    .querySelector(".Dropdown_label")
    ?.textContent?.trim();
  const sort = filterContainer[1]
    .querySelector(".Dropdown_label")
    ?.textContent?.trim();

  return {
    query:
      document.querySelector<HTMLInputElement>(".SearchInput")?.value ||
      searchParams.get("query"),
    type: type || searchParams.get("type"),
    sort: sort || searchParams.get("sort"),
    dateRange: searchParams.get("dateRange"),
    startDate: startDate,
    endDate: endDate,
  };
}

export default function createURLfromSearch(): string {
  const { query, sort, type, dateRange, startDate, endDate } =
    getAlgoliaSearchParams();
  return getTrieveUrl(query, sort, type, dateRange, startDate, endDate);
}
