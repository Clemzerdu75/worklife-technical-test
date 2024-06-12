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

    if (json.count !== 0) {
      res = { ...json, nextPage: pageParam + 1 };
    } else {
      res = json;
    }

    return res;
  } catch (err) {
    throw err;
  }
};

export default getItems;
