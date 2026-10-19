/* =====================================================================
   RANK THE WORLD — puzzle data
   ---------------------------------------------------------------------
   ALL puzzles live in the PUZZLES array below. Puzzle #1 is shown on
   LAUNCH_DATE (set in app.js), puzzle #2 the day after, and so on.
   When the list runs out it starts again from the top.

   HOW TO ADD A NEW PUZZLE
   1. Copy one of the objects below and paste it at the END of the array.
   2. Give it the next id number.
   3. List the 5 items in the CORRECT order: MOST at the top, LEAST at the bottom.
      - name    : what the player sees on the card
      - emoji   : a flag or icon
      - value   : the real number (used for the bar on the reveal screen)
      - display : the number as text, WITH its unit, e.g. "12.0 kg"
      - source  : (optional) per-item source if items come from different places
   4. Fill in `source` (organisation, dataset, data year, link) and a
      `surprisingFact` that is TRUE and backed by a source.
   5. Rules: no ties, no two values within ~5% of each other, and only
      numbers you have checked yourself. If unsure, set confidence to
      "needs-check" and do NOT publish it until you have checked it.

   Optional fields:
   - hideBars: true   -> no bars on the reveal (use for years / negative values)
   - barScale: "log"  -> logarithmic bars (use when one value is huge)
   - note             -> small grey text under the sources (caveats)
   ===================================================================== */

const PUZZLES = [
  {
    id: 1,
    question: "Which has the most caffeine, gram for gram?",
    metric: "mg of caffeine per 100 g (USDA average values)",
    items: [
      { name: "Espresso", emoji: "☕", value: 212, display: "212 mg" },
      { name: "Dark chocolate (70–85% cocoa)", emoji: "🍫", value: 80, display: "80 mg" },
      { name: "Brewed filter coffee", emoji: "🫘", value: 40, display: "40 mg" },
      { name: "Energy drink (sugar-free)", emoji: "⚡", value: 32, display: "32 mg" },
      { name: "Black tea", emoji: "🫖", value: 20, display: "20 mg" }
    ],
    source: {
      name: "U.S. Department of Agriculture (USDA)",
      dataset: "FoodData Central — SR Legacy",
      year: 2018,
      url: "https://fdc.nal.usda.gov/"
    },
    surprisingFact: "Gram for gram, dark chocolate has twice the caffeine of filter coffee. A cup of coffee only wins because it's so much bigger than a square of chocolate.",
    confidence: "high"
  },
  {
    id: 2,
    question: "Which country is the biggest?",
    metric: "Total surface area in km² (land + inland water)",
    items: [
      { name: "Estonia", emoji: "🇪🇪", value: 45340, display: "45,340 km²" },
      { name: "Switzerland", emoji: "🇨🇭", value: 41291, display: "41,291 km²" },
      { name: "Belgium", emoji: "🇧🇪", value: 30689, display: "30,689 km²" },
      { name: "Israel", emoji: "🇮🇱", value: 22070, display: "22,070 km²" },
      { name: "Kuwait", emoji: "🇰🇼", value: 17820, display: "17,820 km²" }
    ],
    source: {
      name: "World Bank",
      dataset: "World Development Indicators — Surface area (AG.SRF.TOTL.K2)",
      year: 2023,
      url: "https://data.worldbank.org/indicator/AG.SRF.TOTL.K2"
    },
    surprisingFact: "Estonia is about 10% bigger than Switzerland and more than twice the size of Israel.",
    confidence: "high"
  },
  {
    id: 3,
    question: "On which planet does one day last the longest?",
    metric: "Length of one solar day (sunrise to sunrise), in Earth hours",
    items: [
      { name: "Mercury", emoji: "🌑", value: 4222.6, display: "4,222.6 h" },
      { name: "Venus", emoji: "🟡", value: 2802.0, display: "2,802.0 h" },
      { name: "Earth", emoji: "🌍", value: 24.0, display: "24.0 h" },
      { name: "Uranus", emoji: "🔵", value: 17.2, display: "17.2 h" },
      { name: "Jupiter", emoji: "🪐", value: 9.9, display: "9.9 h" }
    ],
    source: {
      name: "NASA Goddard Space Flight Center (NSSDCA)",
      dataset: "Planetary Fact Sheet — Metric",
      year: 2025,
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"
    },
    barScale: "log",
    surprisingFact: "One day on Mercury (about 176 Earth days) lasts twice as long as its whole year (88 days).",
    confidence: "high"
  },
  {
    id: 4,
    question: "Which country's exports are the biggest compared to its economy?",
    metric: "Exports of goods and services, % of GDP",
    items: [
      { name: "Ireland", emoji: "🇮🇪", value: 144.0, display: "144.0%" },
      { name: "Estonia", emoji: "🇪🇪", value: 75.7, display: "75.7%" },
      { name: "Germany", emoji: "🇩🇪", value: 41.4, display: "41.4%" },
      { name: "Japan", emoji: "🇯🇵", value: 22.0, display: "22.0%" },
      { name: "United States", emoji: "🇺🇸", value: 11.0, display: "11.0%" }
    ],
    source: {
      name: "World Bank",
      dataset: "World Development Indicators — Exports of goods and services, % of GDP (NE.EXP.GNFS.ZS)",
      year: 2024,
      url: "https://data.worldbank.org/indicator/NE.EXP.GNFS.ZS"
    },
    surprisingFact: "Ireland exports more than its entire GDP every year, while the United States exports only about 11% of its GDP — half of Japan's share.",
    confidence: "high"
  },
  {
    id: 5,
    question: "Which stadium holds the most people?",
    metric: "Official seating capacity",
    items: [
      { name: "Narendra Modi Stadium, Ahmedabad", emoji: "🇮🇳", value: 132000, display: "132,000" },
      { name: "Michigan Stadium, Ann Arbor", emoji: "🇺🇸", value: 107601, display: "107,601",
        source: { name: "University of Michigan Athletics", url: "https://mgoblue.com/" } },
      { name: "Melbourne Cricket Ground", emoji: "🇦🇺", value: 100024, display: "100,024",
        source: { name: "Melbourne Cricket Ground", url: "https://www.mcg.org.au/" } },
      { name: "Wembley Stadium, London", emoji: "🇬🇧", value: 90000, display: "90,000",
        source: { name: "Wembley Stadium", url: "https://www.wembleystadium.com/" } },
      { name: "Allianz Arena, Munich", emoji: "🇩🇪", value: 75024, display: "75,024",
        source: { name: "Allianz Arena", url: "https://allianz-arena.com/" } }
    ],
    source: {
      name: "Venue operators, compiled in Wikipedia's list of stadiums by capacity",
      dataset: "List of stadiums by capacity",
      year: 2026,
      url: "https://en.wikipedia.org/wiki/List_of_stadiums_by_capacity"
    },
    surprisingFact: "The world's biggest stadium is a cricket ground, and the biggest one in the Western world belongs to a university football team, not a pro club.",
    note: "Capacities can change after renovations.",
    confidence: "medium"
  },
  {
    id: 6,
    question: "Which animal sleeps the most?",
    metric: "Average total sleep, hours per day (mostly measured in captivity)",
    items: [
      { name: "Little brown bat", emoji: "🦇", value: 19.9, display: "19.9 h" },
      { name: "Tiger", emoji: "🐅", value: 15.8, display: "15.8 h" },
      { name: "House cat", emoji: "🐈", value: 12.5, display: "12.5 h" },
      { name: "Dog", emoji: "🐕", value: 10.1, display: "10.1 h" },
      { name: "Giraffe", emoji: "🦒", value: 4.6, display: "4.6 h" }
    ],
    source: {
      name: "Siegel, J. M. — Nature 437 (UCLA Sleep Research)",
      dataset: "Clues to the functions of mammalian sleep — sleep-time table",
      year: 2005,
      url: "https://doi.org/10.1038/nature04285"
    },
    surprisingFact: "Tigers sleep longer than house cats — about 15.8 hours a day versus 12.5.",
    note: "Wild animals often sleep less than captive ones.",
    confidence: "high"
  },
  {
    id: 7,
    question: "Which university is the oldest?",
    metric: "Year founded (oldest at the top)",
    hideBars: true,
    items: [
      { name: "University of Cambridge", emoji: "🇬🇧", value: 1209, display: "founded 1209",
        source: { name: "University of Cambridge", url: "https://www.cam.ac.uk/" } },
      { name: "Charles University, Prague", emoji: "🇨🇿", value: 1348, display: "founded 1348",
        source: { name: "Charles University", url: "https://cuni.cz/" } },
      { name: "Uppsala University", emoji: "🇸🇪", value: 1477, display: "founded 1477",
        source: { name: "Uppsala University", url: "https://www.uu.se/en" } },
      { name: "University of Tartu", emoji: "🇪🇪", value: 1632, display: "founded 1632",
        source: { name: "University of Tartu", url: "https://ut.ee/en" } },
      { name: "Harvard University", emoji: "🇺🇸", value: 1636, display: "founded 1636",
        source: { name: "Harvard University", url: "https://www.harvard.edu/" } }
    ],
    source: {
      name: "Each university's official history",
      dataset: "Founding years",
      year: "historical record",
      url: ""
    },
    surprisingFact: "The University of Tartu (1632) is four years older than Harvard (1636).",
    confidence: "high"
  },
  {
    id: 8,
    question: "Which country is the most densely populated?",
    metric: "People per km² of land area",
    items: [
      { name: "Bangladesh", emoji: "🇧🇩", value: 1333, display: "1,333 /km²" },
      { name: "Netherlands", emoji: "🇳🇱", value: 534, display: "534 /km²" },
      { name: "India", emoji: "🇮🇳", value: 488, display: "488 /km²" },
      { name: "Japan", emoji: "🇯🇵", value: 340, display: "340 /km²" },
      { name: "United States", emoji: "🇺🇸", value: 37, display: "37 /km²" }
    ],
    source: {
      name: "World Bank",
      dataset: "World Development Indicators — Population density (EN.POP.DNST)",
      year: 2024,
      url: "https://data.worldbank.org/indicator/EN.POP.DNST"
    },
    surprisingFact: "The Netherlands packs more people into each square kilometre than India does.",
    confidence: "high"
  },
  {
    id: 9,
    question: "Which language has the most Wikipedia articles?",
    metric: "Number of articles in each language edition (millions)",
    items: [
      { name: "English", emoji: "🇬🇧", value: 7.25, display: "≈7.25 million" },
      { name: "Cebuano", emoji: "🇵🇭", value: 6.12, display: "≈6.12 million" },
      { name: "German", emoji: "🇩🇪", value: 3.16, display: "≈3.16 million" },
      { name: "French", emoji: "🇫🇷", value: 2.78, display: "≈2.78 million" },
      { name: "Japanese", emoji: "🇯🇵", value: 1.52, display: "≈1.52 million" }
    ],
    source: {
      name: "Wikimedia Foundation (Meta-Wiki)",
      dataset: "List of Wikipedias — article counts (snapshot mid-2026)",
      year: 2026,
      url: "https://meta.wikimedia.org/wiki/List_of_Wikipedias"
    },
    surprisingFact: "The second-biggest Wikipedia is in Cebuano, a language of the Philippines — and most of its articles were written by one bot, Lsjbot.",
    factSource: { name: "Wikipedia: Lsjbot", url: "https://en.wikipedia.org/wiki/Lsjbot" },
    note: "Article counts change every day; values are rounded.",
    confidence: "medium"
  },
  {
    id: 10,
    question: "Which has the most vitamin C?",
    metric: "mg of vitamin C per 100 g, raw",
    items: [
      { name: "Red bell pepper", emoji: "🫑", value: 127.7, display: "127.7 mg" },
      { name: "Kiwi", emoji: "🥝", value: 92.7, display: "92.7 mg" },
      { name: "Strawberries", emoji: "🍓", value: 58.8, display: "58.8 mg" },
      { name: "Orange", emoji: "🍊", value: 53.2, display: "53.2 mg" },
      { name: "Apple", emoji: "🍎", value: 4.6, display: "4.6 mg" }
    ],
    source: {
      name: "U.S. Department of Agriculture (USDA)",
      dataset: "FoodData Central — SR Legacy",
      year: 2018,
      url: "https://fdc.nal.usda.gov/"
    },
    surprisingFact: "A red bell pepper has about 2.4 times as much vitamin C as an orange, gram for gram.",
    confidence: "high"
  },
  {
    id: 11,
    question: "Which country has the longest coastline?",
    metric: "Total coastline in km, including islands",
    items: [
      { name: "Greece", emoji: "🇬🇷", value: 13676, display: "13,676 km" },
      { name: "Italy", emoji: "🇮🇹", value: 7600, display: "7,600 km" },
      { name: "Estonia", emoji: "🇪🇪", value: 3794, display: "3,794 km" },
      { name: "Germany", emoji: "🇩🇪", value: 2389, display: "2,389 km" },
      { name: "Netherlands", emoji: "🇳🇱", value: 451, display: "451 km" }
    ],
    source: {
      name: "CIA World Factbook",
      dataset: "Field listing: Coastline",
      year: 2022,
      url: "https://www.cia.gov/the-world-factbook/about/archives/2022/field/coastline"
    },
    surprisingFact: "Estonia's coastline is about 1.6 times as long as Germany's, thanks to its more than 2,000 islands.",
    note: "Coastline length depends on how finely it is measured; these are the Factbook's figures.",
    confidence: "high"
  },
  {
    id: 12,
    question: "Which railway tunnel is the longest?",
    metric: "Tunnel length in km",
    items: [
      { name: "Gotthard Base Tunnel", emoji: "🇨🇭", value: 57.1, display: "57.1 km",
        source: { name: "Swiss Federal Railways (SBB)", url: "https://www.sbb.ch/en" } },
      { name: "Seikan Tunnel", emoji: "🇯🇵", value: 53.85, display: "53.85 km",
        source: { name: "JR Hokkaido", url: "https://www.jrhokkaido.co.jp/global/" } },
      { name: "Channel Tunnel", emoji: "🇬🇧", value: 50.45, display: "50.45 km",
        source: { name: "Getlink (Eurotunnel)", url: "https://www.getlinkgroup.com/" } },
      { name: "Lötschberg Base Tunnel", emoji: "🇨🇭", value: 34.6, display: "34.6 km",
        source: { name: "BLS", url: "https://www.bls.ch/en" } },
      { name: "Guadarrama Tunnel", emoji: "🇪🇸", value: 28.4, display: "28.4 km",
        source: { name: "Adif (Spanish rail infrastructure)", url: "https://www.adif.es/" } }
    ],
    source: {
      name: "Tunnel operators",
      dataset: "Official tunnel lengths",
      year: 2026,
      url: ""
    },
    surprisingFact: "The Channel Tunnel isn't the world's longest rail tunnel — Switzerland's Gotthard Base Tunnel, opened in 2016, is.",
    confidence: "high"
  },
  {
    id: 13,
    question: "Which country has the largest share of people aged 65+?",
    metric: "Population aged 65 and over, % of total population",
    items: [
      { name: "Japan", emoji: "🇯🇵", value: 29.8, display: "29.8%" },
      { name: "Italy", emoji: "🇮🇹", value: 24.6, display: "24.6%" },
      { name: "Estonia", emoji: "🇪🇪", value: 21.3, display: "21.3%" },
      { name: "South Korea", emoji: "🇰🇷", value: 19.3, display: "19.3%" },
      { name: "United States", emoji: "🇺🇸", value: 17.9, display: "17.9%" }
    ],
    source: {
      name: "World Bank",
      dataset: "World Development Indicators — Population ages 65 and above (SP.POP.65UP.TO.ZS)",
      year: 2024,
      url: "https://data.worldbank.org/indicator/SP.POP.65UP.TO.ZS"
    },
    surprisingFact: "Estonia has a bigger share of over-65s than South Korea, a country famous for its fast-ageing population.",
    confidence: "high"
  },
  {
    id: 14,
    question: "On which planet is gravity the strongest?",
    metric: "Surface gravity in m/s² (gas giants: at the 1-bar level)",
    items: [
      { name: "Jupiter", emoji: "🪐", value: 23.1, display: "23.1 m/s²" },
      { name: "Neptune", emoji: "🔵", value: 11.0, display: "11.0 m/s²" },
      { name: "Earth", emoji: "🌍", value: 9.8, display: "9.8 m/s²" },
      { name: "Saturn", emoji: "🪐", value: 9.0, display: "9.0 m/s²" },
      { name: "Mars", emoji: "🔴", value: 3.7, display: "3.7 m/s²" }
    ],
    source: {
      name: "NASA Goddard Space Flight Center (NSSDCA)",
      dataset: "Planetary Fact Sheet — Metric",
      year: 2025,
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"
    },
    surprisingFact: "Saturn is 95 times more massive than Earth, yet its gravity is weaker than Earth's.",
    confidence: "high"
  },
  {
    id: 15,
    question: "Which country's airlines carried the most passengers in 2019?",
    metric: "Air passengers carried by airlines registered in each country (millions)",
    items: [
      { name: "United States", emoji: "🇺🇸", value: 926.7, display: "926.7 million" },
      { name: "China", emoji: "🇨🇳", value: 659.6, display: "659.6 million" },
      { name: "Ireland", emoji: "🇮🇪", value: 170.2, display: "170.2 million" },
      { name: "United Kingdom", emoji: "🇬🇧", value: 142.4, display: "142.4 million" },
      { name: "Germany", emoji: "🇩🇪", value: 109.6, display: "109.6 million" }
    ],
    source: {
      name: "World Bank (ICAO data)",
      dataset: "World Development Indicators — Air transport, passengers carried (IS.AIR.PSGR)",
      year: 2019,
      url: "https://data.worldbank.org/indicator/IS.AIR.PSGR"
    },
    surprisingFact: "Airlines registered in Ireland, a country of about 5 million people, carried more passengers than those of the UK or Germany — largely thanks to Ryanair.",
    note: "2019 is used as the last normal year before the pandemic.",
    confidence: "high"
  },
  {
    id: 16,
    question: "Which country is the most covered in forest?",
    metric: "Forest area, % of land area",
    items: [
      { name: "Finland", emoji: "🇫🇮", value: 74.2, display: "74.2%" },
      { name: "Japan", emoji: "🇯🇵", value: 68.3, display: "68.3%" },
      { name: "Brazil", emoji: "🇧🇷", value: 58.5, display: "58.5%" },
      { name: "United States", emoji: "🇺🇸", value: 33.8, display: "33.8%" },
      { name: "China", emoji: "🇨🇳", value: 24.0, display: "24.0%" }
    ],
    source: {
      name: "World Bank (FAO data)",
      dataset: "World Development Indicators — Forest area, % of land area (AG.LND.FRST.ZS)",
      year: 2024,
      url: "https://data.worldbank.org/indicator/AG.LND.FRST.ZS"
    },
    surprisingFact: "Japan is more forested than Brazil, home of the Amazon: about 68% of Japan's land is forest, versus 59% of Brazil's.",
    confidence: "high"
  },
  {
    id: 17,
    question: "Which programming language came out first?",
    metric: "Year of first release (oldest at the top)",
    hideBars: true,
    items: [
      { name: "Fortran", emoji: "🧮", value: 1957, display: "1957",
        source: { name: "IBM history", url: "https://www.ibm.com/history" } },
      { name: "C", emoji: "💻", value: 1972, display: "1972",
        source: { name: "Nokia Bell Labs", url: "https://www.bell-labs.com/" } },
      { name: "C++", emoji: "➕", value: 1985, display: "1985",
        source: { name: "Bjarne Stroustrup", url: "https://www.stroustrup.com/" } },
      { name: "Python", emoji: "🐍", value: 1991, display: "1991",
        source: { name: "Python Software Foundation", url: "https://www.python.org/" } },
      { name: "Java", emoji: "☕", value: 1995, display: "1995",
        source: { name: "Oracle", url: "https://www.oracle.com/java/" } }
    ],
    source: {
      name: "Creators and maintainers of each language",
      dataset: "First public release years",
      year: "historical record",
      url: ""
    },
    surprisingFact: "Python (1991) is older than Java (1995) — and Fortran, from 1957, still runs on supercomputers today.",
    confidence: "high"
  },
  {
    id: 18,
    question: "Which country gets the biggest share of its energy from renewables?",
    metric: "Renewable energy, % of gross final energy consumption",
    items: [
      { name: "Norway", emoji: "🇳🇴", value: 77.9, display: "77.9%" },
      { name: "Sweden", emoji: "🇸🇪", value: 62.8, display: "62.8%" },
      { name: "Latvia", emoji: "🇱🇻", value: 45.5, display: "45.5%" },
      { name: "Estonia", emoji: "🇪🇪", value: 38.0, display: "≈38%" },
      { name: "Belgium", emoji: "🇧🇪", value: 14.3, display: "14.3%" }
    ],
    source: {
      name: "Eurostat",
      dataset: "Share of energy from renewable sources (nrg_ind_ren)",
      year: 2024,
      url: "https://ec.europa.eu/eurostat/databrowser/view/nrg_ind_ren/default/table"
    },
    surprisingFact: "Belgium has the lowest renewable share in the whole EU, at 14.3% — while Norway, just outside the EU, gets almost 78%.",
    note: "Eurostat revises these figures occasionally; Estonia's value is rounded.",
    confidence: "medium"
  },
  {
    id: 19,
    question: "Which food has the most calories?",
    metric: "kcal per 100 g",
    items: [
      { name: "Avocado", emoji: "🥑", value: 160, display: "160 kcal" },
      { name: "White rice, cooked", emoji: "🍚", value: 130, display: "130 kcal" },
      { name: "Banana", emoji: "🍌", value: 89, display: "89 kcal" },
      { name: "Apple", emoji: "🍎", value: 52, display: "52 kcal" },
      { name: "Cucumber", emoji: "🥒", value: 15, display: "15 kcal" }
    ],
    source: {
      name: "U.S. Department of Agriculture (USDA)",
      dataset: "FoodData Central — SR Legacy",
      year: 2018,
      url: "https://fdc.nal.usda.gov/"
    },
    surprisingFact: "An avocado has more calories per 100 g than cooked white rice — 160 versus 130.",
    confidence: "high"
  },
  {
    id: 20,
    question: "Which landmark is the oldest?",
    metric: "When it was built (oldest at the top)",
    hideBars: true,
    items: [
      { name: "Stonehenge", emoji: "🇬🇧", value: -3000, display: "c. 3000 BC",
        source: { name: "English Heritage", url: "https://www.english-heritage.org.uk/visit/places/stonehenge/" } },
      { name: "Great Pyramid of Giza", emoji: "🇪🇬", value: -2560, display: "c. 2560 BC",
        source: { name: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/86" } },
      { name: "Colosseum", emoji: "🇮🇹", value: 80, display: "AD 80",
        source: { name: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/91" } },
      { name: "Machu Picchu", emoji: "🇵🇪", value: 1450, display: "c. 1450",
        source: { name: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/274" } },
      { name: "Taj Mahal", emoji: "🇮🇳", value: 1632, display: "1632–1653",
        source: { name: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/252" } }
    ],
    source: {
      name: "English Heritage and UNESCO World Heritage Centre",
      dataset: "Site histories",
      year: "historical record",
      url: "https://whc.unesco.org/"
    },
    surprisingFact: "Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid.",
    note: "Ancient dates are approximate; the order is not in doubt.",
    confidence: "high"
  },
  {
    id: 21,
    question: "Which country has the most people?",
    metric: "Total population",
    items: [
      { name: "Nigeria", emoji: "🇳🇬", value: 237.5, display: "237.5 million" },
      { name: "Brazil", emoji: "🇧🇷", value: 212.8, display: "212.8 million" },
      { name: "Japan", emoji: "🇯🇵", value: 123.4, display: "123.4 million" },
      { name: "Germany", emoji: "🇩🇪", value: 83.5, display: "83.5 million" },
      { name: "United Kingdom", emoji: "🇬🇧", value: 69.5, display: "69.5 million" }
    ],
    source: {
      name: "World Bank",
      dataset: "World Development Indicators — Population, total (SP.POP.TOTL)",
      year: 2025,
      url: "https://data.worldbank.org/indicator/SP.POP.TOTL"
    },
    surprisingFact: "Nigeria now has about 25 million more people than Brazil.",
    confidence: "high"
  },
  {
    id: 22,
    question: "Which building is the tallest?",
    metric: "Height to architectural top, in metres",
    items: [
      { name: "Burj Khalifa, Dubai", emoji: "🇦🇪", value: 828, display: "828 m" },
      { name: "Shanghai Tower", emoji: "🇨🇳", value: 632, display: "632 m" },
      { name: "One World Trade Center, New York", emoji: "🇺🇸", value: 541.3, display: "541.3 m" },
      { name: "Taipei 101", emoji: "🇹🇼", value: 508, display: "508 m" },
      { name: "Petronas Towers, Kuala Lumpur", emoji: "🇲🇾", value: 451.9, display: "451.9 m" }
    ],
    source: {
      name: "Council on Tall Buildings and Urban Habitat (CTBUH)",
      dataset: "The Skyscraper Center",
      year: 2026,
      url: "https://www.skyscrapercenter.com/"
    },
    surprisingFact: "Burj Khalifa beats the world's second-tallest building by 196 metres — that gap alone is taller than the London Eye.",
    confidence: "high"
  },
  {
    id: 23,
    question: "Which country gets the most rain?",
    metric: "Average precipitation, mm per year (long-term average)",
    items: [
      { name: "Japan", emoji: "🇯🇵", value: 1668, display: "1,668 mm" },
      { name: "United Kingdom", emoji: "🇬🇧", value: 1220, display: "1,220 mm" },
      { name: "France", emoji: "🇫🇷", value: 867, display: "867 mm" },
      { name: "Estonia", emoji: "🇪🇪", value: 626, display: "626 mm" },
      { name: "Australia", emoji: "🇦🇺", value: 534, display: "534 mm" }
    ],
    source: {
      name: "World Bank (FAO data)",
      dataset: "World Development Indicators — Average precipitation in depth (AG.LND.PRCP.MM)",
      year: 2022,
      url: "https://data.worldbank.org/indicator/AG.LND.PRCP.MM"
    },
    surprisingFact: "Famously rainy Britain gets about 27% less rain than Japan.",
    confidence: "high"
  },
  {
    id: 24,
    question: "Which company was founded first?",
    metric: "Year founded (oldest at the top)",
    hideBars: true,
    items: [
      { name: "Nokia", emoji: "🇫🇮", value: 1865, display: "1865",
        source: { name: "Nokia", url: "https://www.nokia.com/" } },
      { name: "LEGO", emoji: "🇩🇰", value: 1932, display: "1932",
        source: { name: "The LEGO Group", url: "https://www.lego.com/en-us/aboutus" } },
      { name: "IKEA", emoji: "🇸🇪", value: 1943, display: "1943",
        source: { name: "IKEA", url: "https://about.ikea.com/" } },
      { name: "Skype", emoji: "🇪🇪", value: 2003, display: "2003",
        source: { name: "Skype / Microsoft", url: "https://www.skype.com/" } },
      { name: "Spotify", emoji: "🇸🇪", value: 2006, display: "2006",
        source: { name: "Spotify newsroom", url: "https://newsroom.spotify.com/" } }
    ],
    source: {
      name: "Company histories",
      dataset: "Founding years",
      year: "historical record",
      url: ""
    },
    surprisingFact: "Nokia began in 1865 as a wood-pulp mill in Finland. Skype, launched in 2003, was built by Estonian engineers.",
    confidence: "high"
  },
  {
    id: 25,
    question: "Where were new cars most often electric in 2024?",
    metric: "Electric cars (battery + plug-in hybrid), % of new car sales",
    items: [
      { name: "Norway", emoji: "🇳🇴", value: 91, display: "≈91%" },
      { name: "Denmark", emoji: "🇩🇰", value: 56, display: "56%" },
      { name: "China", emoji: "🇨🇳", value: 48, display: "≈48%" },
      { name: "United Kingdom", emoji: "🇬🇧", value: 28, display: "≈28%" },
      { name: "United States", emoji: "🇺🇸", value: 10, display: "≈10%" }
    ],
    source: {
      name: "International Energy Agency (IEA)",
      dataset: "Global EV Outlook 2025",
      year: 2024,
      url: "https://www.iea.org/reports/global-ev-outlook-2025"
    },
    surprisingFact: "More than half of new cars sold in Denmark in 2024 were electric — a higher share than in China.",
    note: "The IEA report gives some shares in words (\"almost half\", \"nearly 30%\"); values marked ≈ are rounded.",
    confidence: "medium"
  },
  {
    id: 26,
    question: "Which country uses the biggest share of its land for crops?",
    metric: "Arable land, % of land area",
    items: [
      { name: "Denmark", emoji: "🇩🇰", value: 59.1, display: "59.1%" },
      { name: "India", emoji: "🇮🇳", value: 51.8, display: "51.8%" },
      { name: "France", emoji: "🇫🇷", value: 31.4, display: "31.4%" },
      { name: "Japan", emoji: "🇯🇵", value: 11.1, display: "11.1%" },
      { name: "Brazil", emoji: "🇧🇷", value: 6.7, display: "6.7%" }
    ],
    source: {
      name: "World Bank (FAO data)",
      dataset: "World Development Indicators — Arable land, % of land area (AG.LND.ARBL.ZS)",
      year: 2023,
      url: "https://data.worldbank.org/indicator/AG.LND.ARBL.ZS"
    },
    surprisingFact: "Denmark farms a bigger share of its land than India does — while farming giant Brazil uses under 7% of its land for crops.",
    confidence: "high"
  },
  {
    id: 27,
    question: "Which planet is the hottest?",
    metric: "Mean temperature in °C",
    hideBars: true,
    items: [
      { name: "Venus", emoji: "🟡", value: 464, display: "464 °C" },
      { name: "Mercury", emoji: "🌑", value: 167, display: "167 °C" },
      { name: "Earth", emoji: "🌍", value: 15, display: "15 °C" },
      { name: "Mars", emoji: "🔴", value: -65, display: "−65 °C" },
      { name: "Jupiter", emoji: "🪐", value: -110, display: "−110 °C" }
    ],
    source: {
      name: "NASA Goddard Space Flight Center (NSSDCA)",
      dataset: "Planetary Fact Sheet — Metric",
      year: 2025,
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"
    },
    surprisingFact: "Venus is hotter than Mercury even though it is almost twice as far from the Sun — its thick atmosphere traps the heat.",
    confidence: "high"
  },
  {
    id: 28,
    question: "Which country is the most urban?",
    metric: "Urban population, % of total population",
    items: [
      { name: "Japan", emoji: "🇯🇵", value: 92.3, display: "92.3%" },
      { name: "Belgium", emoji: "🇧🇪", value: 87.7, display: "87.7%" },
      { name: "United States", emoji: "🇺🇸", value: 80.2, display: "80.2%" },
      { name: "Estonia", emoji: "🇪🇪", value: 70.7, display: "70.7%" },
      { name: "India", emoji: "🇮🇳", value: 35.7, display: "35.7%" }
    ],
    source: {
      name: "World Bank (UN Population Division data)",
      dataset: "World Development Indicators — Urban population, % of total (SP.URB.TOTL.IN.ZS)",
      year: 2025,
      url: "https://data.worldbank.org/indicator/SP.URB.TOTL.IN.ZS"
    },
    surprisingFact: "Japan is more urban than the United States: 92% of Japanese live in urban areas, versus 80% of Americans.",
    note: "Countries define \"urban\" differently.",
    confidence: "high"
  },
  {
    id: 29,
    question: "Which Baltic Sea island is the biggest?",
    metric: "Island area in km²",
    items: [
      { name: "Gotland", emoji: "🇸🇪", value: 2994, display: "2,994 km²" },
      { name: "Saaremaa", emoji: "🇪🇪", value: 2673, display: "2,673 km²" },
      { name: "Öland", emoji: "🇸🇪", value: 1342, display: "1,342 km²" },
      { name: "Hiiumaa", emoji: "🇪🇪", value: 989, display: "989 km²" },
      { name: "Bornholm", emoji: "🇩🇰", value: 588, display: "588 km²" }
    ],
    source: {
      name: "National figures compiled in Wikipedia's list of Baltic Sea islands",
      dataset: "List of islands in the Baltic Sea",
      year: 2026,
      url: "https://en.wikipedia.org/wiki/List_of_islands_in_the_Baltic_Sea"
    },
    surprisingFact: "Estonia's Hiiumaa is much bigger than Denmark's Bornholm, and Saaremaa is almost as big as Gotland.",
    note: "Best replaced with direct links to Statistics Sweden, the Estonian Land Board and Statistics Denmark before launch.",
    confidence: "medium"
  },
  {
    id: 30,
    question: "Which country has the most freshwater per person?",
    metric: "Renewable internal freshwater, m³ per person per year",
    barScale: "log",
    items: [
      { name: "Iceland", emoji: "🇮🇸", value: 445023, display: "445,023 m³" },
      { name: "Canada", emoji: "🇨🇦", value: 73170, display: "73,170 m³" },
      { name: "Brazil", emoji: "🇧🇷", value: 26918, display: "26,918 m³" },
      { name: "Estonia", emoji: "🇪🇪", value: 9423, display: "9,423 m³" },
      { name: "Egypt", emoji: "🇪🇬", value: 8.9, display: "8.9 m³" }
    ],
    source: {
      name: "World Bank (FAO AQUASTAT data)",
      dataset: "World Development Indicators — Renewable internal freshwater resources per capita (ER.H2O.INTR.PC)",
      year: 2022,
      url: "https://data.worldbank.org/indicator/ER.H2O.INTR.PC"
    },
    surprisingFact: "Egypt has less than 9 m³ of its own renewable freshwater per person — almost all of its water comes from the Nile, which rises outside the country.",
    note: "\"Internal\" means water from rain and rivers inside the country; it excludes rivers flowing in from abroad.",
    confidence: "high"
  },

  /* ===== Puzzles 31–60 (second month) ===== */
  {
    id: 31,
    question: "Which country has the most hospital beds per person?",
    metric: "Hospital beds per 1,000 people",
    items: [
      { name: "South Korea", emoji: "🇰🇷", value: 12.81, display: "12.8" },
      { name: "Germany", emoji: "🇩🇪", value: 7.55, display: "7.6" },
      { name: "Estonia", emoji: "🇪🇪", value: 4.13, display: "4.1" },
      { name: "United States", emoji: "🇺🇸", value: 2.68, display: "2.7" },
      { name: "Sweden", emoji: "🇸🇪", value: 1.90, display: "1.9" }
    ],
    source: {
      name: "World Bank (WHO/OECD data)",
      dataset: "World Development Indicators — Hospital beds per 1,000 people (SH.MED.BEDS.ZS)",
      year: "2022–2023",
      url: "https://data.worldbank.org/indicator/SH.MED.BEDS.ZS"
    },
    surprisingFact: "Sweden has fewer hospital beds per person than the United States — and less than a sixth of South Korea's.",
    note: "Latest year available: 2023 for Germany and Estonia, 2022 for the others.",
    confidence: "high"
  },
  {
    id: 32,
    question: "Which official ball is the heaviest?",
    metric: "Weight allowed by each sport's official rules, in grams",
    items: [
      { name: "Basketball (men's, size 7)", emoji: "🏀", value: 608.5, display: "567–650 g",
        source: { name: "FIBA Official Basketball Rules", url: "https://www.fiba.basketball/" } },
      { name: "Football (size 5)", emoji: "⚽", value: 430, display: "410–450 g",
        source: { name: "IFAB Laws of the Game", url: "https://www.theifab.com/" } },
      { name: "Volleyball", emoji: "🏐", value: 270, display: "260–280 g",
        source: { name: "FIVB Official Volleyball Rules", url: "https://www.fivb.com/" } },
      { name: "Tennis ball", emoji: "🎾", value: 57.7, display: "56.0–59.4 g",
        source: { name: "ITF Rules of Tennis", url: "https://www.itftennis.com/" } },
      { name: "Golf ball", emoji: "⛳", value: 45.93, display: "max 45.93 g",
        source: { name: "R&A Rules of Golf", url: "https://www.randa.org/" } }
    ],
    source: {
      name: "Official rules of each sport",
      dataset: "Equipment specifications",
      year: 2026,
      url: ""
    },
    barScale: "log",
    surprisingFact: "A golf ball can weigh up to 45.93 g — about 80% of a tennis ball, even though it is much smaller.",
    confidence: "high"
  },
  {
    id: 33,
    question: "Which planet is the densest?",
    metric: "Average density in kg per m³ (water = 1,000)",
    items: [
      { name: "Earth", emoji: "🌍", value: 5514, display: "5,514 kg/m³" },
      { name: "Mars", emoji: "🔴", value: 3934, display: "3,934 kg/m³" },
      { name: "Neptune", emoji: "🔵", value: 1638, display: "1,638 kg/m³" },
      { name: "Jupiter", emoji: "🪐", value: 1326, display: "1,326 kg/m³" },
      { name: "Saturn", emoji: "🪐", value: 687, display: "687 kg/m³" }
    ],
    source: {
      name: "NASA Goddard Space Flight Center (NSSDCA)",
      dataset: "Planetary Fact Sheet — Metric",
      year: 2025,
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"
    },
    surprisingFact: "Earth is the densest planet in the solar system, and Saturn is less dense than water — in a big enough bathtub, it would float.",
    confidence: "high"
  },
  {
    id: 34,
    question: "Which food has the most iron?",
    metric: "mg of iron per 100 g",
    items: [
      { name: "Dark chocolate (70–85% cocoa)", emoji: "🍫", value: 11.9, display: "11.9 mg" },
      { name: "Lentils, cooked", emoji: "🫘", value: 3.33, display: "3.33 mg" },
      { name: "Spinach, raw", emoji: "🥬", value: 2.71, display: "2.71 mg" },
      { name: "Ground beef, cooked", emoji: "🥩", value: 2.48, display: "2.48 mg" },
      { name: "Egg", emoji: "🥚", value: 1.75, display: "1.75 mg" }
    ],
    source: {
      name: "U.S. Department of Agriculture (USDA)",
      dataset: "FoodData Central — SR Legacy",
      year: 2018,
      url: "https://fdc.nal.usda.gov/"
    },
    surprisingFact: "Gram for gram, dark chocolate has more than four times the iron of spinach — and more than ground beef.",
    note: "Ground beef: 70% lean, pan-browned.",
    confidence: "high"
  },
  {
    id: 35,
    question: "Which country has the highest minimum wage?",
    metric: "Monthly minimum wage in euros, 1 January 2026",
    items: [
      { name: "Luxembourg", emoji: "🇱🇺", value: 2704, display: "€2,704" },
      { name: "Germany", emoji: "🇩🇪", value: 2343, display: "€2,343" },
      { name: "Spain", emoji: "🇪🇸", value: 1381, display: "€1,381" },
      { name: "Lithuania", emoji: "🇱🇹", value: 1153, display: "€1,153" },
      { name: "Estonia", emoji: "🇪🇪", value: 886, display: "€886" }
    ],
    source: {
      name: "Eurostat",
      dataset: "Monthly minimum wages (earn_mw_cur)",
      year: 2026,
      url: "https://ec.europa.eu/eurostat/databrowser/view/earn_mw_cur/default/table"
    },
    surprisingFact: "Lithuania's minimum wage is about 30% higher than Estonia's. Five EU countries — Denmark, Italy, Austria, Finland and Sweden — have no national minimum wage at all.",
    note: "Spain's figure is converted from 14 payments a year to 12.",
    confidence: "high"
  },
  {
    id: 36,
    question: "Which of these websites started first?",
    metric: "Year founded or launched (oldest at the top)",
    hideBars: true,
    items: [
      { name: "Amazon", emoji: "📦", value: 1994, display: "1994",
        source: { name: "Amazon", url: "https://www.aboutamazon.com/" } },
      { name: "Google", emoji: "🔎", value: 1998, display: "1998",
        source: { name: "Google", url: "https://about.google/" } },
      { name: "Wikipedia", emoji: "📚", value: 2001, display: "2001",
        source: { name: "Wikimedia Foundation", url: "https://wikimediafoundation.org/" } },
      { name: "Facebook", emoji: "👍", value: 2004, display: "2004",
        source: { name: "Meta", url: "https://about.meta.com/" } },
      { name: "YouTube", emoji: "▶️", value: 2005, display: "2005",
        source: { name: "YouTube", url: "https://about.youtube/" } }
    ],
    source: {
      name: "Company histories",
      dataset: "Founding / launch years",
      year: "historical record",
      url: ""
    },
    surprisingFact: "Amazon is four years older than Google — it started in 1994 as an online bookstore.",
    confidence: "high"
  },
  {
    id: 37,
    question: "Which country farms the most fish and seafood?",
    metric: "Aquaculture production, tonnes per year",
    barScale: "log",
    items: [
      { name: "China", emoji: "🇨🇳", value: 75434999, display: "75.4 million t" },
      { name: "Indonesia", emoji: "🇮🇩", value: 14776132, display: "14.8 million t" },
      { name: "Vietnam", emoji: "🇻🇳", value: 5113494, display: "5.1 million t" },
      { name: "Egypt", emoji: "🇪🇬", value: 1552430, display: "1.55 million t" },
      { name: "Japan", emoji: "🇯🇵", value: 943495, display: "0.94 million t" }
    ],
    source: {
      name: "World Bank (FAO data)",
      dataset: "World Development Indicators — Aquaculture production (ER.FSH.AQUA.MT)",
      year: 2022,
      url: "https://data.worldbank.org/indicator/ER.FSH.AQUA.MT"
    },
    surprisingFact: "Egypt farms more fish than Japan — about 1.55 million tonnes a year versus 0.94 million.",
    confidence: "high"
  },
  {
    id: 38,
    question: "Which country covers the most area?",
    metric: "Total surface area in km²",
    items: [
      { name: "Japan", emoji: "🇯🇵", value: 377969, display: "377,969 km²" },
      { name: "Germany", emoji: "🇩🇪", value: 357680, display: "357,680 km²" },
      { name: "Finland", emoji: "🇫🇮", value: 338480, display: "338,480 km²" },
      { name: "Poland", emoji: "🇵🇱", value: 313930, display: "313,930 km²" },
      { name: "United Kingdom", emoji: "🇬🇧", value: 243610, display: "243,610 km²" }
    ],
    source: {
      name: "World Bank",
      dataset: "World Development Indicators — Surface area (AG.SRF.TOTL.K2)",
      year: 2023,
      url: "https://data.worldbank.org/indicator/AG.SRF.TOTL.K2"
    },
    surprisingFact: "Japan is bigger than Germany, and Finland is only about 5% smaller than Germany.",
    confidence: "high"
  },
  {
    id: 39,
    question: "Which country has the biggest share of children?",
    metric: "Population aged 0–14, % of total population",
    items: [
      { name: "Nigeria", emoji: "🇳🇬", value: 41.0, display: "41.0%" },
      { name: "Israel", emoji: "🇮🇱", value: 27.4, display: "27.4%" },
      { name: "India", emoji: "🇮🇳", value: 24.6, display: "24.6%" },
      { name: "Estonia", emoji: "🇪🇪", value: 15.6, display: "15.6%" },
      { name: "South Korea", emoji: "🇰🇷", value: 10.6, display: "10.6%" }
    ],
    source: {
      name: "World Bank (UN Population Division data)",
      dataset: "World Development Indicators — Population ages 0–14 (SP.POP.0014.TO.ZS)",
      year: 2024,
      url: "https://data.worldbank.org/indicator/SP.POP.0014.TO.ZS"
    },
    surprisingFact: "Israel has a bigger share of children than India: 27% of Israelis are under 15.",
    confidence: "high"
  },
  {
    id: 40,
    question: "Which city's metro opened first?",
    metric: "Year the first underground line opened (oldest at the top)",
    hideBars: true,
    items: [
      { name: "London", emoji: "🇬🇧", value: 1863, display: "1863",
        source: { name: "Transport for London", url: "https://tfl.gov.uk/" } },
      { name: "Budapest", emoji: "🇭🇺", value: 1896, display: "1896",
        source: { name: "BKV Budapest", url: "https://bkv.hu/en" } },
      { name: "Paris", emoji: "🇫🇷", value: 1900, display: "1900",
        source: { name: "RATP", url: "https://www.ratp.fr/en" } },
      { name: "New York", emoji: "🇺🇸", value: 1904, display: "1904",
        source: { name: "MTA", url: "https://new.mta.info/" } },
      { name: "Tokyo", emoji: "🇯🇵", value: 1927, display: "1927",
        source: { name: "Tokyo Metro", url: "https://www.tokyometro.jp/en/" } }
    ],
    source: {
      name: "City transport operators",
      dataset: "Opening years",
      year: "historical record",
      url: ""
    },
    surprisingFact: "Budapest's underground opened in 1896, four years before the Paris Métro — the oldest in continental Europe.",
    confidence: "high"
  },
  {
    id: 41,
    question: "Which country has won the most Winter Olympic medals ever?",
    metric: "All-time Winter Olympic medals (gold + silver + bronze), including Milano Cortina 2026",
    items: [
      { name: "Norway", emoji: "🇳🇴", value: 447, display: "447" },
      { name: "United States", emoji: "🇺🇸", value: 363, display: "363" },
      { name: "Austria", emoji: "🇦🇹", value: 268, display: "268" },
      { name: "Finland", emoji: "🇫🇮", value: 181, display: "181" },
      { name: "Japan", emoji: "🇯🇵", value: 100, display: "100" }
    ],
    source: {
      name: "Topend Sports (compiled from Olympics.com results)",
      dataset: "All-time Winter Olympics medal tally",
      year: 2026,
      url: "https://www.topendsports.com/events/winter/medal-tally/all-time.htm"
    },
    surprisingFact: "Norway, with about 5.6 million people, has won more Winter Olympic medals than any other country — including a record 18 golds at Milano Cortina 2026.",
    confidence: "medium"
  },
  {
    id: 42,
    question: "Where does each person use the most electricity?",
    metric: "Electric power consumption, kWh per person per year",
    items: [
      { name: "Iceland", emoji: "🇮🇸", value: 50951, display: "50,951 kWh" },
      { name: "Norway", emoji: "🇳🇴", value: 23520, display: "23,520 kWh" },
      { name: "Finland", emoji: "🇫🇮", value: 14393, display: "14,393 kWh" },
      { name: "United States", emoji: "🇺🇸", value: 12711, display: "12,711 kWh" },
      { name: "Estonia", emoji: "🇪🇪", value: 5722, display: "5,722 kWh" }
    ],
    source: {
      name: "World Bank",
      dataset: "World Development Indicators — Electric power consumption, kWh per capita (EG.USE.ELEC.KH.PC)",
      year: 2023,
      url: "https://data.worldbank.org/indicator/EG.USE.ELEC.KH.PC"
    },
    surprisingFact: "Iceland uses about four times as much electricity per person as the United States.",
    note: "Includes electricity used by industry, divided by the population.",
    confidence: "high"
  },
  {
    id: 43,
    question: "Which has the most potassium?",
    metric: "mg of potassium per 100 g, raw",
    items: [
      { name: "Spinach", emoji: "🥬", value: 558, display: "558 mg" },
      { name: "Avocado", emoji: "🥑", value: 485, display: "485 mg" },
      { name: "Banana", emoji: "🍌", value: 358, display: "358 mg" },
      { name: "Orange", emoji: "🍊", value: 181, display: "181 mg" },
      { name: "Apple", emoji: "🍎", value: 107, display: "107 mg" }
    ],
    source: {
      name: "U.S. Department of Agriculture (USDA)",
      dataset: "FoodData Central — SR Legacy",
      year: 2018,
      url: "https://fdc.nal.usda.gov/"
    },
    surprisingFact: "Bananas are famous for potassium, but avocados have about a third more and spinach over 50% more.",
    confidence: "high"
  },
  {
    id: 44,
    question: "Which country spends the most on research?",
    metric: "Research and development spending, % of GDP",
    items: [
      { name: "Israel", emoji: "🇮🇱", value: 6.35, display: "6.35%" },
      { name: "South Korea", emoji: "🇰🇷", value: 4.94, display: "4.94%" },
      { name: "Germany", emoji: "🇩🇪", value: 3.15, display: "3.15%" },
      { name: "China", emoji: "🇨🇳", value: 2.58, display: "2.58%" },
      { name: "Estonia", emoji: "🇪🇪", value: 1.84, display: "1.84%" }
    ],
    source: {
      name: "World Bank (UNESCO data)",
      dataset: "World Development Indicators — Research and development expenditure, % of GDP (GB.XPD.RSDV.GD.ZS)",
      year: 2023,
      url: "https://data.worldbank.org/indicator/GB.XPD.RSDV.GD.ZS"
    },
    surprisingFact: "Israel spends more than 6% of its GDP on research — almost twice the share of the United States (3.4%).",
    confidence: "high"
  },
  {
    id: 45,
    question: "Which animal is pregnant the longest?",
    metric: "Typical length of pregnancy, in months",
    items: [
      { name: "African elephant", emoji: "🐘", value: 22, display: "≈22 months" },
      { name: "Giraffe", emoji: "🦒", value: 15, display: "≈15 months" },
      { name: "Horse", emoji: "🐎", value: 11, display: "≈11 months" },
      { name: "Human", emoji: "🧑", value: 9, display: "≈9 months" },
      { name: "Dog", emoji: "🐕", value: 2.1, display: "≈2 months (63 days)" }
    ],
    source: {
      name: "San Diego Zoo Wildlife Alliance",
      dataset: "Animals and Plants fact sheets",
      year: 2026,
      url: "https://animals.sandiegozoo.org/"
    },
    surprisingFact: "An elephant pregnancy lasts almost two years — the longest of any land mammal.",
    note: "Typical values; individual pregnancies vary by a few weeks.",
    confidence: "medium"
  },
  {
    id: 46,
    question: "Which country's highest point is the highest?",
    metric: "Elevation of each country's highest natural point, in metres",
    items: [
      { name: "Poland (Rysy)", emoji: "🇵🇱", value: 2499, display: "2,499 m" },
      { name: "Sweden (Kebnekaise)", emoji: "🇸🇪", value: 2097, display: "2,097 m" },
      { name: "United Kingdom (Ben Nevis)", emoji: "🇬🇧", value: 1345, display: "1,345 m" },
      { name: "Belgium (Signal de Botrange)", emoji: "🇧🇪", value: 694, display: "694 m" },
      { name: "Estonia (Suur Munamägi)", emoji: "🇪🇪", value: 318, display: "318 m" }
    ],
    source: {
      name: "National survey figures compiled in Wikipedia's list of highest points of European countries",
      dataset: "List of highest points of European countries",
      year: 2026,
      url: "https://en.wikipedia.org/wiki/List_of_highest_points_of_European_countries"
    },
    surprisingFact: "Poland's highest point (2,499 m) is higher than Norway's Galdhøpiggen (2,469 m).",
    note: "Best replaced with direct links to each national land survey before launch.",
    confidence: "medium"
  },
  {
    id: 47,
    question: "Which country has the most mobile phone subscriptions per person?",
    metric: "Mobile subscriptions per 100 people",
    items: [
      { name: "Hong Kong", emoji: "🇭🇰", value: 292.8, display: "292.8" },
      { name: "Japan", emoji: "🇯🇵", value: 168.6, display: "168.6" },
      { name: "Estonia", emoji: "🇪🇪", value: 152.3, display: "152.3" },
      { name: "United States", emoji: "🇺🇸", value: 108.8, display: "108.8" },
      { name: "India", emoji: "🇮🇳", value: 80.2, display: "80.2" }
    ],
    source: {
      name: "World Bank (ITU data)",
      dataset: "World Development Indicators — Mobile cellular subscriptions per 100 people (IT.CEL.SETS.P2)",
      year: 2022,
      url: "https://data.worldbank.org/indicator/IT.CEL.SETS.P2"
    },
    surprisingFact: "Hong Kong has almost three mobile subscriptions per person — and Estonia has more per person than the United States.",
    note: "Includes SIM cards in devices such as tablets and smart meters.",
    confidence: "high"
  },
  {
    id: 48,
    question: "Which came first?",
    metric: "Year it happened (earliest at the top)",
    hideBars: true,
    items: [
      { name: "Teaching begins at Oxford University", emoji: "🎓", value: 1096, display: "by 1096",
        source: { name: "University of Oxford", url: "https://www.ox.ac.uk/" } },
      { name: "The Aztecs found Tenochtitlan", emoji: "🏛️", value: 1325, display: "1325",
        source: { name: "Encyclopaedia Britannica", url: "https://www.britannica.com/place/Tenochtitlan" } },
      { name: "Gutenberg prints his Bible", emoji: "📖", value: 1455, display: "c. 1455",
        source: { name: "Encyclopaedia Britannica", url: "https://www.britannica.com/topic/Gutenberg-Bible" } },
      { name: "Columbus reaches the Americas", emoji: "⛵", value: 1492, display: "1492",
        source: { name: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/Christopher-Columbus" } },
      { name: "Shakespeare is born", emoji: "🎭", value: 1564, display: "1564",
        source: { name: "Encyclopaedia Britannica", url: "https://www.britannica.com/biography/William-Shakespeare" } }
    ],
    source: {
      name: "University of Oxford and Encyclopaedia Britannica",
      dataset: "Historical dates",
      year: "historical record",
      url: "https://www.britannica.com/"
    },
    surprisingFact: "Oxford University was already teaching students more than 200 years before the Aztecs founded Tenochtitlan.",
    confidence: "high"
  },
  {
    id: 49,
    question: "Where does each person emit the most CO₂?",
    metric: "CO₂ emissions, tonnes per person per year",
    items: [
      { name: "Australia", emoji: "🇦🇺", value: 14.16, display: "14.2 t" },
      { name: "China", emoji: "🇨🇳", value: 9.23, display: "9.2 t" },
      { name: "Estonia", emoji: "🇪🇪", value: 8.37, display: "8.4 t" },
      { name: "Germany", emoji: "🇩🇪", value: 7.08, display: "7.1 t" },
      { name: "Sweden", emoji: "🇸🇪", value: 3.48, display: "3.5 t" }
    ],
    source: {
      name: "World Bank (EDGAR data)",
      dataset: "World Development Indicators — CO₂ emissions per capita, excl. land use (EN.GHG.CO2.PC.CE.AR5)",
      year: 2023,
      url: "https://data.worldbank.org/indicator/EN.GHG.CO2.PC.CE.AR5"
    },
    surprisingFact: "The average person in China now emits more CO₂ than the average German — 9.2 tonnes versus 7.1.",
    confidence: "high"
  },
  {
    id: 50,
    question: "Which sport has the most players per team on the field?",
    metric: "Players per team on the field at once",
    items: [
      { name: "Australian rules football", emoji: "🏉", value: 18, display: "18",
        source: { name: "AFL Laws of Australian Football", url: "https://www.afl.com.au/" } },
      { name: "Rugby union", emoji: "🏉", value: 15, display: "15",
        source: { name: "World Rugby", url: "https://www.world.rugby/" } },
      { name: "Football (soccer)", emoji: "⚽", value: 11, display: "11",
        source: { name: "IFAB Laws of the Game", url: "https://www.theifab.com/" } },
      { name: "Baseball", emoji: "⚾", value: 9, display: "9",
        source: { name: "Major League Baseball", url: "https://www.mlb.com/" } },
      { name: "Basketball", emoji: "🏀", value: 5, display: "5",
        source: { name: "FIBA Official Basketball Rules", url: "https://www.fiba.basketball/" } }
    ],
    source: {
      name: "Official rules of each sport",
      dataset: "Team sizes",
      year: 2026,
      url: ""
    },
    surprisingFact: "An Australian rules football match has 36 players on the field at the same time.",
    confidence: "high"
  },
  {
    id: 51,
    question: "Which country spends the most on health per person?",
    metric: "Current health spending per person, US$",
    items: [
      { name: "United States", emoji: "🇺🇸", value: 13473, display: "$13,473" },
      { name: "Switzerland", emoji: "🇨🇭", value: 11784, display: "$11,784" },
      { name: "Germany", emoji: "🇩🇪", value: 6395, display: "$6,395" },
      { name: "Japan", emoji: "🇯🇵", value: 3638, display: "$3,638" },
      { name: "Estonia", emoji: "🇪🇪", value: 2258, display: "$2,258" }
    ],
    source: {
      name: "World Bank (WHO data)",
      dataset: "World Development Indicators — Current health expenditure per capita, US$ (SH.XPD.CHEX.PC.CD)",
      year: 2023,
      url: "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD"
    },
    surprisingFact: "The US spends about 3.7 times as much on health per person as Japan, which has one of the longest life expectancies in the world.",
    confidence: "high"
  },
  {
    id: 52,
    question: "Which planet is tilted the most?",
    metric: "Axial tilt (obliquity to orbit), in degrees",
    items: [
      { name: "Venus", emoji: "🟡", value: 177.4, display: "177.4°" },
      { name: "Uranus", emoji: "🔵", value: 97.8, display: "97.8°" },
      { name: "Neptune", emoji: "🔵", value: 28.3, display: "28.3°" },
      { name: "Earth", emoji: "🌍", value: 23.4, display: "23.4°" },
      { name: "Mercury", emoji: "🌑", value: 0.034, display: "0.034°" }
    ],
    source: {
      name: "NASA Goddard Space Flight Center (NSSDCA)",
      dataset: "Planetary Fact Sheet — Metric",
      year: 2025,
      url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"
    },
    surprisingFact: "Venus is tilted 177° — it is essentially upside down, so it spins the opposite way to most planets.",
    confidence: "high"
  },
  {
    id: 53,
    question: "Which fruit has the most sugar?",
    metric: "Grams of sugar per 100 g, raw",
    items: [
      { name: "Grapes", emoji: "🍇", value: 15.48, display: "15.5 g" },
      { name: "Mango", emoji: "🥭", value: 13.66, display: "13.7 g" },
      { name: "Banana", emoji: "🍌", value: 12.23, display: "12.2 g" },
      { name: "Apple", emoji: "🍎", value: 10.39, display: "10.4 g" },
      { name: "Strawberries", emoji: "🍓", value: 4.89, display: "4.9 g" }
    ],
    source: {
      name: "U.S. Department of Agriculture (USDA)",
      dataset: "FoodData Central — SR Legacy",
      year: 2018,
      url: "https://fdc.nal.usda.gov/"
    },
    surprisingFact: "Grapes have more sugar than bananas, gram for gram — and strawberries have less than half as much as an apple.",
    note: "Grapes: red or green (European type).",
    confidence: "high"
  },
  {
    id: 54,
    question: "Which country has the highest GDP per person?",
    metric: "GDP per person, current US$",
    items: [
      { name: "Ireland", emoji: "🇮🇪", value: 112895, display: "$112,895" },
      { name: "United States", emoji: "🇺🇸", value: 86170, display: "$86,170" },
      { name: "South Korea", emoji: "🇰🇷", value: 36239, display: "$36,239" },
      { name: "Japan", emoji: "🇯🇵", value: 33797, display: "$33,797" },
      { name: "Estonia", emoji: "🇪🇪", value: 31428, display: "$31,428" }
    ],
    source: {
      name: "World Bank",
      dataset: "World Development Indicators — GDP per capita, current US$ (NY.GDP.PCAP.CD)",
      year: 2024,
      url: "https://data.worldbank.org/indicator/NY.GDP.PCAP.CD"
    },
    surprisingFact: "South Korea's GDP per person is now higher than Japan's — and Estonia is close behind both.",
    note: "Current US$ figures move with exchange rates.",
    confidence: "high"
  },
  {
    id: 55,
    question: "Which country protects the biggest share of its land?",
    metric: "Protected areas on land, % of land area",
    items: [
      { name: "Germany", emoji: "🇩🇪", value: 39.3, display: "39.3%" },
      { name: "Brazil", emoji: "🇧🇷", value: 30.6, display: "30.6%" },
      { name: "Estonia", emoji: "🇪🇪", value: 22.0, display: "22.0%" },
      { name: "Sweden", emoji: "🇸🇪", value: 15.5, display: "15.5%" },
      { name: "United States", emoji: "🇺🇸", value: 12.9, display: "12.9%" }
    ],
    source: {
      name: "World Bank (UNEP-WCMC data)",
      dataset: "World Development Indicators — Terrestrial protected areas, % of land area (ER.LND.PTLD.ZS)",
      year: 2024,
      url: "https://data.worldbank.org/indicator/ER.LND.PTLD.ZS"
    },
    surprisingFact: "Germany protects a bigger share of its land than Brazil — about 39% versus 31%.",
    note: "Protection rules differ a lot between countries.",
    confidence: "high"
  },
  {
    id: 56,
    question: "Which invention came first?",
    metric: "Year (earliest at the top)",
    hideBars: true,
    items: [
      { name: "Fax machine (Bain's patent)", emoji: "📠", value: 1843, display: "1843" },
      { name: "Telephone (Bell's patent)", emoji: "☎️", value: 1876, display: "1876" },
      { name: "Petrol car (Benz's patent)", emoji: "🚗", value: 1886, display: "1886" },
      { name: "Powered aeroplane flight (Wright brothers)", emoji: "✈️", value: 1903, display: "1903" },
      { name: "Television demonstration (Baird)", emoji: "📺", value: 1926, display: "1926" }
    ],
    source: {
      name: "Encyclopaedia Britannica",
      dataset: "History of technology",
      year: "historical record",
      url: "https://www.britannica.com/"
    },
    surprisingFact: "The fax machine is older than the telephone — Alexander Bain patented one in 1843.",
    confidence: "high"
  },
  {
    id: 57,
    question: "Which country files the most patents?",
    metric: "Patent applications by residents, per year",
    barScale: "log",
    items: [
      { name: "China", emoji: "🇨🇳", value: 1522292, display: "1,522,292" },
      { name: "United States", emoji: "🇺🇸", value: 278446, display: "278,446" },
      { name: "South Korea", emoji: "🇰🇷", value: 191142, display: "191,142" },
      { name: "India", emoji: "🇮🇳", value: 49860, display: "49,860" },
      { name: "Germany", emoji: "🇩🇪", value: 38489, display: "38,489" }
    ],
    source: {
      name: "World Bank (WIPO data)",
      dataset: "World Development Indicators — Patent applications, residents (IP.PAT.RESD)",
      year: 2023,
      url: "https://data.worldbank.org/indicator/IP.PAT.RESD"
    },
    surprisingFact: "South Korea, with about 51 million people, files about five times as many patents as Germany.",
    confidence: "high"
  },
  {
    id: 58,
    question: "Where do people drink the most alcohol?",
    metric: "Litres of pure alcohol per person (age 15+) per year",
    items: [
      { name: "Latvia", emoji: "🇱🇻", value: 12.87, display: "12.9 L" },
      { name: "Germany", emoji: "🇩🇪", value: 11.84, display: "11.8 L" },
      { name: "Estonia", emoji: "🇪🇪", value: 10.68, display: "10.7 L" },
      { name: "Italy", emoji: "🇮🇹", value: 6.97, display: "7.0 L" },
      { name: "Nigeria", emoji: "🇳🇬", value: 3.78, display: "3.8 L" }
    ],
    source: {
      name: "World Bank (WHO data)",
      dataset: "World Development Indicators — Total alcohol consumption per capita (SH.ALC.PCAP.LI)",
      year: 2020,
      url: "https://data.worldbank.org/indicator/SH.ALC.PCAP.LI"
    },
    surprisingFact: "Germans drink more pure alcohol per person than Russians — 11.8 litres a year versus 10.5.",
    confidence: "high"
  },
  {
    id: 59,
    question: "Which tech company is the oldest?",
    metric: "Year founded (oldest at the top)",
    hideBars: true,
    items: [
      { name: "Nintendo", emoji: "🎮", value: 1889, display: "1889",
        source: { name: "Nintendo", url: "https://www.nintendo.co.jp/corporate/en/" } },
      { name: "Samsung", emoji: "🇰🇷", value: 1938, display: "1938",
        source: { name: "Samsung", url: "https://www.samsung.com/" } },
      { name: "Sony", emoji: "🇯🇵", value: 1946, display: "1946",
        source: { name: "Sony", url: "https://www.sony.com/" } },
      { name: "Microsoft", emoji: "🪟", value: 1975, display: "1975",
        source: { name: "Microsoft", url: "https://news.microsoft.com/" } },
      { name: "Apple", emoji: "🍏", value: 1976, display: "1976",
        source: { name: "Apple", url: "https://www.apple.com/" } }
    ],
    source: {
      name: "Company histories",
      dataset: "Founding years",
      year: "historical record",
      url: ""
    },
    surprisingFact: "Nintendo was founded in 1889 — it started out making playing cards in Kyoto.",
    confidence: "high"
  },
  {
    id: 60,
    question: "Which country's farms harvest the most grain per hectare?",
    metric: "Cereal yield, kg per hectare",
    items: [
      { name: "Netherlands", emoji: "🇳🇱", value: 8860, display: "8,860 kg" },
      { name: "Egypt", emoji: "🇪🇬", value: 7078, display: "7,078 kg" },
      { name: "France", emoji: "🇫🇷", value: 6655, display: "6,655 kg" },
      { name: "Estonia", emoji: "🇪🇪", value: 4225, display: "4,225 kg" },
      { name: "Australia", emoji: "🇦🇺", value: 3278, display: "3,278 kg" }
    ],
    source: {
      name: "World Bank (FAO data)",
      dataset: "World Development Indicators — Cereal yield, kg per hectare (AG.YLD.CREL.KG)",
      year: 2022,
      url: "https://data.worldbank.org/indicator/AG.YLD.CREL.KG"
    },
    surprisingFact: "Egypt's farms harvest more grain per hectare than France's — about 7.1 tonnes versus 6.7.",
    confidence: "high"
  }
];
