# Rank the World

*Put the world in the right order.* A daily ranking game in plain HTML, CSS and JavaScript — no build step, no framework.

```
index.html   page structure
style.css    all styling (light + dark mode)
app.js       game logic + all UI text (English and Estonian)
puzzles.js   all 30 puzzles, in one array
```

## Assumptions I made

- **Launch date is today, 19 Oct 2026**, so today shows puzzle #1. Change `LAUNCH_DATE` at the top of `app.js` to your real launch day.
- There are **60 puzzles (two months)**. After #60 the list starts again from #1, so add more before then.
- The share text ends with the page's own address once it's online (`rank-the-world.example` when opened as a local file). Set `SITE_URL` in `app.js` to force a specific address.
- The globe button already switches the interface between **English and Estonian**. Puzzle text is still English only; `app.js` explains how to add Estonian puzzle text.
- To keep the game hard, the starting shuffle never has more than one card already in the right place.
- Cards I could only date by year (universities, landmarks, languages, companies) show no size bars, because a bar for "year 1632" means nothing.
- The editor's confidence rating is hidden from players. Set `SHOW_CONFIDENCE: true` to show it.

## Run it locally

Double-click `index.html` — it opens in your browser and works.

Copying the share result can be blocked on `file://` pages in some browsers. To test it properly, run a tiny local server in the folder:

```
python3 -m http.server 8000
```

and open http://localhost:8000.

To reset your own progress while testing, open the browser console and run `localStorage.clear()`.

## Add a new puzzle

1. Open `puzzles.js` and copy any puzzle object.
2. Paste it at the **end** of the array and give it the next `id`.
3. List the 5 items **in the correct order** (most first). Each needs `name`, `emoji`, `value` (a number) and `display` (the text with unit, e.g. `"12.0 kg"`).
4. Fill in `source` (organisation, dataset, data year, link) and a true `surprisingFact`.
5. Check: no ties, no two values within about 5%, and every number checked against its source. If you're not sure, set `confidence: "needs-check"` and don't publish it yet.

Optional fields: `hideBars: true` (for years or negative values), `barScale: "log"` (when one value is huge), `note` (a caveat under the sources), and `source` on a single item when items come from different places.

## Deploy for free

**Netlify (easiest):** go to https://app.netlify.com/drop and drag the whole folder onto the page. You get a link in a few seconds.

**GitHub Pages:**
1. Create a new public repository on GitHub and upload the 4 files.
2. Go to **Settings → Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. After a minute the game is live at `https://<your-username>.github.io/<repo-name>/`.

## Verification table

Every World Bank, NASA, Eurostat, IEA and USDA value below was checked during the build against the live source (World Bank API, NASA fact sheet, Eurostat, IEA, USDA FoodData Central, CIA Factbook and others). Please spot-check them by hand before launch, especially the **medium** rows.

| # | Question | Items in order | Values | Source | Data year | Confidence |
|---|---|---|---|---|---|---|
| 1 | Most caffeine per 100 g | Espresso › Dark chocolate 70–85% › Filter coffee › Energy drink (sugar-free) › Black tea | 212 › 80 › 40 › 32 › 20 mg | USDA FoodData Central (SR Legacy) | 2018 | high |
| 2 | Biggest total area | Estonia › Switzerland › Belgium › Israel › Kuwait | 45,340 › 41,291 › 30,689 › 22,070 › 17,820 km² | World Bank AG.SRF.TOTL.K2 | 2023 | high |
| 3 | Longest solar day | Mercury › Venus › Earth › Uranus › Jupiter | 4,222.6 › 2,802.0 › 24.0 › 17.2 › 9.9 h | NASA Planetary Fact Sheet | 2025 | high |
| 4 | Exports, % of GDP | Ireland › Estonia › Germany › Japan › USA | 144.0 › 75.7 › 41.4 › 22.0 › 11.0 % | World Bank NE.EXP.GNFS.ZS | 2024 | high |
| 5 | Biggest stadium | Narendra Modi › Michigan › MCG › Wembley › Allianz Arena | 132,000 › 107,601 › 100,024 › 90,000 › 75,024 | Venue operators (via Wikipedia list) | 2026 | medium |
| 6 | Most sleep | Little brown bat › Tiger › House cat › Dog › Giraffe | 19.9 › 15.8 › 12.5 › 10.1 › 4.6 h/day | Siegel, *Nature* 437 (UCLA data table) | 2005 | high |
| 7 | Oldest university | Cambridge › Charles (Prague) › Uppsala › Tartu › Harvard | 1209 › 1348 › 1477 › 1632 › 1636 | Universities' own histories | historical | high |
| 8 | Most densely populated | Bangladesh › Netherlands › India › Japan › USA | 1,333 › 534 › 488 › 340 › 37 /km² | World Bank EN.POP.DNST | 2024 | high |
| 9 | Most Wikipedia articles | English › Cebuano › German › French › Japanese | ≈7.25 › 6.12 › 3.16 › 2.78 › 1.52 million | Wikimedia Meta-Wiki | mid-2026 | medium |
| 10 | Most vitamin C per 100 g | Red bell pepper › Kiwi › Strawberries › Orange › Apple | 127.7 › 92.7 › 58.8 › 53.2 › 4.6 mg | USDA FoodData Central (SR Legacy) | 2018 | high |
| 11 | Longest coastline | Greece › Italy › Estonia › Germany › Netherlands | 13,676 › 7,600 › 3,794 › 2,389 › 451 km | CIA World Factbook (Coastline) | 2022 | high |
| 12 | Longest rail tunnel | Gotthard Base › Seikan › Channel › Lötschberg Base › Guadarrama | 57.1 › 53.85 › 50.45 › 34.6 › 28.4 km | Tunnel operators | 2026 | high |
| 13 | Share aged 65+ | Japan › Italy › Estonia › South Korea › USA | 29.8 › 24.6 › 21.3 › 19.3 › 17.9 % | World Bank SP.POP.65UP.TO.ZS | 2024 | high |
| 14 | Strongest gravity | Jupiter › Neptune › Earth › Saturn › Mars | 23.1 › 11.0 › 9.8 › 9.0 › 3.7 m/s² | NASA Planetary Fact Sheet | 2025 | high |
| 15 | Air passengers carried | USA › China › Ireland › UK › Germany | 926.7 › 659.6 › 170.2 › 142.4 › 109.6 million | World Bank IS.AIR.PSGR (ICAO) | 2019 | high |
| 16 | Forest cover | Finland › Japan › Brazil › USA › China | 74.2 › 68.3 › 58.5 › 33.8 › 24.0 % | World Bank AG.LND.FRST.ZS | 2024 | high |
| 17 | First programming language | Fortran › C › C++ › Python › Java | 1957 › 1972 › 1985 › 1991 › 1995 | Creators / maintainers | historical | high |
| 18 | Renewable energy share | Norway › Sweden › Latvia › Estonia › Belgium | 77.9 › 62.8 › 45.5 › ≈38 › 14.3 % | Eurostat nrg_ind_ren | 2024 | medium |
| 19 | Most calories per 100 g | Avocado › Cooked white rice › Banana › Apple › Cucumber | 160 › 130 › 89 › 52 › 15 kcal | USDA FoodData Central (SR Legacy) | 2018 | high |
| 20 | Oldest landmark | Stonehenge › Great Pyramid › Colosseum › Machu Picchu › Taj Mahal | c. 3000 BC › c. 2560 BC › AD 80 › c. 1450 › 1632–53 | English Heritage, UNESCO | historical | high |
| 21 | Most people | Nigeria › Brazil › Japan › Germany › UK | 237.5 › 212.8 › 123.4 › 83.5 › 69.5 million | World Bank SP.POP.TOTL | 2025 | high |
| 22 | Tallest building | Burj Khalifa › Shanghai Tower › One WTC › Taipei 101 › Petronas Towers | 828 › 632 › 541.3 › 508 › 451.9 m | CTBUH Skyscraper Center | 2026 | high |
| 23 | Most rain | Japan › UK › France › Estonia › Australia | 1,668 › 1,220 › 867 › 626 › 534 mm/yr | World Bank AG.LND.PRCP.MM (FAO) | 2022 | high |
| 24 | Company founded first | Nokia › LEGO › IKEA › Skype › Spotify | 1865 › 1932 › 1943 › 2003 › 2006 | Company histories | historical | high |
| 25 | Electric share of new cars | Norway › Denmark › China › UK › USA | ≈91 › 56 › ≈48 › ≈28 › ≈10 % | IEA Global EV Outlook 2025 | 2024 | medium |
| 26 | Arable land share | Denmark › India › France › Japan › Brazil | 59.1 › 51.8 › 31.4 › 11.1 › 6.7 % | World Bank AG.LND.ARBL.ZS (FAO) | 2023 | high |
| 27 | Hottest planet | Venus › Mercury › Earth › Mars › Jupiter | 464 › 167 › 15 › −65 › −110 °C | NASA Planetary Fact Sheet | 2025 | high |
| 28 | Most urban | Japan › Belgium › USA › Estonia › India | 92.3 › 87.7 › 80.2 › 70.7 › 35.7 % | World Bank SP.URB.TOTL.IN.ZS | 2025 | high |
| 29 | Biggest Baltic Sea island | Gotland › Saaremaa › Öland › Hiiumaa › Bornholm | 2,994 › 2,673 › 1,342 › 989 › 588 km² | National figures (via Wikipedia list) | 2026 | medium |
| 30 | Freshwater per person | Iceland › Canada › Brazil › Estonia › Egypt | 445,023 › 73,170 › 26,918 › 9,423 › 8.9 m³ | World Bank ER.H2O.INTR.PC (FAO) | 2022 | high |
| 31 | Hospital beds per 1,000 | South Korea › Germany › Estonia › USA › Sweden | 12.8 › 7.6 › 4.1 › 2.7 › 1.9 | World Bank SH.MED.BEDS.ZS | 2022–23 | high |
| 32 | Heaviest official ball | Basketball › Football › Volleyball › Tennis › Golf | 567–650 › 410–450 › 260–280 › 56–59.4 › ≤45.93 g | FIBA, IFAB, FIVB, ITF, R&A rules | 2026 | high |
| 33 | Densest planet | Earth › Mars › Neptune › Jupiter › Saturn | 5,514 › 3,934 › 1,638 › 1,326 › 687 kg/m³ | NASA Planetary Fact Sheet | 2025 | high |
| 34 | Most iron per 100 g | Dark chocolate › Lentils › Spinach › Ground beef › Egg | 11.9 › 3.33 › 2.71 › 2.48 › 1.75 mg | USDA FoodData Central | 2018 | high |
| 35 | Highest minimum wage | Luxembourg › Germany › Spain › Lithuania › Estonia | €2,704 › 2,343 › 1,381 › 1,153 › 886 /month | Eurostat earn_mw_cur | Jan 2026 | high |
| 36 | Website started first | Amazon › Google › Wikipedia › Facebook › YouTube | 1994 › 1998 › 2001 › 2004 › 2005 | Company histories | historical | high |
| 37 | Most farmed fish | China › Indonesia › Vietnam › Egypt › Japan | 75.4 › 14.8 › 5.1 › 1.55 › 0.94 million t | World Bank ER.FSH.AQUA.MT (FAO) | 2022 | high |
| 38 | Largest area | Japan › Germany › Finland › Poland › UK | 377,969 › 357,680 › 338,480 › 313,930 › 243,610 km² | World Bank AG.SRF.TOTL.K2 | 2023 | high |
| 39 | Share of children 0–14 | Nigeria › Israel › India › Estonia › South Korea | 41.0 › 27.4 › 24.6 › 15.6 › 10.6 % | World Bank SP.POP.0014.TO.ZS | 2024 | high |
| 40 | First metro | London › Budapest › Paris › New York › Tokyo | 1863 › 1896 › 1900 › 1904 › 1927 | Transport operators | historical | high |
| 41 | Winter Olympic medals (all time) | Norway › USA › Austria › Finland › Japan | 447 › 363 › 268 › 181 › 100 | Topend Sports (Olympics.com results) | 2026 | medium |
| 42 | Electricity per person | Iceland › Norway › Finland › USA › Estonia | 50,951 › 23,520 › 14,393 › 12,711 › 5,722 kWh | World Bank EG.USE.ELEC.KH.PC | 2023 | high |
| 43 | Most potassium per 100 g | Spinach › Avocado › Banana › Orange › Apple | 558 › 485 › 358 › 181 › 107 mg | USDA FoodData Central | 2018 | high |
| 44 | R&D spending, % of GDP | Israel › South Korea › Germany › China › Estonia | 6.35 › 4.94 › 3.15 › 2.58 › 1.84 % | World Bank GB.XPD.RSDV.GD.ZS | 2023 | high |
| 45 | Longest pregnancy | Elephant › Giraffe › Horse › Human › Dog | ≈22 › 15 › 11 › 9 › 2 months | San Diego Zoo Wildlife Alliance | — | medium |
| 46 | Highest national point | Poland › Sweden › UK › Belgium › Estonia | 2,499 › 2,097 › 1,345 › 694 › 318 m | National surveys (via Wikipedia list) | 2026 | medium |
| 47 | Mobile subscriptions per 100 | Hong Kong › Japan › Estonia › USA › India | 292.8 › 168.6 › 152.3 › 108.8 › 80.2 | World Bank IT.CEL.SETS.P2 (ITU) | 2022 | high |
| 48 | Which came first | Oxford teaching › Tenochtitlan › Gutenberg Bible › Columbus › Shakespeare born | 1096 › 1325 › c.1455 › 1492 › 1564 | Oxford, Britannica | historical | high |
| 49 | CO₂ per person | Australia › China › Estonia › Germany › Sweden | 14.2 › 9.2 › 8.4 › 7.1 › 3.5 t | World Bank EN.GHG.CO2.PC.CE.AR5 (EDGAR) | 2023 | high |
| 50 | Players per team | Aussie rules › Rugby union › Football › Baseball › Basketball | 18 › 15 › 11 › 9 › 5 | Official rules | 2026 | high |
| 51 | Health spending per person | USA › Switzerland › Germany › Japan › Estonia | $13,473 › 11,784 › 6,395 › 3,638 › 2,258 | World Bank SH.XPD.CHEX.PC.CD | 2023 | high |
| 52 | Axial tilt | Venus › Uranus › Neptune › Earth › Mercury | 177.4 › 97.8 › 28.3 › 23.4 › 0.034° | NASA Planetary Fact Sheet | 2025 | high |
| 53 | Most sugar in fruit | Grapes › Mango › Banana › Apple › Strawberries | 15.5 › 13.7 › 12.2 › 10.4 › 4.9 g | USDA FoodData Central | 2018 | high |
| 54 | GDP per person | Ireland › USA › South Korea › Japan › Estonia | $112,895 › 86,170 › 36,239 › 33,797 › 31,428 | World Bank NY.GDP.PCAP.CD | 2024 | high |
| 55 | Protected land | Germany › Brazil › Estonia › Sweden › USA | 39.3 › 30.6 › 22.0 › 15.5 › 12.9 % | World Bank ER.LND.PTLD.ZS | 2024 | high |
| 56 | First invention | Fax › Telephone › Petrol car › Powered flight › TV demo | 1843 › 1876 › 1886 › 1903 › 1926 | Britannica | historical | high |
| 57 | Patents filed by residents | China › USA › South Korea › India › Germany | 1,522,292 › 278,446 › 191,142 › 49,860 › 38,489 | World Bank IP.PAT.RESD (WIPO) | 2023 | high |
| 58 | Alcohol per person | Latvia › Germany › Estonia › Italy › Nigeria | 12.9 › 11.8 › 10.7 › 7.0 › 3.8 L | World Bank SH.ALC.PCAP.LI (WHO) | 2020 | high |
| 59 | Oldest tech company | Nintendo › Samsung › Sony › Microsoft › Apple | 1889 › 1938 › 1946 › 1975 › 1976 | Company histories | historical | high |
| 60 | Cereal yield | Netherlands › Egypt › France › Estonia › Australia | 8,860 › 7,078 › 6,655 › 4,225 › 3,278 kg/ha | World Bank AG.YLD.CREL.KG (FAO) | 2022 | high |

### What to double-check before launch

- **#41 Winter Olympics** comes from a sports-stats site that compiles Olympics.com results; check it against olympics.com.
- **#45 Pregnancy lengths** are typical values; individual animals vary.
- **#46 Highest points** cite a Wikipedia list; swap in national land-survey links.

- **#5 Stadiums and #29 Islands** cite a Wikipedia compilation. The numbers match several sources, but swap in direct links to the venues / Statistics Sweden, the Estonian Land Board and Statistics Denmark for full credibility.
- **#9 Wikipedia** counts change daily (rounded snapshot from mid-2026).
- **#18 Renewables**: Estonia's 38% was only available rounded; check the exact figure in Eurostat's `nrg_ind_ren` table.
- **#25 Electric cars**: the IEA report describes China, UK and US shares in words ("almost half", "nearly 30%", "more than 10%"). Check exact values in the IEA Global EV Data Explorer.
- **#28 Urban**: Japan 92.3% vs Belgium 87.7% is a 5.0% gap — right at the limit.
- **#7, #17, #20, #24, #36, #40, #48, #56, #59** and the sports rules in **#32, #50** are founding/building dates from my knowledge, well-established facts I did not re-check against a live dataset; the ordering is not in doubt.

### Ideas I dropped because the data didn't hold up

Coffee per person (no official per-capita dataset), OECD hours worked (sources disagree), age of leaving home (values too close), life expectancy (values too close), number of moons (NASA's table is behind new discoveries).
