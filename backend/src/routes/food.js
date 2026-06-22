import express
from "express";

const router =
  express.Router();

  function normalizeNorwegian(
  text
) {
  return text
    .toLowerCase()
    .replaceAll(
      "æ",
      "ae"
    )
    .replaceAll(
      "ø",
      "o"
    )
    .replaceAll(
      "å",
      "a"
    );
}

router.get(
  "/search",
  async (
    req,
    res
  ) => {
    try {
      const rawQuery =
        req.query.q;

      const query =
        normalizeNorwegian(
          rawQuery
        );

      const response =
        await fetch(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=20`
        );

      const data =
        await response.json();

      res.json(data);
    } catch (
      error
    ) {
      console.error(
        error
      );

      res
        .status(500)
        .json({
          error:
            "Failed to fetch foods",
        });
    }
  }
);

export default router;