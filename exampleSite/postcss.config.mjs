import autoprefixer from "autoprefixer";
import purgeCSSPlugin from "@fullhuman/postcss-purgecss";

const purgecss = purgeCSSPlugin({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
  },
  // https://purgecss.com/safelisting.html
  safelist: {
    standard: ["show", "modal-backdrop", "modal-open"],
    greedy: [/[data-bs-theme=dark]/],
  },
});

export default {
  plugins: [process.env.HUGO_ENVIRONMENT !== "development" ? purgecss : null, autoprefixer],
};
