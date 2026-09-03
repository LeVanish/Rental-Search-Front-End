import { themeAlpine } from 'ag-grid-community';

export const myTheme = themeAlpine
  .withParams({
    backgroundColor: "#1f2836",
    browserColorScheme: "dark",
    chromeBackgroundColor: {
      ref: "foregroundColor",
      mix: 0.07,
      onto: "backgroundColor"
    },
    foregroundColor: "#FFF",
    headerFontWeight: 500,
    rowVerticalPaddingScale: 1,
  });