import createURLfromSearch from "./createURLfromSearch";

export function setupUrlUpdater(
  link: HTMLAnchorElement,
  setQueryLink: (url: string) => void
) {
  const updateUrl = () => {
    const newUrl = createURLfromSearch();
    link.href = newUrl;
    setQueryLink(newUrl);
  };

  // Update URL when page content changes
  const observer = new MutationObserver(updateUrl);
  observer.observe(document.body, { subtree: true, childList: true });

  // Add event listener for input field changes
  const searchInput = document.querySelector<HTMLInputElement>(".SearchInput");
  if (searchInput) {
    searchInput.addEventListener("change", updateUrl);
  }

  // Add event listeners for search type and sort changes
  const filterContainers = document.querySelectorAll(
    ".SearchFilters_filterContainer"
  );
  if (filterContainers.length >= 3) {
    const searchType = filterContainers[0].querySelector(".Dropdown_label");
    const sortType = filterContainers[1].querySelector(".Dropdown_label");
    const dateRange = filterContainers[2].querySelector(".Dropdown_label");

    if (searchType) {
      searchType.addEventListener("change", updateUrl);
    }
    if (sortType) {
      sortType.addEventListener("change", updateUrl);
    }
    if (dateRange) {
      dateRange.addEventListener("change", updateUrl);
    }
  }

  // Initial update
  updateUrl();

  return () => {
    observer.disconnect();
    if (searchInput) {
      searchInput.removeEventListener("change", updateUrl);
    }
  };
}
