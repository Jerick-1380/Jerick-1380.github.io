"""Hadwiger-Nelson explainer for the blog post on OpenAI's math release.

Render:  manim -qh --fps 30 -o plane-coloring.mp4 src/animations/plane_coloring.py PlaneColoring
"""
from manim import *
import numpy as np

BG = "#04060d"
TEXT = "#e8ecf8"
MUTED = "#9aa3bc"
CYAN = "#46e0ff"
PAL = ["#5b8cff", "#ff6b8b", "#46e0a0", "#ffd479", "#9d6bff", "#46e0ff", "#ff9f5b"]
FONT = "Helvetica Neue"


def label(s, size=30, color=TEXT, weight=NORMAL):
    return Text(s, font=FONT, font_size=size, color=color, weight=weight)


class PlaneColoring(Scene):
    def construct(self):
        self.camera.background_color = BG

        # ---- 1. the rule ----------------------------------------------------
        title = label("Color every point of the plane.", 40, weight=BOLD).to_edge(UP, buff=0.7)
        rule = label("Rule: two points exactly 1 apart can't share a color.", 28, MUTED).next_to(title, DOWN, buff=0.3)
        self.play(FadeIn(title, shift=DOWN * 0.2), run_time=0.8)
        self.play(FadeIn(rule), run_time=0.6)

        U = 2.2  # one unit on screen
        a, b = LEFT * U / 2 + DOWN * 0.6, RIGHT * U / 2 + DOWN * 0.6
        seg = Line(a, b, color=MUTED, stroke_width=3)
        da, db = Dot(a, radius=0.13, color=PAL[0]), Dot(b, radius=0.13, color=PAL[1])
        one = label("1", 26, MUTED).next_to(seg, DOWN, buff=0.15)
        self.play(Create(seg), FadeIn(da), FadeIn(db), FadeIn(one), run_time=0.9)
        q = label("How many colors do you need?", 32, CYAN).to_edge(DOWN, buff=0.8)
        self.play(FadeIn(q), run_time=0.6)
        self.wait(1.2)
        self.play(FadeOut(VGroup(seg, da, db, one, rule, q)), run_time=0.5)

        # ---- 2. triangle: at least 3 -----------------------------------------
        t1 = label("A triangle with sides of 1 needs 3.", 30, MUTED).next_to(title, DOWN, buff=0.3)
        c = DOWN * 0.7
        tri_pts = [c + U / np.sqrt(3) * np.array([np.cos(t), np.sin(t), 0]) for t in (PI / 2, PI / 2 + TAU / 3, PI / 2 + 2 * TAU / 3)]
        tri_edges = VGroup(*[Line(tri_pts[i], tri_pts[(i + 1) % 3], color=MUTED, stroke_width=3) for i in range(3)])
        tri_dots = VGroup(*[Dot(p, radius=0.13, color=PAL[i]) for i, p in enumerate(tri_pts)])
        self.play(FadeIn(t1), Create(tri_edges), run_time=0.9)
        self.play(LaggedStart(*[FadeIn(d, scale=1.6) for d in tri_dots], lag_ratio=0.35), run_time=1.0)
        self.wait(1.0)
        self.play(FadeOut(VGroup(tri_edges, tri_dots, t1)), run_time=0.5)

        # ---- 3. Moser spindle: at least 4 ------------------------------------
        t2 = label("This 7-point shape (every edge is 1) breaks 3 colors.", 30, MUTED).next_to(title, DOWN, buff=0.3)
        phi = 2 * np.arcsin(1 / (2 * np.sqrt(3)))  # angle that puts the two far tips 1 apart
        V = 2.05

        def rhombus(alpha):
            d = lambda ang, r=1.0: r * V * np.array([np.cos(ang), np.sin(ang), 0])
            return d(alpha + PI / 6), d(alpha - PI / 6), d(alpha, np.sqrt(3))

        base = PI / 2 - phi / 2
        B, C, D = rhombus(base + phi)
        E, F, G = rhombus(base)
        A = np.zeros(3)
        pts = {"A": A, "B": B, "C": C, "D": D, "E": E, "F": F, "G": G}
        shift = DOWN * 2.6
        pts = {k: v + shift for k, v in pts.items()}
        edges = [("A", "B"), ("A", "C"), ("B", "C"), ("B", "D"), ("C", "D"),
                 ("A", "E"), ("A", "F"), ("E", "F"), ("E", "G"), ("F", "G"), ("D", "G")]
        lines = {e: Line(pts[e[0]], pts[e[1]], color=MUTED, stroke_width=3) for e in edges}
        dots = {k: Dot(p, radius=0.13, color="#3a4160") for k, p in pts.items()}
        self.play(FadeIn(t2), LaggedStart(*[Create(l) for l in lines.values()], lag_ratio=0.06), run_time=1.3)
        self.play(*[FadeIn(d) for d in dots.values()], run_time=0.4)

        def paint(k, i, rt=0.35):
            self.play(dots[k].animate.set_color(PAL[i]).scale(1.15), run_time=rt)

        paint("A", 0)
        paint("B", 1); paint("C", 2)
        paint("D", 0)          # forced: touches B and C
        paint("E", 1); paint("F", 2)
        paint("G", 0)          # forced: touches E and F
        clash = lines[("D", "G")]
        self.play(clash.animate.set_color("#ff4d6d").set_stroke(width=7), Flash(clash.get_center(), color="#ff4d6d"), run_time=0.7)
        t2b = label("The two tips are forced to match, and they're 1 apart. So: at least 4.", 28, "#ff8fa3").to_edge(DOWN, buff=0.45)
        self.play(FadeIn(t2b), run_time=0.5)
        self.wait(1.8)
        self.play(FadeOut(VGroup(*lines.values(), *dots.values(), t2, t2b)), run_time=0.5)

        # ---- 4. hexagons: 7 is enough ----------------------------------------
        t3 = label("Hexagons a bit under 1 wide, in 7 colors, always work.", 30, MUTED).next_to(title, DOWN, buff=0.3)
        s = 0.42
        hexes = VGroup()
        for qx in range(-9, 10):
            for r in range(-16, 17):
                x = s * 1.5 * qx
                y = s * np.sqrt(3) * (r + qx / 2)
                if abs(x) > 6.2 or y > 1.35 or y < -3.6:
                    continue
                h = RegularPolygon(6, radius=s, color=BG, stroke_width=1.5)
                h.set_fill(PAL[(qx + 3 * r) % 7], opacity=0.85).move_to([x, y, 0])
                hexes.add(h)
        self.play(FadeIn(t3), LaggedStart(*[FadeIn(h, scale=0.6) for h in hexes], lag_ratio=0.004), run_time=2.0)
        self.wait(1.6)
        self.play(FadeOut(hexes), FadeOut(t3), run_time=0.6)

        # ---- 5. the scoreboard -----------------------------------------------
        t4 = label("So which is it? Cross off what can't work.", 30, MUTED).next_to(title, DOWN, buff=0.3)
        nums = VGroup(*[label(str(n), 64, TEXT, BOLD) for n in range(1, 8)]).arrange(RIGHT, buff=0.85).shift(DOWN * 0.5)
        self.play(FadeIn(t4), LaggedStart(*[FadeIn(n, shift=UP * 0.2) for n in nums], lag_ratio=0.08), run_time=1.0)

        def strike(i):
            n = nums[i]
            return AnimationGroup(n.animate.set_color("#3a4160"),
                                  Create(Line(n.get_corner(DL) + LEFT * 0.08, n.get_corner(UR) + RIGHT * 0.08, color="#ff4d6d", stroke_width=5)))

        self.play(LaggedStart(strike(0), strike(1), strike(2), lag_ratio=0.2), run_time=0.9)
        n1 = label("Moser spindle, 1961", 22, MUTED).next_to(nums[2], DOWN, buff=0.45)
        self.play(FadeIn(n1), run_time=0.4)
        self.wait(0.5)
        self.play(strike(3), run_time=0.5)
        n2 = label("de Grey, 2018", 22, MUTED).next_to(nums[3], DOWN, buff=0.45)
        self.play(FadeOut(n1), FadeIn(n2), run_time=0.4)
        self.wait(0.6)
        self.play(strike(4), run_time=0.6)
        n3 = label("OpenAI's model, 2026", 22, CYAN).next_to(nums[4], DOWN, buff=0.45)
        self.play(FadeOut(n2), FadeIn(n3), run_time=0.4)
        box = SurroundingRectangle(VGroup(nums[5], nums[6]), color=CYAN, buff=0.28, corner_radius=0.15)
        self.play(Create(box), nums[5].animate.set_color(CYAN), nums[6].animate.set_color(CYAN), run_time=0.8)
        end = label("6 or 7. Nobody knows which.", 34, TEXT, BOLD).to_edge(DOWN, buff=0.8)
        self.play(FadeOut(t4), FadeIn(end), run_time=0.6)
        self.wait(2.6)
