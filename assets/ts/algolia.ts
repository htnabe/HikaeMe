import algoliasearch, { SearchClient } from "algoliasearch";
import instantsearch from "instantsearch.js";
import {
  configure,
  hits,
  poweredBy,
  searchBox,
} from "instantsearch.js/es/widgets";
// @ts-ignore
import params from "@params";

const algoliaClient: SearchClient = algoliasearch(
  params.appId,
  params.algoliaSearchApiKey
);

// instantSearchを初期化
// クエリ自体が空白の場合はリクエストを送らない
const search = instantsearch({
  indexName: params.indexName,
  searchClient: {
    ...algoliaClient,
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: "",
            params: "",
          })),
        });
      }

      return algoliaClient.search(requests);
    },
  },
  routing: false,
  future: {
    preserveSharedStateOnUnmount: false,
  },
});

search.addWidgets([
  searchBox({
    container: "#searchbox",
    placeholder: "記事を検索",
    showReset: true,
  }),

  poweredBy({
    container: "#powered-by-algolia",
  }),

  configure({
    hitsPerPage: 5,
  }),

  hits({
    container: "#hits",
    templates: {
      empty: ({}, { html }) => {
        return html`<div>No results have been found.</div>`;
      },
      item: (hit, { html, components, sendEvent }) => {
        return html`
          <div class="card w-100">
            <div class="card-body">
              <h5>${components.Highlight({ hit, attribute: "title" })}</h5>
              <p class="card-text d-flex justify-content-between">
                <time datetime="${hit.date}">
                  <i class="far fa-calendar-alt"></i>
                  ${hit.date}
                </time>
                <a href="{{ permalink }}">Read More ></a>
              </p>
            </div>
          </div>
        `;
      },
    },
  }),
]);

search.start();
