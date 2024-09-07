# Try it with Trieve! - Chrome Extension

[![Trieve AI HN Search](https://github.com/user-attachments/assets/9d569263-4d69-4410-b122-13384f0bcda8)](https://hn.trieve.ai/?q=better+search+is+coming&sortby=relevance&storyType=story&dateRange=all&score_threshold=5&page_size=30&prefetch_amount=30&rerank_type=none&highlight_delimiters=+%2C-%2C_%2C.%2C%2C&highlight_threshold=0.85&highlight_max_length=50&highlight_max_num=50&highlight_window=0&recency_bias=0&highlight_results=true&use_quote_negated_terms=true&matchAnyAuthorNames=&matchNoneAuthorNames=&popularityFilters=%7B%7D&searchType=fulltext&page=1&getAISummary=false)

This Chrome extension adds a "Try it with Trieve" button to:

- [x] HN Search at hn.algolia.com/* => [hn.trieve.ai](https://hn.trieve.ai/)
   - [ ] HN search bar at the footer of news.ycombinator.com pages
- [ ] YC Companies Search => [yc.trieve.ai](https://yc.trieve.ai/)
- [ ] Steam & SteamDB => [steamdb.trieve.ai](https://steamdb.trieve.ai/)

Built with React and Tailwind.

This extension should work on any Chromium based browser, like Edge, Brave, Vivaldi, etc.

## Installation

Load the extension from the `dist` directory:

- Open Chrome and navigate to `chrome://extensions`
- Enable "Developer mode" in the top right corner
- Click "Load unpacked"
- Select the `dist` folder in your project directory

## Development

To work on the extension:

0. Install dependencies

   ```
   yarn install
   ```

2. Make changes to the source files in the `src` directory.

3. Run the build process:

   ```
   yarn build
   ```

4. Reload the extension in Chrome:
   - Go to `chrome://extensions`
   - Find this extension: Try it with Trieve!
   - Click the refresh icon
