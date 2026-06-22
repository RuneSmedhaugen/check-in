import type {
  FoodProduct,
} from "../types/food";

type OpenFoodFactsProduct = {
  code?: string;

  product_name?: string;

  brands?: string;

  image_url?: string;

  serving_size?: string;

  nutriments?: {
    ["energy-kcal_100g"]?: number;

    proteins_100g?: number;

    carbohydrates_100g?: number;

    fat_100g?: number;
  };
};

type SearchResponse = {
  products?: OpenFoodFactsProduct[];
};

export async function searchFoods(
  query: string
): Promise<FoodProduct[]> {
  if (!query.trim()) {
    return [];
  }

  const url =
    `https://world.openfoodfacts.org/cgi/search.pl` +
    `?search_terms=${encodeURIComponent(query)}` +
    `&search_simple=1` +
    `&action=process` +
    `&json=1` +
    `&page_size=20`;

  const response =
    await fetch(url);

  const data:
    SearchResponse =
      await response.json();

  return (
    data.products?.map(
      (product) => ({
        id:
          product.code ??
          crypto.randomUUID(),

        name:
          product.product_name ??
          "Unknown product",

        brand:
          product.brands,

        image:
          product.image_url,

        calories:
          product
            .nutriments
            ?.[
              "energy-kcal_100g"
            ] ?? 0,

        protein:
          product
            .nutriments
            ?.proteins_100g ?? 0,

        carbs:
          product
            .nutriments
            ?.carbohydrates_100g ?? 0,

        fat:
          product
            .nutriments
            ?.fat_100g ?? 0,

        servingSize:
          product.serving_size,
      })
    ) ?? []
  );
}