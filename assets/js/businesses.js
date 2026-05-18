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
    folder: "/businesses/central/teton/fairfield/Mountain Wizard LLC"
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
  }
];
