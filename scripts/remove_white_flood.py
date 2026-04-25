"""Remove white/gray background: BFS from opaque bg pixels that touch transparent or border."""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MASCOT = ROOT / "public" / "mascot.png"


def is_bg(c: int, mi: int, s: int, lu: float) -> bool:
    if c > 22:
        return False
    if lu < 198.0:
        return False
    if c <= 2 and s >= 755 and mi >= 252:
        return True
    if c <= 6 and s >= 748 and mi >= 248 and lu >= 247.0:
        return True
    if c <= 10 and s >= 752 and mi >= 246 and lu >= 248.0:
        return True
    if c <= 2 and s >= 735 and mi >= 245 and lu >= 240.0:
        return True
    return False


def rgb_stats(r: int, g: int, b: int) -> tuple[int, int, int, float]:
    m = r if r < g else g
    m = b if b < m else m
    M = r if r > g else g
    M = b if b > M else M
    c = M - m
    lu = 0.2126 * r + 0.7152 * g + 0.0722 * b
    s = r + g + b
    return c, m, s, lu


def main() -> None:
    path = MASCOT
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()
    nbr = ((0, 1), (0, -1), (1, 0), (-1, 0))
    vis = bytearray(w * h)
    q: deque[tuple[int, int]] = deque()

    def idx(x: int, y: int) -> int:
        return y * w + x

    def a_at(x: int, y: int) -> int:
        if x < 0 or x >= w or y < 0 or y >= h:
            return 0
        return px[x, y][3]

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 2:
                continue
            c, mi, s, lu = rgb_stats(r, g, b)
            if not is_bg(c, mi, s, lu):
                continue
            on_edge = x == 0 or y == 0 or x == w - 1 or y == h - 1
            touches_t = any(a_at(x + dx, y + dy) < 2 for dx, dy in nbr)
            if on_edge or touches_t:
                i = idx(x, y)
                vis[i] = 1
                q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in nbr:
            nx, ny = x + dx, y + dy
            if nx < 0 or nx >= w or ny < 0 or ny >= h:
                continue
            i = idx(nx, ny)
            if vis[i]:
                continue
            r, g, b, a = px[nx, ny]
            if a < 2:
                continue
            c, mi, s, lu = rgb_stats(r, g, b)
            if is_bg(c, mi, s, lu):
                vis[i] = 1
                q.append((nx, ny))
    n = 0
    for y in range(h):
        for x in range(w):
            if vis[idx(x, y)]:
                t = list(px[x, y])
                t[3] = 0
                px[x, y] = tuple(t)
                n += 1
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a and max(r, g, b) < 20 and (r + g + b) < 50:
                px[x, y] = (0, 0, 0, 0)
    a = im.split()[3]
    bbx = a.getbbox()
    if bbx is not None:
        x0, y0, x1, y1 = bbx
        pad = 4
        im = im.crop(
            (max(0, x0 - pad), max(0, y0 - pad), min(w, x1 + pad), min(h, y1 + pad))
        )
    im.save(path, optimize=True)
    print(f"ok: {n} bg pixels removed -> {path} final {im.size}")


if __name__ == "__main__":
    main()
