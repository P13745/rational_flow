window.NAMED_COMMAS_DATA = {
  "metadata": {
    "description": "Named frequency ratios under 100 cents for comma/diesis marker labeling. Includes comma-like intervals, selected named pitch intervals, and merged survey additions.",
    "maxCents": 100,
    "namesLanguage": "en",
    "primarySource": "huygens-fokker-list-of-intervals",
    "sources": {
      "huygens-fokker-list-of-intervals": "https://www.huygens-fokker.org/docs/intervals.html",
      "wikipedia-comma": "https://en.wikipedia.org/wiki/Comma_(music)",
      "wikipedia-septimal-comma": "https://en.wikipedia.org/wiki/Septimal_comma",
      "wikipedia-syntonic-comma": "https://en.wikipedia.org/wiki/Syntonic_comma",
      "wikipedia-pythagorean-comma": "https://en.wikipedia.org/wiki/Pythagorean_comma",
      "wikipedia-semicomma": "https://en.wikipedia.org/wiki/Semicomma",
      "wikipedia-list-of-pitch-intervals": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "xenharmonic-wiki-small-comma": "https://en.xen.wiki/w/Small_comma",
      "xenharmonic-wiki-unnoticeable-comma": "https://en.xen.wiki/w/Unnoticeable_comma",
      "xenharmonic-wiki-comma": "https://en.xen.wiki/w/Comma",
      "caspar-johannes-walter-list-of-intervals": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "estonian-nuudismuusika-terminibaas-freivald-comma": "https://sonaveeb.ee/search/unif/dlall/nmus/Freivald%20comma/1/eng?uilang=ru",
      "xenharmonic-wiki-medium-comma": "https://en.xen.wiki/w/Medium_comma"
    },
    "derivedSources": {
      "double-named-commas-5digit-v2": {
        "count": 34,
        "added": 34,
        "derivation": "power",
        "power": 2,
        "maxDigitsNumeratorDenominator": 5
      }
    },
    "removedLimits": {
      "239-limit": "Excluded from Diesis List because the ratio is too remote for the current collection."
    },
    "mergedSources": {
      "external-diesis-survey-2026-06": {
        "sourceFiles": [
          "data/data2.json",
          "data/data3.json",
          "data/data2_derived.json"
        ],
        "added": 137,
        "skippedDuplicates": 0
      },
      "medium-commas-53limit-7digits-2026-06": {
        "sourceFiles": [
          "data/medium_commas_append_53limit_7digits.json"
        ],
        "added": 36,
        "skippedDuplicates": 0,
        "maxPrimeLimit": 53,
        "maxNumeratorDenominator": 9999999
      }
    },
    "urlSources": {
      "url-enrichment-2026-06": {
        "sourceFiles": [
          "data/ulrs/named_commas_url_enriched_v2.json",
          "data/ulrs/wikipedia_fragment_replacements_30.json"
        ],
        "merged": 283,
        "individualUrlReplacements": 30,
        "fields": [
          "sourceUrl",
          "sourceTextUrl",
          "individualUrl"
        ]
      },
      "xen-wiki-missing-individual-urls-2026-06": {
        "sourceFiles": [
          "data/xen_wiki_missing_individual_urls_17.json"
        ],
        "applied": 17,
        "missingIds": [],
        "action": "Replace unavailable Xen Wiki individual ratio pages with source text-fragment fallback URLs."
      }
    },
    "nameLookups": {
      "ratio-name-lookup-2026-06": {
        "sourceFiles": [
          "data/ratio_name_lookup_5.json"
        ],
        "applied": 5,
        "canonicalRenames": 3,
        "missingNameLabels": 2,
        "colorNamesAcceptedAsCanonical": false
      }
    },
    "nameShortening": {
      "ordinal-harmonic-shortening-2026-06": {
        "applied": 5,
        "style": "Use numeric ordinals such as 133rd harmonic for long written-out harmonic names."
      }
    }
  },
  "intervals": [
    {
      "id": "flashma",
      "name": "Flashma",
      "aliases": [],
      "ratio": "12376/12375",
      "cents": 0.1399,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "12376/12375",
        "factors": "2^3·7·13·17/3^2·5^3·11"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Flashma",
      "sourceTextTarget": "Flashma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Flashma",
      "individualUrlKind": "xenharmonic-wiki-individual-name-page",
      "individualUrlSource": "verified-name-page"
    },
    {
      "id": "harmonisma",
      "name": "Harmonisma",
      "aliases": [],
      "ratio": "10648/10647",
      "cents": 0.1626,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "10648/10647",
        "factors": "2^3·11^3/3^2·7·13^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Harmonisma",
      "sourceTextTarget": "Harmonisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Harmonisma",
      "individualUrlKind": "xenharmonic-wiki-individual-name-page",
      "individualUrlSource": "verified-name-page"
    },
    {
      "id": "kalisma",
      "name": "Kalisma",
      "aliases": [
        "Gauss' comma"
      ],
      "ratio": "9801/9800",
      "cents": 0.1766,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "9801/9800",
        "factors": "3^4·11^2/2^3·5^2·7^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Kalisma",
      "sourceTextTarget": "Kalisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Kalisma",
      "individualUrlKind": "xenharmonic-wiki-individual-name-page",
      "individualUrlSource": "verified-name-page"
    },
    {
      "id": "jacobin-comma",
      "name": "Jacobin comma",
      "aliases": [],
      "ratio": "6656/6655",
      "cents": 0.2601,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "6656/6655",
        "factors": "2^9·13/5·11^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Jacobin%20comma",
      "sourceTextTarget": "Jacobin comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Jacobin_comma",
      "individualUrlKind": "xenharmonic-wiki-individual-name-page",
      "individualUrlSource": "verified-name-page"
    },
    {
      "id": "ragisma",
      "name": "Ragisma",
      "aliases": [],
      "ratio": "4375/4374",
      "cents": 0.3958,
      "category": "comma",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "4375/4374",
        "factors": "5^4·7/2·3^7"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Ragisma",
      "sourceTextTarget": "Ragisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/Ragisma",
      "individualUrlKind": "wikipedia-individual-article",
      "individualUrlSource": "wikipedia",
      "individualUrlTargetText": "Ragisma",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "Ragisma",
      "individualUrlMatchStatus": "exact-individual-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Wikipedia has an individual article for Ragisma."
    },
    {
      "id": "leprechaun-comma",
      "name": "Leprechaun comma",
      "aliases": [],
      "ratio": "4225/4224",
      "cents": 0.4098,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "4225/4224",
        "factors": "5^2·13^2/2^7·3·11"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Leprechaun%20comma",
      "sourceTextTarget": "Leprechaun comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/4225/4224",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "tridecimal-schisma",
      "name": "Tridecimal schisma",
      "aliases": [
        "Sagittal schismina"
      ],
      "ratio": "4096/4095",
      "cents": 0.4227,
      "category": "schisma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "4096/4095",
        "factors": "2^12/3^2·5·7·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Tridecimal%20schisma",
      "sourceTextTarget": "Tridecimal schisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/4096/4095",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "neovulture-comma",
      "name": "Neovulture comma",
      "aliases": [],
      "ratio": "2926/2925",
      "cents": 0.5918,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "2926/2925",
        "factors": "2·7·11·19/3^2·5^2·13"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Neovulture%20comma",
      "sourceTextTarget": "Neovulture comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/2926/2925",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "blumeyer-comma",
      "name": "Blumeyer comma",
      "aliases": [],
      "ratio": "2432/2431",
      "cents": 0.712,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "2432/2431",
        "factors": "2^7·19/11·13·17"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Blumeyer%20comma",
      "sourceTextTarget": "Blumeyer comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/2432/2431",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "breedsma",
      "name": "Breedsma",
      "aliases": [],
      "ratio": "2401/2400",
      "cents": 0.7212,
      "category": "comma",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "2401/2400",
        "factors": "7^4/2^5·3·5^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Breedsma",
      "sourceTextTarget": "Breedsma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/Breedsma",
      "individualUrlKind": "wikipedia-individual-article",
      "individualUrlSource": "wikipedia",
      "individualUrlTargetText": "Breedsma",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "Breedsma",
      "individualUrlMatchStatus": "exact-individual-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Wikipedia has an individual article for Breedsma."
    },
    {
      "id": "mavka-comma",
      "name": "Mavka comma",
      "aliases": [],
      "ratio": "24576/24565",
      "cents": 0.7751,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "24576/24565",
        "factors": "2^13·3/5·17^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Mavka%20comma",
      "sourceTextTarget": "Mavka comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/24576/24565",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "ibnsinma",
      "name": "Ibnsinma",
      "aliases": [],
      "ratio": "2080/2079",
      "cents": 0.8325,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "2080/2079",
        "factors": "2^5·5·13/3^3·7·11"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Ibnsinma",
      "sourceTextTarget": "Ibnsinma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Ibnsinma",
      "individualUrlKind": "xenharmonic-wiki-individual-name-page",
      "individualUrlSource": "verified-name-page"
    },
    {
      "id": "xenisma",
      "name": "Xenisma",
      "aliases": [],
      "ratio": "2058/2057",
      "cents": 0.8414,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "2058/2057",
        "factors": "2·3·7^3/11^2·17"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Xenisma",
      "sourceTextTarget": "Xenisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Xenisma",
      "individualUrlKind": "xenharmonic-wiki-individual-name-page",
      "individualUrlSource": "verified-name-page"
    },
    {
      "id": "ramajunanisma",
      "name": "Ramajunanisma",
      "aliases": [],
      "ratio": "1729/1728",
      "cents": 1.0016,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1729/1728",
        "factors": "7·13·19/2^6·3^3"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Ramajunanisma",
      "sourceTextTarget": "Ramajunanisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1729/1728",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "lummic-comma",
      "name": "Lummic comma",
      "aliases": [],
      "ratio": "1716/1715",
      "cents": 1.0092,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "1716/1715",
        "factors": "2^2·3·11·13/5·7^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Lummic%20comma",
      "sourceTextTarget": "Lummic comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1716/1715",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "shaftesburisma",
      "name": "Shaftesburisma",
      "aliases": [],
      "ratio": "1682/1681",
      "cents": 1.0296,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1682/1681",
        "factors": "2·29^2/41^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Shaftesburisma",
      "sourceTextTarget": "Shaftesburisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1682/1681",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "wizma",
      "name": "Wizma",
      "aliases": [],
      "ratio": "420175/419904",
      "cents": 1.117,
      "category": "comma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "420175/419904",
        "factors": "5^2·7^5/2^6·3^8"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Wizma",
      "sourceTextTarget": "Wizma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Wizma",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Wizma",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "triaphonisma",
      "name": "Triaphonisma",
      "aliases": [],
      "ratio": "1288/1287",
      "cents": 1.3446,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1288/1287",
        "factors": "2^3·7·23/3^2·11·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Triaphonisma",
      "sourceTextTarget": "Triaphonisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1288/1287",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "noema",
      "name": "Noema",
      "aliases": [],
      "ratio": "1225/1224",
      "cents": 1.4138,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1225/1224",
        "factors": "5^2·7^2/2^3·3^2·17"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Noema",
      "sourceTextTarget": "Noema",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1225/1224",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "cantonisma",
      "name": "Cantonisma",
      "aliases": [],
      "ratio": "10985/10976",
      "cents": 1.419,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "10985/10976",
        "factors": "5·13^3/2^5·7^3"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Cantonisma",
      "sourceTextTarget": "Cantonisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/10985/10976",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "eratosthenes-comma",
      "name": "Eratosthenes' comma",
      "aliases": [],
      "ratio": "1216/1215",
      "cents": 1.4243,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1216/1215",
        "factors": "2^6·19/3^5·5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Eratosthenes%27%20comma",
      "sourceTextTarget": "Eratosthenes' comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1216/1215",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "twosquare-comma",
      "name": "Twosquare comma",
      "aliases": [],
      "ratio": "1089/1088",
      "cents": 1.5905,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1089/1088",
        "factors": "3^2·11^2/2^6·17"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Twosquare%20comma",
      "sourceTextTarget": "Twosquare comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1089/1088",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "fairytale-comma",
      "name": "Fairytale comma",
      "aliases": [],
      "ratio": "1001/1000",
      "cents": 1.7304,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1001/1000",
        "factors": "7·11·13/2^3·5^3"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Fairytale%20comma",
      "sourceTextTarget": "Fairytale comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1001/1000",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "ainos-comma",
      "name": "Ainos comma",
      "aliases": [],
      "ratio": "936/935",
      "cents": 1.8506,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "936/935",
        "factors": "2^3·3^2·13/5·11·17"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Ainos%20comma",
      "sourceTextTarget": "Ainos comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/936/935",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "schisma",
      "name": "Schisma",
      "aliases": [
        "Skhisma"
      ],
      "ratio": "32805/32768",
      "cents": 1.9537,
      "category": "schisma",
      "source": "wikipedia-comma",
      "display": {
        "ratio": "32805/32768",
        "factors": "3^8·5/2^15"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Comma_(music)",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Comma_(music)#:~:text=Schisma",
      "sourceTextTarget": "Schisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/32805/32768",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "vishdel-comma",
      "name": "Vishdel comma",
      "aliases": [],
      "ratio": "5632/5625",
      "cents": 2.1531,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "5632/5625",
        "factors": "2^9·11/3^2·5^4"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Vishdel%20comma",
      "sourceTextTarget": "Vishdel comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/5632/5625",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "nicola",
      "name": "Nicola",
      "aliases": [],
      "ratio": "1575/1573",
      "cents": 2.1998,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1575/1573",
        "factors": "3^2·5^2·7/11^2·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Nicola",
      "sourceTextTarget": "Nicola",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1575/1573",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "horwell-comma",
      "name": "Horwell comma",
      "aliases": [],
      "ratio": "65625/65536",
      "cents": 2.3495,
      "category": "comma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "65625/65536",
        "factors": "3·5^5·7/2^16"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Horwell%20comma",
      "sourceTextTarget": "Horwell comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Horwell%20comma",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Horwell comma",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "parizek-comma",
      "name": "Parízek comma",
      "aliases": [],
      "ratio": "2200/2197",
      "cents": 2.3624,
      "category": "comma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "2200/2197",
        "factors": "2^3·5^2·11/13^3"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Par%C3%ADzek%20comma",
      "sourceTextTarget": "Parízek comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Par%C3%ADzek%20comma",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Parízek comma",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "squbema",
      "name": "Squbema",
      "aliases": [],
      "ratio": "729/728",
      "cents": 2.3764,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "729/728",
        "factors": "3^6/2^3·7·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Squbema",
      "sourceTextTarget": "Squbema",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/729/728",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "septendecimal-bridge-comma",
      "name": "Septendecimal bridge comma",
      "aliases": [],
      "ratio": "715/714",
      "cents": 2.423,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "715/714",
        "factors": "5·11·13/2·3·7·17"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Septendecimal%20bridge%20comma",
      "sourceTextTarget": "Septendecimal bridge comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/715/714",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "island-comma",
      "name": "Island comma",
      "aliases": [],
      "ratio": "676/675",
      "cents": 2.5629,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "676/675",
        "factors": "2^2·13^2/3^3·5^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Island%20comma",
      "sourceTextTarget": "Island comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/676/675",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "tunbarsma",
      "name": "Tunbarsma",
      "aliases": [],
      "ratio": "625/624",
      "cents": 2.7722,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "625/624",
        "factors": "5^4/2^4·3·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Tunbarsma",
      "sourceTextTarget": "Tunbarsma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/625/624",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "owowhatsthisma",
      "name": "Owowhatsthisma",
      "aliases": [],
      "ratio": "621/620",
      "cents": 2.7901,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "621/620",
        "factors": "3^3·23/2^2·5·31"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Owowhatsthisma",
      "sourceTextTarget": "Owowhatsthisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/621/620",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "undecimal-schisma",
      "name": "Undecimal schisma",
      "aliases": [
        "Undezimales Schisma"
      ],
      "ratio": "4000/3993",
      "cents": 3.0323,
      "category": "schisma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "4000/3993",
        "factors": "2^5·5^3/3·11^3"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Undecimal%20schisma",
      "sourceTextTarget": "Undecimal schisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Undecimal%20schisma",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Undecimal schisma",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "tsaharuk-comma",
      "name": "Tsaharuk comma",
      "aliases": [],
      "ratio": "561/560",
      "cents": 3.0887,
      "category": "comma",
      "source": "xenharmonic-wiki-unnoticeable-comma",
      "display": {
        "ratio": "561/560",
        "factors": "3·11·17/2^4·5·7"
      },
      "sourceUrl": "https://en.xen.wiki/w/Unnoticeable_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Unnoticeable_comma#:~:text=Tsaharuk%20comma",
      "sourceTextTarget": "Tsaharuk comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/561/560",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "swetisma",
      "name": "Swetisma",
      "aliases": [
        "Swets' comma"
      ],
      "ratio": "540/539",
      "cents": 3.209,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "540/539",
        "factors": "2^2·3^3·5/7^2·11"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Swetisma",
      "sourceTextTarget": "Swetisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/540/539",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "undevicesimal-comma",
      "name": "Undevicesimal comma",
      "aliases": [
        "Boethius' comma"
      ],
      "ratio": "513/512",
      "cents": 3.378,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "513/512",
        "factors": "3^3·19/2^9"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Undevicesimal%20comma",
      "sourceTextTarget": "Undevicesimal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/513/512",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "liganellus-comma",
      "name": "Liganellus comma",
      "aliases": [
        "Liganellisma"
      ],
      "ratio": "6250/6237",
      "cents": 3.6047,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "6250/6237",
        "factors": "2·5^5/3^4·7·11"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Liganellus%20comma",
      "sourceTextTarget": "Liganellus comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/6250/6237",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "freivald-comma",
      "name": "Freivald comma",
      "aliases": [
        "Freivalds Komma"
      ],
      "ratio": "29360128/29296875",
      "cents": 3.7338,
      "category": "comma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "29360128/29296875",
        "factors": "2^22·7/3·5^10"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Freivald%20comma",
      "sourceTextTarget": "Freivald comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Freivald%20comma",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Freivald comma",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "moctdel-comma",
      "name": "Moctdel comma",
      "aliases": [],
      "ratio": "1375/1372",
      "cents": 3.7814,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "1375/1372",
        "factors": "5^3·11/2^2·7^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Moctdel%20comma",
      "sourceTextTarget": "Moctdel comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1375/1372",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "wadisma",
      "name": "Wadisma",
      "aliases": [],
      "ratio": "201768035/201326592",
      "cents": 3.7919,
      "category": "comma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "201768035/201326592",
        "factors": "5·7^9/2^26·3"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Wadisma",
      "sourceTextTarget": "Wadisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Wadisma",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Wadisma",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "beta-2",
      "name": "Beta 2",
      "aliases": [
        "Septimal schisma"
      ],
      "ratio": "33554432/33480783",
      "cents": 3.8041,
      "category": "schisma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "33554432/33480783",
        "factors": "2^25/3^14·7"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Beta%202",
      "sourceTextTarget": "Beta 2",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Beta%202",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Beta 2",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "werckmeister-undecimal-septenarian-schisma",
      "name": "Werckmeister's undecimal septenarian schisma",
      "aliases": [],
      "ratio": "441/440",
      "cents": 3.9302,
      "category": "schisma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "441/440",
        "factors": "3^2·7^2/2^3·5·11"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Werckmeister%27s%20undecimal%20septenarian%20schisma",
      "sourceTextTarget": "Werckmeister's undecimal septenarian schisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/441/440",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "cuthbert-comma",
      "name": "Cuthbert comma",
      "aliases": [],
      "ratio": "847/845",
      "cents": 4.0928,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "847/845",
        "factors": "7·11^2/5·13^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Cuthbert%20comma",
      "sourceTextTarget": "Cuthbert comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/847/845",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "trimitone-comma",
      "name": "Trimitone comma",
      "aliases": [
        "Catakleismic comma"
      ],
      "ratio": "8019/8000",
      "cents": 4.1068,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "8019/8000",
        "factors": "3^6·11/2^6·5^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Trimitone%20comma",
      "sourceTextTarget": "Trimitone comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/8019/8000",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "undecimal-kleisma",
      "name": "Undecimal kleisma",
      "aliases": [
        "Keemun comma"
      ],
      "ratio": "385/384",
      "cents": 4.5026,
      "category": "kleisma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "385/384",
        "factors": "5·7·11/2^7·3"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Undecimal%20kleisma",
      "sourceTextTarget": "Undecimal kleisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/385/384",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "gentle-comma",
      "name": "Gentle comma",
      "aliases": [],
      "ratio": "364/363",
      "cents": 4.7627,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "364/363",
        "factors": "2^2·7·13/3·11^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Gentle%20comma",
      "sourceTextTarget": "Gentle comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/364/363",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "dudon-comma",
      "name": "Dudon comma",
      "aliases": [],
      "ratio": "361/360",
      "cents": 4.8023,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "361/360",
        "factors": "19^2/2^3·3^2·5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Dudon%20comma",
      "sourceTextTarget": "Dudon comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/361/360",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "minthma",
      "name": "Minthma",
      "aliases": [],
      "ratio": "352/351",
      "cents": 4.9253,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "352/351",
        "factors": "2^5·11/3^3·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Minthma",
      "sourceTextTarget": "Minthma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/352/351",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "ratwolf-comma",
      "name": "Ratwolf comma",
      "aliases": [],
      "ratio": "351/350",
      "cents": 4.9393,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "351/350",
        "factors": "3^3·13/2·5^2·7"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Ratwolf%20comma",
      "sourceTextTarget": "Ratwolf comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/351/350",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "semiporwellisma",
      "name": "Semiporwellisma",
      "aliases": [],
      "ratio": "16384/16335",
      "cents": 5.1854,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "16384/16335",
        "factors": "2^14/3^3·5·11^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Semiporwellisma",
      "sourceTextTarget": "Semiporwellisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/16384/16335",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "marveltwin",
      "name": "Marveltwin",
      "aliases": [],
      "ratio": "325/324",
      "cents": 5.3351,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "325/324",
        "factors": "5^2·13/2^2·3^4"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Marveltwin",
      "sourceTextTarget": "Marveltwin",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/325/324",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "porwell-comma",
      "name": "Porwell comma",
      "aliases": [],
      "ratio": "6144/6125",
      "cents": 5.362,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "6144/6125",
        "factors": "2^11·3/5^3·7^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Porwell%20comma",
      "sourceTextTarget": "Porwell comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/6144/6125",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "beta-5",
      "name": "Beta 5",
      "aliases": [
        "Garibaldi comma"
      ],
      "ratio": "5120/5103",
      "cents": 5.7578,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "5120/5103",
        "factors": "2^10·5/3^6·7"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Beta%205",
      "sourceTextTarget": "Beta 5",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/5120/5103",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "septendecimal-minor-second-comma",
      "name": "Septendecimal minor second comma",
      "aliases": [],
      "ratio": "289/288",
      "cents": 6.0008,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "289/288",
        "factors": "17^2/2^5·3^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Septendecimal%20minor%20second%20comma",
      "sourceTextTarget": "Septendecimal minor second comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/289/288",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "middle-second-comma",
      "name": "Middle second comma",
      "aliases": [],
      "ratio": "3136/3125",
      "cents": 6.0832,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "3136/3125",
        "factors": "2^6·7^2/5^5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Middle%20second%20comma",
      "sourceTextTarget": "Middle second comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/3136/3125",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "amity-comma",
      "name": "Amity comma",
      "aliases": [
        "Kleisma - schisma"
      ],
      "ratio": "1600000/1594323",
      "cents": 6.1536,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1600000/1594323",
        "factors": "2^9·5^5/3^13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Amity%20comma",
      "sourceTextTarget": "Amity comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1600000/1594323",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "tannisma",
      "name": "Tannisma",
      "aliases": [],
      "ratio": "273/272",
      "cents": 6.3532,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "273/272",
        "factors": "3·7·13/2^4·17"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Tannisma",
      "sourceTextTarget": "Tannisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/273/272",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "hemimage",
      "name": "Hemimage",
      "aliases": [],
      "ratio": "10976/10935",
      "cents": 6.479,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "10976/10935",
        "factors": "2^5·7^3/3^7·5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Hemimage",
      "sourceTextTarget": "Hemimage",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/10976/10935",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "stearnsma",
      "name": "Stearnsma",
      "aliases": [],
      "ratio": "118098/117649",
      "cents": 6.5946,
      "category": "comma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "118098/117649",
        "factors": "2·3^10/7^6"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Stearnsma",
      "sourceTextTarget": "Stearnsma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Stearnsma",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Stearnsma",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "myhemiwell-comma",
      "name": "Myhemiwell comma",
      "aliases": [],
      "ratio": "3388/3375",
      "cents": 6.6556,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "3388/3375",
        "factors": "2^2·7·11^2/3^3·5^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Myhemiwell%20comma",
      "sourceTextTarget": "Myhemiwell comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/3388/3375",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "septendecimal-kleisma",
      "name": "Septendecimal kleisma",
      "aliases": [],
      "ratio": "256/255",
      "cents": 6.7759,
      "category": "kleisma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "256/255",
        "factors": "2^8/3·5·17"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Septendecimal%20kleisma",
      "sourceTextTarget": "Septendecimal kleisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/256/255",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "small-bp-diesis",
      "name": "Small BP diesis",
      "aliases": [
        "Mirkwai comma"
      ],
      "ratio": "16875/16807",
      "cents": 6.9903,
      "category": "diesis",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "16875/16807",
        "factors": "3^3·5^4/7^5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Small%20BP%20diesis",
      "sourceTextTarget": "Small BP diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/16875/16807",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "neutral-third-comma",
      "name": "Neutral third comma",
      "aliases": [
        "Rastma"
      ],
      "ratio": "243/242",
      "cents": 7.1391,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "243/242",
        "factors": "3^5/2·11^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Neutral%20third%20comma",
      "sourceTextTarget": "Neutral third comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/243/242",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "semicanousma",
      "name": "Semicanousma",
      "aliases": [],
      "ratio": "14641/14580",
      "cents": 7.2281,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "14641/14580",
        "factors": "11^4/2^2·3^6·5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Semicanousma",
      "sourceTextTarget": "Semicanousma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/14641/14580",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "kestrel-comma",
      "name": "Kestrel comma",
      "aliases": [],
      "ratio": "1188/1183",
      "cents": 7.3017,
      "category": "comma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "1188/1183",
        "factors": "2^2·3^3·11/7·13^2"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Kestrel%20comma",
      "sourceTextTarget": "Kestrel comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Kestrel%20comma",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Kestrel comma",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "cataharry-comma",
      "name": "Cataharry comma",
      "aliases": [],
      "ratio": "19683/19600",
      "cents": 7.3158,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "19683/19600",
        "factors": "3^9/2^4·5^2·7^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Cataharry%20comma",
      "sourceTextTarget": "Cataharry comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/19683/19600",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "dimcomp-comma",
      "name": "Dimcomp comma",
      "aliases": [],
      "ratio": "390625/388962",
      "cents": 7.3861,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "390625/388962",
        "factors": "5^8/2·3^4·7^4"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Dimcomp%20comma",
      "sourceTextTarget": "Dimcomp comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/390625/388962",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "fantares-comma",
      "name": "Fantares comma",
      "aliases": [
        "Fanfares comma"
      ],
      "ratio": "4375/4356",
      "cents": 7.5349,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "4375/4356",
        "factors": "5^4·7/2^2·3^2·11^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Fantares%20comma",
      "sourceTextTarget": "Fantares comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/4375/4356",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "septimal-kleisma",
      "name": "Septimal kleisma",
      "aliases": [],
      "ratio": "225/224",
      "cents": 7.7115,
      "category": "kleisma",
      "source": "wikipedia-comma",
      "display": {
        "ratio": "225/224",
        "factors": "3^2·5^2/2^5·7"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Comma_(music)",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Comma_(music)#:~:text=Septimal%20kleisma",
      "sourceTextTarget": "Septimal kleisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/225/224",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "threedie",
      "name": "Threedie",
      "aliases": [],
      "ratio": "2197/2187",
      "cents": 7.898,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "2197/2187",
        "factors": "13^3/3^7"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Threedie",
      "sourceTextTarget": "Threedie",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/2197/2187",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "kleisma",
      "name": "Kleisma",
      "aliases": [
        "Semicomma majeur"
      ],
      "ratio": "15625/15552",
      "cents": 8.1073,
      "category": "kleisma",
      "source": "wikipedia-comma",
      "display": {
        "ratio": "15625/15552",
        "factors": "5^6/2^6·3^5"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Comma_(music)",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Comma_(music)#:~:text=Kleisma",
      "sourceTextTarget": "Kleisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/15625/15552",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "huntma",
      "name": "Huntma",
      "aliases": [],
      "ratio": "640/637",
      "cents": 8.1342,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "640/637",
        "factors": "2^7·5/7^2·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Huntma",
      "sourceTextTarget": "Huntma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/640/637",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "spleen-comma",
      "name": "Spleen comma",
      "aliases": [],
      "ratio": "210/209",
      "cents": 8.2637,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "210/209",
        "factors": "2·3·5·7/11·19"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Spleen%20comma",
      "sourceTextTarget": "Spleen comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/210/209",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "yama-comma",
      "name": "Yama comma",
      "aliases": [],
      "ratio": "209/208",
      "cents": 8.3033,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "209/208",
        "factors": "11·19/2^4·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Yama%20comma",
      "sourceTextTarget": "Yama comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/209/208",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "orgonisma",
      "name": "Orgonisma",
      "aliases": [],
      "ratio": "65536/65219",
      "cents": 8.3944,
      "category": "comma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "65536/65219",
        "factors": "2^16/7^2·11^3"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Orgonisma",
      "sourceTextTarget": "Orgonisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Orgonisma",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Orgonisma",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "gamelan-residue",
      "name": "Gamelan residue",
      "aliases": [
        "Gamelanresiduum"
      ],
      "ratio": "1029/1024",
      "cents": 8.4327,
      "category": "comma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "1029/1024",
        "factors": "3·7^3/2^10"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Gamelan%20residue",
      "sourceTextTarget": "Gamelan residue",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Gamelan%20residue",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Gamelan residue",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "septendecimal-schisma",
      "name": "Septendecimal schisma",
      "aliases": [],
      "ratio": "2187/2176",
      "cents": 8.7296,
      "category": "schisma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "2187/2176",
        "factors": "3^7/2^7·17"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Septendecimal%20schisma",
      "sourceTextTarget": "Septendecimal schisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/2187/2176",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "mynucuma",
      "name": "Mynucuma",
      "aliases": [],
      "ratio": "196/195",
      "cents": 8.8554,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "196/195",
        "factors": "2^2·7^2/3·5·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Mynucuma",
      "sourceTextTarget": "Mynucuma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/196/195",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "quince",
      "name": "Quince",
      "aliases": [],
      "ratio": "823543/819200",
      "cents": 9.1539,
      "category": "comma",
      "source": "caspar-johannes-walter-list-of-intervals",
      "display": {
        "ratio": "823543/819200",
        "factors": "7^7/2^15·5^2"
      },
      "sourceUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals",
      "sourceTextUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Quince",
      "sourceTextTarget": "Quince",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.casparjohanneswalter.de/texts/list_of_intervals#:~:text=Quince",
      "individualUrlKind": "source-page-text-fragment",
      "individualUrlSource": "caspar-johannes-walter-list-of-intervals",
      "individualUrlTargetText": "Quince",
      "individualUrlTargetKind": "name"
    },
    {
      "id": "undecimal-semicomma",
      "name": "Undecimal semicomma",
      "aliases": [
        "Pentacircle"
      ],
      "ratio": "896/891",
      "cents": 9.688,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "896/891",
        "factors": "2^7·7/3^4·11"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Undecimal%20semicomma",
      "sourceTextTarget": "Undecimal semicomma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/896/891",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "valinorsma",
      "name": "Valinorsma",
      "aliases": [],
      "ratio": "176/175",
      "cents": 9.8646,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "176/175",
        "factors": "2^4·11/5^2·7"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Valinorsma",
      "sourceTextTarget": "Valinorsma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/176/175",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "semicomma",
      "name": "Semicomma",
      "aliases": [
        "Fokker's comma"
      ],
      "ratio": "2109375/2097152",
      "cents": 10.061,
      "category": "comma",
      "source": "wikipedia-semicomma",
      "display": {
        "ratio": "2109375/2097152",
        "factors": "3^3·5^7/2^21"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Semicomma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Semicomma#:~:text=Semicomma",
      "sourceTextTarget": "Semicomma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/Semicomma",
      "individualUrlKind": "source-individual-article",
      "individualUrlSource": "wikipedia-semicomma"
    },
    {
      "id": "schulters-comma",
      "name": "Schulter's comma",
      "aliases": [],
      "ratio": "169/168",
      "cents": 10.2744,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "169/168",
        "factors": "13^2/2^3·3·7"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Schulter%27s%20comma",
      "sourceTextTarget": "Schulter's comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/169/168",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "aphrowe",
      "name": "Aphrowe",
      "aliases": [],
      "ratio": "1331/1323",
      "cents": 10.437,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "1331/1323",
        "factors": "11^3/3^3·7^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Aphrowe",
      "sourceTextTarget": "Aphrowe",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1331/1323",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "difference-between-5-3-and-53-32",
      "name": "Difference between 5:3 and 53:32",
      "aliases": [],
      "ratio": "160/159",
      "cents": 10.8542,
      "category": "difference",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "160/159",
        "factors": "2^5·5/3·53"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Difference%20between%205%3A3%20and%2053%3A32",
      "sourceTextTarget": "Difference between 5:3 and 53:32",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Difference%20between%205%3A3%20and%2053%3A32",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "wikipedia-list-of-pitch-intervals",
      "individualUrlTargetText": "Difference between 5:3 and 53:32",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "List of pitch intervals",
      "individualUrlMatchStatus": "no-individual-page-found",
      "individualUrlConfidence": "low",
      "individualUrlNotes": "No reliable individual page found in the search pass. Keep the original Wikipedia list text-fragment as fallback."
    },
    {
      "id": "augustma",
      "name": "Augustma",
      "aliases": [],
      "ratio": "154/153",
      "cents": 11.2784,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "154/153",
        "factors": "2·7·11/3^2·17"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Augustma",
      "sourceTextTarget": "Augustma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/154/153",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "ganassis-comma",
      "name": "Ganassi's comma",
      "aliases": [],
      "ratio": "153/152",
      "cents": 11.3524,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "153/152",
        "factors": "3^2·17/2^3·19"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Ganassi%27s%20comma",
      "sourceTextTarget": "Ganassi's comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/153/152",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "wuerschmidts-comma",
      "name": "Würschmidt's comma",
      "aliases": [],
      "ratio": "393216/390625",
      "cents": 11.4453,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "393216/390625",
        "factors": "2^17·3/5^8"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=W%C3%BCrschmidt%27s%20comma",
      "sourceTextTarget": "Würschmidt's comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/393216/390625",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "difference-between-29-16-and-9-5",
      "name": "Difference between 29:16 and 9:5",
      "aliases": [],
      "ratio": "145/144",
      "cents": 11.9809,
      "category": "difference",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "145/144",
        "factors": "5·29/2^4·3^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Difference%20between%2029%3A16%20and%209%3A5",
      "sourceTextTarget": "Difference between 29:16 and 9:5",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/145/144",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Difference between 29:16 and 9:5",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "145/144",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 145/144; its names differ from the Wikipedia list label."
    },
    {
      "id": "double-septendecimal-minor-second-comma",
      "name": "Double septendecimal minor second comma",
      "aliases": [],
      "ratio": "83521/82944",
      "cents": 12.0016,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "septendecimal-minor-second-comma",
        "power": 2,
        "baseRatio": "289/288",
        "baseName": "Septendecimal minor second comma"
      },
      "display": {
        "ratio": "83521/82944",
        "power": "(289/288)^2",
        "factors": "17^4/2^10·3^4",
        "powerRatio": "(289/288)^2",
        "powerFactors": "(17^2/2^5·3^2)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Septendecimal%20minor%20second%20comma",
      "sourceTextTarget": "Septendecimal minor second comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/289/288",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "septendecimal-minor-second-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/289/288",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "grossma",
      "name": "Grossma",
      "aliases": [],
      "ratio": "144/143",
      "cents": 12.0644,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "144/143",
        "factors": "2^4·3^2/11·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Grossma",
      "sourceTextTarget": "Grossma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/144/143",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "gassorma",
      "name": "Gassorma",
      "aliases": [
        "Garibert comma"
      ],
      "ratio": "275/273",
      "cents": 12.6368,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "275/273",
        "factors": "5^2·11/3·7·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Gassorma",
      "sourceTextTarget": "Gassorma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/275/273",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "orwell-comma",
      "name": "Orwell comma",
      "aliases": [],
      "ratio": "1728/1715",
      "cents": 13.0736,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "1728/1715",
        "factors": "2^6·3^3/5·7^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Orwell%20comma",
      "sourceTextTarget": "Orwell comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1728/1715",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "octagar-comma",
      "name": "Octagar comma",
      "aliases": [
        "Small septimal comma"
      ],
      "ratio": "4000/3969",
      "cents": 13.4693,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "4000/3969",
        "factors": "2^5·5^3/3^4·7^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Octagar%20comma",
      "sourceTextTarget": "Octagar comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/4000/3969",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "hundred-twenty-ninth-harmonic",
      "name": "129th harmonic",
      "aliases": [],
      "ratio": "129/128",
      "cents": 13.4727,
      "category": "harmonic",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "129/128",
        "factors": "3·43/2^7"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Hundred-twenty-ninth%20harmonic",
      "sourceTextTarget": "129th harmonic",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/129/128",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "129th harmonic",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "129/128",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 129/128."
    },
    {
      "id": "double-septendecimal-kleisma",
      "name": "Double septendecimal kleisma",
      "aliases": [],
      "ratio": "65536/65025",
      "cents": 13.5518,
      "category": "kleisma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "septendecimal-kleisma",
        "power": 2,
        "baseRatio": "256/255",
        "baseName": "Septendecimal kleisma"
      },
      "display": {
        "ratio": "65536/65025",
        "power": "(256/255)^2",
        "factors": "2^16/3^2·5^2·17^2",
        "powerRatio": "(256/255)^2",
        "powerFactors": "(2^8/3·5·17)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Septendecimal%20kleisma",
      "sourceTextTarget": "Septendecimal kleisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/256/255",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "septendecimal-kleisma",
      "derivedBaseUrl": "https://en.xen.wiki/w/256/255",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "septimal-semicomma",
      "name": "Septimal semicomma",
      "aliases": [
        "Starling comma"
      ],
      "ratio": "126/125",
      "cents": 13.7948,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "126/125",
        "factors": "2·3^2·7/5^3"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Septimal%20semicomma",
      "sourceTextTarget": "Septimal semicomma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/126/125",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "minor-bp-diesis",
      "name": "Minor BP diesis",
      "aliases": [
        "Sensamagic comma"
      ],
      "ratio": "245/243",
      "cents": 14.1905,
      "category": "diesis",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "245/243",
        "factors": "5·7^2/3^5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Minor%20BP%20diesis",
      "sourceTextTarget": "Minor BP diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/245/243",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-neutral-third-comma",
      "name": "Double neutral third comma",
      "aliases": [],
      "ratio": "59049/58564",
      "cents": 14.2782,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "neutral-third-comma",
        "power": 2,
        "baseRatio": "243/242",
        "baseName": "Neutral third comma"
      },
      "display": {
        "ratio": "59049/58564",
        "power": "(243/242)^2",
        "factors": "3^10/2^2·11^4",
        "powerRatio": "(243/242)^2",
        "powerFactors": "(3^5/2·11^2)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Neutral%20third%20comma",
      "sourceTextTarget": "Neutral third comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/243/242",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "neutral-third-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/243/242",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "undecimal-seconds-comma",
      "name": "Undecimal seconds comma",
      "aliases": [
        "Biyatisma"
      ],
      "ratio": "121/120",
      "cents": 14.3672,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "121/120",
        "factors": "11^2/2^3·3·5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Undecimal%20seconds%20comma",
      "sourceTextTarget": "Undecimal seconds comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/121/120",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "trimyna-comma",
      "name": "Trimyna comma",
      "aliases": [],
      "ratio": "50421/50000",
      "cents": 14.516,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "50421/50000",
        "factors": "3·7^5/2^4·5^5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Trimyna%20comma",
      "sourceTextTarget": "Trimyna comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/50421/50000",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "secorian-comma",
      "name": "Secorian comma",
      "aliases": [],
      "ratio": "28672/28431",
      "cents": 14.6132,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "28672/28431",
        "factors": "2^12·7/3^7·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Secorian%20comma",
      "sourceTextTarget": "Secorian comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/28672/28431",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "hunt-flat-2-comma",
      "name": "Hunt flat 2 comma",
      "aliases": [],
      "ratio": "4131/4096",
      "cents": 14.7304,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "4131/4096",
        "factors": "3^5·17/2^12"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Hunt%20flat%202%20comma",
      "sourceTextTarget": "Hunt flat 2 comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/4131/4096",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-septimal-kleisma",
      "name": "Double septimal kleisma",
      "aliases": [],
      "ratio": "50625/50176",
      "cents": 15.423,
      "category": "kleisma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "septimal-kleisma",
        "power": 2,
        "baseRatio": "225/224",
        "baseName": "Septimal kleisma"
      },
      "display": {
        "ratio": "50625/50176",
        "power": "(225/224)^2",
        "factors": "3^4·5^4/2^10·7^2",
        "powerRatio": "(225/224)^2",
        "powerFactors": "(3^2·5^2/2^5·7)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Comma_(music)",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Comma_(music)#:~:text=Septimal%20kleisma",
      "sourceTextTarget": "Septimal kleisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/225/224",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "septimal-kleisma",
      "derivedBaseUrl": "https://en.xen.wiki/w/225/224",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "mirwomo-comma",
      "name": "Mirwomo comma",
      "aliases": [],
      "ratio": "33075/32768",
      "cents": 16.1442,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "33075/32768",
        "factors": "3^3·5^2·7^2/2^15"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Mirwomo%20comma",
      "sourceTextTarget": "Mirwomo comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/33075/32768",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-spleen-comma",
      "name": "Double spleen comma",
      "aliases": [],
      "ratio": "44100/43681",
      "cents": 16.5273,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "spleen-comma",
        "power": 2,
        "baseRatio": "210/209",
        "baseName": "Spleen comma"
      },
      "display": {
        "ratio": "44100/43681",
        "factors": "2^2·3^2·5^2·7^2/11^2·19^2",
        "power": "(210/209)^2",
        "powerRatio": "(210/209)^2",
        "powerFactors": "(2·3·5·7/11·19)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Spleen%20comma",
      "sourceTextTarget": "Spleen comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/210/209",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "spleen-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/210/209",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "vicesimotertial-comma",
      "name": "Vicesimotertial comma",
      "aliases": [],
      "ratio": "736/729",
      "cents": 16.5443,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "736/729",
        "factors": "2^5·23/3^6"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Vicesimotertial%20comma",
      "sourceTextTarget": "Vicesimotertial comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/736/729",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "animist-comma",
      "name": "Animist comma",
      "aliases": [
        "Small tridecimal comma"
      ],
      "ratio": "105/104",
      "cents": 16.567,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "105/104",
        "factors": "3·5·7/2^3·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Animist%20comma",
      "sourceTextTarget": "Animist comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/105/104",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-yama-comma",
      "name": "Double yama comma",
      "aliases": [],
      "ratio": "43681/43264",
      "cents": 16.6066,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "yama-comma",
        "power": 2,
        "baseRatio": "209/208",
        "baseName": "Yama comma"
      },
      "display": {
        "ratio": "43681/43264",
        "factors": "11^2·19^2/2^8·13^2",
        "power": "(209/208)^2",
        "powerRatio": "(209/208)^2",
        "powerFactors": "(11·19/2^4·13)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Yama%20comma",
      "sourceTextTarget": "Yama comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/209/208",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "yama-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/209/208",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "hemimin",
      "name": "Hemimin",
      "aliases": [],
      "ratio": "1344/1331",
      "cents": 16.8271,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "1344/1331",
        "factors": "2^6·3·7/11^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Hemimin",
      "sourceTextTarget": "Hemimin",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Hemimin",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-small-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/1344/1331",
      "invalidIndividualUrl": "https://en.xen.wiki/w/1344/1331",
      "individualUrlTargetText": "Hemimin",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "tridecimal-neutral-third-comma",
      "name": "Tridecimal neutral third comma",
      "aliases": [],
      "ratio": "512/507",
      "cents": 16.9897,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "512/507",
        "factors": "2^9/3·13^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Tridecimal%20neutral%20third%20comma",
      "sourceTextTarget": "Tridecimal neutral third comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/512/507",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "ptolemy-comma",
      "name": "Ptolemy's comma",
      "aliases": [
        "Small undecimal comma"
      ],
      "ratio": "100/99",
      "cents": 17.3995,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "100/99",
        "factors": "2^2·5^2/3^2·11"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Ptolemy%27s%20comma",
      "sourceTextTarget": "Ptolemy's comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/100/99",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "small-undecimal-comma",
      "name": "Small undecimal comma",
      "aliases": [],
      "ratio": "99/98",
      "cents": 17.5761,
      "category": "comma",
      "source": "wikipedia-comma",
      "display": {
        "ratio": "99/98",
        "factors": "3^2·11/2·7^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Comma_(music)",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Comma_(music)#:~:text=Small%20undecimal%20comma",
      "sourceTextTarget": "Small undecimal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/99/98",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-mynucuma",
      "name": "Double mynucuma",
      "aliases": [],
      "ratio": "38416/38025",
      "cents": 17.7109,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "mynucuma",
        "power": 2,
        "baseRatio": "196/195",
        "baseName": "Mynucuma"
      },
      "display": {
        "ratio": "38416/38025",
        "factors": "2^4·7^4/3^2·5^2·13^2",
        "power": "(196/195)^2",
        "powerRatio": "(196/195)^2",
        "powerFactors": "(2^2·7^2/3·5·13)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Mynucuma",
      "sourceTextTarget": "Mynucuma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/196/195",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "mynucuma",
      "derivedBaseUrl": "https://en.xen.wiki/w/196/195",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "19th-partial-chroma",
      "name": "19th-partial chroma",
      "aliases": [],
      "ratio": "96/95",
      "cents": 18.1283,
      "category": "chroma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "96/95",
        "factors": "2^5·3/5·19"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=19th-partial%20chroma",
      "sourceTextTarget": "19th-partial chroma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/96/95",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "antimisma",
      "name": "Antimisma",
      "aliases": [],
      "ratio": "1617/1600",
      "cents": 18.2973,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1617/1600",
        "factors": "3·7^2·11/2^6·5^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Antimisma",
      "sourceTextTarget": "Antimisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1617/1600",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "aldebaran-comma",
      "name": "Aldebaran comma",
      "aliases": [],
      "ratio": "3159/3125",
      "cents": 18.7341,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "3159/3125",
        "factors": "3^5·13/5^5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Aldebaran%20comma",
      "sourceTextTarget": "Aldebaran comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Aldebaran%20comma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-small-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/3159/3125",
      "invalidIndividualUrl": "https://en.xen.wiki/w/3159/3125",
      "individualUrlTargetText": "Aldebaran comma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "medium-tridecimal-comma",
      "name": "Medium tridecimal comma",
      "aliases": [
        "Superleap"
      ],
      "ratio": "91/90",
      "cents": 19.1299,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "91/90",
        "factors": "7·13/2·3^2·5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Medium%20tridecimal%20comma",
      "sourceTextTarget": "Medium tridecimal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/91/90",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "valenwuer-comma",
      "name": "Valenwuer comma",
      "aliases": [],
      "ratio": "110592/109375",
      "cents": 19.1568,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "110592/109375",
        "factors": "2^12·3^3/5^6·7"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Valenwuer%20comma",
      "sourceTextTarget": "Valenwuer comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Valenwuer%20comma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-small-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/110592/109375",
      "invalidIndividualUrl": "https://en.xen.wiki/w/110592/109375",
      "individualUrlTargetText": "Valenwuer comma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "diaschisma",
      "name": "Diaschisma",
      "aliases": [
        "Diacisma"
      ],
      "ratio": "2048/2025",
      "cents": 19.5526,
      "category": "comma",
      "source": "wikipedia-comma",
      "display": {
        "ratio": "2048/2025",
        "factors": "2^11/3^4·5^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Comma_(music)",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Comma_(music)#:~:text=Diaschisma",
      "sourceTextTarget": "Diaschisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/2048/2025",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-valinorsma",
      "name": "Double valinorsma",
      "aliases": [],
      "ratio": "30976/30625",
      "cents": 19.7292,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "valinorsma",
        "power": 2,
        "baseRatio": "176/175",
        "baseName": "Valinorsma"
      },
      "display": {
        "ratio": "30976/30625",
        "factors": "2^8·11^2/5^4·7^2",
        "power": "(176/175)^2",
        "powerRatio": "(176/175)^2",
        "powerFactors": "(2^4·11/5^2·7)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Valinorsma",
      "sourceTextTarget": "Valinorsma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/176/175",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "valinorsma",
      "derivedBaseUrl": "https://en.xen.wiki/w/176/175",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "monk-comma",
      "name": "Monk comma",
      "aliases": [],
      "ratio": "85/84",
      "cents": 20.4882,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "85/84",
        "factors": "5·17/2^2·3·7"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Monk%20comma",
      "sourceTextTarget": "Monk comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/85/84",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-schulters-comma",
      "name": "Double Schulter's comma",
      "aliases": [],
      "ratio": "28561/28224",
      "cents": 20.5488,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "schulters-comma",
        "power": 2,
        "baseRatio": "169/168",
        "baseName": "Schulter's comma"
      },
      "display": {
        "ratio": "28561/28224",
        "factors": "13^4/2^6·3^2·7^2",
        "power": "(169/168)^2",
        "powerRatio": "(169/168)^2",
        "powerFactors": "(13^2/2^3·3·7)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Schulter%27s%20comma",
      "sourceTextTarget": "Schulter's comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/169/168",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "schulters-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/169/168",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "septimagic-comma",
      "name": "Septimagic comma",
      "aliases": [],
      "ratio": "537824/531441",
      "cents": 20.6695,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "537824/531441",
        "factors": "2^5·7^5/3^12"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Septimagic%20comma",
      "sourceTextTarget": "Septimagic comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/537824/531441",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "nuwell-comma",
      "name": "Nuwell comma",
      "aliases": [],
      "ratio": "2430/2401",
      "cents": 20.7851,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "2430/2401",
        "factors": "2·3^5·5/7^4"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Nuwell%20comma",
      "sourceTextTarget": "Nuwell comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/2430/2401",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "gariboh-comma",
      "name": "Gariboh comma",
      "aliases": [
        "Major BP diesis"
      ],
      "ratio": "3125/3087",
      "cents": 21.1808,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "3125/3087",
        "factors": "5^5/3^2·7^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Gariboh%20comma",
      "sourceTextTarget": "Gariboh comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/3125/3087",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "nautilus-comma",
      "name": "Nautilus comma",
      "aliases": [],
      "ratio": "245/242",
      "cents": 21.3296,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "245/242",
        "factors": "5·7^2/2·11^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Nautilus%20comma",
      "sourceTextTarget": "Nautilus comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/245/242",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "syntonic-comma",
      "name": "Syntonic comma",
      "aliases": [
        "Didymus comma",
        "Didymean comma",
        "Ptolemaic comma",
        "Diatonic comma",
        "Chromatic diesis"
      ],
      "ratio": "81/80",
      "cents": 21.5063,
      "category": "comma",
      "source": "wikipedia-syntonic-comma",
      "display": {
        "ratio": "81/80",
        "factors": "3^4/2^4·5"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Syntonic_comma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Syntonic_comma#:~:text=Syntonic%20comma",
      "sourceTextTarget": "Syntonic comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/Syntonic_comma",
      "individualUrlKind": "source-individual-article",
      "individualUrlSource": "wikipedia-syntonic-comma"
    },
    {
      "id": "double-difference-between-5-3-and-53-32",
      "name": "Double difference between 5:3 and 53:32",
      "aliases": [],
      "ratio": "25600/25281",
      "cents": 21.7083,
      "category": "difference",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "difference-between-5-3-and-53-32",
        "power": 2,
        "baseRatio": "160/159",
        "baseName": "Difference between 5:3 and 53:32"
      },
      "display": {
        "ratio": "25600/25281",
        "power": "(160/159)^2",
        "factors": "2^10·5^2/3^2·53^2",
        "powerRatio": "(160/159)^2",
        "powerFactors": "(2^5·5/3·53)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Difference%20between%205%3A3%20and%2053%3A32",
      "sourceTextTarget": "Difference between 5:3 and 53:32",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Difference%20between%205%3A3%20and%2053%3A32",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "difference-between-5-3-and-53-32",
      "derivedBaseUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Difference%20between%205%3A3%20and%2053%3A32",
      "derivedBaseUrlKind": "source-page-text-fragment"
    },
    {
      "id": "keema",
      "name": "Keema",
      "aliases": [],
      "ratio": "875/864",
      "cents": 21.902,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "875/864",
        "factors": "5^3·7/2^5·3^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Keema",
      "sourceTextTarget": "Keema",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/875/864",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "squalentine-comma",
      "name": "Squalentine comma",
      "aliases": [],
      "ratio": "64827/64000",
      "cents": 22.2275,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "64827/64000",
        "factors": "3^3·7^4/2^9·5^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Squalentine%20comma",
      "sourceTextTarget": "Squalentine comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/64827/64000",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "negustma",
      "name": "Negustma",
      "aliases": [
        "Tridecimal minor third comma"
      ],
      "ratio": "78/77",
      "cents": 22.3388,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "78/77",
        "factors": "2·3·13/7·11"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Negustma",
      "sourceTextTarget": "Negustma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/78/77",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-augustma",
      "name": "Double augustma",
      "aliases": [],
      "ratio": "23716/23409",
      "cents": 22.5569,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "augustma",
        "power": 2,
        "baseRatio": "154/153",
        "baseName": "Augustma"
      },
      "display": {
        "ratio": "23716/23409",
        "factors": "2^2·7^2·11^2/3^4·17^2",
        "power": "(154/153)^2",
        "powerRatio": "(154/153)^2",
        "powerFactors": "(2·7·11/3^2·17)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Augustma",
      "sourceTextTarget": "Augustma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/154/153",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "augustma",
      "derivedBaseUrl": "https://en.xen.wiki/w/154/153",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "double-ganassis-comma",
      "name": "Double Ganassi's comma",
      "aliases": [],
      "ratio": "23409/23104",
      "cents": 22.7048,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "ganassis-comma",
        "power": 2,
        "baseRatio": "153/152",
        "baseName": "Ganassi's comma"
      },
      "display": {
        "ratio": "23409/23104",
        "factors": "3^4·17^2/2^6·19^2",
        "power": "(153/152)^2",
        "powerRatio": "(153/152)^2",
        "powerFactors": "(3^2·17/2^3·19)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Ganassi%27s%20comma",
      "sourceTextTarget": "Ganassi's comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/153/152",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "ganassis-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/153/152",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "pythagorean-comma",
      "name": "Pythagorean comma",
      "aliases": [
        "Ditonic comma"
      ],
      "ratio": "531441/524288",
      "cents": 23.46,
      "category": "comma",
      "source": "wikipedia-pythagorean-comma",
      "display": {
        "ratio": "531441/524288",
        "factors": "3^12/2^19"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Pythagorean_comma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Pythagorean_comma#:~:text=Pythagorean%20comma",
      "sourceTextTarget": "Pythagorean comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/Pythagorean_comma",
      "individualUrlKind": "source-individual-article",
      "individualUrlSource": "wikipedia-pythagorean-comma"
    },
    {
      "id": "double-difference-between-29-16-and-9-5",
      "name": "Double difference between 29:16 and 9:5",
      "aliases": [],
      "ratio": "21025/20736",
      "cents": 23.9618,
      "category": "difference",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "difference-between-29-16-and-9-5",
        "power": 2,
        "baseRatio": "145/144",
        "baseName": "Difference between 29:16 and 9:5"
      },
      "display": {
        "ratio": "21025/20736",
        "power": "(145/144)^2",
        "factors": "5^2·29^2/2^8·3^4",
        "powerRatio": "(145/144)^2",
        "powerFactors": "(5·29/2^4·3^2)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Difference%20between%2029%3A16%20and%209%3A5",
      "sourceTextTarget": "Difference between 29:16 and 9:5",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Difference%20between%2029%3A16%20and%209%3A5",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "difference-between-29-16-and-9-5",
      "derivedBaseUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Difference%20between%2029%3A16%20and%209%3A5",
      "derivedBaseUrlKind": "source-page-text-fragment"
    },
    {
      "id": "double-grossma",
      "name": "Double grossma",
      "aliases": [],
      "ratio": "20736/20449",
      "cents": 24.1288,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "grossma",
        "power": 2,
        "baseRatio": "144/143",
        "baseName": "Grossma"
      },
      "display": {
        "ratio": "20736/20449",
        "factors": "2^8·3^4/11^2·13^2",
        "power": "(144/143)^2",
        "powerRatio": "(144/143)^2",
        "powerFactors": "(2^4·3^2/11·13)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Grossma",
      "sourceTextTarget": "Grossma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/144/143",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "grossma",
      "derivedBaseUrl": "https://en.xen.wiki/w/144/143",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "large-tetracot-diesis",
      "name": "Large tetracot diesis",
      "aliases": [],
      "ratio": "1350/1331",
      "cents": 24.5386,
      "category": "diesis",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "1350/1331",
        "factors": "2·3^3·5^2/11^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Large%20tetracot%20diesis",
      "sourceTextTarget": "Large tetracot diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1350/1331",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "triple-bp-comma",
      "name": "Triple BP comma",
      "aliases": [],
      "ratio": "6655/6561",
      "cents": 24.6275,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "6655/6561",
        "factors": "5·11^3/3^8"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Triple%20BP%20comma",
      "sourceTextTarget": "Triple BP comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Triple%20BP%20comma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-small-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/6655/6561",
      "invalidIndividualUrl": "https://en.xen.wiki/w/6655/6561",
      "individualUrlTargetText": "Triple BP comma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "double-gassorma",
      "name": "Double gassorma",
      "aliases": [],
      "ratio": "75625/74529",
      "cents": 25.2736,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "gassorma",
        "power": 2,
        "baseRatio": "275/273",
        "baseName": "Gassorma"
      },
      "display": {
        "ratio": "75625/74529",
        "factors": "5^4·11^2/3^2·7^2·13^2",
        "power": "(275/273)^2",
        "powerRatio": "(275/273)^2",
        "powerFactors": "(5^2·11/3·7·13)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Gassorma",
      "sourceTextTarget": "Gassorma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/275/273",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "gassorma",
      "derivedBaseUrl": "https://en.xen.wiki/w/275/273",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "slither-comma",
      "name": "Slither comma",
      "aliases": [],
      "ratio": "40960000/40353607",
      "cents": 25.8217,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "40960000/40353607",
        "factors": "2^16·5^4/7^9"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Slither%20comma",
      "sourceTextTarget": "Slither comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Slither%20comma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-small-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/40960000/40353607",
      "invalidIndividualUrl": "https://en.xen.wiki/w/40960000/40353607",
      "individualUrlTargetText": "Slither comma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "winmeanma",
      "name": "Winmeanma",
      "aliases": [],
      "ratio": "66/65",
      "cents": 26.4316,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "66/65",
        "factors": "2·3·11/5·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Winmeanma",
      "sourceTextTarget": "Winmeanma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/66/65",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "wilsorma",
      "name": "Wilsorma",
      "aliases": [
        "13th-partial chroma"
      ],
      "ratio": "65/64",
      "cents": 26.8414,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "65/64",
        "factors": "5·13/2^6"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Wilsorma",
      "sourceTextTarget": "Wilsorma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/65/64",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "mandos-comma",
      "name": "Mandos comma",
      "aliases": [],
      "ratio": "31104/30625",
      "cents": 26.8683,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "31104/30625",
        "factors": "2^7·3^5/5^4·7^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Mandos%20comma",
      "sourceTextTarget": "Mandos comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Mandos%20comma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-small-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/31104/30625",
      "invalidIndividualUrl": "https://en.xen.wiki/w/31104/30625",
      "individualUrlTargetText": "Mandos comma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "double-hundred-twenty-ninth-harmonic",
      "name": "Double 129th harmonic",
      "aliases": [],
      "ratio": "16641/16384",
      "cents": 26.9454,
      "category": "harmonic",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "hundred-twenty-ninth-harmonic",
        "power": 2,
        "baseRatio": "129/128",
        "baseName": "129th harmonic"
      },
      "display": {
        "ratio": "16641/16384",
        "power": "(129/128)^2",
        "factors": "3^2·43^2/2^14",
        "powerRatio": "(129/128)^2",
        "powerFactors": "(3·43/2^7)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Hundred-twenty-ninth%20harmonic",
      "sourceTextTarget": "129th harmonic",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Hundred-twenty-ninth%20harmonic",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "hundred-twenty-ninth-harmonic",
      "derivedBaseUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Hundred-twenty-ninth%20harmonic",
      "derivedBaseUrlKind": "source-page-text-fragment"
    },
    {
      "id": "septimal-comma",
      "name": "Septimal comma",
      "aliases": [
        "Archytas' comma"
      ],
      "ratio": "64/63",
      "cents": 27.2641,
      "category": "comma",
      "source": "wikipedia-septimal-comma",
      "display": {
        "ratio": "64/63",
        "factors": "2^6/3^2·7"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Septimal_comma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Septimal_comma#:~:text=Septimal%20comma",
      "sourceTextTarget": "Septimal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/64/63",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-septimal-semicomma",
      "name": "Double septimal semicomma",
      "aliases": [],
      "ratio": "15876/15625",
      "cents": 27.5895,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "septimal-semicomma",
        "power": 2,
        "baseRatio": "126/125",
        "baseName": "Septimal semicomma"
      },
      "display": {
        "ratio": "15876/15625",
        "power": "(126/125)^2",
        "factors": "2^2·3^4·7^2/5^6",
        "powerRatio": "(126/125)^2",
        "powerFactors": "(2·3^2·7/5^3)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Septimal%20semicomma",
      "sourceTextTarget": "Septimal semicomma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/126/125",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "septimal-semicomma",
      "derivedBaseUrl": "https://en.xen.wiki/w/126/125",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "minimal-diesis",
      "name": "Minimal diesis",
      "aliases": [
        "Tetracot comma"
      ],
      "ratio": "20000/19683",
      "cents": 27.6598,
      "category": "diesis",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "20000/19683",
        "factors": "2^5·5^4/3^9"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Minimal%20diesis",
      "sourceTextTarget": "Minimal diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/20000/19683",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "senga",
      "name": "Senga",
      "aliases": [],
      "ratio": "686/675",
      "cents": 27.9853,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "686/675",
        "factors": "2·7^3/3^3·5^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Senga",
      "sourceTextTarget": "Senga",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/686/675",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-minor-bp-diesis",
      "name": "Double minor BP diesis",
      "aliases": [],
      "ratio": "60025/59049",
      "cents": 28.381,
      "category": "diesis",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "minor-bp-diesis",
        "power": 2,
        "baseRatio": "245/243",
        "baseName": "Minor BP diesis"
      },
      "display": {
        "ratio": "60025/59049",
        "power": "(245/243)^2",
        "factors": "5^2·7^4/3^10",
        "powerRatio": "(245/243)^2",
        "powerFactors": "(5·7^2/3^5)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Minor%20BP%20diesis",
      "sourceTextTarget": "Minor BP diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/245/243",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "minor-bp-diesis",
      "derivedBaseUrl": "https://en.xen.wiki/w/245/243",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "double-undecimal-seconds-comma",
      "name": "Double undecimal seconds comma",
      "aliases": [],
      "ratio": "14641/14400",
      "cents": 28.7343,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "undecimal-seconds-comma",
        "power": 2,
        "baseRatio": "121/120",
        "baseName": "Undecimal seconds comma"
      },
      "display": {
        "ratio": "14641/14400",
        "power": "(121/120)^2",
        "factors": "11^4/2^6·3^2·5^2",
        "powerRatio": "(121/120)^2",
        "powerFactors": "(11^2/2^3·3·5)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Undecimal%20seconds%20comma",
      "sourceTextTarget": "Undecimal seconds comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/121/120",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "undecimal-seconds-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/121/120",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "magic-comma",
      "name": "Magic comma",
      "aliases": [
        "Small diesis"
      ],
      "ratio": "3125/3072",
      "cents": 29.6136,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "3125/3072",
        "factors": "5^5/2^10·3"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Magic%20comma",
      "sourceTextTarget": "Magic comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/3125/3072",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "vicesimononal-one-seventh-tone",
      "name": "Vicesimononal 1/7-tone",
      "aliases": [],
      "ratio": "58/57",
      "cents": 30.1092,
      "category": "higher-limit-medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "58/57",
        "factors": "2·29/3·19"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Vicesimononal%201%2F7-tone",
      "sourceTextTarget": "Vicesimononal 1/7-tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/58/57",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "hendrix-comma",
      "name": "Hendrix comma",
      "aliases": [],
      "ratio": "57/56",
      "cents": 30.6421,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "57/56",
        "factors": "3·19/2^3·7"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Hendrix%20comma",
      "sourceTextTarget": "Hendrix comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/57/56",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "undecimal-diesis",
      "name": "Undecimal diesis",
      "aliases": [
        "Konbini comma"
      ],
      "ratio": "56/55",
      "cents": 31.1943,
      "category": "diesis",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "56/55",
        "factors": "2^3·7/5·11"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Undecimal%20diesis",
      "sourceTextTarget": "Undecimal diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/56/55",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "telepathma",
      "name": "Telepathma",
      "aliases": [],
      "ratio": "55/54",
      "cents": 31.7667,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "55/54",
        "factors": "5·11/2·3^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Telepathma",
      "sourceTextTarget": "Telepathma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/55/54",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "llywelynsma",
      "name": "Llywelynsma",
      "aliases": [
        "Llywelyn comma"
      ],
      "ratio": "4194304/4117715",
      "cents": 31.9049,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "4194304/4117715",
        "factors": "2^22/5·7^7"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Llywelynsma",
      "sourceTextTarget": "Llywelynsma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/4194304/4117715",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "valentine-comma",
      "name": "Valentine comma",
      "aliases": [],
      "ratio": "1990656/1953125",
      "cents": 32.9516,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "1990656/1953125",
        "factors": "2^13·3^5/5^9"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Valentine%20comma",
      "sourceTextTarget": "Valentine comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1990656/1953125",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-animist-comma",
      "name": "Double animist comma",
      "aliases": [],
      "ratio": "11025/10816",
      "cents": 33.1339,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "animist-comma",
        "power": 2,
        "baseRatio": "105/104",
        "baseName": "Animist comma"
      },
      "display": {
        "ratio": "11025/10816",
        "factors": "3^2·5^2·7^2/2^6·13^2",
        "power": "(105/104)^2",
        "powerRatio": "(105/104)^2",
        "powerFactors": "(3·5·7/2^3·13)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Animist%20comma",
      "sourceTextTarget": "Animist comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/105/104",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "animist-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/105/104",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "eleven-seven-comma",
      "name": "11/7 comma",
      "aliases": [],
      "ratio": "45927/45056",
      "cents": 33.148,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "45927/45056",
        "factors": "3^8·7/2^12·11"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=11%2F7%20comma",
      "sourceTextTarget": "11/7 comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/45927/45056",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "vicesimononal-comma",
      "name": "Vicesimononal comma",
      "aliases": [],
      "ratio": "261/256",
      "cents": 33.4872,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "261/256",
        "factors": "3^2·29/2^8"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Vicesimononal%20comma",
      "sourceTextTarget": "Vicesimononal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/261/256",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "small-septendecimal-one-sixth-tone",
      "name": "Small septendecimal 1/6-tone",
      "aliases": [],
      "ratio": "52/51",
      "cents": 33.6173,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "52/51",
        "factors": "2^2·13/3·17"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Small%20septendecimal%201%2F6-tone",
      "sourceTextTarget": "Small septendecimal 1/6-tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/52/51",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "eric-comma",
      "name": "Eric comma",
      "aliases": [],
      "ratio": "839808/823543",
      "cents": 33.8587,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "839808/823543",
        "factors": "2^7·3^8/7^7"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Eric%20comma",
      "sourceTextTarget": "Eric comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Eric%20comma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-medium-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/839808/823543",
      "invalidIndividualUrl": "https://en.xen.wiki/w/839808/823543",
      "individualUrlTargetText": "Eric comma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "17th-partial-chroma",
      "name": "17th-partial chroma",
      "aliases": [],
      "ratio": "51/50",
      "cents": 34.283,
      "category": "chroma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "51/50",
        "factors": "3·17/2·5^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=17th-partial%20chroma",
      "sourceTextTarget": "17th-partial chroma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/51/50",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-ptolemy-comma",
      "name": "Double ptolemy's comma",
      "aliases": [],
      "ratio": "10000/9801",
      "cents": 34.799,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "ptolemy-comma",
        "power": 2,
        "baseRatio": "100/99",
        "baseName": "Ptolemy's comma"
      },
      "display": {
        "ratio": "10000/9801",
        "power": "(100/99)^2",
        "factors": "2^4·5^4/3^4·11^2",
        "powerRatio": "(100/99)^2",
        "powerFactors": "(2^2·5^2/3^2·11)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Ptolemy%27s%20comma",
      "sourceTextTarget": "Ptolemy's comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/100/99",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "ptolemy-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/100/99",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "tritonic-diesis",
      "name": "Tritonic diesis",
      "aliases": [
        "Erlich's decatonic comma",
        "Septimal sixth-tone"
      ],
      "ratio": "50/49",
      "cents": 34.9756,
      "category": "diesis",
      "source": "wikipedia-septimal-comma",
      "display": {
        "ratio": "50/49",
        "factors": "2·5^2/7^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Septimal_comma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Septimal_comma#:~:text=Tritonic%20diesis",
      "sourceTextTarget": "Tritonic diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/50/49",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-small-undecimal-comma",
      "name": "Double small undecimal comma",
      "aliases": [],
      "ratio": "9801/9604",
      "cents": 35.1523,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "small-undecimal-comma",
        "power": 2,
        "baseRatio": "99/98",
        "baseName": "Small undecimal comma"
      },
      "display": {
        "ratio": "9801/9604",
        "power": "(99/98)^2",
        "factors": "3^4·11^2/2^2·7^4",
        "powerRatio": "(99/98)^2",
        "powerFactors": "(3^2·11/2·7^2)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Comma_(music)",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Comma_(music)#:~:text=Small%20undecimal%20comma",
      "sourceTextTarget": "Small undecimal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/99/98",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "small-undecimal-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/99/98",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "tricesoprimal-comma",
      "name": "Tricesoprimal comma",
      "aliases": [],
      "ratio": "248/243",
      "cents": 35.2606,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "248/243",
        "factors": "2^3·31/3^5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Tricesoprimal%20comma",
      "sourceTextTarget": "Tricesoprimal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/248/243",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "arcturus-comma",
      "name": "Arcturus comma",
      "aliases": [
        "Great BP diesis"
      ],
      "ratio": "15625/15309",
      "cents": 35.3714,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "15625/15309",
        "factors": "5^6/3^7·7"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Arcturus%20comma",
      "sourceTextTarget": "Arcturus comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/15625/15309",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "slendro-diesis",
      "name": "Slendro diesis",
      "aliases": [
        "Septimal diesis"
      ],
      "ratio": "49/48",
      "cents": 35.6968,
      "category": "diesis",
      "source": "wikipedia-septimal-comma",
      "display": {
        "ratio": "49/48",
        "factors": "7^2/2^4·3"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Septimal_comma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Septimal_comma#:~:text=Slendro%20diesis",
      "sourceTextTarget": "Slendro diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/49/48",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-19th-partial-chroma",
      "name": "Double 19th-partial chroma",
      "aliases": [],
      "ratio": "9216/9025",
      "cents": 36.2565,
      "category": "chroma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "19th-partial-chroma",
        "power": 2,
        "baseRatio": "96/95",
        "baseName": "19th-partial chroma"
      },
      "display": {
        "ratio": "9216/9025",
        "power": "(96/95)^2",
        "factors": "2^10·3^2/5^2·19^2",
        "powerRatio": "(96/95)^2",
        "powerFactors": "(2^5·3/5·19)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=19th-partial%20chroma",
      "sourceTextTarget": "19th-partial chroma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/96/95",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "19th-partial-chroma",
      "derivedBaseUrl": "https://en.xen.wiki/w/96/95",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "forty-seventh-partial-chroma",
      "name": "47th-partial chroma",
      "aliases": [],
      "ratio": "48/47",
      "cents": 36.4484,
      "category": "higher-limit-medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "48/47",
        "factors": "2^4·3/47"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=47th-partial%20chroma",
      "sourceTextTarget": "47th-partial chroma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/48/47",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "undecimal-minor-diesis",
      "name": "Undecimal minor diesis",
      "aliases": [],
      "ratio": "8192/8019",
      "cents": 36.9521,
      "category": "diesis",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "8192/8019",
        "factors": "2^13/3^6·11"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Undecimal%20minor%20diesis",
      "sourceTextTarget": "Undecimal minor diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/8192/8019",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "mabilisma",
      "name": "Mabilisma",
      "aliases": [],
      "ratio": "1071875/1048576",
      "cents": 38.0463,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "1071875/1048576",
        "factors": "5^5·7^3/2^20"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Mabilisma",
      "sourceTextTarget": "Mabilisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Mabilisma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-medium-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/1071875/1048576",
      "invalidIndividualUrl": "https://en.xen.wiki/w/1071875/1048576",
      "individualUrlTargetText": "Mabilisma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "23rd-partial-chroma",
      "name": "23rd-partial chroma",
      "aliases": [],
      "ratio": "46/45",
      "cents": 38.0506,
      "category": "chroma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "46/45",
        "factors": "2·23/3^2·5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=23rd-partial%20chroma",
      "sourceTextTarget": "23rd-partial chroma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/46/45",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "thirteen-seven-small-diesis",
      "name": "13/7 small diesis",
      "aliases": [],
      "ratio": "1701/1664",
      "cents": 38.0732,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "1701/1664",
        "factors": "3^5·7/2^7·13"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=13%2F7%20small%20diesis",
      "sourceTextTarget": "13/7 small diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1701/1664",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-medium-tridecimal-comma",
      "name": "Double medium tridecimal comma",
      "aliases": [],
      "ratio": "8281/8100",
      "cents": 38.2597,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "medium-tridecimal-comma",
        "power": 2,
        "baseRatio": "91/90",
        "baseName": "Medium tridecimal comma"
      },
      "display": {
        "ratio": "8281/8100",
        "power": "(91/90)^2",
        "factors": "7^2·13^2/2^2·3^4·5^2",
        "powerRatio": "(91/90)^2",
        "powerFactors": "(7·13/2·3^2·5)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Medium%20tridecimal%20comma",
      "sourceTextTarget": "Medium tridecimal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/91/90",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "medium-tridecimal-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/91/90",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "lutra-comma",
      "name": "Lutra comma",
      "aliases": [],
      "ratio": "268119/262144",
      "cents": 39.0167,
      "category": "higher-limit-medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "268119/262144",
        "factors": "3^2·31^3/2^18"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Lutra%20comma",
      "sourceTextTarget": "Lutra comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/268119/262144",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "astbury",
      "name": "Astbury",
      "aliases": [],
      "ratio": "4826809/4718592",
      "cents": 39.256,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "4826809/4718592",
        "factors": "13^6/2^19·3^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Astbury",
      "sourceTextTarget": "Astbury",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Astbury",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-medium-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/4826809/4718592",
      "invalidIndividualUrl": "https://en.xen.wiki/w/4826809/4718592",
      "individualUrlTargetText": "Astbury",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "nokotan",
      "name": "Nokotan",
      "aliases": [
        "Shikanokonokonokokoshitantanma"
      ],
      "ratio": "21875/21384",
      "cents": 39.3015,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "21875/21384",
        "factors": "5^5·7/2^3·3^5·11"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Nokotan",
      "sourceTextTarget": "Nokotan",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/21875/21384",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "keladisma-13-7-small-diesis",
      "name": "Keladisma",
      "aliases": [
        "13/7 small diesis"
      ],
      "ratio": "351/343",
      "cents": 39.9149,
      "category": "diesis",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "351/343",
        "factors": "3^3·13/7^3"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Keladisma",
      "sourceTextTarget": "Keladisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/351/343",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "forty-three-forty-two",
      "name": "Large 43-limit fifth-tone",
      "aliases": [
        "large quadracesimotertial 1/5-tone"
      ],
      "ratio": "43/42",
      "cents": 40.7368,
      "category": "higher-limit-medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "43/42",
        "factors": "43/2·3·7"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=43%2F42",
      "sourceTextTarget": "43/42",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/43/42",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page",
      "nameLookupStatus": "conventional-name-found",
      "nameLookupConfidence": "high",
      "colorName": "Fothoru",
      "otherNotationNames": [
        "43or1",
        "FJS: P1^43_7"
      ],
      "nameLookupSources": [
        {
          "site": "Xenharmonic Wiki",
          "url": "https://en.xen.wiki/w/43/42",
          "evidence": "Ratio page gives Name: large 43-limit fifth-tone."
        },
        {
          "site": "Xenharmonic Wiki - List of superparticular intervals/43-limit",
          "url": "https://en.xen.wiki/w/List_of_superparticular_intervals/43-limit",
          "evidence": "43-limit superparticular list gives Name(s): Large quadracesimotertial 1/5-tone."
        },
        {
          "site": "Xenharmonic Wiki - Medium comma",
          "url": "https://en.xen.wiki/w/Medium_comma",
          "evidence": "Higher-limit commas table lists 43/42 with color name Fothoru and code 43or1."
        },
        {
          "site": "Kyle Gann - Anatomy of an Octave",
          "url": "https://www.kylegann.com/Octave.html",
          "evidence": "Lists 43/42 at 40.737 cents with no name in the name column."
        }
      ]
    },
    {
      "id": "double-monk-comma",
      "name": "Double monk comma",
      "aliases": [],
      "ratio": "7225/7056",
      "cents": 40.9764,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "monk-comma",
        "power": 2,
        "baseRatio": "85/84",
        "baseName": "Monk comma"
      },
      "display": {
        "ratio": "7225/7056",
        "power": "(85/84)^2",
        "factors": "5^2·17^2/2^4·3^2·7^2",
        "powerRatio": "(85/84)^2",
        "powerFactors": "(5·17/2^2·3·7)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Monk%20comma",
      "sourceTextTarget": "Monk comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/85/84",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "monk-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/85/84",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "minor-diesis",
      "name": "Minor diesis",
      "aliases": [
        "Diesis",
        "Lesser diesis"
      ],
      "ratio": "128/125",
      "cents": 41.0589,
      "category": "diesis",
      "source": "wikipedia-comma",
      "display": {
        "ratio": "128/125",
        "factors": "2^7/5^3"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Comma_(music)",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Comma_(music)#:~:text=Minor%20diesis",
      "sourceTextTarget": "Minor diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/128/125",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "septimal-inframinor-second",
      "name": "Septimal inframinor second",
      "aliases": [],
      "ratio": "2240/2187",
      "cents": 41.4546,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "2240/2187",
        "factors": "2^6·5·7/3^7"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Septimal%20inframinor%20second",
      "sourceTextTarget": "Septimal inframinor second",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/2240/2187",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "quaoarisma",
      "name": "Quaoarisma",
      "aliases": [],
      "ratio": "253/247",
      "cents": 41.5516,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "253/247",
        "factors": "11·23/13·19"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Quaoarisma",
      "sourceTextTarget": "Quaoarisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/253/247",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "lesser-41-limit-fifth-tone",
      "name": "Lesser 41-limit fifth tone",
      "aliases": [],
      "ratio": "42/41",
      "cents": 41.7185,
      "category": "fifth-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "42/41",
        "factors": "2·3·7/41"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Lesser%2041-limit%20fifth%20tone",
      "sourceTextTarget": "Lesser 41-limit fifth tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/42/41",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Lesser 41-limit fifth tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "42/41",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 42/41."
    },
    {
      "id": "skwares-comma",
      "name": "Skwares comma",
      "aliases": [
        "Laquadru comma"
      ],
      "ratio": "19683/19208",
      "cents": 42.2914,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "19683/19208",
        "factors": "3^9/2^3·7^4"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Skwares%20comma",
      "sourceTextTarget": "Skwares comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/19683/19208",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-nautilus-comma",
      "name": "Double nautilus comma",
      "aliases": [],
      "ratio": "60025/58564",
      "cents": 42.6593,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "nautilus-comma",
        "power": 2,
        "baseRatio": "245/242",
        "baseName": "Nautilus comma"
      },
      "display": {
        "ratio": "60025/58564",
        "factors": "5^2·7^4/2^2·11^4",
        "power": "(245/242)^2",
        "powerRatio": "(245/242)^2",
        "powerFactors": "(5·7^2/2·11^2)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Nautilus%20comma",
      "sourceTextTarget": "Nautilus comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/245/242",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "nautilus-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/245/242",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "greater-41-limit-fifth-tone",
      "name": "Greater 41-limit fifth tone",
      "aliases": [],
      "ratio": "41/40",
      "cents": 42.7487,
      "category": "fifth-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "41/40",
        "factors": "41/2^3·5"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%2041-limit%20fifth%20tone",
      "sourceTextTarget": "Greater 41-limit fifth tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/41/40",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Greater 41-limit fifth tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "41/40",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 41/40."
    },
    {
      "id": "double-syntonic-comma",
      "name": "Double syntonic comma",
      "aliases": [],
      "ratio": "6561/6400",
      "cents": 43.0126,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "syntonic-comma",
        "power": 2,
        "baseRatio": "81/80",
        "baseName": "Syntonic comma"
      },
      "display": {
        "ratio": "6561/6400",
        "power": "(81/80)^2",
        "factors": "3^8/2^8·5^2",
        "powerRatio": "(81/80)^2",
        "powerFactors": "(3^4/2^4·5)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Syntonic_comma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Syntonic_comma#:~:text=Syntonic%20comma",
      "sourceTextTarget": "Syntonic comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/Syntonic_comma",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "syntonic-comma",
      "derivedBaseUrl": "https://en.wikipedia.org/wiki/Syntonic_comma",
      "derivedBaseUrlKind": "source-individual-article"
    },
    {
      "id": "avicennma",
      "name": "Avicennma",
      "aliases": [
        "Avicenna enharmonic diesis"
      ],
      "ratio": "525/512",
      "cents": 43.4083,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "525/512",
        "factors": "3·5^2·7/2^9"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Avicennma",
      "sourceTextTarget": "Avicennma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/525/512",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "tridecimal-minor-diesis",
      "name": "Tridecimal minor diesis",
      "aliases": [],
      "ratio": "40/39",
      "cents": 43.8311,
      "category": "diesis",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "40/39",
        "factors": "2^3·5/3·13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Tridecimal%20minor%20diesis",
      "sourceTextTarget": "Tridecimal minor diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/40/39",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "alpharabian-paralimma",
      "name": "Alpharabian paralimma",
      "aliases": [],
      "ratio": "4096/3993",
      "cents": 44.0912,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "4096/3993",
        "factors": "2^12/3·11^3"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Alpharabian%20paralimma",
      "sourceTextTarget": "Alpharabian paralimma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/4096/3993",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "cloudy-comma",
      "name": "Cloudy comma",
      "aliases": [],
      "ratio": "16807/16384",
      "cents": 44.1295,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "16807/16384",
        "factors": "7^5/2^14"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Cloudy%20comma",
      "sourceTextTarget": "Cloudy comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/16807/16384",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-negustma",
      "name": "Double negustma",
      "aliases": [],
      "ratio": "6084/5929",
      "cents": 44.6776,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "negustma",
        "power": 2,
        "baseRatio": "78/77",
        "baseName": "Negustma"
      },
      "display": {
        "ratio": "6084/5929",
        "factors": "2^2·3^2·13^2/7^2·11^2",
        "power": "(78/77)^2",
        "powerRatio": "(78/77)^2",
        "powerFactors": "(2·3·13/7·11)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Negustma",
      "sourceTextTarget": "Negustma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/78/77",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "negustma",
      "derivedBaseUrl": "https://en.xen.wiki/w/78/77",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "keladisma",
      "name": "Keladisma",
      "aliases": [
        "Supracomma"
      ],
      "ratio": "352/343",
      "cents": 44.8402,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "352/343",
        "factors": "2^5·11/7^3"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Keladisma",
      "sourceTextTarget": "Keladisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Keladisma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "huygens-fokker-list-of-intervals",
      "previousIndividualUrl": "https://en.xen.wiki/w/352/343",
      "invalidIndividualUrl": "https://en.xen.wiki/w/352/343",
      "individualUrlTargetText": "Keladisma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "superior-quarter-tone",
      "name": "Superior quarter-tone",
      "aliases": [
        "Novendecimal fifth tone"
      ],
      "ratio": "39/38",
      "cents": 44.9696,
      "category": "quarter-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "39/38",
        "factors": "3·13/2·19"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Superior%20quarter-tone",
      "sourceTextTarget": "Superior quarter-tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/39/38",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Superior quarter-tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "39/38",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 39/38."
    },
    {
      "id": "obsceniton",
      "name": "Obsceniton",
      "aliases": [
        "5-21-comma"
      ],
      "ratio": "4194304/4084101",
      "cents": 46.0955,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "4194304/4084101",
        "factors": "2^22/3^5·7^5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Obsceniton",
      "sourceTextTarget": "Obsceniton",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/4194304/4084101",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "alpharabian-parachromatic-semilimma",
      "name": "Alpharabian parachromatic semilimma",
      "aliases": [],
      "ratio": "1331/1296",
      "cents": 46.1338,
      "category": "limma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1331/1296",
        "factors": "11^3/2^4·3^4"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Alpharabian%20parachromatic%20semilimma",
      "sourceTextTarget": "Alpharabian parachromatic semilimma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1331/1296",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "lesser-37-limit-quarter-tone",
      "name": "Lesser 37-limit quarter tone",
      "aliases": [],
      "ratio": "38/37",
      "cents": 46.169,
      "category": "quarter-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "38/37",
        "factors": "2·19/37"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Lesser%2037-limit%20quarter%20tone",
      "sourceTextTarget": "Lesser 37-limit quarter tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/38/37",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Lesser 37-limit quarter tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "38/37",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 38/37."
    },
    {
      "id": "four-hundred-sixteen-four-hundred-five",
      "name": "Oceanfront comma",
      "aliases": [],
      "ratio": "416/405",
      "cents": 46.3939,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "416/405",
        "factors": "2^5·13/3^4·5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=416%2F405",
      "sourceTextTarget": "416/405",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/416/405",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page",
      "nameLookupStatus": "conventional-name-found",
      "nameLookupConfidence": "high",
      "colorName": "Thogu",
      "otherNotationNames": [
        "3og2",
        "thogu 2nd",
        "FJS: d2^13_5"
      ],
      "nameLookupSources": [
        {
          "site": "Xenharmonic Wiki",
          "url": "https://en.xen.wiki/w/416/405",
          "evidence": "Ratio page names 416/405 the oceanfront comma and says the name was given by Tristan Bay in 2025."
        },
        {
          "site": "Xenharmonic Wiki - User:Tristanbay",
          "url": "https://en.xen.wiki/w/User%3ATristanbay",
          "evidence": "Tristan Bay's user page lists 416/405, the oceanfront comma, under musical intervals he named."
        },
        {
          "site": "Xenharmonic Wiki - Medium comma",
          "url": "https://en.xen.wiki/w/Medium_comma",
          "evidence": "13-limit commas table lists 416/405 with color name Thogu and code 3og2."
        }
      ]
    },
    {
      "id": "greater-37-limit-quarter-tone",
      "name": "Greater 37-limit quarter tone",
      "aliases": [],
      "ratio": "37/36",
      "cents": 47.434,
      "category": "quarter-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "37/36",
        "factors": "37/2^2·3^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%2037-limit%20quarter%20tone",
      "sourceTextTarget": "Greater 37-limit quarter tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/37/36",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Greater 37-limit quarter tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "37/36",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 37/36."
    },
    {
      "id": "tridecimal-major-diesis",
      "name": "Tridecimal major diesis",
      "aliases": [],
      "ratio": "1053/1024",
      "cents": 48.3477,
      "category": "diesis",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1053/1024",
        "factors": "3^4·13/2^10"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Tridecimal%20major%20diesis",
      "sourceTextTarget": "Tridecimal major diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1053/1024",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "septimal-diesis",
      "name": "Septimal diesis",
      "aliases": [
        "Septimal quarter tone"
      ],
      "ratio": "36/35",
      "cents": 48.7704,
      "category": "diesis",
      "source": "wikipedia-septimal-comma",
      "display": {
        "ratio": "36/35",
        "factors": "2^2·3^2/5·7"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Septimal_comma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Septimal_comma#:~:text=Septimal%20diesis",
      "sourceTextTarget": "Septimal diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/36/35",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "maximal-diesis",
      "name": "Maximal diesis",
      "aliases": [
        "Porcupine comma"
      ],
      "ratio": "250/243",
      "cents": 49.1661,
      "category": "diesis",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "250/243",
        "factors": "2·5^3/3^5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Maximal%20diesis",
      "sourceTextTarget": "Maximal diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/250/243",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "keega",
      "name": "Keega",
      "aliases": [],
      "ratio": "1029/1000",
      "cents": 49.4916,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "1029/1000",
        "factors": "3·7^3/2^3·5^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Keega",
      "sourceTextTarget": "Keega",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1029/1000",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "lesser-17-limit-quarter-tone",
      "name": "Lesser 17-limit quarter tone",
      "aliases": [
        "ET quarter-tone approximation"
      ],
      "ratio": "35/34",
      "cents": 50.1842,
      "category": "quarter-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "35/34",
        "factors": "5·7/2·17"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Lesser%2017-limit%20quarter%20tone",
      "sourceTextTarget": "Lesser 17-limit quarter tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/35/34",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Lesser 17-limit quarter tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "35/34",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 35/34."
    },
    {
      "id": "harrisons-comma",
      "name": "Harrison's comma",
      "aliases": [
        "10 P5s - 1 H7"
      ],
      "ratio": "59049/57344",
      "cents": 50.7241,
      "category": "comma",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "59049/57344",
        "factors": "3^10/2^13·7"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Harrison%27s%20comma",
      "sourceTextTarget": "Harrison's comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Harrison%27s_comma",
      "individualUrlKind": "xenharmonic-wiki-individual-name-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Harrison's comma",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "Harrison's comma",
      "individualUrlMatchStatus": "exact-individual-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki redirects the 59049/57344 ratio page to the Harrison's comma name page."
    },
    {
      "id": "double-augmentation-diesis",
      "name": "Double augmentation diesis",
      "aliases": [
        "Negri comma"
      ],
      "ratio": "16875/16384",
      "cents": 51.1199,
      "category": "diesis",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "16875/16384",
        "factors": "3^3·5^4/2^14"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Double%20augmentation%20diesis",
      "sourceTextTarget": "Double augmentation diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/16875/16384",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "greater-17-limit-quarter-tone",
      "name": "Greater 17-limit quarter tone",
      "aliases": [],
      "ratio": "34/33",
      "cents": 51.6825,
      "category": "quarter-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "34/33",
        "factors": "2·17/3·11"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%2017-limit%20quarter%20tone",
      "sourceTextTarget": "Greater 17-limit quarter tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/34/33",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Greater 17-limit quarter tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "34/33",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 34/33."
    },
    {
      "id": "twenty-five-eleven-seven-medium-diesis",
      "name": "25·11/7 medium diesis",
      "aliases": [],
      "ratio": "567/550",
      "cents": 52.7005,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "567/550",
        "factors": "3^4·7/2·5^2·11"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=25%C2%B711%2F7%20medium%20diesis",
      "sourceTextTarget": "25·11/7 medium diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/567/550",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-winmeanma",
      "name": "Double winmeanma",
      "aliases": [],
      "ratio": "4356/4225",
      "cents": 52.8631,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "winmeanma",
        "power": 2,
        "baseRatio": "66/65",
        "baseName": "Winmeanma"
      },
      "display": {
        "ratio": "4356/4225",
        "factors": "2^2·3^2·11^2/5^2·13^2",
        "power": "(66/65)^2",
        "powerRatio": "(66/65)^2",
        "powerFactors": "(2·3·11/5·13)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Winmeanma",
      "sourceTextTarget": "Winmeanma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/66/65",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "winmeanma",
      "derivedBaseUrl": "https://en.xen.wiki/w/66/65",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "undecimal-comma",
      "name": "Undecimal comma",
      "aliases": [
        "Al-Farabi's quarter-tone"
      ],
      "ratio": "33/32",
      "cents": 53.2729,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "33/32",
        "factors": "3·11/2^5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Undecimal%20comma",
      "sourceTextTarget": "Undecimal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/33/32",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-wilsorma",
      "name": "Double wilsorma",
      "aliases": [],
      "ratio": "4225/4096",
      "cents": 53.6828,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "wilsorma",
        "power": 2,
        "baseRatio": "65/64",
        "baseName": "Wilsorma"
      },
      "display": {
        "ratio": "4225/4096",
        "factors": "5^2·13^2/2^12",
        "power": "(65/64)^2",
        "powerRatio": "(65/64)^2",
        "powerFactors": "(5·13/2^6)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Wilsorma",
      "sourceTextTarget": "Wilsorma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/65/64",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "wilsorma",
      "derivedBaseUrl": "https://en.xen.wiki/w/65/64",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "forty-seven-limit-quartertone-comma",
      "name": "47-limit ~quartertone comma",
      "aliases": [],
      "ratio": "752/729",
      "cents": 53.7766,
      "category": "higher-limit-medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "752/729",
        "factors": "2^4·47/3^6"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=47-limit%20~quartertone%20comma",
      "sourceTextTarget": "47-limit ~quartertone comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/752/729",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "radius-of-tolerance-fjs",
      "name": "Radius of tolerance (FJS)",
      "aliases": [],
      "ratio": "65/63",
      "cents": 54.1055,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "65/63",
        "factors": "5·13/3^2·7"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Radius%20of%20tolerance%20%28FJS%29",
      "sourceTextTarget": "Radius of tolerance (FJS)",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/65/63",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-septimal-comma",
      "name": "Double septimal comma",
      "aliases": [],
      "ratio": "4096/3969",
      "cents": 54.5282,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "septimal-comma",
        "power": 2,
        "baseRatio": "64/63",
        "baseName": "Septimal comma"
      },
      "display": {
        "ratio": "4096/3969",
        "power": "(64/63)^2",
        "factors": "2^12/3^4·7^2",
        "powerRatio": "(64/63)^2",
        "powerFactors": "(2^6/3^2·7)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Septimal_comma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Septimal_comma#:~:text=Septimal%20comma",
      "sourceTextTarget": "Septimal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/64/63",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "septimal-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/64/63",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "inferior-quarter-tone",
      "name": "Inferior quarter-tone",
      "aliases": [
        "31st subharmonic"
      ],
      "ratio": "32/31",
      "cents": 54.9644,
      "category": "quarter-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "32/31",
        "factors": "2^5/31"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Inferior%20quarter-tone",
      "sourceTextTarget": "Inferior quarter-tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/32/31",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Inferior quarter-tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "32/31",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 32/31."
    },
    {
      "id": "jug-comma",
      "name": "Jug comma",
      "aliases": [],
      "ratio": "125/121",
      "cents": 56.3053,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "125/121",
        "factors": "5^3/11^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Jug%20comma",
      "sourceTextTarget": "Jug comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/125/121",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "greenwoodma",
      "name": "Greenwoodma",
      "aliases": [],
      "ratio": "405/392",
      "cents": 56.4819,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "405/392",
        "factors": "3^4·5/2^3·7^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Greenwoodma",
      "sourceTextTarget": "Greenwoodma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/405/392",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "five-hundred-twenty-ninth-harmonic",
      "name": "529th harmonic",
      "aliases": [],
      "ratio": "529/512",
      "cents": 56.5487,
      "category": "harmonic",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "529/512",
        "factors": "23^2/2^9"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Five-hundred-twenty-ninth%20harmonic",
      "sourceTextTarget": "529th harmonic",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://sonaveeb.ee/search/unif/dlall/nmus/five-%20hundred-twenty-ninth%20harmonic",
      "individualUrlKind": "terminology-database-entry",
      "individualUrlSource": "estonian-nuudismuusika-terminibaas",
      "individualUrlTargetText": "529th harmonic",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "five-hundred-twenty-ninth harmonic",
      "individualUrlMatchStatus": "term-entry-with-exact-ratio",
      "individualUrlConfidence": "medium",
      "individualUrlNotes": "No Xen Wiki individual ratio page was found; the terminology database entry gives the exact term and ratio 529/512."
    },
    {
      "id": "greater-quarter-tone",
      "name": "Greater quarter-tone",
      "aliases": [
        "Difference between 31:16 and 15:8"
      ],
      "ratio": "31/30",
      "cents": 56.7669,
      "category": "quarter-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "31/30",
        "factors": "31/2·3·5"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%20quarter-tone",
      "sourceTextTarget": "Greater quarter-tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/31/30",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Greater quarter-tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "31/30",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 31/30."
    },
    {
      "id": "lipsett-comma",
      "name": "Lipsett comma",
      "aliases": [],
      "ratio": "2187/2116",
      "cents": 57.1363,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "2187/2116",
        "factors": "3^7/2^2·23^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Lipsett%20comma",
      "sourceTextTarget": "Lipsett comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/2187/2116",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "septimal-2-7-tone",
      "name": "Septimal 2/7-tone",
      "aliases": [],
      "ratio": "1323/1280",
      "cents": 57.2031,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "1323/1280",
        "factors": "3^3·7^2/2^8·5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Septimal%202%2F7-tone",
      "sourceTextTarget": "Septimal 2/7-tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1323/1280",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "shibboleth-comma",
      "name": "Shibboleth comma",
      "aliases": [],
      "ratio": "1953125/1889568",
      "cents": 57.2734,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "1953125/1889568",
        "factors": "5^9/2^5·3^10"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Shibboleth%20comma",
      "sourceTextTarget": "Shibboleth comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/1953125/1889568",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "lesser-29-limit-quarter-tone",
      "name": "Lesser 29-limit quarter tone",
      "aliases": [],
      "ratio": "30/29",
      "cents": 58.6915,
      "category": "quarter-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "30/29",
        "factors": "2·3·5/29"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Lesser%2029-limit%20quarter%20tone",
      "sourceTextTarget": "Lesser 29-limit quarter tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/30/29",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Lesser 29-limit quarter tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "30/29",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 30/29."
    },
    {
      "id": "arrokothisma",
      "name": "Arrokothisma",
      "aliases": [],
      "ratio": "299/289",
      "cents": 58.8912,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "299/289",
        "factors": "13·23/17^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Arrokothisma",
      "sourceTextTarget": "Arrokothisma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/299/289",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "septendecimal-20edo-step",
      "name": "Septendecimal ~20edo-step",
      "aliases": [],
      "ratio": "88/85",
      "cents": 60.0488,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "88/85",
        "factors": "2^3·11/5·17"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Septendecimal%20~20edo-step",
      "sourceTextTarget": "Septendecimal ~20edo-step",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/88/85",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "passion-comma",
      "name": "Passion comma",
      "aliases": [],
      "ratio": "262144/253125",
      "cents": 60.6114,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "262144/253125",
        "factors": "2^18/3^4·5^5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Passion%20comma",
      "sourceTextTarget": "Passion comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/262144/253125",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "greater-29-limit-quarter-tone",
      "name": "Greater 29-limit quarter tone",
      "aliases": [],
      "ratio": "29/28",
      "cents": 60.7513,
      "category": "quarter-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "29/28",
        "factors": "29/2^2·7"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%2029-limit%20quarter%20tone",
      "sourceTextTarget": "Greater 29-limit quarter tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/29/28",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Greater 29-limit quarter tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "29/28",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 29/28."
    },
    {
      "id": "double-hendrix-comma",
      "name": "Double hendrix comma",
      "aliases": [],
      "ratio": "3249/3136",
      "cents": 61.2842,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "hendrix-comma",
        "power": 2,
        "baseRatio": "57/56",
        "baseName": "Hendrix comma"
      },
      "display": {
        "ratio": "3249/3136",
        "power": "(57/56)^2",
        "factors": "3^2·19^2/2^6·7^2",
        "powerRatio": "(57/56)^2",
        "powerFactors": "(3·19/2^3·7)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Hendrix%20comma",
      "sourceTextTarget": "Hendrix comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/57/56",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "hendrix-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/57/56",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "double-undecimal-diesis",
      "name": "Double undecimal diesis",
      "aliases": [],
      "ratio": "3136/3025",
      "cents": 62.3885,
      "category": "diesis",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "undecimal-diesis",
        "power": 2,
        "baseRatio": "56/55",
        "baseName": "Undecimal diesis"
      },
      "display": {
        "ratio": "3136/3025",
        "power": "(56/55)^2",
        "factors": "2^6·7^2/5^2·11^2",
        "powerRatio": "(56/55)^2",
        "powerFactors": "(2^3·7/5·11)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Undecimal%20diesis",
      "sourceTextTarget": "Undecimal diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/56/55",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "undecimal-diesis",
      "derivedBaseUrl": "https://en.xen.wiki/w/56/55",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "greater-diesis",
      "name": "Greater diesis",
      "aliases": [
        "Major diesis"
      ],
      "ratio": "648/625",
      "cents": 62.5651,
      "category": "diesis",
      "source": "wikipedia-comma",
      "display": {
        "ratio": "648/625",
        "factors": "2^3·3^4/5^4"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Comma_(music)",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Comma_(music)#:~:text=Greater%20diesis",
      "sourceTextTarget": "Greater diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/648/625",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "septimal-minor-second",
      "name": "Septimal minor second",
      "aliases": [
        "Small minor second",
        "Inferior quarter tone"
      ],
      "ratio": "28/27",
      "cents": 62.9609,
      "category": "semitone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "28/27",
        "factors": "2^2·7/3^3"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Septimal%20minor%20second",
      "sourceTextTarget": "Septimal minor second",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/Septimal_third_tone",
      "individualUrlKind": "wikipedia-individual-article-alternate-title",
      "individualUrlSource": "wikipedia",
      "individualUrlTargetText": "Septimal minor second",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "Septimal third tone",
      "individualUrlMatchStatus": "exact-ratio-page-alternate-name",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "The article title is Septimal third tone, but it gives ratio 28:27; Xenharmonic Wiki also lists septimal minor second as an alias."
    },
    {
      "id": "35-large-diesis",
      "name": "35 large diesis",
      "aliases": [],
      "ratio": "8505/8192",
      "cents": 64.9146,
      "category": "diesis",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "8505/8192",
        "factors": "3^5·5·7/2^13"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=35%20large%20diesis",
      "sourceTextTarget": "35 large diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/8505/8192",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "tridecimal-comma",
      "name": "Tridecimal comma",
      "aliases": [
        "Tridecimal third-tone"
      ],
      "ratio": "27/26",
      "cents": 65.3373,
      "category": "comma",
      "source": "wikipedia-comma",
      "display": {
        "ratio": "27/26",
        "factors": "3^3/2·13"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Comma_(music)",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Comma_(music)#:~:text=Tridecimal%20comma",
      "sourceTextTarget": "Tridecimal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/27/26",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "one-hundred-thirty-third-harmonic",
      "name": "133rd harmonic",
      "aliases": [],
      "ratio": "133/128",
      "cents": 66.3389,
      "category": "harmonic",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "133/128",
        "factors": "7·19/2^7"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=One-hundred-thirty-third%20harmonic",
      "sourceTextTarget": "133rd harmonic",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=One-hundred-thirty-third%20harmonic",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "wikipedia-list-of-pitch-intervals",
      "individualUrlTargetText": "133rd harmonic",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "List of pitch intervals",
      "individualUrlMatchStatus": "no-individual-page-found",
      "individualUrlConfidence": "low",
      "individualUrlNotes": "No reliable individual page found in the search pass. Keep the original Wikipedia list text-fragment as fallback."
    },
    {
      "id": "tridecimal-third-tone",
      "name": "Tridecimal third tone",
      "aliases": [
        "Third tone"
      ],
      "ratio": "26/25",
      "cents": 67.9002,
      "category": "third-tone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "26/25",
        "factors": "2·13/5^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Tridecimal%20third%20tone",
      "sourceTextTarget": "Tridecimal third tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/26/25",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Tridecimal third tone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "26/25",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 26/25."
    },
    {
      "id": "double-17th-partial-chroma",
      "name": "Double 17th-partial chroma",
      "aliases": [],
      "ratio": "2601/2500",
      "cents": 68.566,
      "category": "chroma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "17th-partial-chroma",
        "power": 2,
        "baseRatio": "51/50",
        "baseName": "17th-partial chroma"
      },
      "display": {
        "ratio": "2601/2500",
        "power": "(51/50)^2",
        "factors": "3^2·17^2/2^2·5^4",
        "powerRatio": "(51/50)^2",
        "powerFactors": "(3·17/2·5^2)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=17th-partial%20chroma",
      "sourceTextTarget": "17th-partial chroma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/51/50",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "17th-partial-chroma",
      "derivedBaseUrl": "https://en.xen.wiki/w/51/50",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "superpyth-comma",
      "name": "Superpyth comma",
      "aliases": [
        "Grave minor second"
      ],
      "ratio": "20480/19683",
      "cents": 68.7187,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "20480/19683",
        "factors": "2^12·5/3^9"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Superpyth%20comma",
      "sourceTextTarget": "Superpyth comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/20480/19683",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "septimal-major-diesis",
      "name": "Septimal major diesis",
      "aliases": [],
      "ratio": "17496/16807",
      "cents": 69.5555,
      "category": "diesis",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "17496/16807",
        "factors": "2^3·3^7/7^5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Septimal%20major%20diesis",
      "sourceTextTarget": "Septimal major diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Septimal%20major%20diesis",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "huygens-fokker-list-of-intervals",
      "previousIndividualUrl": "https://en.xen.wiki/w/17496/16807",
      "invalidIndividualUrl": "https://en.xen.wiki/w/17496/16807",
      "individualUrlTargetText": "Septimal major diesis",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "double-tritonic-diesis",
      "name": "Double tritonic diesis",
      "aliases": [],
      "ratio": "2500/2401",
      "cents": 69.9512,
      "category": "diesis",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "tritonic-diesis",
        "power": 2,
        "baseRatio": "50/49",
        "baseName": "Tritonic diesis"
      },
      "display": {
        "ratio": "2500/2401",
        "power": "(50/49)^2",
        "factors": "2^2·5^4/7^4",
        "powerRatio": "(50/49)^2",
        "powerFactors": "(2·5^2/7^2)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Septimal_comma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Septimal_comma#:~:text=Tritonic%20diesis",
      "sourceTextTarget": "Tritonic diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/50/49",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "tritonic-diesis",
      "derivedBaseUrl": "https://en.xen.wiki/w/50/49",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "double-tricesoprimal-comma",
      "name": "Double tricesoprimal comma",
      "aliases": [],
      "ratio": "61504/59049",
      "cents": 70.5211,
      "category": "comma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "tricesoprimal-comma",
        "power": 2,
        "baseRatio": "248/243",
        "baseName": "Tricesoprimal comma"
      },
      "display": {
        "ratio": "61504/59049",
        "power": "(248/243)^2",
        "factors": "2^6·31^2/3^10",
        "powerRatio": "(248/243)^2",
        "powerFactors": "(2^3·31/3^5)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Tricesoprimal%20comma",
      "sourceTextTarget": "Tricesoprimal comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/248/243",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "tricesoprimal-comma",
      "derivedBaseUrl": "https://en.xen.wiki/w/248/243",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "minor-chroma",
      "name": "Minor chroma",
      "aliases": [
        "Classic chromatic semitone",
        "Lesser chromatic semitone"
      ],
      "ratio": "25/24",
      "cents": 70.6724,
      "category": "chroma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "25/24",
        "factors": "5^2/2^3·3"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Minor%20chroma",
      "sourceTextTarget": "Minor chroma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/25/24",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-slendro-diesis",
      "name": "Double slendro diesis",
      "aliases": [],
      "ratio": "2401/2304",
      "cents": 71.3936,
      "category": "diesis",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "slendro-diesis",
        "power": 2,
        "baseRatio": "49/48",
        "baseName": "Slendro diesis"
      },
      "display": {
        "ratio": "2401/2304",
        "power": "(49/48)^2",
        "factors": "7^4/2^8·3^2",
        "powerRatio": "(49/48)^2",
        "powerFactors": "(7^2/2^4·3)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Septimal_comma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Septimal_comma#:~:text=Slendro%20diesis",
      "sourceTextTarget": "Slendro diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/49/48",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "slendro-diesis",
      "derivedBaseUrl": "https://en.xen.wiki/w/49/48",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "stump-comma",
      "name": "Stump comma",
      "aliases": [],
      "ratio": "273375/262144",
      "cents": 72.6261,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "273375/262144",
        "factors": "3^7·5^3/2^18"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Stump%20comma",
      "sourceTextTarget": "Stump comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Stump%20comma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-medium-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/273375/262144",
      "invalidIndividualUrl": "https://en.xen.wiki/w/273375/262144",
      "individualUrlTargetText": "Stump comma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "lesser-23-limit-semitone",
      "name": "Lesser 23-limit semitone",
      "aliases": [],
      "ratio": "24/23",
      "cents": 73.6807,
      "category": "semitone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "24/23",
        "factors": "2^3·3/23"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Lesser%2023-limit%20semitone",
      "sourceTextTarget": "Lesser 23-limit semitone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/24/23",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Lesser 23-limit semitone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "24/23",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 24/23."
    },
    {
      "id": "bapbo-comma",
      "name": "Bapbo comma",
      "aliases": [
        "Septimal minor semitone"
      ],
      "ratio": "256/245",
      "cents": 76.0345,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "256/245",
        "factors": "2^8/5·7^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Bapbo%20comma",
      "sourceTextTarget": "Bapbo comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/256/245",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-23rd-partial-chroma",
      "name": "Double 23rd-partial chroma",
      "aliases": [],
      "ratio": "2116/2025",
      "cents": 76.1013,
      "category": "chroma",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "23rd-partial-chroma",
        "power": 2,
        "baseRatio": "46/45",
        "baseName": "23rd-partial chroma"
      },
      "display": {
        "ratio": "2116/2025",
        "power": "(46/45)^2",
        "factors": "2^2·23^2/3^4·5^2",
        "powerRatio": "(46/45)^2",
        "powerFactors": "(2·23/3^2·5)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=23rd-partial%20chroma",
      "sourceTextTarget": "23rd-partial chroma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/46/45",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "23rd-partial-chroma",
      "derivedBaseUrl": "https://en.xen.wiki/w/46/45",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "prograde-comma",
      "name": "Prograde comma",
      "aliases": [
        "Prograde septimal third tone"
      ],
      "ratio": "392/375",
      "cents": 76.7557,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "392/375",
        "factors": "2^3·7^2/3·5^3"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Prograde%20comma",
      "sourceTextTarget": "Prograde comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/392/375",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "sevond-comma",
      "name": "Sevond comma",
      "aliases": [],
      "ratio": "5000000/4782969",
      "cents": 76.826,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "5000000/4782969",
        "factors": "2^6·5^7/3^14"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Sevond%20comma",
      "sourceTextTarget": "Sevond comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Sevond%20comma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-medium-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/5000000/4782969",
      "invalidIndividualUrl": "https://en.xen.wiki/w/5000000/4782969",
      "individualUrlTargetText": "Sevond comma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "greater-23-limit-semitone",
      "name": "Greater 23-limit semitone",
      "aliases": [],
      "ratio": "23/22",
      "cents": 76.9564,
      "category": "semitone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "23/22",
        "factors": "23/2·11"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%2023-limit%20semitone",
      "sourceTextTarget": "Greater 23-limit semitone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/23/22",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Greater 23-limit semitone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "23/22",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 23/22."
    },
    {
      "id": "wormwoodma",
      "name": "Wormwoodma",
      "aliases": [],
      "ratio": "847/810",
      "cents": 77.3281,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "847/810",
        "factors": "7·11^2/2·3^4·5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Wormwoodma",
      "sourceTextTarget": "Wormwoodma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/847/810",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "laruru-6561-6272",
      "name": "Large deep red comma",
      "aliases": [],
      "ratio": "6561/6272",
      "cents": 77.9882,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "6561/6272",
        "factors": "3^8/2^7·7^2"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=6561%2F6272",
      "sourceTextTarget": "6561/6272",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=6561%2F6272",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-medium-comma",
      "nameLookupStatus": "candidate-conventional-name-found-outside-main-table",
      "nameLookupConfidence": "medium-low for recommendedName; high for colorName",
      "colorName": "Laruru",
      "otherNotationNames": [
        "Lrr-2"
      ],
      "nameLookupSources": [
        {
          "site": "Facebook - Xenharmonic/microtonal group post",
          "url": "https://www.facebook.com/groups/497105067092502/posts/2434340603368929/",
          "evidence": "Search result snippet states that 6561/6272 shall be known as the large deep red comma."
        },
        {
          "site": "Facebook - Large deep red comma temperament rankings",
          "url": "https://www.facebook.com/groups/497105067092502/posts/825877247548614/",
          "evidence": "Search result snippet states the same name large deep red comma for 6561/6272."
        },
        {
          "site": "Xenharmonic Wiki - Medium comma",
          "url": "https://en.xen.wiki/w/Medium_comma",
          "evidence": "7-limit commas table lists 6561/6272 with color name Laruru and code Lrr-2; the Name(s) column still shows the ratio, not large deep red comma."
        },
        {
          "site": "Tune.js Scale Archive",
          "url": "https://abbernie.github.io/tune/scales.html",
          "evidence": "Mentions 6561/6272 in scale descriptions, but not as an interval name."
        },
        {
          "site": "Dolmetsch Online",
          "url": "https://www.dolmetsch.com/musictheory27.htm",
          "evidence": "Mentions Aaron 2 scale as using 64/63 and 6561/6272, but not as an interval name."
        }
      ],
      "previousIndividualUrl": "https://en.xen.wiki/w/6561/6272",
      "invalidIndividualUrl": "https://en.xen.wiki/w/6561/6272",
      "individualUrlTargetText": "6561/6272",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "valentine-semitone",
      "name": "Valentine semitone",
      "aliases": [],
      "ratio": "68/65",
      "cents": 78.114,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "68/65",
        "factors": "2^2·17/5·13"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Valentine%20semitone",
      "sourceTextTarget": "Valentine semitone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/68/65",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "doublewide-comma",
      "name": "Doublewide comma",
      "aliases": [],
      "ratio": "390625/373248",
      "cents": 78.7797,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "390625/373248",
        "factors": "5^8/2^9·3^6"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Doublewide%20comma",
      "sourceTextTarget": "Doublewide comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Doublewide%20comma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-small-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/390625/373248",
      "invalidIndividualUrl": "https://en.xen.wiki/w/390625/373248",
      "individualUrlTargetText": "Doublewide comma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "sixty-seventh-harmonic",
      "name": "67th harmonic",
      "aliases": [],
      "ratio": "67/64",
      "cents": 79.307,
      "category": "harmonic",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "67/64",
        "factors": "67/2^6"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Sixty-seventh%20harmonic",
      "sourceTextTarget": "67th harmonic",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/67/64",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "67th harmonic",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "67/64",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 67/64."
    },
    {
      "id": "hard-semitone",
      "name": "Hard semitone",
      "aliases": [
        "Two-fifth tone small semitone"
      ],
      "ratio": "22/21",
      "cents": 80.537,
      "category": "semitone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "22/21",
        "factors": "2·11/3·7"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Hard%20semitone",
      "sourceTextTarget": "Hard semitone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/22/21",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Hard semitone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "22/21",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 22/21."
    },
    {
      "id": "double-minor-diesis",
      "name": "Double minor diesis",
      "aliases": [],
      "ratio": "16384/15625",
      "cents": 82.1177,
      "category": "diesis",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "minor-diesis",
        "power": 2,
        "baseRatio": "128/125",
        "baseName": "Minor diesis"
      },
      "display": {
        "ratio": "16384/15625",
        "power": "(128/125)^2",
        "factors": "2^14/5^6",
        "powerRatio": "(128/125)^2",
        "powerFactors": "(2^7/5^3)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Comma_(music)",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Comma_(music)#:~:text=Minor%20diesis",
      "sourceTextTarget": "Minor diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/128/125",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "minor-diesis",
      "derivedBaseUrl": "https://en.xen.wiki/w/128/125",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "double-lesser-41-limit-fifth-tone",
      "name": "Double lesser 41-limit fifth tone",
      "aliases": [],
      "ratio": "1764/1681",
      "cents": 83.437,
      "category": "fifth-tone",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "lesser-41-limit-fifth-tone",
        "power": 2,
        "baseRatio": "42/41",
        "baseName": "Lesser 41-limit fifth tone"
      },
      "display": {
        "ratio": "1764/1681",
        "power": "(42/41)^2",
        "factors": "2^2·3^2·7^2/41^2",
        "powerRatio": "(42/41)^2",
        "powerFactors": "(2·3·7/41)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Lesser%2041-limit%20fifth%20tone",
      "sourceTextTarget": "Lesser 41-limit fifth tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Lesser%2041-limit%20fifth%20tone",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "lesser-41-limit-fifth-tone",
      "derivedBaseUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Lesser%2041-limit%20fifth%20tone",
      "derivedBaseUrlKind": "source-page-text-fragment"
    },
    {
      "id": "ripple-comma",
      "name": "Ripple comma",
      "aliases": [],
      "ratio": "6561/6250",
      "cents": 84.0714,
      "category": "comma",
      "source": "xenharmonic-wiki-small-comma",
      "display": {
        "ratio": "6561/6250",
        "factors": "3^8/2·5^5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Small_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Small_comma#:~:text=Ripple%20comma",
      "sourceTextTarget": "Ripple comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/6561/6250",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "septimal-chromatic-semitone",
      "name": "Septimal chromatic semitone",
      "aliases": [
        "Minor semitone"
      ],
      "ratio": "21/20",
      "cents": 84.4672,
      "category": "semitone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "21/20",
        "factors": "3·7/2^2·5"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Septimal%20chromatic%20semitone",
      "sourceTextTarget": "Septimal chromatic semitone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/Septimal_chromatic_semitone",
      "individualUrlKind": "wikipedia-individual-article",
      "individualUrlSource": "wikipedia",
      "individualUrlTargetText": "Septimal chromatic semitone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "Septimal chromatic semitone",
      "individualUrlMatchStatus": "exact-individual-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Wikipedia has an individual article for Septimal chromatic semitone."
    },
    {
      "id": "double-greater-41-limit-fifth-tone",
      "name": "Double greater 41-limit fifth tone",
      "aliases": [],
      "ratio": "1681/1600",
      "cents": 85.4974,
      "category": "fifth-tone",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "greater-41-limit-fifth-tone",
        "power": 2,
        "baseRatio": "41/40",
        "baseName": "Greater 41-limit fifth tone"
      },
      "display": {
        "ratio": "1681/1600",
        "power": "(41/40)^2",
        "factors": "41^2/2^6·5^2",
        "powerRatio": "(41/40)^2",
        "powerFactors": "(41/2^3·5)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%2041-limit%20fifth%20tone",
      "sourceTextTarget": "Greater 41-limit fifth tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%2041-limit%20fifth%20tone",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "greater-41-limit-fifth-tone",
      "derivedBaseUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%2041-limit%20fifth%20tone",
      "derivedBaseUrlKind": "source-page-text-fragment"
    },
    {
      "id": "forty-one-thirty-nine",
      "name": "41/39 (missing?)",
      "aliases": [],
      "ratio": "41/39",
      "cents": 86.5797,
      "category": "higher-limit-medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "41/39",
        "factors": "41/3·13"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=41%2F39",
      "sourceTextTarget": "41/39",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/41/39",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page",
      "nameLookupStatus": "no-conventional-name-found",
      "nameLookupConfidence": "high for absence of conventional name in checked sources; high for colorName",
      "colorName": "Fowothu",
      "otherNotationNames": [
        "41o3u1",
        "FJS: A1^41_13"
      ],
      "nameLookupSources": [
        {
          "site": "Xenharmonic Wiki",
          "url": "https://en.xen.wiki/w/41/39",
          "evidence": "Ratio page explicitly says Name(s) missing and gives FJS name."
        },
        {
          "site": "Xenharmonic Wiki - Medium comma",
          "url": "https://en.xen.wiki/w/Medium_comma",
          "evidence": "Higher-limit commas table lists 41/39 with color name Fowothu and code 41o3u1."
        },
        {
          "site": "Kyle Gann - Anatomy of an Octave",
          "url": "https://www.kylegann.com/Octave.html",
          "evidence": "Lists 41/39 at 86.580 cents with no name in the name column."
        }
      ]
    },
    {
      "id": "double-tridecimal-minor-diesis",
      "name": "Double tridecimal minor diesis",
      "aliases": [],
      "ratio": "1600/1521",
      "cents": 87.6621,
      "category": "diesis",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "tridecimal-minor-diesis",
        "power": 2,
        "baseRatio": "40/39",
        "baseName": "Tridecimal minor diesis"
      },
      "display": {
        "ratio": "1600/1521",
        "power": "(40/39)^2",
        "factors": "2^6·5^2/3^2·13^2",
        "powerRatio": "(40/39)^2",
        "powerFactors": "(2^3·5/3·13)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Tridecimal%20minor%20diesis",
      "sourceTextTarget": "Tridecimal minor diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/40/39",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "tridecimal-minor-diesis",
      "derivedBaseUrl": "https://en.xen.wiki/w/40/39",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "quasisuper-comma",
      "name": "Quasisuper comma",
      "aliases": [],
      "ratio": "8388608/7971615",
      "cents": 88.2713,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "8388608/7971615",
        "factors": "2^23/3^13·5"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Quasisuper%20comma",
      "sourceTextTarget": "Quasisuper comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Quasisuper%20comma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-medium-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/8388608/7971615",
      "invalidIndividualUrl": "https://en.xen.wiki/w/8388608/7971615",
      "individualUrlTargetText": "Quasisuper comma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "novendecimal-augmented-unison",
      "name": "Novendecimal augmented unison",
      "aliases": [],
      "ratio": "20/19",
      "cents": 88.8007,
      "category": "semitone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "20/19",
        "factors": "2^2·5/19"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Novendecimal%20augmented%20unison",
      "sourceTextTarget": "Novendecimal augmented unison",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/20/19",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Novendecimal augmented unison",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "20/19",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 20/19."
    },
    {
      "id": "double-superior-quarter-tone",
      "name": "Double superior quarter-tone",
      "aliases": [],
      "ratio": "1521/1444",
      "cents": 89.9393,
      "category": "quarter-tone",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "superior-quarter-tone",
        "power": 2,
        "baseRatio": "39/38",
        "baseName": "Superior quarter-tone"
      },
      "display": {
        "ratio": "1521/1444",
        "power": "(39/38)^2",
        "factors": "3^2·13^2/2^2·19^2",
        "powerRatio": "(39/38)^2",
        "powerFactors": "(3·13/2·19)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Superior%20quarter-tone",
      "sourceTextTarget": "Superior quarter-tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Superior%20quarter-tone",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "superior-quarter-tone",
      "derivedBaseUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Superior%20quarter-tone",
      "derivedBaseUrlKind": "source-page-text-fragment"
    },
    {
      "id": "limma",
      "name": "Limma",
      "aliases": [
        "Pythagorean minor second"
      ],
      "ratio": "256/243",
      "cents": 90.225,
      "category": "limma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "256/243",
        "factors": "2^8/3^5"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Limma",
      "sourceTextTarget": "Limma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/256/243",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "major-chroma",
      "name": "Major chroma",
      "aliases": [
        "Major limma"
      ],
      "ratio": "135/128",
      "cents": 92.1787,
      "category": "chroma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "135/128",
        "factors": "3^3·5/2^7"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Major%20chroma",
      "sourceTextTarget": "Major chroma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/135/128",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "double-lesser-37-limit-quarter-tone",
      "name": "Double lesser 37-limit quarter tone",
      "aliases": [],
      "ratio": "1444/1369",
      "cents": 92.338,
      "category": "quarter-tone",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "lesser-37-limit-quarter-tone",
        "power": 2,
        "baseRatio": "38/37",
        "baseName": "Lesser 37-limit quarter tone"
      },
      "display": {
        "ratio": "1444/1369",
        "power": "(38/37)^2",
        "factors": "2^2·19^2/37^2",
        "powerRatio": "(38/37)^2",
        "powerFactors": "(2·19/37)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Lesser%2037-limit%20quarter%20tone",
      "sourceTextTarget": "Lesser 37-limit quarter tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Lesser%2037-limit%20quarter%20tone",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "lesser-37-limit-quarter-tone",
      "derivedBaseUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Lesser%2037-limit%20quarter%20tone",
      "derivedBaseUrlKind": "source-page-text-fragment"
    },
    {
      "id": "novendecimal-minor-second",
      "name": "Novendecimal minor second",
      "aliases": [],
      "ratio": "19/18",
      "cents": 93.603,
      "category": "semitone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "19/18",
        "factors": "19/2·3^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Novendecimal%20minor%20second",
      "sourceTextTarget": "Novendecimal minor second",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/19/18",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Novendecimal minor second",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "19/18",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 19/18."
    },
    {
      "id": "hogzilla-comma",
      "name": "Hogzilla comma",
      "aliases": [],
      "ratio": "4428675/4194304",
      "cents": 94.1324,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "4428675/4194304",
        "factors": "3^11·5^2/2^22"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Hogzilla%20comma",
      "sourceTextTarget": "Hogzilla comma",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=Hogzilla%20comma",
      "individualUrlKind": "source-page-text-fragment-fallback",
      "individualUrlSource": "xenharmonic-wiki-medium-comma",
      "previousIndividualUrl": "https://en.xen.wiki/w/4428675/4194304",
      "invalidIndividualUrl": "https://en.xen.wiki/w/4428675/4194304",
      "individualUrlTargetText": "Hogzilla comma",
      "individualUrlTargetKind": "name",
      "individualUrlManualCheck": {
        "result": "missing",
        "checkedBy": "user",
        "source": "xen_wiki_manual_check_urls.md numbered list",
        "action": "replace-individualUrl-with-recommendedUrl",
        "note": ""
      }
    },
    {
      "id": "double-greater-37-limit-quarter-tone",
      "name": "Double greater 37-limit quarter tone",
      "aliases": [],
      "ratio": "1369/1296",
      "cents": 94.8681,
      "category": "quarter-tone",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "greater-37-limit-quarter-tone",
        "power": 2,
        "baseRatio": "37/36",
        "baseName": "Greater 37-limit quarter tone"
      },
      "display": {
        "ratio": "1369/1296",
        "power": "(37/36)^2",
        "factors": "37^2/2^4·3^4",
        "powerRatio": "(37/36)^2",
        "powerFactors": "(37/2^2·3^2)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%2037-limit%20quarter%20tone",
      "sourceTextTarget": "Greater 37-limit quarter tone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%2037-limit%20quarter%20tone",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "greater-37-limit-quarter-tone",
      "derivedBaseUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Greater%2037-limit%20quarter%20tone",
      "derivedBaseUrlKind": "source-page-text-fragment"
    },
    {
      "id": "fifty-five-fifty-two",
      "name": "55/52 (missing?)",
      "aliases": [],
      "ratio": "55/52",
      "cents": 97.104,
      "category": "medium-comma",
      "source": "xenharmonic-wiki-medium-comma",
      "display": {
        "ratio": "55/52",
        "factors": "5·11/2^2·13"
      },
      "sourceUrl": "https://en.xen.wiki/w/Medium_comma",
      "sourceTextUrl": "https://en.xen.wiki/w/Medium_comma#:~:text=55%2F52",
      "sourceTextTarget": "55/52",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/55/52",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page",
      "nameLookupStatus": "no-conventional-name-found",
      "nameLookupConfidence": "high for absence of conventional name in checked sources; high for colorName",
      "colorName": "Thuloyo",
      "otherNotationNames": [
        "3u1oy1",
        "thuloyo unison",
        "FJS: A1^(5,11)_13"
      ],
      "nameLookupSources": [
        {
          "site": "Xenharmonic Wiki",
          "url": "https://en.xen.wiki/w/55/52",
          "evidence": "Ratio page explicitly says Name(s) missing, but gives color name 3u1oy1, thuloyo unison."
        },
        {
          "site": "Xenharmonic Wiki - Medium comma",
          "url": "https://en.xen.wiki/w/Medium_comma",
          "evidence": "13-limit commas table lists 55/52 with color name Thuloyo and ratio 55/52."
        },
        {
          "site": "Kyle Gann - Anatomy of an Octave",
          "url": "https://www.kylegann.com/Octave.html",
          "evidence": "Lists 55/52 at 97.104 cents with no name in the name column."
        },
        {
          "site": "Microtonal Theory - Maqam Tetrachords",
          "url": "https://www.microtonaltheory.com/microtonal-ethnography/maqam-tetrachords",
          "evidence": "Uses 55/52 as one step in a Çargah tetrachord, but does not name the interval itself."
        }
      ]
    },
    {
      "id": "undecimal-minor-second",
      "name": "Undecimal minor second",
      "aliases": [
        "121st subharmonic"
      ],
      "ratio": "128/121",
      "cents": 97.3641,
      "category": "semitone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "128/121",
        "factors": "2^7/11^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Undecimal%20minor%20second",
      "sourceTextTarget": "Undecimal minor second",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/128/121",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Undecimal minor second",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "128/121",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 128/121."
    },
    {
      "id": "double-septimal-diesis",
      "name": "Double septimal diesis",
      "aliases": [],
      "ratio": "1296/1225",
      "cents": 97.5408,
      "category": "diesis",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "septimal-diesis",
        "power": 2,
        "baseRatio": "36/35",
        "baseName": "Septimal diesis"
      },
      "display": {
        "ratio": "1296/1225",
        "power": "(36/35)^2",
        "factors": "2^4·3^4/5^2·7^2",
        "powerRatio": "(36/35)^2",
        "powerFactors": "(2^2·3^2/5·7)^2"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/Septimal_comma",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/Septimal_comma#:~:text=Septimal%20diesis",
      "sourceTextTarget": "Septimal diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/36/35",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "septimal-diesis",
      "derivedBaseUrl": "https://en.xen.wiki/w/36/35",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "double-maximal-diesis",
      "name": "Double maximal diesis",
      "aliases": [],
      "ratio": "62500/59049",
      "cents": 98.3323,
      "category": "diesis",
      "source": "derived",
      "derived": {
        "type": "power",
        "baseId": "maximal-diesis",
        "power": 2,
        "baseRatio": "250/243",
        "baseName": "Maximal diesis"
      },
      "display": {
        "ratio": "62500/59049",
        "power": "(250/243)^2",
        "factors": "2^2·5^6/3^10",
        "powerRatio": "(250/243)^2",
        "powerFactors": "(2·5^3/3^5)^2"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Maximal%20diesis",
      "sourceTextTarget": "Maximal diesis",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/250/243",
      "individualUrlKind": "derived-base-url",
      "individualUrlSource": "derived-base-interval",
      "individualUrlBaseId": "maximal-diesis",
      "derivedBaseUrl": "https://en.xen.wiki/w/250/243",
      "derivedBaseUrlKind": "xenharmonic-wiki-individual-ratio-page"
    },
    {
      "id": "gamelismic-minor-second",
      "name": "Gamelismic minor second",
      "aliases": [],
      "ratio": "343/324",
      "cents": 98.6577,
      "category": "comma",
      "source": "huygens-fokker-list-of-intervals",
      "display": {
        "ratio": "343/324",
        "factors": "7^3/2^2·3^4"
      },
      "sourceUrl": "https://www.huygens-fokker.org/docs/intervals.html",
      "sourceTextUrl": "https://www.huygens-fokker.org/docs/intervals.html#:~:text=Gamelismic%20minor%20second",
      "sourceTextTarget": "Gamelismic minor second",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/343/324",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "ratio-page"
    },
    {
      "id": "just-minor-semitone",
      "name": "Just minor semitone",
      "aliases": [
        "Arabic lute index finger"
      ],
      "ratio": "18/17",
      "cents": 98.9546,
      "category": "semitone",
      "source": "wikipedia-list-of-pitch-intervals",
      "display": {
        "ratio": "18/17",
        "factors": "2·3^2/17"
      },
      "sourceUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals",
      "sourceTextUrl": "https://en.wikipedia.org/wiki/List_of_pitch_intervals#:~:text=Just%20minor%20semitone",
      "sourceTextTarget": "Just minor semitone",
      "sourceTextTargetKind": "name",
      "individualUrl": "https://en.xen.wiki/w/18/17",
      "individualUrlKind": "xenharmonic-wiki-individual-ratio-page",
      "individualUrlSource": "xenharmonic-wiki",
      "individualUrlTargetText": "Just minor semitone",
      "individualUrlTargetKind": "name",
      "individualPageTitle": "18/17",
      "individualUrlMatchStatus": "exact-ratio-page",
      "individualUrlConfidence": "high",
      "individualUrlNotes": "Xenharmonic Wiki has an individual ratio page for 18/17."
    }
  ]
};
