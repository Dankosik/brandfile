"""How much of Krebs's flagged Show HN pages would a purple/font ban list even touch? Data only."""
import json, pathlib, sys
d = pathlib.Path(sys.argv[1])
recs = {}
for t in ("clean", "mild", "heavy"):
    for r in json.loads((d / f"results_tier-{t}.json").read_text(encoding="utf8")):
        r["_t"] = t
        recs[r.get("id") or r["url"]] = r
rows = list(recs.values())
flagged = [r for r in rows if r["_t"] != "clean"]
meme = {"purple_accent", "slop_fonts"}
colour_font = meme | {"gradients", "perma_dark_mode", "colored_glows", "glassmorphism", "all_caps_headings", "accent_stripe"}
struct = {"center_aligned_hero", "icon_card_grid", "numbered_steps", "stat_banner_row", "hero_eyebrow_pill", "faq_accordion", "sidebar_emoji"}
n = len(flagged)
print("n all", len(rows), "n mild+heavy", n)
print("mild+heavy with neither purple nor templated font:", sum(not (set(r["flagged"]) & meme) for r in flagged), round(sum(not (set(r["flagged"]) & meme) for r in flagged) / n * 100, 1))
heavy = [r for r in rows if r["_t"] == "heavy"]
print("heavy n", len(heavy), "with neither:", sum(not (set(r["flagged"]) & meme) for r in heavy), round(sum(not (set(r["flagged"]) & meme) for r in heavy) / len(heavy) * 100, 1))
print("heavy with >=2 struct:", sum(len(set(r["flagged"]) & struct) >= 2 for r in heavy), round(sum(len(set(r["flagged"]) & struct) >= 2 for r in heavy) / len(heavy) * 100, 1))
after = [set(r["flagged"]) - colour_font for r in rows]
print("after removing every colour/type/effect flag, pages still with >=2 structural:", sum(len(a) >= 2 for a in after), round(sum(len(a) >= 2 for a in after) / len(rows) * 100, 1))
print("                                                          with >=1 structural:", sum(len(a) >= 1 for a in after), round(sum(len(a) >= 1 for a in after) / len(rows) * 100, 1))

surf = colour_font
n = len(rows)
def cnt(fn):
    c = sum(1 for r in rows if fn(set(r["flagged"])))
    return c, round(c / n * 100, 1)
print("any surface", cnt(lambda f: f & surf))
print("any struct", cnt(lambda f: f & struct))
print("both", cnt(lambda f: (f & surf) and (f & struct)))
print("surface only", cnt(lambda f: (f & surf) and not (f & struct)))
print("struct only", cnt(lambda f: (f & struct) and not (f & surf)))
print("none", cnt(lambda f: not f))
print(">=2 struct & no surface", cnt(lambda f: len(f & struct) >= 2 and not (f & surf)))
print(">=2 surface", cnt(lambda f: len(f & surf) >= 2))
print(">=2 struct", cnt(lambda f: len(f & struct) >= 2))
hs = sum(len(set(r["flagged"]) & struct) for r in heavy)
ht = sum(len(set(r["flagged"]) & surf) for r in heavy)
print("heavy triggers struct", hs, "surface", ht, round(hs / (hs + ht) * 100, 1))
unknown = set()
for r in rows:
    unknown |= set(r["flagged"]) - surf - struct
print("unclassified", unknown)
