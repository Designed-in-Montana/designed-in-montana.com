/* =========================================================================
   Designed in Montana — Business Directory Manifest
   ---------------------------------------------------------------------------
   This file lists every business in the directory. When you add a new
   business by creating its folder under /businesses/<region>/<county>/<town>/,
   also add an entry here so the search and listing pages can find it.
   Each entry mirrors the folder path; the files inside each folder
   (tag.txt, description.txt, contact.txt, social.txt, logo.png) are
   loaded by the business loader at runtime.
   ========================================================================= */

window.BUSINESSES = [
  {
    name: "Mountain Wizard LLC",
    region: "central",
    regionLabel: "Central Montana",
    county: "teton",
    countyLabel: "Teton",
    town: "fairfield",
    townLabel: "Fairfield",
    folder: "/businesses/central/teton/fairfield/Mountain Wizard"
  },
  {
    name: "Montana Wizard",
    region: "central",
    regionLabel: "Central Montana",
    county: "teton",
    countyLabel: "Teton",
    town: "fairfield",
    townLabel: "Fairfield",
    folder: "/businesses/central/teton/fairfield/Montana Wizard"
  },
  {
    name: "Montana Stream",
    region: "central",
    regionLabel: "Central Montana",
    county: "teton",
    countyLabel: "Teton",
    town: "fairfield",
    townLabel: "Fairfield",
    folder: "/businesses/central/teton/fairfield/Montana Stream"
  },
  {
    name: "Harvest Hills",
    region: "central",
    regionLabel: "Central Montana",
    county: "teton",
    countyLabel: "Teton",
    town: "fairfield",
    townLabel: "Fairfield",
    folder: "/businesses/central/teton/fairfield/Harvest Hills"
  },
  {
    name: "Sun River Electric Cooperative",
    region: "central",
    regionLabel: "Central Montana",
    county: "teton",
    countyLabel: "Teton",
    town: "fairfield",
    townLabel: "Fairfield",
    folder: "/businesses/central/teton/fairfield/Sun River Electric Cooperative"
  },
  {
    name: "Coppertown Blues",
    region: "glacier",
    regionLabel: "Glacier",
    county: "ravalli",
    countyLabel: "Ravalli",
    town: "florence",
    townLabel: "Florence",
    folder: "/businesses/glacier/ravalli/florence/Coppertown Blues"
  },
  {
    name: "Sliters Lumber & Building Supply",
    region: "glacier",
    regionLabel: "Glacier",
    county: "flathead",
    countyLabel: "Flathead",
    town: "bigfork",
    townLabel: "Bigfork",
    folder: "/businesses/glacier/flathead/Bigfork/Sliters Lumber & Building Suppy"
  },
  {
    name: "Montana Silversmiths",
    region: "yellowstone",
    regionLabel: "Yellowstone",
    county: "stillwater",
    countyLabel: "Stillwater",
    town: "columbus",
    townLabel: "Columbus",
    folder: "/businesses/yellowstone/stillwater/columbus/Montana Silversmiths"
  }
];
