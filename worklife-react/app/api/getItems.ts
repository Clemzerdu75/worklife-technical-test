"use server";

/**
 * Handle Data fetching from rijks museum with page and search filtering
 * @param {string} pageParam specific page to load
 * @param {string} search search input for filtering result
 *
 * @returns {Res} data payload from API with the next page if it's relevant
 */

interface Props {
  pageParam: number;
  search?: string;
}

interface Res {
  nextPage?: number;
  artObjects: any[];
  count: number;
  elapsedMilliseconds: number;
  facets: any[];
  countFacets: {};
}

const itemPerPage = 20;

const getItems = async ({ pageParam, search = "" }: Props) => {
  try {
    let res: Res;
    const resp = await fetch(
      `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.NEXT_PUBLIC_RIJKS_API_KEY}&ps=${itemPerPage}&p=${pageParam}&q=${search}`
    );
    const json = await resp.json();

    /* Handle if there is a next page or not. 
    Nothing is natively provided from the API, so i needed to find some 
    alternative solution
    */
    if (json.count !== 0 && json.artObjects.length === 20) {
      res = { ...json, nextPage: pageParam + 1 };
    } else {
      res = json;
    }

    console.log(res);

    return res;
  } catch (err) {
    throw err;
  }
};

export default getItems;
