# Try it with Trieve Chrome Extension

This Chrome extension adds a "Try it with Trieve" button to:

- Hacker News
- YC Companies Search
- Steam

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

1. Make changes to the source files in the `src` directory.

2. Run the build process:

   ```
   yarn build
   ```

3. Reload the extension in Chrome:
   - Go to `chrome://extensions`
   - Find this extension
   - Click the refresh icon

## Linting

To lint your code:
