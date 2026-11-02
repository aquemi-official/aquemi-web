"""Aggregate the image-to-text descriptions of every Gemini image into a style atlas.

Reads  images/*.json   (one description per Gemini original in ../gemini/, same stem)
Writes keywords.json   (counts, concept tags, families, co-occurrence, brand fit, era shift)
Prints a short readable summary.

Standard library only. Re-run after adding or re-describing images:

    python design-system/inspiration/style-atlas/aggregate.py

Method
------
1. Every list field is normalised phrase by phrase (lowercase, unicode NFKC, British/US spelling
   merged, hyphens to spaces, simple plurals folded, a few synonyms merged) and counted per field
   (`phrases_by_field`: phrase, images it appears in, raw count). Most phrases are one-offs, so:
2. Concept tags: a curated list of regexes (CONCEPTS below) that merge the many wordings of one
   idea ("deep navy background", "navy page ground", "white linework on navy" -> navy_ground).
   Items starting with "no"/"without"/"none" are split off first and counted as negations, so
   "no shading" never counts as shading. Counts are images, not mentions.
3. Families: each image gets one primary style family from FAMILY_RULES (first match wins on its
   style_family / rendering / palette text), with OVERRIDES for the few hybrids where the rule
   picks the secondary trait. Secondary traits stay visible in the per-image tags.
4. Eras by image number: 01-30 early concepts and drawings, 31-67 later passes, 68+ pass 9 and 9b.
"""
import json
import re
import sys
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
IMAGES = HERE / "images"
OUT = HERE / "keywords.json"

LIST_FIELDS = [
    "art_direction", "composition", "layout_devices", "palette", "typography", "rendering",
    "line_and_texture", "motifs", "ui_patterns", "motion_implied", "mood", "t2i_keywords",
    "strengths", "weaknesses",
]
STYLE_FIELDS = [  # fields that describe what the image looks like (critique fields excluded)
    "style_family", "art_direction", "composition", "layout_devices", "palette", "typography",
    "rendering", "line_and_texture", "motifs", "ui_patterns", "t2i_keywords",
]
CRITIQUE_FIELDS = ["weaknesses", "brand_fit_why"]

ERAS = [  # (id, label, first, last)
    ("early", "01-30 early concepts and drawings", 1, 30),
    ("later", "31-67 later passes", 31, 67),
    ("pass9", "68+ pass 9 and 9b varied art directions", 68, 999),
]

# --------------------------------------------------------------------------------- normalising
SPELLING = [
    (r"\bcolours?\b", "color"), (r"\bcentred\b", "centered"), (r"\bcentre\b", "center"),
    (r"\bgrey\b", "gray"), (r"\bbackgrounds?\b", "ground"), (r"\blinework\b", "line work"),
    (r"\bmonospaced\b", "monospace"), (r"\bmono\b", "monospace"), (r"\bgrotesque\b", "grotesk"),
    (r"\buppercase\b", "caps"), (r"\bcapitals\b", "caps"), (r"\ball caps\b", "caps"),
    (r"\boff white\b", "off-white"), (r"\bphotorealistic\b", "photo-real"),
    (r"\bphoto real(istic)?\b", "photo-real"), (r"\bthree dimensional\b", "3d"),
    (r"\bmock up\b", "mockup"), (r"\bp ?& ?id\b", "p&id"), (r"\bpid\b", "p&id"),
    (r"\bhair line\b", "hairline"), (r"\bcall ?outs?\b", "callout"),
]
NOT_PLURAL = {"glass", "class", "process", "less", "series", "axis", "chassis", "canvas", "gas",
              "lens", "status", "bus", "plus", "minus", "across", "us", "this", "its", "is", "has",
              "was", "gloss", "emboss", "press", "stress", "cross", "boss", "always", "towards",
              "ups", "bars", "news", "access", "thickness", "fitness", "sans", "focus", "radius",
              "previous", "various", "dangerous", "industries", "ppb", "us/cm", "eus"}


def singular(word):
    if word in NOT_PLURAL or len(word) <= 3 or not word.isalpha():
        return word
    if word.endswith("ies") and len(word) > 4:
        return word[:-3] + "y"
    if word.endswith(("sses", "shes", "ches", "xes")):
        return word[:-2]
    if word.endswith("s") and not word.endswith(("ss", "us", "is")):
        return word[:-1]
    return word


def norm(text):
    s = unicodedata.normalize("NFKC", str(text)).lower().strip()
    s = s.replace("–", "-").replace("—", "-").replace("'", "").replace('"', "")
    s = re.sub(r"(?<=[a-z])-(?=[a-z])", " ", s)          # line-art -> line art
    for pat, rep in SPELLING:
        s = re.sub(pat, rep, s)
    s = " ".join(singular(w) for w in s.split())
    return s.strip(" .,;:")


NEG = re.compile(r"^(no|without|none|not|never|zero)\b")
SITE_NOTE = re.compile(r"added later|on the site|by token|on site\b|callout target|extend to key figure")


def segments(item):
    """Split one list item into (positive segments, negated segments)."""
    pos, neg = [], []
    for seg in re.split(r"[,;]| and no | but no | with no ", norm(item)):
        seg = seg.strip()
        if not seg:
            continue
        if SITE_NOTE.search(seg):  # describes what the site adds later, not the image
            continue
        (neg if NEG.match(seg) else pos).append(seg)
    return pos, neg


# ------------------------------------------------------------------------------------ concepts
# (id, label, group, regex, fields). Regexes run on normalised positive segments of the fields.
S, L, MO, C = STYLE_FIELDS, ["layout_devices", "composition", "ui_patterns", "t2i_keywords",
                             "art_direction", "motifs", "style_family"], ["motion_implied"], CRITIQUE_FIELDS
CONCEPTS = [
    # palette
    ("navy_ground", "deep navy ground", "palette",
     r"navy\b.*\b(ground|field|surround|canvas|panel|half|band|block|page|sheet)\b|on navy|navy blueprint|dark blueprint|blueprint navy|blueprint negative", S),
    ("limestone_ground", "warm limestone / paper ground", "palette",
     r"(limestone|cream|off-white|beige|sand|paper)\b[^,]*\b(ground|sheet|paper|surface|tile|card|half|band)\b(?!.*\b(text|type|line|stroke|outline|headline|label|numeral)s?\b)", S),
    ("white_ground", "pure white ground", "palette", r"(pure )?white (ground|paper)|on (pure )?white\b|black on white", S),
    ("black_ink", "black ink line", "palette", r"black (ink|line|outline|stroke)|black on white|monochrome ink", S),
    ("steel_blue_accent", "steel-blue accent", "palette", r"steel blue|steel-blue|flow blue|cool accent|blue accent", S),
    ("single_accent", "one accent only", "palette", r"(single|one) (cool |steel.?blue |blue )?(accent|highlight)|accent used once|sole accent", S),
    ("limestone_line_on_navy", "light line work on navy", "palette",
     r"(white|off-white|limestone|pale)[^,]*(line|stroke|line work)[^,]*navy|(white|off-white|pale blue white|pale gray white)[^,]*line (art|work)", S),
    ("off_palette_hue", "off-palette hue (red, green, orange, gold, kraft)", "palette",
     r"\b(orange|peach|red|green|gold|kraft|manila|brown|amber|yellow)\b", ["palette"]),
    ("glow", "glow / bloom / light leak", "rendering", r"\bglow|bloom|light leak|vignette|neon", ["palette", "rendering", "line_and_texture"]),
    # rendering
    ("flat_vector", "flat vector / flat UI", "rendering", r"flat (vector|ui|2d|color|line|mockup)|^flat$|vector", S),
    ("line_art", "line art", "rendering",
     r"line (art|drawing|work|render|icon)|hairline (art|stroke|line)|outline (only|drawing)|ink line|wireframe|line illustration", S),
    ("hairline", "hairline 1-1.5 px strokes", "rendering", r"hairline|1 ?px|1 to 1\.5|1 ?- ?1\.5|1\.5 ?px|thin (line|stroke)|fine line", S),
    ("isometric", "isometric / axonometric", "rendering", r"isometric|axonometric|three quarter", S),
    ("schematic_pid", "P&ID / orthographic schematic", "rendering", r"p&id|orthographic|schematic|isa 5|piping (diagram|drawing)", S),
    ("blueprint", "blueprint", "rendering", r"blueprint", S),
    ("exploded_cutaway", "exploded view / cutaway", "rendering", r"exploded|cutaway|x ray|transparent frame", S),
    ("render_3d", "soft 3D render", "rendering", r"3d render|soft 3d|studio light|ambient occlusion|contact shadow|matte plastic|cutaway 3d", ["rendering", "art_direction", "style_family", "t2i_keywords"]),
    ("photo_real", "photo-real / macro", "rendering",
     r"photo-real|photograph|macro (photo|render|detail|close|shot)|depth of field|flat lay|^macro", ["rendering", "art_direction", "style_family", "t2i_keywords"]),
    ("translucent", "translucent / glass / glossy", "rendering", r"translucent|frosted|glass|gloss|refract", S),
    ("collage_paper", "paper-cut collage", "rendering", r"paper cut|collage|cut paper", S),
    ("responsive_pair", "desktop + phone mockup pair", "rendering", r"(desktop|phone|mobile)[^,]*(pair|artboard|spread|plus|and)|responsive", ["art_direction", "ui_patterns", "composition", "t2i_keywords"]),
    # typography
    ("light_headline", "light-weight headline", "typography",
     r"light[^,]*(grotesk|sans|headline|numeral|display)|thin (sans|grotesk)|geist light", ["typography"]),
    ("heavy_headline", "heavy / bold / condensed headline", "typography",
     r"(bold|heavy|black|condensed|extra bold|wide)[^,]*(caps|headline|display|title|grotesk|words?)(?!mark)", ["typography"]),
    ("caps_type", "all-caps type", "typography", r"\bcaps\b|small cap", ["typography"]),
    ("monospace", "monospace type", "typography", r"monospace|typewriter|terminal", ["typography"]),
    ("all_mono", "monospace everywhere", "typography", r"monospace[^,]*throughout|all monospace|monospace caps throughout|monospace everywhere|entirely monospace", ["typography"]),
    ("oversized_numerals", "oversized numerals / one huge figure", "typography",
     r"(oversized|huge|giant|large|big|massive|very large)[^,]*(numeral|number|figure|digit|value)|ghost numeral", ["typography", "layout_devices", "t2i_keywords"]),
    ("oversized_headline", "oversized headline / display type", "typography",
     r"(oversized|huge|giant|massive|very large|poster|cropped)[^,]*(headline|type|word|statement|display|caps)", ["typography", "t2i_keywords", "art_direction"]),
    ("sentence_case", "sentence-case headline", "typography", r"sentence case", ["typography"]),
    ("serif", "serif type", "typography", r"(?<!sans )\bserif\b", ["typography"]),
    ("eyebrow", "caps eyebrow label", "typography", r"eyebrow", ["typography", "t2i_keywords", "composition"]),
    # layout devices
    ("leader_callouts", "leader-line callouts", "layout",
     r"leader|callout|pinned|tethered", L),
    ("pipe_route", "one continuous pipe / route linking items", "layout",
     r"pipe (route|run|line|journey|path|ribbon|frame|lane)|continuous (double line )?(pipe|route|line)|one (pipe|route|line)\b|routed line|route (line|map)|water path|serpentine|manifold|flow line|dashed route|walking route|(single|one) route", L),
    ("numbered_items", "numbered items 01-0n", "layout", r"numbered|0?1 ?(to|-|/) ?0?\d|\b01\b|slash number", L),
    ("ghost_numerals", "ghost / outline background numerals or words", "layout", r"ghost|outline (type|word|numeral)|hollow", L + ["typography"]),
    ("title_block", "title block", "layout", r"title block", L),
    ("sheet_frame", "drawing-sheet frame / zone references", "layout",
     r"drawing sheet|sheet (border|frame)|zone (ref|letter|frame|mark)|drawing frame|paper sheet|sheet of|drawing (border|sheet)|revision block", L),
    ("crop_marks", "crop / registration marks, corner brackets", "layout", r"crop mark|registration|crosshair|corner bracket|viewfinder", L + ["line_and_texture"]),
    ("dimension_lines", "dimension lines", "layout", r"dimension", L + ["line_and_texture"]),
    ("ruler_ticks", "ruler / tick scale", "layout", r"ruler|tick (scale|mark|strip)|\bticks\b|scale bar|measurement strip|tick scale", L + ["line_and_texture"]),
    ("grid_ground", "graph-paper / dot grid ground", "layout", r"graph paper|dot grid|grid (line|guide)|drafting grid|blueprint grid|grid paper", L + ["line_and_texture", "palette"]),
    ("instrument_tags", "boxed instrument / spec tags", "layout", r"instrument tag|boxed[^,]*tag|tag box|corner tag|spec tag", L),
    ("stamps", "stamps / signature blocks", "layout", r"stamp|signature", L),
    ("hotspots", "hotspots / node dots", "layout", r"hotspot|hot spot|node dot|\bnodes?\b|\bpins?\b", L),
    ("tabs", "tabs / folder tabs", "layout", r"\btabs?\b|folder tab|tabbed", L),
    ("highlight_one", "one highlighted row / value / tile", "layout",
     r"highlight(ed)? (one|single|final|payoff|row|value|figure|tile|plan|block|cell|band)|(one|single) (highlighted|accent(ed)?|tinted) (row|value|figure|tile|cell)|payoff", L),
    ("hairline_rules", "hairline rules between rows", "layout", r"hairline (rule|divider|table|grid)|horizontal rule|thin rule|table rule", L + ["line_and_texture"]),
    ("staircase", "stepped / staircase sequence", "layout", r"stair|stepped|step(s)? (down|up)|cascade|rising (timeline|steps|path)|climb", L),
    ("split", "split screen / two halves", "layout", r"split|two halves|left half|right half|seam|battery limit", L),
    ("bento_tiles", "tiles / bento / colour blocks", "layout", r"bento|\btiles?\b|checkerboard|color block", L),
    ("cards", "cards", "layout", r"\bcards?\b", L),
    ("margin_notes", "margin notes / annotations", "layout", r"margin(al)? (note|annotation)|annotation", L),
    ("legend", "legend", "layout", r"legend", L),
    ("fold_rows", "accordion / folding rows", "layout", r"accordion|fold(ed|ing)? (row|open)|unfold|expandable|expand", L),
    ("table", "table / matrix / register", "layout", r"\btable\b|matrix|register|ledger|spec sheet", L),
    ("sticky_rail", "sticky visual + scrolling rail", "layout", r"sticky|\brail\b", L),
    ("isolated_object", "single isolated object", "layout", r"single isolated|isolated (object|vignette)|centered single object|standalone illustration|single object", L),
    ("negative_space", "generous negative space", "layout", r"negative space|white margin|generous (space|margin|white)|quiet zone|empty space|breathing", S),
    ("square_corners", "square corners", "layout", r"square corner|sharp corner|radius 0", S),
    # motion (motion_implied only)
    ("m_flow", "water / pulse travels the pipe", "motion", r"flow|water (travel|move|run|fill|ripple|splash)|travel|pulse travel|dot travel|glow dot", MO),
    ("m_draw", "lines / leaders / pipes draw on", "motion", r"\bdraws?\b|drawn|draw (in|on)|trace|extends|rail draws|line[s]? (grow|extend)", MO),
    ("m_sequence", "items light up / reveal in sequence", "motion", r"light(s)? up|lights|in sequence|sequential|one by one|in (index |number )?order|in turn|stagger|cascade|step up|reveal", MO),
    ("m_count", "figures count up / tick", "motion", r"count|ticks? (up|on)|tick on|roll", MO),
    ("m_hover", "hover / select highlights a link", "motion", r"hover|select|click|tap", MO),
    ("m_expand", "row / card expands or opens", "motion", r"expand|opens?\b|widen|unfold|fan(s)? open|lift", MO),
    ("m_stamp", "stamp lands", "motion", r"stamp|thump", MO),
    ("m_gauge", "needles / dials / bars sweep or fill", "motion", r"needle|gauge|dial|sweep|fill|bars? (grow|extend)|meter", MO),
    ("m_pulse", "pulse / glow / highlight", "motion", r"pulse|glow|blink|brighten|highlight", MO),
    ("m_scroll", "scroll-driven / sticky / parallax", "motion", r"scroll|sticky|parallax|scrub|pan", MO),
    ("m_mechanical", "mechanical motion (spin, valve turns)", "motion", r"spin|rotat|turns?\b|impeller|valve", MO),
    ("m_slide", "slide / assemble / explode", "motion", r"slide|glide|assemble|explode|separate|apart|drop(s)? (in|onto)|slam|push", MO),
    ("m_type", "type writes on / kinetic type", "motion", r"type(s)? (on|in)|types|ticker|letters|kinetic", MO),
    ("m_fade", "fade in", "motion", r"fade", MO),
    # anti-patterns (weaknesses + brand_fit_why)
    ("x_heavy_caps", "heavy / bold caps headline (vs Geist light)", "anti",
     r"(bold|heavy|condensed|shout|loud|wide)[^.]*(caps|headline|type|display)|caps[^.]*(heavy|shout)|caps headline|(bold|heavy) headline|off the geist", C),
    ("x_all_mono", "monospace everywhere", "anti", r"(all|everywhere|throughout)[^.]*monospace|monospace[^.]*(everywhere|throughout|monoton|heavy|tiring)|all monospace", C),
    ("x_off_offer", "off-offer equipment (stainless, WFI, steam, still)", "anti",
     r"stainless|\bwfi\b|steam|multi effect still|distill|316l|orbital|tri clamp|passivat|sterile|metal|carbon steel|chrome|cast metal", C),
    ("x_glitch", "generator glitches (duplicates, garbled text)", "anti",
     r"duplicat|repeat|garbl|gibberish|nonsense|stray|numbering|placeholder|glitch|cut off|mislabel|twice|redundant", C),
    ("x_illegible", "illegible / muddy at small or phone size", "anti",
     r"illegible|hard to read|small (label|text)|tiny|legib|muddy|fill in|low contrast|will not (read|survive)", C),
    ("x_decorative", "decorative lines / metaphors that mean nothing", "anti",
     r"decorat|meaningless|arbitrary|mean nothing|do(es)? not (encode|relate|map|mean|differ)|carr(y|ies) no meaning|pastiche|gimmick|point at nothing|pasted on", C),
    ("x_dense", "dense / cluttered / busy", "anti", r"dense|clutter|busy|noise|noisy|crowd|spaghetti|tangle|compete|too many|too much", C),
    ("x_phone", "hard to reflow to phone", "anti", r"phone|mobile|narrow|reflow|responsive|viewport", C),
    ("x_off_palette", "off-palette colour or second neutral", "anti",
     r"off palette|\bred\b|green|orange|peach|beige|second (neutral|accent)|gold|kraft|black block|unsanctioned|colours? outside|colors? outside", C),
    ("x_rounded", "rounded corners / capsules", "anti", r"rounded|capsule|pill", C),
    ("x_glow", "glow / bloom / sci-fi", "anti", r"glow|bloom|sci fi|neon", C),
    ("x_glossy", "glossy / photo-real / skeuomorphic props", "anti", r"gloss|photo-real|stock|skeuomorph|consumer|props|literal", C),
    ("x_hype", "hype copy or claims", "anti", r"hype|slogan|seamless|guaranteed|marketing|99\.9|claim", C),
    ("x_cliche", "cliche / generic", "anti", r"clich|generic|saas", C),
    ("x_plain_table", "plain table on a frame, no visual idea", "anti",
     r"plain table|table[ -]only|no visual idea|basically a table|just a table|mostly a (plain )?table|only a table", C),
    ("x_invented", "invented figures or fake UI", "anti", r"invented|fake|mislead|mistaken for real|impl(y|ies)|live (monitor|configurator)", C),
]
CONCEPT_BY_ID = {c[0]: c for c in CONCEPTS}

# tags used for the style co-occurrence matrix (palette x rendering x type x signature devices)
STYLE_TAGS = [
    "navy_ground", "limestone_ground", "white_ground", "line_art", "isometric", "schematic_pid",
    "blueprint", "exploded_cutaway", "render_3d", "photo_real", "translucent", "glow",
    "light_headline", "heavy_headline", "monospace", "oversized_numerals", "oversized_headline",
    "leader_callouts", "pipe_route", "sheet_frame", "title_block", "bento_tiles", "split", "table",
]

# --------------------------------------------------------------------------------- families
FAMILIES = {
    "ink_line_art": "Isolated equipment line art (masks and spots)",
    "navy_route": "Navy blueprint pipe-route",
    "navy_sheet_ui": "Navy drawing-sheet UI (mono documents)",
    "limestone_sheet": "Limestone engineering sheet",
    "instrument": "Instrument and data-viz",
    "editorial": "Editorial oversized type",
    "swiss_bento": "Swiss grid, bento and split",
    "page_rhythm": "Banded page rhythm (whole page)",
    "render_3d": "Soft 3D product render",
    "photo_tactile": "Photo-real tactile and macro",
}
# (family, field, regex). First rule that matches wins.
FAMILY_RULES = [
    ("page_rhythm", "section_kind", r"whole page"),
    ("photo_tactile", "rendering", r"photo-real|photograph|still life"),
    ("render_3d", "rendering", r"\b3d\b"),
    ("ink_line_art", "palette", r"black (ink|line)|pure black"),
    ("swiss_bento", "style_family", r"swiss|bento|split screen|color block"),
    ("editorial", "style_family", r"editorial (oversized|bold|type)|poster|kinetic|bold caps|oversized type|collage editorial"),
    ("instrument", "style_family", r"instrument|readout|gauge|dial|orbital|plotted|measurement|bar comparison|infographic"),
    ("limestone_sheet", "style_family", r"limestone|paper|typewriter|register|folder|binder|step sheet|split sheet|ledger"),
    ("navy_route", "style_family", r"route|pipe|journey|p&id|isometric|callout|plant|floor plan|circuit|skid|lane|collage|blueprint line art|ga\b"),
    ("navy_sheet_ui", "style_family", r"navy|blueprint|sheet|hud|terminal|mono"),
]
OVERRIDES = {  # file number -> (family, reason)
    57: ("ink_line_art", "spot/icon specimen sheet: same isolated-object line-art job as 64"),
    78: ("editorial", "editorial spread first; the glass sculpture is its secondary 3D trait"),
    90: ("swiss_bento", "bento tile layout first; the photo-real render is one tile"),
    69: ("navy_sheet_ui", "ghosted drawing-sheet collage with framed boxes; the '3D-ish' pipe is a small pasted-on detail"),
    115: ("navy_sheet_ui", "clause table on navy with row leaders into an inset skid drawing; not a pipe route"),
    118: ("swiss_bento", "navy/limestone split with stage cards first; the isometric plant is one half"),
    124: ("photo_tactile", "macro direction drawn as one large dimensioned fusion-joint line drawing; macro plate beside steps"),
    146: ("navy_sheet_ui", "navy zone-bordered drawing register; 'register' in its name is not a limestone sheet"),
    147: ("navy_sheet_ui", "navy drawing sheet first; the P&ID symbols are fragments inside the table"),
    154: ("photo_tactile", "macro direction drawn as a line-mesh bead on a navy plate; the macro plate is the figure"),
    155: ("photo_tactile", "macro direction drawn as an engraved line-hatched bead; macro plate beside a table"),
    166: ("photo_tactile", "macro direction drawn as a duotone shaded joint; macro plate beside a table"),
    163: ("limestone_sheet", "isometric drawing on a limestone page beside a list, not a navy route"),
    175: ("limestone_sheet", "isometric frame on a limestone page beside a table, not a navy route"),
    182: ("limestone_sheet", "isometric drawing on a limestone page beside a list, not a navy route"),
}


def era_of(n):
    for eid, _, lo, hi in ERAS:
        if lo <= n <= hi:
            return eid
    return "unknown"


def field_items(d, field):
    v = d.get(field, [])
    return [v] if isinstance(v, (str, int)) else list(v)


def classify(d, n):
    if n in OVERRIDES:
        return OVERRIDES[n][0], "override"
    for fam, field, pat in FAMILY_RULES:
        text = " | ".join(norm(x) for x in field_items(d, field))
        if re.search(pat, text):
            return fam, "rule"
    return "navy_sheet_ui", "fallback"


def tag_image(d):
    pos_by_field, neg = {}, []
    for f in set(STYLE_FIELDS + LIST_FIELDS + CRITIQUE_FIELDS):
        segs = []
        for it in field_items(d, f):
            if f in CRITIQUE_FIELDS:            # critiques: keep whole sentences, "no" is meaningful
                segs.append(norm(it))
                continue
            p, ng = segments(it)
            segs += p
            if f in STYLE_FIELDS:
                neg += ng
        pos_by_field[f] = segs
    tags = []
    for cid, _, _, pat, fields in CONCEPTS:
        rx = re.compile(pat)
        if any(rx.search(s) for f in fields for s in pos_by_field.get(f, [])):
            tags.append(cid)
    return tags, sorted(set(neg))


def mean(xs):
    return round(sum(xs) / len(xs), 2) if xs else None


def main():
    files = sorted(IMAGES.glob("*.json"))
    if not files:
        sys.exit(f"no descriptions in {IMAGES}")
    imgs = []
    for p in files:
        d = json.loads(p.read_text(encoding="utf-8"))
        n = int(re.match(r"(\d+)", p.stem).group(1))
        fam, src = classify(d, n)
        tags, negs = tag_image(d)
        imgs.append({"n": n, "file": d.get("file", p.stem + ".png"), "stem": p.stem, "era": era_of(n),
                     "section_kind": d.get("section_kind"), "style_family_raw": d.get("style_family"),
                     "family": fam, "family_source": src, "brand_fit": d.get("brand_fit"),
                     "tags": tags, "negations": negs, "_d": d})
    N = len(imgs)
    era_n = Counter(i["era"] for i in imgs)

    # 1. every normalised phrase per field
    phrases = {}
    for f in LIST_FIELDS + ["style_family", "section_kind"]:
        cnt, docs = Counter(), defaultdict(set)
        for i in imgs:
            for it in field_items(i["_d"], f):
                k = norm(it)
                cnt[k] += 1
                docs[k].add(i["n"])
        phrases[f] = sorted(([k, len(docs[k]), cnt[k]] for k in cnt), key=lambda r: (-r[1], -r[2], r[0]))

    # t2i keyword tokens (single words and 2-word phrases) for the prompt vocabulary
    uni, bi = Counter(), Counter()
    STOP = {"a", "an", "the", "of", "and", "with", "in", "on", "to", "for", "at", "as", "by", "one", "no"}
    for i in imgs:
        u, b = set(), set()
        for it in i["_d"].get("t2i_keywords", []):
            ws = [w for w in re.findall(r"[a-z0-9&\-.]+", norm(it))]
            u.update(w for w in ws if w not in STOP)
            b.update(f"{x} {y}" for x, y in zip(ws, ws[1:]) if x not in STOP and y not in STOP)
        uni.update(u)
        bi.update(b)

    # negations (what the images avoid, from "no X" segments)
    neg_cnt = Counter(x for i in imgs for x in i["negations"])

    # 2. concepts
    concepts = {}
    for cid, label, group, _, _ in CONCEPTS:
        hit = [i for i in imgs if cid in i["tags"]]
        concepts[cid] = {
            "label": label, "group": group, "images": len(hit), "share": round(len(hit) / N, 2),
            "by_era": {e: round(sum(1 for i in hit if i["era"] == e) / era_n[e], 2) for e, *_ in ERAS if era_n[e]},
            "mean_fit_with": mean([i["brand_fit"] for i in hit]),
            "mean_fit_without": mean([i["brand_fit"] for i in imgs if cid not in i["tags"]]),
            "files": [i["stem"] for i in hit],
        }

    # 3. families
    fams = {}
    for fid, name in FAMILIES.items():
        mem = [i for i in imgs if i["family"] == fid]
        if not mem:
            continue
        tagc = Counter(t for i in mem for t in i["tags"])
        kw = Counter(norm(k) for i in mem for k in i["_d"].get("t2i_keywords", []))
        fams[fid] = {
            "name": name, "images": len(mem), "mean_fit": mean([i["brand_fit"] for i in mem]),
            "fit_range": [min(i["brand_fit"] for i in mem), max(i["brand_fit"] for i in mem)],
            "by_era": {e: sum(1 for i in mem if i["era"] == e) for e, *_ in ERAS},
            "section_kinds": Counter(i["section_kind"] for i in mem).most_common(),
            "files": [[i["stem"], i["brand_fit"]] for i in mem],
            "defining_tags": [[t, c] for t, c in tagc.most_common()
                              if CONCEPT_BY_ID[t][2] not in ("anti", "motion") and c / len(mem) >= 0.5
                              and (c / len(mem)) - concepts[t]["share"] >= 0.15],
            "common_tags": [[t, c] for t, c in tagc.most_common(20) if CONCEPT_BY_ID[t][2] not in ("anti",)],
            "anti_tags": [[t, c] for t, c in tagc.most_common() if CONCEPT_BY_ID[t][2] == "anti"],
            "top_t2i_keywords": kw.most_common(25),
        }

    # 4. co-occurrence of style tags (image counts) and family x tag
    co = {a: {b: sum(1 for i in imgs if a in i["tags"] and b in i["tags"]) for b in STYLE_TAGS} for a in STYLE_TAGS}
    pairs = []
    for x in range(len(STYLE_TAGS)):
        for y in range(x + 1, len(STYLE_TAGS)):
            a, b = STYLE_TAGS[x], STYLE_TAGS[y]
            both = [i for i in imgs if a in i["tags"] and b in i["tags"]]
            if len(both) >= 2:
                pairs.append({"a": a, "b": b, "images": len(both), "mean_fit": mean([i["brand_fit"] for i in both]),
                              "files": [i["stem"] for i in both]})
    pairs.sort(key=lambda p: -p["images"])
    fam_x_tag = {fid: {t: sum(1 for i in imgs if i["family"] == fid and t in i["tags"]) for t in STYLE_TAGS} for fid in fams}

    # 5. brand fit
    def fit_by(key):
        g = defaultdict(list)
        for i in imgs:
            g[i[key]].append(i["brand_fit"])
        return {k: {"n": len(v), "mean": mean(v)} for k, v in sorted(g.items(), key=lambda kv: -mean(kv[1]))}
    lift = sorted(([cid, c["images"], c["mean_fit_with"], c["mean_fit_without"],
                    round((c["mean_fit_with"] or 0) - (c["mean_fit_without"] or 0), 2)]
                   for cid, c in concepts.items() if c["images"] >= 5 and c["group"] != "anti"), key=lambda r: -r[4])
    brand_fit = {
        "overall": mean([i["brand_fit"] for i in imgs]),
        "histogram": dict(sorted(Counter(i["brand_fit"] for i in imgs).items())),
        "by_era": fit_by("era"), "by_family": {k: v for k, v in fit_by("family").items()},
        "by_section_kind": fit_by("section_kind"),
        "top_rated": [i["stem"] for i in imgs if i["brand_fit"] == 5],
        "lowest_rated": [i["stem"] for i in imgs if i["brand_fit"] <= 2],
        "tag_lift": {"columns": ["concept", "images", "fit_with", "fit_without", "lift"], "rows": lift},
    }

    # 6. era shift
    era_shift = {
        "eras": {e: {"label": lab, "images": era_n[e]} for e, lab, *_ in ERAS},
        "families": {e: Counter(i["family"] for i in imgs if i["era"] == e).most_common() for e, *_ in ERAS},
        "concept_share": {cid: c["by_era"] for cid, c in concepts.items()},
        "biggest_risers": [], "biggest_fallers": [],
    }
    deltas = []
    for cid, c in concepts.items():
        be = c["by_era"]
        if "early" in be and "pass9" in be and c["group"] != "anti":
            deltas.append((round(be["pass9"] - be["early"], 2), cid))
    deltas.sort()
    era_shift["biggest_fallers"] = [[cid, d] for d, cid in deltas[:10]]
    era_shift["biggest_risers"] = [[cid, d] for d, cid in deltas[::-1][:10]]

    out = {
        "meta": {"images": N, "source": "images/*.json (one per gemini/*.png)", "script": "aggregate.py",
                 "counts_are": "images unless a column says count", "eras": [list(e) for e in ERAS],
                 "family_overrides": {str(k): v[1] for k, v in OVERRIDES.items()}},
        "images": [{k: v for k, v in i.items() if k != "_d"} for i in imgs],
        "concepts": concepts,
        "families": fams,
        "cooccurrence": {"tags": STYLE_TAGS, "matrix": co, "pairs": pairs, "family_x_tag": fam_x_tag},
        "brand_fit": brand_fit,
        "era_shift": era_shift,
        "t2i_vocabulary": {"words": uni.most_common(120), "bigrams": bi.most_common(120)},
        "negations": neg_cnt.most_common(60),
        "phrases_by_field": phrases,
    }
    OUT.write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8")

    # ---- summary
    w = sys.stdout.write
    w(f"{N} images -> {OUT.name}\n\nFamilies (images, mean fit, eras early/later/pass9):\n")
    for fid, f in sorted(fams.items(), key=lambda kv: -kv[1]["images"]):
        be = f["by_era"]
        w(f"  {f['name']:<46} {f['images']:>3}  fit {f['mean_fit']}  {be['early']}/{be['later']}/{be['pass9']}\n")
    for g in ("palette", "rendering", "typography", "layout", "motion", "anti"):
        w(f"\n{g}:\n")
        for cid, c in sorted(concepts.items(), key=lambda kv: -kv[1]["images"]):
            if c["group"] == g and c["images"]:
                be = c["by_era"]
                w(f"  {cid:<20} {c['images']:>3}  early {be.get('early')}  later {be.get('later')}  p9 {be.get('pass9')}  fit {c['mean_fit_with']}\n")
    w("\nfamily sources: " + str(Counter(i["family_source"] for i in imgs)) + "\n")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
