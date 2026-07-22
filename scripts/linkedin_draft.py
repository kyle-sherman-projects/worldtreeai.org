#!/usr/bin/env python3
"""Turn a new blog post into a LinkedIn draft.

Deliberately template-based rather than LLM-generated: no API key, no cost,
nothing that can expire or rate-limit. The output is a starting point Sherman
edits, not a finished post.

The one rule this encodes that matters: the link goes in the FIRST COMMENT,
never in the post body. LinkedIn suppresses reach on posts carrying external
links, so a post with the URL inline gets a fraction of the impressions.
"""

import pathlib
import re
import sys

import yaml

SITE = "https://worldtreeai.org"
MAX_HOOK = 210  # LinkedIn truncates around here behind a "see more" fold


def parse(path):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n(.*)$", text, re.S)
    if not m:
        raise SystemExit(f"{path}: no YAML front matter")
    return yaml.safe_load(m.group(1)) or {}, m.group(2)


DATE_PREFIX = re.compile(r"^\d{4}-\d{2}-\d{2}-")


def post_url(path):
    """Mirror Jekyll's permalink: /blog/:title/ where :title strips the date."""
    slug = DATE_PREFIX.sub("", path.stem)
    return SITE + "/blog/" + slug + "/"


def clean(s):
    """Flatten markdown emphasis and whitespace into speakable prose."""
    s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)  # links -> text
    s = re.sub(r"[*_`]", "", s)
    return " ".join(s.split())


def stat_lines(body):
    """Bolded claims carrying a number. These are the load-bearing sentences."""
    out = []
    for m in re.finditer(r"\*\*(.+?)\*\*", body, re.S):
        s = clean(m.group(1))
        if re.search(r"\d", s) and 25 < len(s) < 220 and s not in out:
            out.append(s)
    return out


def build(fm, body, url):
    title = fm.get("title", "Untitled")
    desc = clean(fm.get("description", "") or "")
    stats = stat_lines(body)
    sections = [clean(h) for h in re.findall(r"^##\s+(.+)$", body, re.M)]

    # Hook: prefer a hard number, since numbers stop the scroll better than
    # a thesis statement. Fall back to the standfirst.
    hook = stats[0] if stats else (desc or title)
    if len(hook) > MAX_HOOK:
        hook = hook[:MAX_HOOK].rsplit(" ", 1)[0] + "..."

    supporting = [s for s in stats[1:4]]

    lines = [hook, ""]
    if desc and desc != hook:
        lines += [desc, ""]
    if supporting:
        lines += [f"- {s}" for s in supporting] + [""]
    if sections:
        lines += ["In the post:"] + [f"- {s}" for s in sections[:3]] + [""]
    lines += ["What are you seeing in your district?"]

    return {
        "title": title,
        "url": url,
        "post": "\n".join(lines).strip(),
        "comment": f"Full analysis: {url}",
        "stats_found": len(stats),
    }


def render_issue(d):
    return f"""A new post is live. Draft below, edit freely.

**Post:** [{d['title']}]({d['url']})

---

### 1. Paste as the LinkedIn post

```
{d['post']}
```

### 2. Paste as the FIRST COMMENT, straight after posting

```
{d['comment']}
```

---

### Before you post

- [ ] Rewrite the first line in your own voice. It is the only line most people
      read, and the auto-generated version is a placeholder, not a hook.
- [ ] Confirm the link is in the comment and **not** in the post body.
      LinkedIn suppresses reach on posts with external links.
- [ ] Cut anything that reads as marketing. The post should be worth reading
      even if nobody clicks.
- [ ] Best window is roughly Tue-Thu, 8-10am ET.

*Auto-generated from `{d['url']}`. Found {d['stats_found']} numeric claim(s) in the post.*
"""


def main():
    if len(sys.argv) < 2:
        raise SystemExit("usage: linkedin_draft.py <post.md> [post.md ...]")
    out = []
    for arg in sys.argv[1:]:
        path = pathlib.Path(arg)
        if not path.exists():
            print(f"skip (missing): {path}", file=sys.stderr)
            continue
        fm, body = parse(path)
        if fm.get("draft") or fm.get("published") is False:
            print(f"skip (draft): {path}", file=sys.stderr)
            continue
        d = build(fm, body, post_url(path))
        out.append((d["title"], render_issue(d)))
    if not out:
        raise SystemExit(0)
    # Emit title/body pairs separated by a sentinel the workflow splits on.
    for title, body in out:
        print(f"::TITLE::{title}")
        print(body)
        print("::END::")


if __name__ == "__main__":
    main()
