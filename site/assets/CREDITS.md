# Asset credits

The school is built on the engine of Anna's House and Vesper Street and shares their sources. Everything
not listed here is drawn or built in code: the buildings, the masonry and slate (painted in materials.js),
the trees, the island, the sky.

- The buildings follow measured drawings: Old Snow Hall, University of Kansas (Haskell & Wood, 1886), from the
  University Archives' drawings; the Cambridge Public Library as first built (Van Brunt & Howe, 1887-89). The
  sources are kept in research/ on the build machine.
- three.js r170 (vendor/three), MIT licence.
- The coastline round Tokyo Bay on the Stair Hall's slime-mould light table (src/furnish/exhibits_snow_hall.js):
  Natural Earth, 1:10m land polygons (naturalearthdata.com), public domain; the model run on it is from
  A. Tero et al., Science 327 (2010), 439.
- Textures (assets/tex), all CC0: Poly Haven (polyhaven.com) `grey_roof_01`, `red_brick`,
  `brick_wall_001`, `red_brick_pavers`, `terracotta_floor_tiles`, `oak_wood_planks`,
  `wood_table_001`, `painted_plaster_wall`, `bark_brown_02` and the fabric, stone and ground sets
  described in assets/tex/TEXTURES.md; ambientCG (ambientcg.com) `WoodSiding013`, `Grass004`.
- Sound (assets/audio): the birds and the breeze are CC0 field recordings; sources are in
  assets/audio/manifest.json.
- Music (assets/audio), for the record player: public-domain and CC0 recordings of Satie, Bach, Chopin,
  Schumann, Mozart, Beethoven and an anonymous guitar romance, from Musopen, the Open Goldberg Variations and
  Open Well-Tempered Clavier projects (Kimiko Ishizaka) and performers' own releases, via Wikimedia Commons;
  performers, sources and licences are in assets/audio/manifest.json (the same recordings as the house and the town).
- Book titles for spines (assets/books.json): a list of real books compiled for the house.
- Typefaces (assets/fonts), SIL Open Font Licence 1.1 (assets/fonts/OFL.txt), Latin subsets as served by
  Google Fonts: Sorts Mill Goudy (Barry Schwartz), the page's face and the signs'; Caveat (Impallari Type),
  the chalk on the boards, with its Cyrillic subset (caveat-600-cyrillic.woff2: Caveat, copyright 2014 The Caveat
  Project Authors, SIL OFL 1.1, as served by Google Fonts) for the Russian board in Snow Hall's Room 202;
  Fraunces (Undercase Type), poster titles.
- Models (assets/models). A furnish file can place any of the house's or the town's collected models
  (catalogued in my_house/site/assets/models/CATALOG.md with each one's licence and source): copy the model's
  folder into assets/models/ and add a line for it here, as src/furnish/README.md describes.
  - `marble_bust_01`: white marble classical bust (a young man) on a socle. CC0 (Poly Haven),
    https://polyhaven.com/a/marble_bust_01.
  - `imac_g3_blueberry`, `imac_g3_tangerine`: the catalog terminals in the Hofstadter Library's Delivery Room. "iMac G3"
    by isabelle123, from Trimble 3D Warehouse
    (https://3dwarehouse.sketchup.com/model/78b88a1bb2a9faf1e4b68d3b17c43658/iMac-G3), used under the 3D Warehouse
    Terms of Use as one part of this larger work; the copy prepared for Anna's House (my_house assets/models/imac_g3),
    recoloured to blueberry and to tangerine and flattened to one mesh with vertex colours. The model is its author's;
    iMac is a trademark of Apple Inc., with which this laboratory has no connection.
  - `chess_set`: chess board with a full set of pieces. CC0 (Poly Haven), https://polyhaven.com/a/chess_set.
    The chess rules and the opponent's play (src/chess_rules.js) were written for Anna's House.
  - `st_coat_stand_2`: branching wooden coat stand (the common room, Snow Hall). CC0 (ShareTextures),
    https://www.sharetextures.com/models/equipments/coat-stand-2.
  - `painted_wooden_chair_01`: painted spindle-back kitchen chair (the Museum Café, Snow Hall: one instanced mesh,
    tinted five colours). CC0 (Poly Haven), https://polyhaven.com/a/painted_wooden_chair_01.
  - `painted_wooden_bench`: painted wooden settle (the long table in the Museum Café). CC0 (Poly Haven),
    https://polyhaven.com/a/painted_wooden_bench.
  - `st_stool_8_pine`: square pine stool (the counter of the Museum Café). CC0 (ShareTextures),
    https://www.sharetextures.com/models/furniture/stool-8.
  - `croissant`: a butter croissant, scanned (taken from the pastry case in the Museum Café). CC0 (Poly Haven),
    https://polyhaven.com/a/croissant.
  - `st_bankers_lamp`: banker's desk lamp, green glass shade, brass and black base (the mending bench in the
    Librarian's & Trustees' Room, the Hofstadter Library). CC0 (ShareTextures),
    https://www.sharetextures.com/models/furniture/desk-lamp-1.
  - `stationery_supplies`: pens, pencils, an eraser and a pen cup (the librarian's desk, the Hofstadter Library). CC0
    (Poly Haven), https://polyhaven.com/a/stationery_supplies.
  - `socrates_herm`: herm portrait of Socrates. 3D scan of the plaster cast KAS635 in the Royal Cast Collection,
    SMK – Statens Museum for Kunst, Copenhagen (cast of the marble herm in the Villa Albani, Rome, a Roman copy
    of a Hellenistic portrait). Public domain (Public Domain Mark 1.0), https://open.smk.dk/artwork/image/KAS635.
    Reduced to 40,000 triangles and enlarged to 2.5 ft.
  - `seated_philosopher`: seated philosopher, chin in hand, called Aristippos of Cyrene. 3D scan of the plaster
    cast KAS207, SMK – Statens Museum for Kunst (cast of the marble in the Galleria Spada, Rome, a Roman copy of
    a Greek statue of the 3rd century BC). Public domain (Public Domain Mark 1.0),
    https://open.smk.dk/artwork/image/KAS207. Reduced to 40,000 triangles; 5 ft tall.
  - `standing_philosopher`: standing old philosopher with a scroll, perhaps the Cynic Menippos of Gadara. 3D
    scan of the plaster cast KAS240, SMK – Statens Museum for Kunst (cast of the marble in the Musei Capitolini,
    Rome, a Roman copy of a Greek statue of the 3rd century BC). Public domain (Public Domain Mark 1.0),
    https://open.smk.dk/artwork/image/KAS240. Reduced to 40,000 triangles; 6.5 ft tall.
  - Exhibit models (`x_*`; sizes, triangle counts and the full table are in assets/models/CATALOG.md). Each was reduced,
    re-oriented and rescaled with Blender; scans from the Smithsonian keep a 512 px colour texture. The Smithsonian
    models are from its open-access 3D collection (CC0), checked against the Open Access API record of each object:
  - `x_aion`: Lion-headed winged god (“Aion”), Roman, 2nd century CE, marble; Musée du Louvre. Three D Scans (Oliver Laric), https://threedscans.com/uncategorized/aion/. No copyright restrictions (Three D Scans).
  - `x_archaeopteryx`: Archaeopteryx siemensii, slab (Late Jurassic, Solnhofen limestone, Bavaria). National Museum of Natural History, Smithsonian Institution, Paleobiology, USNM PAL 509743. https://3d.si.edu/object/3d/391660da-7c49-499c-91f5-88a298686c09. CC0 (Smithsonian Open Access).
  - `x_athena_hope`: Athena: plaster cast of the head of the Hope Athena. SMK, Royal Cast Collection, KAS275; https://open.smk.dk/artwork/image/KAS275 (file via Wikimedia Commons). Public domain (Public Domain Mark 1.0).
  - `x_blue_crab`: Blue crab, Callinectes sapidus (female). Smithsonian Environmental Research Center, record dpo_3d_200038. https://3d.si.edu/object/3d/b0bf6d44-af22-40dc-bd85-7d66255be4a7. CC0 (Smithsonian Open Access).
  - `x_brain`: Human brain (model). “Brain AS” by Agnieszka Starostecka, Wikimedia Commons, File:Brain AS.stl. CC BY 4.0 (credit: Agnieszka Starostecka; reduced and rescaled).
  - `x_brain_coral`: Symmetrical brain coral, Pseudodiploria strigosa (Dry Tortugas, Florida, 1932). National Museum of Natural History, Smithsonian Institution, Invertebrate Zoology, USNM 1137708. https://3d.si.edu/object/3d/73f73a61-1b87-4dfd-a031-619778b826c0. CC0 (Smithsonian Open Access).
  - `x_chrysippos`: Chrysippos: plaster cast of an ancient portrait. SMK, Royal Cast Collection, KAS602; https://open.smk.dk/artwork/image/KAS602 (file via Wikimedia Commons). Public domain (Public Domain Mark 1.0).
  - `x_circuit_board`: Circuit board (model). “Circuit Board” by Benny Weimer, https://polyhaven.com/a/circuit_board. CC0 (Poly Haven).
  - `x_compass`: Pocket compass, open (model). “Seadogs Compass” by Benny Weimer, https://polyhaven.com/a/seadogs_compass. CC0 (Poly Haven).
  - `x_conus_textile`: Textile cone, Conus textile (Indian Ocean). National Museum of Natural History, Smithsonian Institution, Invertebrate Zoology, USNM 1716380. https://3d.si.edu/object/3d/c29a9ede-c224-46c9-8791-69ff36c23828. CC0 (Smithsonian Open Access).
  - `x_cowbell`: Cowbell (percussion instrument), red, with handle. National Museum of American History, Smithsonian Institution, 2018.0174.01. https://3d.si.edu/object/3d/80c485f9-c7db-4d46-aa1c-a57565cd7baf. CC0 (Smithsonian Open Access).
  - `x_davenport_motor`: Davenport electric motor, model for US patent No. 132 (c. 1837). National Museum of American History, Smithsonian Institution, EM.252644. https://3d.si.edu/object/3d/a18922b9-a00f-4c9e-988a-f526382b15cc. CC0 (Smithsonian Open Access).
  - `x_diplocaulus`: Diplocaulus magnicornis, skull (Permian, Baylor County, Texas). National Museum of Natural History, Smithsonian Institution, Paleobiology, USNM PAL 617002. https://3d.si.edu/object/3d/23a3cd17-8526-4b30-80e7-fdae0ecdd36a. CC0 (Smithsonian Open Access).
  - `x_glycon`: Glykon, serpent god, marble, 2nd century; Museum of National History and Archaeology, Constanța. Three D Scans (Oliver Laric), https://threedscans.com/uncategorized/glycon/. No copyright restrictions (Three D Scans).
  - `x_homer`: Homer: plaster cast of an ancient portrait. SMK, Royal Cast Collection, KAS210; https://open.smk.dk/artwork/image/KAS210 (file via Wikimedia Commons). Public domain (Public Domain Mark 1.0).
  - `x_jewel_beetle`: Jewel beetle, Julodis sp. (Kenhardt, South Africa, 1986), pinned. National Museum of Natural History, Smithsonian Institution, Entomology, USNMENT02024000. https://3d.si.edu/object/3d/4cc2228f-6772-4878-971d-04e4893c94cd. CC0 (Smithsonian Open Access).
  - `x_junonia`: Junonia shell, Scaphella junonia. National Museum of Natural History, Smithsonian Institution, Invertebrate Zoology, USNM 877818. https://3d.si.edu/object/3d/a9e198ed-0a24-4b90-a5be-f4b00628ccff. CC0 (Smithsonian Open Access).
  - `x_klein_bottle`: Klein bottle (mathematical model). kelsorj, Thingiverse thing:5217; file from Wikimedia Commons, File:Klein Bottle.stl. CC0.
  - `x_lobster_claw`: American lobster, Homarus americanus: a claw. National Museum of Natural History, Smithsonian Institution, Invertebrate Zoology, record nmnhinvertebratezoology_256286. https://3d.si.edu/object/3d/77353e4a-0560-43da-a98f-68065f1ccdfc. CC0 (Smithsonian Open Access).
  - `x_longhorn_beetle`: Longhorn beetle, Psalidognathus superbus. National Museum of Natural History, Smithsonian Institution, Entomology, record nmnhentomology_17252917. https://3d.si.edu/object/3d/991f0339-b7bd-4fe1-8ab2-85cd5ae038fb. CC0 (Smithsonian Open Access).
  - `x_mammoth`: Woolly mammoth, Mammuthus primigenius: mounted skeleton (Alaska, Pleistocene). National Museum of Natural History, Smithsonian Institution, Paleobiology, USNM V 23792. https://3d.si.edu/object/3d/341c96cd-f967-4540-8ed1-d3fc56d31f12. CC0 (Smithsonian Open Access).
  - `x_megalodon_tooth`: Carcharocles megalodon, tooth (Miocene, Coffee County, Georgia). National Museum of Natural History, Smithsonian Institution, Paleobiology, USNM V 10333. https://3d.si.edu/object/3d/106e215b-a829-40c6-8e4d-dfba37350f36. CC0 (Smithsonian Open Access).
  - `x_melocactus`: Turk’s-cap cactus, Melocactus communis: herbarium specimen (Jamaica). National Museum of Natural History, Smithsonian Institution, Botany, US 3052392. https://3d.si.edu/object/3d/10cd6993-9f80-47ef-8305-2a8eb5b2365f. CC0 (Smithsonian Open Access).
  - `x_meteorite_block_island`: Block Island iron meteorite, as found on Mars by the rover Opportunity (2009). NASA / JPL-Caltech (Kris Capraro et al.), https://nasa3d.arc.nasa.gov/detail/block-island; file from Wikimedia Commons, File:Block Island meteorite 3D model.stl. Public domain (NASA).
  - `x_microscope`: Brass compound microscope (model, not a scan of a museum object). “Vintage Microscope” by Luis José Fernández Rodríguez, https://polyhaven.com/a/vintage_microscope. CC0 (Poly Haven).
  - `x_min_amethyst`: Amethyst: a crust of short violet points (a piece of a geode’s lining). A crystal-form MODEL built in Blender to the mineral’s real habit; NOT a scan of a specimen. Built for this project (scratchpad exhibit_tools/exhibit_crystals.py). Made for the project; no third-party rights.
  - `x_min_beryl`: Beryl (aquamarine): six-sided prisms with flat ends. A crystal-form MODEL built in Blender to the mineral’s real habit; NOT a scan of a specimen. Built for this project (scratchpad exhibit_tools/exhibit_crystals.py). Made for the project; no third-party rights.
  - `x_min_calcite`: Calcite: dogtooth scalenohedra on limestone, with a cleavage rhomb. A crystal-form MODEL built in Blender to the mineral’s real habit; NOT a scan of a specimen. Built for this project (scratchpad exhibit_tools/exhibit_crystals.py). Made for the project; no third-party rights.
  - `x_min_fluorite`: Fluorite: octahedra, green and violet. A crystal-form MODEL built in Blender to the mineral’s real habit; NOT a scan of a specimen. Built for this project (scratchpad exhibit_tools/exhibit_crystals.py). Made for the project; no third-party rights.
  - `x_min_galena`: Galena: lead-grey cubes, corners cut by the octahedron (metallic). A crystal-form MODEL built in Blender to the mineral’s real habit; NOT a scan of a specimen. Built for this project (scratchpad exhibit_tools/exhibit_crystals.py). Made for the project; no third-party rights.
  - `x_min_garnet`: Garnet: red rhombic dodecahedra in schist. A crystal-form MODEL built in Blender to the mineral’s real habit; NOT a scan of a specimen. Built for this project (scratchpad exhibit_tools/exhibit_crystals.py). Made for the project; no third-party rights.
  - `x_min_halite`: Rock salt (halite): intergrown cubes. A crystal-form MODEL built in Blender to the mineral’s real habit; NOT a scan of a specimen. Built for this project (scratchpad exhibit_tools/exhibit_crystals.py). Made for the project; no third-party rights.
  - `x_min_pyrite`: Pyrite: intergrown brassy cubes (metallic). A crystal-form MODEL built in Blender to the mineral’s real habit; NOT a scan of a specimen. Built for this project (scratchpad exhibit_tools/exhibit_crystals.py). Made for the project; no third-party rights.
  - `x_min_quartz`: Quartz: a group of six-sided prisms with pointed ends. A crystal-form MODEL built in Blender to the mineral’s real habit; NOT a scan of a specimen. Built for this project (scratchpad exhibit_tools/exhibit_crystals.py). Made for the project; no third-party rights.
  - `x_min_sulfur`: Sulfur: yellow bipyramids on a crust. A crystal-form MODEL built in Blender to the mineral’s real habit; NOT a scan of a specimen. Built for this project (scratchpad exhibit_tools/exhibit_crystals.py). Made for the project; no third-party rights.
  - `x_morse_key`: Morse-Vail telegraph key, Alfred Vail, 1844. National Museum of American History, Smithsonian Institution, EM.181411. https://3d.si.edu/object/3d/ed99f44d-3c60-4111-b666-e2908e1b64ef. CC0 (Smithsonian Open Access).
  - `x_neuron`: Retinal ganglion cell of a mouse, reconstructed by EyeWire players. EyeWire / Seung Lab, NIH 3D Print Exchange 3DPX-000142; file from Wikimedia Commons, File:Neuron mapped by gamers in EyeWire.stl. Public domain (as stated on Wikimedia Commons).
  - `x_orchid`: Orchid bloom, Lycaste virginalis. Smithsonian Gardens, accession 2018-1177A. https://3d.si.edu/object/3d/42e8e95f-1b67-4135-8728-cdc7aa277997. CC0 (Smithsonian Open Access).
  - `x_plato`: Plato: plaster cast of an ancient portrait head. SMK, National Gallery of Denmark, Royal Cast Collection, KAS2111; https://open.smk.dk/artwork/image/KAS2111 (file via Wikimedia Commons). Public domain (Public Domain Mark 1.0).
  - `x_pocket_watch`: Pocket watch (model). “Vintage Pocket Watch” by Tal Swicegood, https://polyhaven.com/a/vintage_pocket_watch. CC0 (Poly Haven).
  - `x_porcupinefish`: Porcupinefish, Diodon hystrix. National Museum of Natural History, Smithsonian Institution, Division of Fishes, USNM 195928. https://3d.si.edu/object/3d/e0bdb234-d604-41fd-8f47-27368159c476. CC0 (Smithsonian Open Access).
  - `x_rubber_duck`: Rubber duck (model). “Rubber Duck Toy” by Plat251, https://polyhaven.com/a/rubber_duck_toy. CC0 (Poly Haven).
  - `x_sphinx_four_headed`: Four-headed sphinx, Roman, 2nd century CE; Kunsthistorisches Museum, Vienna (on its mount). Three D Scans (Oliver Laric), https://threedscans.com/kunsthistorisches-museum-wien/four-headed-sphinx/. No copyright restrictions (Three D Scans).
  - `x_spondylus`: Regal thorny oyster, Spondylus regius (Palawan, Philippines). National Museum of Natural History, Smithsonian Institution, Invertebrate Zoology, USNM 1500966. https://3d.si.edu/object/3d/fa18b8b6-b717-410b-babe-1e892cf25735. CC0 (Smithsonian Open Access).
  - `x_starfish`: Blue sea star, Linckia laevigata (Asan Reef, Guam, 1974). National Museum of Natural History, Smithsonian Institution, Invertebrate Zoology, USNM E15868. https://3d.si.edu/object/3d/aff2c3e5-e909-4c18-87ce-8390bac19186. CC0 (Smithsonian Open Access).
  - `x_stegosaurus_spike`: Stegosaurus stenops, tail spike (Late Jurassic, Albany County, Wyoming). National Museum of Natural History, Smithsonian Institution, Paleobiology, USNM V 6531. https://3d.si.edu/object/3d/68adcbc1-84bc-4e3c-9f85-a08c81a5a820. CC0 (Smithsonian Open Access).
  - `x_stereoscope`: Stereoscope, A. Mattey, Paris, 1905-1920. National Museum of African American History and Culture, Smithsonian Institution (gift of Alan Laird), 2017.111.16. https://3d.si.edu/object/3d/0f4ebbe5-7f32-4792-933c-296f328df4c5. CC0 (Smithsonian Open Access).
  - `x_trefoil_knot`: Trefoil knot (mathematical model). Jim.belk and MichaelFrey, Wikimedia Commons, File:Trefoil Knot.stl. Public domain.
  - `x_triceratops`: Triceratops horridus, “Hatcher”: mounted skeleton (Niobrara County, Wyoming; Late Cretaceous). National Museum of Natural History, Smithsonian Institution, Paleobiology, USNM PAL 500000. https://3d.si.edu/object/3d/d8c623be-4ebc-11ea-b77f-2e728ce88125. CC0 (Smithsonian Open Access).
  - `x_trilobite_psychopyge`: Trilobite Psychopyge elegans in matrix (Devonian, Tinghir Province, Morocco). National Museum of Natural History, Smithsonian Institution, Paleobiology, USNM PAL 794205. https://3d.si.edu/object/3d/e4518faa-9603-4e1b-8375-e62d1fda079b. CC0 (Smithsonian Open Access).
  - `x_voyager`: Voyager spacecraft (model). NASA 3D Resources, https://github.com/nasa/NASA-3D-Resources (Voyager Probe (A)). Public domain (NASA).
- Pictures for framing (assets/art; sources and licences also in assets/art/manifest.json; made with tools/art.py):
  - `stone_habs_sheet3`: Adams Stone Library, east and north elevations. Historic American Buildings Survey,
    survey MA-841, sheet 3 of 7, drawn by Frederic C. Detwiller; Library of Congress, Prints and Photographs
    Division, https://www.loc.gov/item/ma0435/. Public domain (a work of the U.S. Government).
  - `stone_habs_sheet5`: Adams Stone Library, sections A-A and B-B. Historic American Buildings Survey, survey
    MA-841, sheet 5 of 7, drawn by Frederic C. Detwiller; Library of Congress, Prints and Photographs Division,
    https://www.loc.gov/item/ma0435/. Public domain (a work of the U.S. Government).
  - `stone_death_of_socrates`: The Death of Socrates, Jacques-Louis David, 1787 (oil on canvas, 51 x 77 1/4 in.).
    The Metropolitan Museum of Art, New York, accession 31.45, Catharine Lorillard Wolfe Collection, Wolfe Fund,
    1931; Met Open Access, https://www.metmuseum.org/art/collection/search/436105 (the photograph trimmed to the
    canvas). Public domain (Met Open Access, CC0).
  - `stone_habs_sheet2`, `stone_habs_sheet6`, `stone_habs_sheet7`: Adams Stone Library, floor and balcony plans (sheet 2),
    ladder, balcony handrail and weathervane details (sheet 6), French door, framing, mantel and tile floor details
    (sheet 7). Historic American Buildings Survey, survey MA-841, sheets 2, 6 and 7 of 7, drawn by Frederic C.
    Detwiller; Library of Congress, Prints and Photographs Division, https://www.loc.gov/item/ma0435/. Public domain
    (a work of the U.S. Government).
  - `stone_saenredam_cave`: Plato's Cave (Antrum Platonicum), Jan Saenredam after Cornelis van Haarlem, engraving,
    1604, published by Hendrik Hondius I. National Gallery of Art, Washington, 1983.61.1, NGA Open Access,
    https://www.nga.gov/artworks/62542-platos-cave (image via the NGA's IIIF service). Public domain (CC0).
  - `snow_rear_elevation`, `snow_west_elevation`, `snow_east_elevation`: Old Snow Hall, the other three elevations;
    the same source and rights as the two below.
  - `snow_front_elevation`, `snow_long_section`: Old Snow Hall, front elevation and longitudinal section of the
    Natural History Building. Haskell & Wood, architects; blueprints, undated (the building opened in 1886);
    University Archives, Kenneth Spencer Research Library, University of Kansas, Architectural drawings of Snow
    Hall (ku-uarecords:860), https://digital.lib.ku.edu/ku-uarecords/860. Believed public domain in the United
    States by age; the library's own rights statement is Copyright Not Evaluated.
  - `cpl_plan_1887`, `cpl_exterior_1889`, `cpl_reading_room_1889`: the Cambridge Public Library: the original
    floor plan (Van Brunt & Howe, first published in the Cambridge Chronicle, 1887), the building in 1889 and its
    Reading Room in 1889 (photographers not recorded); all as reproduced in Ann Beha Architects, Existing
    Conditions Report and Preservation Recommendations, Main Library Expansion Project, Cambridge, Massachusetts
    (2003), pp. 5-7. Public domain in the United States by age.
  - `cpl_delivery_room_1889`, `cpl_cambridge_room_1889`, `cpl_memorial_hall_1870`, `cpl_dedham_1886`,
    `cpl_gore_hall_1876`: photographs of the Cambridge Public Library's Delivery Room and Cambridge Room (1889),
    Memorial Hall at Harvard (1870), the Dedham Public Library (1886) and Gore Hall with its book stack (1876),
    photographers not recorded; as reproduced in Ann Beha Architects, Existing Conditions Report and Preservation
    Recommendations (2003), pp. 4 and 7. Public domain in the United States by age.
  - Historic posters, plates, charts and maps for the walls (assets/art/p_*; catalogued for furnishers in
    assets/art/CATALOG.md):
  - `p_wpa_march_read`: In March read the books you've always meant to read. Illinois WPA Art Project, Chicago, for
    the Statewide Library Project, between 1936 and 1941 (silkscreen poster); Library of Congress, Prints and
    Photographs Division, WPA Poster Collection, POS - WPA - ILL .01 .I5531, no. 1,
    https://www.loc.gov/pictures/item/98507722/ (the film-copy border trimmed). No known restrictions on publication
    (Library of Congress rights statement; a work made for the U.S. Works Progress Administration).
  - `p_wpa_september_books`: September: back to work, back to school, back to books. Illinois WPA Art Project,
    Chicago, 1940 (silkscreen poster); Library of Congress, Prints and Photographs Division, WPA Poster Collection,
    POS - WPA - ILL .D63, no. 2, https://www.loc.gov/pictures/item/98509757/ (the film-copy border trimmed). No
    known restrictions on publication (Library of Congress rights statement; a work made for the U.S. Works Progress
    Administration).
  - `p_wpa_january_reading`: January: a year of good reading ahead. Illinois WPA Art Project, Chicago, for the
    Statewide WPA Library Project, between 1936 and 1941 (silkscreen poster); Library of Congress, Prints and
    Photographs Division, WPA Poster Collection, POS - WPA - ILL .H385, no. 2,
    https://www.loc.gov/pictures/item/98510133/ (the film-copy border trimmed). No known restrictions on publication
    (Library of Congress rights statement; a work made for the U.S. Works Progress Administration).
  - `p_wpa_october_read`: October's "bright blue weather": a good time to read. Albert M. Bender for the Illinois
    WPA Art Project, Chicago, between 1936 and 1940 (silkscreen poster); Library of Congress, Prints and Photographs
    Division, WPA Poster Collection, POS - WPA - ILL .B46, no. 5, https://www.loc.gov/pictures/item/98509532/ (the
    film-copy border trimmed). No known restrictions on publication (Library of Congress rights statement; a work
    made for the U.S. Works Progress Administration).
  - `p_wpa_knowledge_library`: For greater knowledge on more subjects, use your library often. Illinois WPA Art
    Project, Chicago, 1940 (silkscreen poster, after Rodin's Thinker); Library of Congress, Prints and Photographs
    Division, WPA Poster Collection, POS - WPA - ILL .D63, no. 1, https://www.loc.gov/pictures/item/98509756/ (the
    film-copy border trimmed). No known restrictions on publication (Library of Congress rights statement; a work
    made for the U.S. Works Progress Administration).
  - `p_wpa_ignorant_subjects`: We are all ignorant on some subjects: what is yours. Fred Rentschler for the Federal
    Art Project, WPA, Ohio, 1938 (silkscreen poster for the Federal adult schools); Library of Congress, Prints and
    Photographs Division, WPA Poster Collection, POS - WPA - OH .R458, no. 4,
    https://www.loc.gov/pictures/item/98517063/ (the film-copy border trimmed). No known restrictions on publication
    (Library of Congress rights statement; a work made for the U.S. Works Progress Administration).
  - `p_wpa_library_parkway`: Young and old: visit the library on the Parkway. Nathan Sherman for the Federal Art
    Project, WPA, Pennsylvania, 1936 or 1937 (silkscreen poster for the Free Library of Philadelphia); Library of
    Congress, Prints and Photographs Division, WPA Poster Collection, POS - WPA - PA .S56, no. 3,
    https://www.loc.gov/pictures/item/98518436/ (the film-copy border trimmed). No known restrictions on publication
    (Library of Congress rights statement; a work made for the U.S. Works Progress Administration).
  - `p_wpa_keeping_up_science`: Keeping up with science. Shari Weisberg for the Federal Art Project, WPA, Illinois,
    between 1936 and 1939 (silkscreen poster); Library of Congress, Prints and Photographs Division, WPA Poster
    Collection, POS - WPA - ILL .W43, no. 2, https://www.loc.gov/pictures/item/98518267/ (the film-copy border
    trimmed). No known restrictions on publication (Library of Congress rights statement; a work made for the U.S.
    Works Progress Administration).
  - `p_cheret_librairie_sagot`: Librairie Ed. Sagot: Affiches, Estampes. Jules Chéret, 1891 (colour lithograph
    poster for Edmond Sagot's book and print shop, Paris); The Cleveland Museum of Art, accession 1976.1072,
    https://clevelandart.org/art/1976.1072. CC0 1.0 (Cleveland Museum of Art Open Access).
  - `p_solis_seven_liberal_arts`: The Seven Liberal Arts. Virgil Solis, between 1530 and 1562 (engraving); The
    Cleveland Museum of Art, accession 1924.680, https://clevelandart.org/art/1924.680. CC0 1.0 (Cleveland Museum of
    Art Open Access).
  - `p_haeckel_orchids`: Orchidae (orchids), plate 74 of Kunstformen der Natur. Ernst Haeckel, lithographed by Adolf
    Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904), plate 74; scan via
    Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Haeckel_Orchidae.jpg. Public domain (by age; a
    faithful reproduction of a two-dimensional work).
  - `p_haeckel_hummingbirds`: Trochilidae (hummingbirds), plate 99 of Kunstformen der Natur. Ernst Haeckel,
    lithographed by Adolf Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904),
    plate 99; scan via Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Haeckel_Trochilidae.jpg. Public
    domain (by age; a faithful reproduction of a two-dimensional work).
  - `p_haeckel_jellyfish`: Discomedusae (jellyfish), plate 8 of Kunstformen der Natur. Ernst Haeckel, lithographed
    by Adolf Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904), plate 8; scan
    via Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Haeckel_Discomedusae_8.jpg. Public domain (by
    age; a faithful reproduction of a two-dimensional work).
  - `p_kohler_coffee`: Coffea arabica (coffee), from Köhler's Medizinal-Pflanzen. Köhler's Medizinal-Pflanzen in
    naturgetreuen Abbildungen (Gera-Untermhaus: Fr. Eugen Köhler, 1887-98), chromolithograph; scan by Kurt Stüber,
    Max-Planck-Institut für Züchtungsforschung, via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Coffea_arabica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-189.jpg.
    Public domain (by age; a faithful reproduction of a two-dimensional work).
  - `p_kohler_poppy`: Papaver somniferum (opium poppy), plate 37 of Köhler's Medizinal-Pflanzen. Köhler's
    Medizinal-Pflanzen in naturgetreuen Abbildungen (Gera-Untermhaus: Fr. Eugen Köhler, 1887), plate 37;
    Biodiversity Heritage Library, https://www.biodiversitylibrary.org/pageimage/303636 (via Wikimedia Commons).
    Public domain (by age; Biodiversity Heritage Library scan).
  - `p_redoute_lily`: Lilium pomponium (turban lily), plate 7 of Les Liliacées. Pierre-Joseph Redouté, engraved by
    De Gouy; Les Liliacées (Paris, 1802-16), stipple engraving printed in colour and finished by hand; The Cleveland
    Museum of Art, accession 2020.164, https://clevelandart.org/art/2020.164. CC0 1.0 (Cleveland Museum of Art Open
    Access).
  - `p_redoute_rose`: Rosa indica vulgaris (China or Bengal rose), from Les Roses. Pierre-Joseph Redouté, engraved
    by Bessin; Les Roses (Paris, 1817-24), stipple engraving printed in colour and finished by hand; The Cleveland
    Museum of Art, accession 1943.138, https://clevelandart.org/art/1943.138. CC0 1.0 (Cleveland Museum of Art Open
    Access).
  - `p_curtis_cape_lily`: White Cape-coast lily, from Curtis's Botanical Magazine. Sydenham Edwards for The
    Botanical Magazine, or Flower-Garden Displayed (London, 1806), hand-coloured engraving (a fold-out plate); The
    Cleveland Museum of Art, accession 1955.142, https://clevelandart.org/art/1955.142. CC0 1.0 (Cleveland Museum of
    Art Open Access).
  - `p_audubon_flamingo`: American Flamingo, plate 431 of The Birds of America. John James Audubon, engraved and
    coloured by Robert Havell, London, 1838 (The Birds of America, double elephant folio); copy of the University of
    Pittsburgh Library System, via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:431_American_Flamingo.jpg. Public domain (by age; a faithful
    reproduction of a two-dimensional work).
  - `p_mendeleev_1869`: An attempt at a system of the elements (Opyt sistemy elementov), 1869. D. I. Mendeleev,
    single printed sheet, St Petersburg, 17 February (1 March) 1869: the first periodic table; reproduction via
    Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Periyodik_Tablo_1_Mart_1869.jpg. Public domain (by
    age; a faithful reproduction of a two-dimensional work).
  - `p_spectra_stars`: Spectra of the Sun and stars. Colour process print, London: Cassell & Company, late 19th
    century (plate XIII); Wellcome Collection, London, no. 47496i, https://wellcomecollection.org/works/sp3v2s2s.
    Public domain (Public Domain Mark; Wellcome Collection).
  - `p_spectra_flames`: Spectra of various substances. R. H. Digeon, colour print, Paris, c. 1868 (plate IV of Les
    phénomènes de la physique); Wellcome Collection, London, no. 47054i,
    https://wellcomecollection.org/works/g62v5g5r. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_optics_reflection`: Optics: reflection and inflection of light. J. Pass, engraving coloured by hand, London,
    1819 (plate I of an encyclopaedia's article on Optics); Wellcome Collection, London, no. 47045i,
    https://wellcomecollection.org/works/tbj3bxbu. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_optics_allegory`: Optics: an eye in a star of the colours. J. Chapman after A. D. Macquin, engraving coloured
    by hand, London: G. Jones, January 1820 (the allegorical plate to an encyclopaedia's article on Optics);
    Wellcome Collection, London, no. 25681i, https://wellcomecollection.org/works/c8ws28pa. Public domain (Public
    Domain Mark; Wellcome Collection).
  - `p_theory_of_seasons`: The Theory of the Seasons and Signs of the Zodiac. John Emslie, engraving coloured by
    hand, London: James Reynolds, 174 Strand, 1851; Wellcome Collection, London, no. 46553i,
    https://wellcomecollection.org/works/cuq9r6wn. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_earth_annual_revolution`: The Earth's Annual Revolution round the Sun. John Emslie, engraving coloured by
    hand, London: James Reynolds, 174 Strand, 1851; Wellcome Collection, London, no. 46552i,
    https://wellcomecollection.org/works/yg3zd78u. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_plan_solar_system`: A Plan of the Solar System, exhibiting its relative magnitudes and distances. Engraved by
    Seale, London, 18th century; Wellcome Collection, London, no. 46217i,
    https://wellcomecollection.org/works/kgm2vwt2. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_cellarius_copernican`: Planisphaerium Copernicanum: the system of the world after Copernicus. From Andreas
    Cellarius, Harmonia Macrocosmica (Amsterdam: Johannes Janssonius, 1660), engraving; Rijksmuseum, Amsterdam,
    RP-P-AO-29-1-6, http://hdl.handle.net/10934/RM0001.COLLECT.702215 (via Wikimedia Commons). CC0 1.0 (Rijksmuseum
    open data).
  - `p_trouvelot_saturn`: The Planet Saturn, 1874. Étienne Léopold Trouvelot, chromolithograph, from The Trouvelot
    Astronomical Drawings (New York: Charles Scribner's Sons, 1881-82); The New York Public Library, Rare Book
    Division, digital id TROUVELOT_010 (via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Trouvelot_-_The_planet_Saturn_-_1874.jpg). Public domain (by age; The
    New York Public Library marks it free to use without restriction).
  - `p_chymie_table_des_rapports`: Chymie: Laboratoire et Table des Rapports. Engraved by Robert Bénard for the
    Encyclopédie of Diderot and d'Alembert, Recueil de planches (Paris, 1763); Wellcome Collection, London, no.
    47851i, https://wellcomecollection.org/works/qs8kztwu. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_byrne_euclid_pythagoras`: Euclid, Book I, Proposition 47 (the theorem of Pythagoras), in Byrne's colours.
    Oliver Byrne, The First Six Books of the Elements of Euclid, in which coloured diagrams and symbols are used
    instead of letters (London: William Pickering, 1847), the two pages of I.47 set side by side; scan by Mirko
    Junge via Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Byrne_1847_Pythagoras_Querformat.jpg.
    Public domain (by age; a faithful reproduction of a two-dimensional work).
  - `p_lovelace_note_g`: Diagram for the computation by the Engine of the Numbers of Bernoulli. Ada Lovelace, Note G
    to her translation of L. F. Menabrea, Sketch of the Analytical Engine invented by Charles Babbage, in Taylor's
    Scientific Memoirs, vol. 3 (London, 1843), folding table; photograph via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Diagram_for_the_computation_of_Bernoulli_numbers.jpg. Public domain (by
    age; a faithful reproduction of a two-dimensional work).
  - `p_babbage_analytical_engine_plan`: The General Plan of Mr. Babbage's Great Calculating Engine (Plan 25, 6
    August 1840). Charles Babbage, plan of the Analytical Engine, 6 August 1840 (a lithographed copy, shown at the
    Computer History Museum); photograph by ArnoldReinhold, Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Babbage_Analytical_Engine_Plan_1840_CHM.agr.jpg (trimmed). CC BY 4.0
    (photograph (c) ArnoldReinhold, https://creativecommons.org/licenses/by/4.0/; the plan itself is in the public
    domain).
  - `p_jacquard_loom`: Smith Brothers' patent Jacquard loom. Engraving, c. 1862 (lettered: Smith Brothers patent
    Jacquard loom, obtained the prize medal 1862); Wellcome Collection, London, no. 43865i,
    https://wellcomecollection.org/works/rrqs9wgs. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_pascal_machine_arithmetique`: Machine arithmétique de Pascal. Engraved by Robert Bénard for the Encyclopédie
    of Diderot and d'Alembert, Recueil de planches: Mathématiques, Algèbre, plate 2 (Paris, 1767); Wellcome
    Collection, London, no. 47855i, https://wellcomecollection.org/works/g3kp5a89. Public domain (Public Domain
    Mark; Wellcome Collection).
  - `p_hollerith_tabulator_1890`: The Hollerith electric tabulating machine at the 1890 United States census.
    Scientific American, 30 August 1890 (wood engraving, artist not credited); scan via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:1890_Census_Hollerith_Electrical_Counting_Machines_Sci_Amer.jpg.
    Public domain (published in the United States in 1890).
  - `p_principia_54_43`: Proposition *54.43 of Principia Mathematica, on the way to 1 + 1 = 2. A. N. Whitehead and
    B. Russell, Principia Mathematica, vol. 1 (Cambridge University Press, 1910); scan from the University of
    Michigan Historical Math Collection, via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Principia_Mathematica_54-43.png. Public domain in the United States
    (published 1910).
  - `p_leibniz_binary_1703`: Table des nombres, from G. W. Leibniz, Explication de l'arithmétique binaire, Mémoires
    de l'Académie royale des sciences (Paris, 1703), p. 86; scan via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Leibniz_binary_system_1703.png. Public domain (Public Domain Mark 1.0;
    the author died in 1716).
  - `p_durer_melencolia`: Melencolia I. Albrecht Dürer, 1514 (engraving); The Cleveland Museum of Art, accession
    1926.211, https://clevelandart.org/art/1926.211. CC0 1.0 (Cleveland Museum of Art Open Access).
  - `p_cajal_retina`: The retina of vertebrates: cells stained by the Golgi method (plate III). Santiago Ramón y
    Cajal, Die Retina der Wirbelthiere, translated and arranged by Richard Greeff (Wiesbaden: J. F. Bergmann, 1894),
    plate III; Wellcome Collection, London, https://wellcomecollection.org/works/jubhkcy7. Public domain (Public
    Domain Mark; Wellcome Collection).
  - `p_cajal_nerve_cells`: Nerve cells and their fibres, drawn in ink. Santiago Ramón y Cajal, ink drawing, c. 1900
    (Instituto Cajal, Madrid; the museum stamp shows at the right); reproduction via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Santiago_Ramon_y_Cajal_nerve_cells_in_the_brain.jpg. Public domain (the
    artist died in 1934); the reproduction's own source is a newspaper feature.
  - `p_vesalius_brain`: The base of the brain, from De humani corporis fabrica. Andreas Vesalius, De humani corporis
    fabrica (Basel: Johannes Oporinus, 1543), Book VII, woodcut; copy of the Universitätsbibliothek Basel, e-rara,
    https://www.e-rara.ch/bau_1/content/zoom/6299471 (via Wikimedia Commons). Public domain (by age; a faithful
    reproduction of a two-dimensional work).
  - `p_vesalius_title_page`: Vesalius teaching at a public dissection: title page of the Fabrica. Andreas Vesalius,
    De humani corporis fabrica (Basel: Johannes Oporinus, June 1543), woodcut title page; Wellcome Collection,
    London, no. 24285i, https://wellcomecollection.org/works/f3ucftum. Public domain (Public Domain Mark; Wellcome
    Collection).
  - `p_phrenology_symbolical_head`: Symbolical Head and Phrenological Chart, by Drs Gall and Spurzheim. Wood
    engraving with letterpress, c. 1845, after O. S. Fowler (?); Wellcome Collection, London, no. 27755i,
    https://wellcomecollection.org/works/e8yefcpj. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_descartes_lhomme`: How seeing guides the hand: a figure from L'Homme de René Descartes. L'Homme de René
    Descartes (Paris, 1664), woodcut figure of the eyes, the pineal gland and the pointing arm, with its text;
    Bibliothèque nationale de France (Gallica), via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Figure_33_de_L%27Homme.jpg. Public domain (by age; a faithful
    reproduction of a two-dimensional work).
  - `p_istomin_primer_az`: The letter A (Az), from Karion Istomin's illustrated primer. Karion Istomin, Bukvar'
    (Primer), engraved throughout by Leonty Bunin, Moscow, 1694; reproduction via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Karion_Istomin%27s_alphabet_A.jpg. Public domain (by age; a faithful
    reproduction of a two-dimensional work).
  - `p_lubok_birds_of_paradise`: Birds of Paradise and the Lyre-tailed Menura (Raiskiya ptitsy; Lirokhvosty menyur):
    a Russian popular print. Lubok (popular print, lithographed and coloured by hand), lithography of I. Golyshev,
    Golyshevka, Russia, 1870s (dated 1879 on its file page); reproduced from Lubok (Leningrad: Aurora, 1984), via
    Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Birds_of_Paradise_Russian_copperplate.jpg. Public
    domain (by age; a faithful reproduction of a two-dimensional work).
  - `p_cary_russian_empire_1799`: A New Map of the Russian Empire, Divided into its Governments. John Cary, London,
    1799 (two sheets, engraved and coloured in outline, from Cary's New Universal Atlas); image from Geographicus
    Rare Antique Maps via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:1799_Cary_Map_of_the_Russian_Empire_-_Geographicus_-_Russia-cary-1799.jpg.
    Public domain (by age; a faithful reproduction of a two-dimensional work).
  - `p_shepherd_growth_of_russia`: The Growth of Russia in Europe, 1300-1796. William R. Shepherd, Historical Atlas
    (New York: Henry Holt, 1911), pp. 138-139; scan from the Perry-Castañeda Library Map Collection, University of
    Texas at Austin, https://maps.lib.utexas.edu/maps/historical/shepherd_1911/shepherd-c-138-139.jpg. Public domain
    (published in the United States in 1911).
  - `p_schleicher_language_tree`: The family tree of the Indo-European languages. August Schleicher, Compendium der
    vergleichenden Grammatik der indogermanischen Sprachen (Weimar: Hermann Böhlau, 1861); scan from the Internet
    Archive via Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Schleicher_Tree.jpg. Public domain (by
    age; a faithful reproduction of a two-dimensional work).
  - `p_encyclopedie_alphabets`: Alphabets anciens et modernes: Grantha and Old Persian. Encyclopédie of Diderot and
    d'Alembert, Recueil de planches, vol. 2 (Paris, 1763), Caractères et Alphabets; Bibliothèque nationale de France
    (Gallica), via Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Encyclopedie_volume_2-183.png. Public
    domain (by age; a faithful reproduction of a two-dimensional work).
  - `p_virgil_aeneid_1502`: Aeneid, Book VIII: a page of the Strasbourg Virgil of 1502. Publii Virgilii Maronis
    Opera, edited by Sebastian Brant (Strasbourg: Johann Grüninger, 1502), woodcut and text with commentary; via
    Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Opera_Book_8_woodcut_1502.jpg. Public domain (by age;
    a faithful reproduction of a two-dimensional work).
  - `p_wettinger_gradual_leaf`: Leaf from the Wettinger Gradual: initial I with scenes from the life of St
    Augustine. Second Master of the Wettinger Gradual (German), c. 1330; ink, tempera and gold on parchment; The
    Cleveland Museum of Art, accession 1949.203, https://clevelandart.org/art/1949.203. CC0 1.0 (Cleveland Museum of
    Art Open Access).
  - `p_shepherd_expansion_of_rome`: Territorial Expansion of Rome. William R. Shepherd, Historical Atlas (New York:
    Henry Holt, 1911), pp. 34-35; scan from the Perry-Castañeda Library Map Collection, University of Texas at
    Austin, https://maps.lib.utexas.edu/maps/historical/shepherd_1911/shepherd-c-034-035.jpg. Public domain
    (published in the United States in 1911).
  - `p_raphael_school_of_athens`: The School of Athens. Raphael, fresco, 1509-11, Stanza della Segnatura, Vatican
    Palace; photograph assembled from vatican.va, via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg. Public
    domain (by age; a faithful reproduction of a two-dimensional work).
  - `p_shepherd_plans_rome_athens`: Plans of Imperial Rome, Republican Rome, Athens and the Acropolis. William R.
    Shepherd, Historical Atlas (New York: Henry Holt, 1911), pp. 22-23; scan from the Perry-Castañeda Library Map
    Collection, University of Texas at Austin,
    https://maps.lib.utexas.edu/maps/historical/shepherd_1911/shepherd-c-022-023.jpg. Public domain (published in
    the United States in 1911).
  - `p_shepherd_ancient_greece`: Reference Map of Ancient Greece: Southern Part. William R. Shepherd, Historical
    Atlas (New York: Henry Holt, 1911), pp. 14-15; scan from the Perry-Castañeda Library Map Collection, University
    of Texas at Austin, https://maps.lib.utexas.edu/maps/historical/shepherd_1911/shepherd-c-014-015.jpg. Public
    domain (published in the United States in 1911).
  - `p_attic_amphora`: Attic black-figure amphora: Dionysos among satyrs. The Bateman Group, attributed to the
    Lysippides Painter, Athens, c. 530-520 BC; ceramic, 49.5 cm high (museum photograph); The Cleveland Museum of
    Art, accession 1927.433, https://clevelandart.org/art/1927.433. CC0 1.0 (Cleveland Museum of Art Open Access).
  - `p_piranesi_pantheon`: Veduta del Pantheon d'Agrippa, from the Vedute di Roma. Giovanni Battista Piranesi, 1761
    (etching and engraving); The Cleveland Museum of Art, accession 1922.5, https://clevelandart.org/art/1922.5. CC0
    1.0 (Cleveland Museum of Art Open Access).
  - `p_wpa_careful_machinery`: Be careful near machinery. Robert Lachenmann, WPA Federal Art Project, 1936 (woodblock
    poster); Library of Congress, Prints and Photographs Division, https://www.loc.gov/item/98518717/. No known restrictions.
  - `p_wpa_save_your_eyes`: Save your eyes: use your goggles. WPA Federal Art Project, Illinois Safety Division, 1936 or
    1937 (silkscreen poster); Library of Congress, https://www.loc.gov/item/98517852/. No known restrictions.
  - `p_wpa_protect_hands`: Protect your hands! You work with them. Robert Muchley, WPA Federal Art Project, Pennsylvania,
    1936 (silkscreen poster); Library of Congress, https://www.loc.gov/item/98518513/. No known restrictions.
  - `p_wpa_work_with_care`: Work with care. Nathan Sherman, WPA Federal Art Project, Pennsylvania, 1936 (silkscreen
    poster); Library of Congress, https://www.loc.gov/item/98517388/. No known restrictions.
  - `p_wpa_see_america_parks`: See America: visit the national parks. Harry Herzog for the NYC Art Project, WPA, for
    the United States Travel Bureau, between 1936 and 1940 (silkscreen poster); Library of Congress, Prints and
    Photographs Division, WPA Poster Collection, POS - WPA - NY .H47, no. 13,
    https://www.loc.gov/pictures/item/98518589/ (the film-copy border trimmed). No known restrictions on publication
    (Library of Congress rights statement; a work made for the U.S. Works Progress Administration).
  - `p_uranias_mirror_taurus`: Taurus, from Urania's Mirror. Engraved by Sidney Hall, London: Samuel Leigh, 1825
    (one of a boxed set of constellation cards); Library of Congress, Prints and Photographs Division, digital id
    cph.3g10065; restored copy via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Sidney_Hall_-_Urania%27s_Mirror_-_Taurus.jpg. Public domain (by age;
    Library of Congress: no known restrictions).
  - `p_hiroshige_sudden_shower`: Sudden Shower over Shin-Ohashi Bridge and Atake. Utagawa Hiroshige, 1857 (colour
    woodblock print, from One Hundred Famous Views of Edo); The Cleveland Museum of Art, accession 1921.318,
    https://clevelandart.org/art/1921.318. CC0 1.0 (Cleveland Museum of Art Open Access).
  - `p_haeckel_radiolaria_cyrtoidea`: Cyrtoidea (radiolarians), plate 31 of Kunstformen der Natur. Ernst Haeckel,
    lithographed by Adolf Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904),
    plate 31: Cyrtoidea; scan via Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Haeckel_Cyrtoidea.jpg.
    Public domain (by age; a faithful reproduction of a two-dimensional work).
  - `p_haeckel_radiolaria_stephoidea`: Stephoidea (radiolarians), plate 71 of Kunstformen der Natur. Ernst Haeckel,
    lithographed by Adolf Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904),
    plate 71: Stephoidea; scan via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Haeckel_Stephoidea.jpg. Public domain (by age; a faithful reproduction
    of a two-dimensional work).
  - `p_haeckel_diatoms`: Diatomea (diatoms), plate 4 of Kunstformen der Natur. Ernst Haeckel, lithographed by Adolf
    Giltsch; Kunstformen der Natur (Leipzig and Vienna: Bibliographisches Institut, 1904), plate 4: Diatomea; scan
    via Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Haeckel_Diatomea_4.jpg. Public domain (by age; a
    faithful reproduction of a two-dimensional work).
  - `p_hooke_cork_cells`: Cork under the microscope: the first 'cells' (Micrographia, Schem. XI). Robert Hooke,
    Micrographia: or some physiological descriptions of minute bodies made by magnifying glasses (London: J. Martyn
    and J. Allestry, 1665), Schem. XI; Wellcome Collection, London, https://wellcomecollection.org/works/y5tm56u5.
    CC BY 4.0 (credit: Wellcome Collection, https://creativecommons.org/licenses/by/4.0/; the engraving itself is in
    the public domain).
  - `p_hooke_seeds`: Seeds under the microscope, netted with polygons (Micrographia, Schem. XIX). Robert Hooke,
    Micrographia: or some physiological descriptions of minute bodies made by magnifying glasses (London: J. Martyn
    and J. Allestry, 1665), Schem. XIX; Wellcome Collection, London, https://wellcomecollection.org/works/ru2ass77.
    Public domain (Public Domain Mark; Wellcome Collection).
  - `p_hooke_flea`: The flea (Micrographia, Schem. XXXIV). Robert Hooke, Micrographia: or some physiological
    descriptions of minute bodies made by magnifying glasses (London: J. Martyn and J. Allestry, 1665), Schem.
    XXXIV, a folding plate; Wellcome Collection, London, https://wellcomecollection.org/works/ajveb66y. CC BY 4.0
    (credit: Wellcome Collection, https://creativecommons.org/licenses/by/4.0/; the engraving itself is in the
    public domain).
  - `p_termites_forms`: Termes: the forms of the termite, labourers, soldiers, male and queen. Etching by Moses
    Griffith, London (Fleet Street): G. Kearsley, 1 October 1805; Wellcome Collection, London,
    https://wellcomecollection.org/works/he9ujyx8. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_orsted_sound_figures`: Sound figures (Klangfigurer) on vibrating plates. Hans Christian Ørsted, Forsög over
    Klangfigurerne, in Det kongelige danske Videnskabernes Selskabs Skrivter for 1807 og 1808, vol. 5 (Copenhagen,
    1810), plate II; scan by the Royal Danish Academy of Sciences and Letters, via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Hans_Christian_%C3%98rsted_Fors%C3%B6g_over_Klangfigurerne_Tab_2.png.
    Public domain (by age; a faithful reproduction of a two-dimensional work).
  - `p_bentley_snow_crystal_stellar`: Snow crystal (a stellar dendrite). Wilson A. Bentley, photomicrograph,
    Jericho, Vermont, c. 1910; The Metropolitan Museum of Art, New York (Open Access; image DT259027), via Wikimedia
    Commons, https://commons.wikimedia.org/wiki/File:-Snow_Crystal-_MET_DT259027.jpg. Public domain (Met Open
    Access, CC0).
  - `p_bentley_snow_crystal_plate`: Snow crystal (a hexagonal plate). Wilson A. Bentley, photomicrograph, Jericho,
    Vermont, 1890s; The Metropolitan Museum of Art, New York (Open Access; image DP351879), via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:-Snow_Crystal-_MET_DP351879.jpg. Public domain (Met Open Access, CC0).
  - `p_kelvin_tide_predictor`: Sir William Thomson's third tide-predicting machine: design drawing. William Thomson
    (Lord Kelvin), design of 1879-81, as published in Minutes of Proceedings of the Institution of Civil Engineers,
    vol. 65 (1881); scan via Wikimedia Commons, https://commons.wikimedia.org/wiki/File:099-tpm3-sk.jpg. Public
    domain (by age; a faithful reproduction of a two-dimensional work).
  - `p_poincare_portrait` (Room 202): Henri Poincaré (1854-1912), with his signature. Unidentified photographer,
    before 1912; Smithsonian Institution Libraries, Dibner Library of the History of Science and Technology
    (Scientific Identity: Portraits from the Dibner Library), via Wikimedia Commons, File:Portrait of Henri
    Poincaré (1854-1912), Mathematician (2551042945).jpg. No known copyright restrictions (Smithsonian
    Institution, Flickr Commons).
  - `p_signal_service_weather_1888` (Room 202): Daily weather map, 20 August 1888: a hurricane coming ashore in
    Louisiana (detail). United States Army Signal Service, 1888; NOAA Central Library, U.S. Daily Weather Maps,
    https://library.noaa.gov/weather-climate/daily-weather-maps, via Wikimedia Commons, File:1888 August 20
    weather map 1.jpg. Public domain (a work of the U.S. Government).
  - `p_kepler_nested_solids`: The planetary spheres nested in the five regular solids (Mysterium Cosmographicum).
    Johannes Kepler, Prodromus dissertationum cosmographicarum, continens Mysterium cosmographicum (Tübingen, 1596),
    folding plate engraved by Christoph Leibfried, dated 1597; copy of the L. Tom Perry Special Collections, Harold
    B. Lee Library, Brigham Young University, via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:Kepler_Platonic_Solids.tif. Public domain (by age; a faithful
    reproduction of a two-dimensional work).
  - `p_leonardo_icosahedron`: Icosaedron elevatum solidum: a stellated icosahedron after Leonardo. Woodcut after
    Leonardo da Vinci, in Luca Pacioli, Divina proportione (Venice: Paganino Paganini, 1509); Internet Archive scan
    divinaproportion00paci, via Wikimedia Commons,
    https://commons.wikimedia.org/wiki/File:De_divina_proportione_-_Icosaedron_Elevatum_Solidum.jpg. Public domain
    (by age; a faithful reproduction of a two-dimensional work).
  - `p_jacquard_woven_portrait`: À la mémoire de J. M. Jacquard: a portrait woven in silk. Woven by Didier Petit et
    Cie, Lyon, 1839, after the painting by Claude Bonnefond (silk, woven on a Jacquard loom); Library of Congress,
    Prints and Photographs Division, https://www.loc.gov/item/2002737214/ (via Wikimedia Commons). No known
    restrictions on publication (Library of Congress); public domain by age.
  - `p_mark_i_perceptron`: The Mark I Perceptron being shown the letter C. U.S. Navy photograph, c. 1960 (released
    with the announcement of the Mark I Perceptron, built at Cornell Aeronautical Laboratory, Buffalo, under Frank
    Rosenblatt); National Archives, 330-PSA-80-60 (USN 710739), via the National Museum of the U.S. Navy and
    Wikimedia Commons, https://commons.wikimedia.org/wiki/File:330-PSA-80-60_(USN_710739)_(20897323365).jpg. Public
    domain (a work of the U.S. Government: U.S. Navy photograph).
  - `p_golgi_pyramidal_cells`: Nerve cells of the hippocampus, stained black (plate XIII). Camillo Golgi, Sulla fina
    anatomia degli organi centrali del sistema nervoso (Reggio Emilia: S. Calderini e Figlio, 1885), plate XIII;
    reproduction via Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Golgi_1885_Plate_XIII.JPG. Public
    domain (by age; a faithful reproduction of a two-dimensional work).
  - `p_golgi_hippocampus`: Section through the hippocampus (plate XX). Camillo Golgi, Sulla fina anatomia degli
    organi centrali del sistema nervoso (Reggio Emilia: S. Calderini e Figlio, 1885), plate XX; reproduction via
    Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Golgi_1885_Plate_XX.JPG. Public domain (by age; a
    faithful reproduction of a two-dimensional work).
  - `p_galvani_frogs`: Experiments on animal electricity (Tab. II). Luigi Galvani, De viribus electricitatis in motu
    musculari commentarius, with Giovanni Aldini's dissertation and notes (Modena: Società Tipografica, 1792),
    folding plate II; Wellcome Collection, London, https://wellcomecollection.org/works/rnbddkf5. Public domain
    (Public Domain Mark; Wellcome Collection).
  - `p_harvard_class_day_1853`: Order of exercises for Class Day, at Harvard College, Friday, June 24, 1853. Harvard
    College, 1853; Library of Congress, Rare Book and Special Collections Division, Printed Ephemera Collection,
    Portfolio 61, Folder 20, https://www.loc.gov/item/2021771134/. No known U.S. copyright: printed in the United
    States before 1930 (Library of Congress: "the Library is not aware of any U.S. copyright protection ... in the
    materials in the Printed Ephemera Collection").
  - `p_yale_applied_chemistry_1848`: School of Applied Chemistry: Analytical Laboratory, Yale College. B. Silliman Jr.
    and J. P. Norton, New Haven, June 1848; Library of Congress, Rare Book and Special Collections Division, Printed
    Ephemera Collection, Portfolio 8, Folder 23, https://www.loc.gov/item/2021769432/. No known U.S. copyright:
    printed in the United States before 1930 (Library of Congress: "the Library is not aware of any U.S. copyright
    protection ... in the materials in the Printed Ephemera Collection").
  - `p_yale_wooden_spoon_1858`: Presentation of the Wooden Spoon, by the Junior Class in Yale College, Brewster's
    Hall, June 15th, 1858. Yale College, 1858; Library of Congress, Rare Book and Special Collections Division,
    Printed Ephemera Collection, Portfolio 9, Folder 5, https://www.loc.gov/item/rbpe.00900500/. No known U.S.
    copyright: printed in the United States before 1930 (Library of Congress: "the Library is not aware of any U.S.
    copyright protection ... in the materials in the Printed Ephemera Collection").
  - `p_yale_junior_exhibition_1836`: Junior Exhibition, Yale University, 1836: an engraved invitation. engraved by
    Charles E. Ely, New York, 1836; Library of Congress, Rare Book and Special Collections Division, Printed Ephemera
    Collection, Portfolio 7, Folder 22, https://www.loc.gov/item/2021767246/. No known U.S. copyright: printed in the
    United States before 1930 (Library of Congress: "the Library is not aware of any U.S. copyright protection ... in
    the materials in the Printed Ephemera Collection").
  - `p_transylvania_philosophy_of_mind_1826`: The Philosophy of Mind according to Thomas Brown, M.D.: a table for
    students. Transylvania University, Lexington, Ky., January 1826; Library of Congress, Rare Book and Special
    Collections Division, Printed Ephemera Collection, Portfolio 174, Folder 10, https://www.loc.gov/item/2020770848/.
    No known U.S. copyright: printed in the United States before 1930 (Library of Congress: "the Library is not aware
    of any U.S. copyright protection ... in the materials in the Printed Ephemera Collection").
  - `p_harvard_quaestiones_1790`: Quaestiones sub reverendo Josepho Willard ... in comitiis publicis a laureae
    magistralis candidatis. Harvard University, Cambridge, Mass., 1790; Library of Congress, Rare Book and Special
    Collections Division, Printed Ephemera Collection, Portfolio 44, Folder 5b,
    https://www.loc.gov/item/rbpe.0440050b/ (Evans 22562; LOC dates the sheet 1781-91; 1790 is the year Adams took his
    master's degree). No known U.S. copyright: printed in the United States before 1930 (Library of Congress: "the
    Library is not aware of any U.S. copyright protection ... in the materials in the Printed Ephemera Collection").
  - `p_transylvania_lecture_card_1823`: Transylvania University: Lectures on the Theory & Practice of Medicine, by
    Samuel Brown, M.D., 1823-4. Transylvania University, Lexington, Ky., 1823; Library of Congress, Rare Book and
    Special Collections Division, Printed Ephemera Collection, Portfolio 21, Folder 45a,
    https://www.loc.gov/item/rbpe.0210450a/, card 1 of the set of 17. No known U.S. copyright: printed in the United
    States before 1930 (Library of Congress: "the Library is not aware of any U.S. copyright protection ... in the
    materials in the Printed Ephemera Collection").
  - `p_transylvania_chemistry_card_1826`: Transylvania University, Medical Department: Course of Chemistry, by James
    Blythe, D.D., 1826-7. Transylvania University, Lexington, Ky., 1826; Library of Congress, Rare Book and Special
    Collections Division, Printed Ephemera Collection, Portfolio 21, Folder 45a,
    https://www.loc.gov/item/rbpe.0210450a/, image 5 of the set. No known U.S. copyright: printed in the United States
    before 1930 (Library of Congress: "the Library is not aware of any U.S. copyright protection ... in the materials
    in the Printed Ephemera Collection").
  - `p_transylvania_library_ticket_1826`: Transylvania University, Medical Department: Matriculation and Library
    Ticket, winter session 1826-7. Transylvania University, Lexington, Ky., 1826; Library of Congress, Rare Book and
    Special Collections Division, Printed Ephemera Collection, Portfolio 21, Folder 45a,
    https://www.loc.gov/item/rbpe.0210450a/, image 14 of the set. No known U.S. copyright: printed in the United
    States before 1930 (Library of Congress: "the Library is not aware of any U.S. copyright protection ... in the
    materials in the Printed Ephemera Collection").
  - `p_upenn_lecture_ticket_1848`: University of Pennsylvania: Lectures on the Theory & Practice of Medicine, by N.
    Chapman, M.D.. University of Pennsylvania, Philadelphia, 1848; Library of Congress, Rare Book and Special
    Collections Division, Printed Ephemera Collection, Portfolio 154, Folder 13,
    https://www.loc.gov/item/rbpe.15401300/. No known U.S. copyright: printed in the United States before 1930
    (Library of Congress: "the Library is not aware of any U.S. copyright protection ... in the materials in the
    Printed Ephemera Collection").
  - `p_silliman_structure_of_earth_1852`: Course of Lectures upon the Structure of the Earth, by Professor B.
    Silliman, of Yale College. Benjamin Silliman, 1852; Library of Congress, Rare Book and Special Collections
    Division, Printed Ephemera Collection, Portfolio 61, Folder 2, https://www.loc.gov/item/2021771150/. No known U.S.
    copyright: printed in the United States before 1930 (Library of Congress: "the Library is not aware of any U.S.
    copyright protection ... in the materials in the Printed Ephemera Collection").
  - `p_amherst_williams_baseball_chess_1859`: Amherst Express. Extra. Williams and Amherst Base Ball and Chess! Muscle
    and Mind!!. Amherst, Mass., July 1859; Library of Congress, Rare Book and Special Collections Division, Printed
    Ephemera Collection, Portfolio 0, Folder 7, https://www.loc.gov/item/rbpe.00000700/. No known U.S. copyright:
    printed in the United States before 1930 (Library of Congress: "the Library is not aware of any U.S. copyright
    protection ... in the materials in the Printed Ephemera Collection").
  - `p_harvard_lowell_inauguration_1909`: Inauguration of President Lowell: undergraduate torchlight parade and
    fireworks. Harvard Co-operative Society, Cambridge, October 1909; Library of Congress, Rare Book and Special
    Collections Division, Printed Ephemera Collection, Portfolio 79, Folder 49e,
    https://www.loc.gov/item/rbpe.0790490e/, sheet 1 of the folder of seven Harvard broadsides. No known U.S.
    copyright: printed in the United States before 1930 (Library of Congress: "the Library is not aware of any U.S.
    copyright protection ... in the materials in the Printed Ephemera Collection").
  - `p_harvard_change_in_programme_1917`: Harvard University: Change in Programme. Commencement, June 21, 1917,
    Sanders Theatre. C. C. Little, Acting University Marshal, Cambridge, 1917; Library of Congress, Rare Book and
    Special Collections Division, Printed Ephemera Collection, Portfolio 79, Folder 49e,
    https://www.loc.gov/item/rbpe.0790490e/, image 7 of the folder of seven Harvard broadsides. No known U.S.
    copyright: printed in the United States before 1930 (Library of Congress: "the Library is not aware of any U.S.
    copyright protection ... in the materials in the Printed Ephemera Collection").
  - `p_queens_college_lottery_1814`: By authority of the State of New-Jersey: Queen's College Lottery, No. III (an
    uncut sheet of tickets). Queen's College (now Rutgers), New Brunswick, June 1814; Library of Congress, Rare Book
    and Special Collections Division, Printed Ephemera Collection, Portfolio 99, Folder 14,
    https://www.loc.gov/item/rbpe.09901400/. No known U.S. copyright: printed in the United States before 1930
    (Library of Congress: "the Library is not aware of any U.S. copyright protection ... in the materials in the
    Printed Ephemera Collection").
  - `p_uva_absence_report_1831`: University of Virginia: a monthly report to a student's parent. University of
    Virginia, Charlottesville, 1831; Library of Congress, Rare Book and Special Collections Division, Printed Ephemera
    Collection, Portfolio 186, Folder 28a, https://www.loc.gov/item/2020775168/. No known U.S. copyright: printed in
    the United States before 1930 (Library of Congress: "the Library is not aware of any U.S. copyright protection ...
    in the materials in the Printed Ephemera Collection").
  - `p_oxford_chemistry_syllabus_1831`: Syllabus of a Course of Lectures on the Principles of Chemistry, commencing at
    the Museum, Oxford, in October 1831. Charles Daubeny, Oxford, 1831; Wellcome Collection, London,
    https://wellcomecollection.org/works/jw85n8pf. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_princeton_rah_1903`: Princeton, rah, rah, rah. Nanon West, 1903; Nanon West, 1903 (colour print, poster
    format); Library of Congress, Prints and Photographs Division, Artist Poster filing series, POS - US .W458, no. 2,
    https://www.loc.gov/item/2015646618/ (the photograph's margin trimmed). No known restrictions on publication
    (Library of Congress rights statement); published in the United States before 1930.
  - `p_mercantile_library_lectures_1861`: The Eighteenth Annual Course of Lectures before the Mercantile Library
    Association, Boston Music Hall. Mercantile Library Association, Boston, 1861; Library of Congress, Rare Book and
    Special Collections Division, Printed Ephemera Collection, Portfolio 67, Folder 1,
    https://www.loc.gov/item/2020770140/. No known U.S. copyright: printed in the United States before 1930 (Library
    of Congress: "the Library is not aware of any U.S. copyright protection ... in the materials in the Printed
    Ephemera Collection").
  - `p_lyceum_lecture_medford_1852`: Lyceum Lecture: the introductory lecture before the West Medford Library and
    Lyceum Association. T. S. Harlow, Sec'y, Medford, Mass., January 19, 1852; Library of Congress, Rare Book and
    Special Collections Division, Printed Ephemera Collection, Portfolio 61, Folder 1,
    https://www.loc.gov/item/2021771183/. No known U.S. copyright: printed in the United States before 1930 (Library
    of Congress: "the Library is not aware of any U.S. copyright protection ... in the materials in the Printed
    Ephemera Collection").
  - `p_dog_lost_fancy_1851`: Dog Lost! A Cuba lap dog ... answers to the name of "Fancy". Boston, August 4th, 1851;
    Library of Congress, Rare Book and Special Collections Division, Printed Ephemera Collection, Portfolio 60, Folder
    27, https://www.loc.gov/item/2021771794/. No known U.S. copyright: printed in the United States before 1930
    (Library of Congress: "the Library is not aware of any U.S. copyright protection ... in the materials in the
    Printed Ephemera Collection").
  - `p_dancing_school_1861`: Afternoon Dancing School: Joseph B. Brown. Joseph B. Brown, Boston, December 1861;
    Library of Congress, Rare Book and Special Collections Division, Printed Ephemera Collection, Portfolio 68, Folder
    7, https://www.loc.gov/item/rbpe.06800700/. No known U.S. copyright: printed in the United States before 1930
    (Library of Congress: "the Library is not aware of any U.S. copyright protection ... in the materials in the
    Printed Ephemera Collection").
  - `p_penmanship_lessons_1843`: Penmanship: Messrs. Dolbear are now commencing their last course of lessons in this
    city. Messrs. Dolbear, Nashville, September 1843; Library of Congress, Rare Book and Special Collections Division,
    Printed Ephemera Collection, Portfolio 175, Folder 3, https://www.loc.gov/item/2021769009/. No known U.S.
    copyright: printed in the United States before 1930 (Library of Congress: "the Library is not aware of any U.S.
    copyright protection ... in the materials in the Printed Ephemera Collection").
  - `p_musicians_ball_1854`: Musicians' Military & Civic Ball, complimentary to the Lowell Cornet Band, at French's
    Hall. Lowell, Mass., November 16th, 1854; Library of Congress, Rare Book and Special Collections Division, Printed
    Ephemera Collection, Portfolio 61, Folder 36, https://www.loc.gov/item/2021771062/. No known U.S. copyright:
    printed in the United States before 1930 (Library of Congress: "the Library is not aware of any U.S. copyright
    protection ... in the materials in the Printed Ephemera Collection").
  - `p_tyndall_lectures_on_light_1872`: Announcement: Prof. John Tyndall, of the Royal Institution, London, will
    deliver a Course of Six Lectures on Light. Gibson Brothers, printers, Washington, D.C., 1872; Library of Congress,
    Rare Book and Special Collections Division, Printed Ephemera Collection, Portfolio 206, Folder 33,
    https://www.loc.gov/item/2020781545/. No known U.S. copyright: printed in the United States before 1930 (Library
    of Congress: "the Library is not aware of any U.S. copyright protection ... in the materials in the Printed
    Ephemera Collection").
  - `p_ymca_scientific_lectures_1870`: Scientific Lectures: a course of twelve popular scientific lectures, Lincoln
    Hall. Young Men's Christian Association, Washington, D.C., 1870; Library of Congress, Rare Book and Special
    Collections Division, Printed Ephemera Collection, Portfolio 206, Folder 1, https://www.loc.gov/item/2020779282/.
    No known U.S. copyright: printed in the United States before 1930 (Library of Congress: "the Library is not aware
    of any U.S. copyright protection ... in the materials in the Printed Ephemera Collection").
  - `p_armitstead_lectures_ticket_1888`: The Armitstead Lectures, Kinnaird Hall: tickets for the course, first seats,
    no. 370. Dundee, 1888; Wellcome Collection, London, https://wellcomecollection.org/works/u9f7ppam. Public domain
    (Public Domain Mark; Wellcome Collection).
  - `p_chemical_industry_programme_1900`: Reception to the President and Members of the Society of Chemical Industry,
    the Mansion House: Programme of Music. London, July 19th, 1900; Wellcome Collection, London,
    https://wellcomecollection.org/works/z6a9xepm. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_royal_institution_notice_1841`: Royal Institution of Great Britain: the extended and practical course of
    chemical lectures and demonstrations. Joseph Fincher, Assistant Secretary, London, August 30, 1841; Wellcome
    Collection, London, https://wellcomecollection.org/works/v65vwkzs. Public domain (Public Domain Mark; Wellcome
    Collection).
  - `p_maelzel_automaton_chess_player_1826`: Maelzel's Exhibition at the Julien Hall: Automaton Chess Player,
    Automaton Trumpeter, Automaton Rope Dancers. W. W. Clapp, printer, Boston, 1826; Library of Congress, Rare Book
    and Special Collections Division, Printed Ephemera Collection, Portfolio 54, Folder 24,
    https://www.loc.gov/item/2020770872/. No known U.S. copyright: printed in the United States before 1930 (Library
    of Congress: "the Library is not aware of any U.S. copyright protection ... in the materials in the Printed
    Ephemera Collection").
  - `p_thermo_lamp_1802`: Thermo Lamp: this recent, extraordinary, and celebrated discovery. E. Savage, Columbian
    Museum, New York, December 31, 1802; Library of Congress, Rare Book and Special Collections Division, Printed
    Ephemera Collection, Portfolio 113, Folder 6a, https://www.loc.gov/item/2020781488/. No known U.S. copyright:
    printed in the United States before 1930 (Library of Congress: "the Library is not aware of any U.S. copyright
    protection ... in the materials in the Printed Ephemera Collection").
  - `p_aeroport_flying_ship_1853`: Wonderful, Unprecedented, and Exciting Exhibition! An Aeroport or Flying-Ship.
    Washington, D.C., March 1853; Library of Congress, Rare Book and Special Collections Division, Printed Ephemera
    Collection, Portfolio 201, Folder 9, https://www.loc.gov/item/2021771099/. No known U.S. copyright: printed in the
    United States before 1930 (Library of Congress: "the Library is not aware of any U.S. copyright protection ... in
    the materials in the Printed Ephemera Collection").
  - `p_air_balloon_lecture_1783`: Air Balloon: at Mr. Patterson's Great Room ... will be delivered a Lecture on Air.
    J. Dinwiddie, London, 1783; Wellcome Collection, London, https://wellcomecollection.org/works/s3j2y6rv. Public
    domain (Public Domain Mark; Wellcome Collection).
  - `p_great_comet_1858_bill`: Music Hall, George Street: Mr. Henry's Heavens, Celestial Scenery, the Planetarium; the
    path of the great comet of 1858. Edinburgh, about 1859; Wellcome Collection, London,
    https://wellcomecollection.org/works/gpajjast. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_dioastrodoxon_orrery_1820`: Astronomical Lecture on the new Dioastrodoxon, or Grand Transparent Orrery,
    twenty-one feet in diameter. London, about 1820; Wellcome Collection, London,
    https://wellcomecollection.org/works/kxqktjwd. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_walker_eidouranion_1817`: Positively the Last Times: Mr. D. F. Walker ... Three Astronomical Lectures on the
    Eidouranion, or Large Transparent Orrery. Theatre, Dover, 1817; Wellcome Collection, London,
    https://wellcomecollection.org/works/j773v7k5. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_philipsthal_exhibition`: Grand Philosophical, Optical, & Mechanical Exhibition, by M. de Philipsthal, Lyceum,
    Strand. London; Wellcome dates it 1784?; Wellcome Collection, London,
    https://wellcomecollection.org/works/zw87shps. Public domain (Public Domain Mark; Wellcome Collection).
  - `p_miller_chemistry_lectures`: Dr. Miller will begin a Course of Lectures on Chemistry, illustrated by
    experiments. late 18th century; Wellcome Collection, London, https://wellcomecollection.org/works/bksty9ex. Public
    domain (Public Domain Mark; Wellcome Collection).
  - `p_wpa_adler_planetarium`: The drama of the heavens: Adler Planetarium, operated by Chicago Park District. Beard,
    Illinois WPA Art Project, 1939; Library of Congress, Prints and Photographs Division, WPA Poster Collection, POS -
    WPA - ILL .B42, no. 6, https://www.loc.gov/item/98508993/ (the film-copy border trimmed). No known restrictions on
    publication (Library of Congress rights statement; a work made for the U.S. Works Progress Administration).
  - `p_wpa_museum_science_industry`: Museum of Science & Industry. Galic, Illinois WPA Art Project, 1936-40; Library
    of Congress, Prints and Photographs Division, WPA Poster Collection, POS - WPA - ILL .G36, no. 3,
    https://www.loc.gov/item/98510059/ (the film-copy border trimmed). No known restrictions on publication (Library
    of Congress rights statement; a work made for the U.S. Works Progress Administration).
  - `p_wpa_whos_who_zoo`: Who's who in the zoo: illustrated natural history prepared by the WPA Federal Writers
    Project. attributed to Sidney Jacobson, WPA Federal Art Project (New York), 1936-37; Library of Congress, Prints
    and Photographs Division, WPA Poster Collection, POS - WPA - NY .J34, no. 2, https://www.loc.gov/item/98514973/
    (the film-copy border trimmed). No known restrictions on publication (Library of Congress rights statement; a work
    made for the U.S. Works Progress Administration).
  - `p_wpa_romance_of_robot`: Two chamber operas: "The Romance of Robot" and "La Serva Padrona". WPA Federal Music
    Project of New York City, 1936-41; Library of Congress, Prints and Photographs Division, WPA Poster Collection,
    POS - WPA - NY .01 .T89, no. 1, https://www.loc.gov/item/98514982/ (the film-copy border trimmed). No known
    restrictions on publication (Library of Congress rights statement; a work made for the U.S. Works Progress
    Administration).
  - `p_wpa_beethoven_series_1937`: Beethoven Series. WPA Federal Music Project (New York), 1937; WPA Federal Art
    Project (New York), 1937 (silkscreen poster); Library of Congress, Prints and Photographs Division, WPA Poster
    Collection, POS - WPA - NY .L37, no. 4, https://www.loc.gov/item/98507229/ (the film-copy border trimmed). No
    known restrictions on publication (Library of Congress rights statement; a work made for the U.S. Works Progress
    Administration).
  - `p_bamber_dime_show_1880`: 5th Annual Tour: B. A. Bamber's Dime Show: travels, art, history, astronomy, fun,
    electricity. about 1880; Library of Congress, Prints and Photographs Division, Theatrical poster collection, POS -
    TH - SPE, no. 7, https://www.loc.gov/item/2014635917/. No known restrictions on publication (Library of Congress
    rights statement); published in the United States before 1930.
- Passages printed in books (src/books/quotes.js): each is from a work in the public domain in the United States,
  cut word for word from the Project Gutenberg text named beside it (compiled and checked for Anna's House).
- The animals about the grounds (src/creatures.js, src/creatures/; assets/models/v_*), in the copies prepared for
  Anna's House and used on Vesper Street. From Poly Pizza, licensed CC BY 3.0
  (https://creativecommons.org/licenses/by/3.0/), and modified (normals removed, parts joined, textures reduced,
  rescaled and re-oriented, recoloured, some shown as a near relative): Squirrel (https://poly.pizza/m/caxos24uWC9),
  Rabbit (https://poly.pizza/m/9OBTRVYUSmt), Jackrabbit, shown as a hare (https://poly.pizza/m/biNOm96olTH),
  Sparrow (https://poly.pizza/m/4_u3rGdORhG), Barn owl (https://poly.pizza/m/eSEv3rCMKbg; its head is cut free of
  the body when loaded, so that it can turn), Bat (https://poly.pizza/m/5_XBqyrOY7x; its wings are made to beat in
  the shader) and Dragonfly (https://poly.pizza/m/0myA_BOcZrD), all by Poly by Google; Robin by jeremy
  (https://poly.pizza/m/53HOg-b1F4r; recoloured from an American to a European robin).
  In the pond: the koi's body is "Fish (Animated) - Scardinius" (a rudd) by XaosXV (Cestmir Dammer, kelgar.org),
  CC0 1.0, https://opengameart.org/content/fish-animated (assets/models/v_fish_rudd; used as a still mesh, reshaped
  to a koi's build, with barbels added); the frog is "Green Frog" by AssetQuest, CC0 1.0,
  https://poly.pizza/m/yK6MyLkuob (assets/models/v_frog). The koi's patterns and swimming (src/creatures/koi.js,
  koi_school.js) were drawn and written for Anna's House. Butterflies and fireflies are built in code.
  Added with the second cast, from the same copies and under the same licence (CC BY 3.0, modified as above):
  Hedgehog (https://poly.pizza/m/8UNni5IvK_c), Turtle, shown as a tortoise (https://poly.pizza/m/c6n73UnGEP4; its
  head cut free of the body when loaded), Raven, shown as a blackbird (https://poly.pizza/m/7eQ51arTYDj; made
  smaller, its beak painted yellow) and Mallard duck (https://poly.pizza/m/frSLi6b6Vid), all by Poly by Google;
  Bluejay by jeremy (https://poly.pizza/m/dWfeVtr7M49). The fox is "Fox" (Ultimate Animated Animals) by
  Quaternius, CC0 1.0, https://poly.pizza/m/Bc97C66HKi (assets/models/q_fox; its five colours merged into one
  mesh when loaded). The flock's birds, the swallows, bees, moths and ants are built in code. The flock follows
  C. W. Reynolds, "Flocks, Herds, and Schools: A Distributed Behavioral Model" (SIGGRAPH 1987); the ants follow
  the two-scent model of M. Resnick's StarLogo "Ants" (Turtles, Termites, and Traffic Jams, 1994).
