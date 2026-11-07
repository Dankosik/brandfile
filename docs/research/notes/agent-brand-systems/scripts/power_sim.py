#!/usr/bin/env python3
"""Monte-Carlo power for a brand x task x run crossed design (stdlib only).

Model for the paired contrast (treated minus baseline) of one run pair:
  d_btr = delta + u_b + v_t + w_bt + e_btr
where u_b ~ N(0, sb), v_t ~ N(0, st), w_bt ~ N(0, sbt), e ~ N(0, se * sqrt(2)).

All SDs are expressed in units of single-run residual SD (se = 1).
These variance components are ASSUMPTIONS, not measurements: the point of the
table is the relative value of adding brands vs tasks vs runs.

Tests:
- t-test on brand-level mean differences (brands treated as the unit of inference)
- also reports exact minimum two-sided p of a sign-flip test: 2 / 2^B
"""
import math
import random
import statistics

T_CRIT = {3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447, 7: 2.365, 9: 2.262, 11: 2.201, 15: 2.131, 19: 2.093}
ALPHA3_T_CRIT = {3: 5.841, 4: 4.604, 5: 4.032, 6: 3.707, 7: 3.499, 9: 3.250, 11: 3.106, 15: 2.947, 19: 2.861}


def power(delta, B, T, R, sb, st, sbt, nsim=4000, seed=7, crit=T_CRIT):
    rng = random.Random(seed)
    hits = 0
    se_pair = math.sqrt(2.0)
    for _ in range(nsim):
        v = [rng.gauss(0, st) for _ in range(T)]
        brand_means = []
        for _b in range(B):
            u = rng.gauss(0, sb)
            total = 0.0
            for t in range(T):
                w = rng.gauss(0, sbt)
                # mean of R run-pair residuals has SD se_pair / sqrt(R)
                total += delta + u + v[t] + w + rng.gauss(0, se_pair / math.sqrt(R))
            brand_means.append(total / T)
        m = statistics.fmean(brand_means)
        s = statistics.stdev(brand_means)
        if s == 0:
            continue
        t_stat = m / (s / math.sqrt(B))
        if abs(t_stat) > crit[B - 1]:
            hits += 1
    return hits / nsim


def n_binom(p, p0=0.5, alpha_z=1.96, power_z=0.8416):
    num = alpha_z * math.sqrt(p0 * (1 - p0)) + power_z * math.sqrt(p * (1 - p))
    return math.ceil((num / (p - p0)) ** 2)


def main():
    print("# brand-level paired t-test, alpha=.05 two-sided; SD units of single-run residual")
    print("# scenario A: sb=0.5 st=0.5 sbt=0.5 | scenario B (skill effect varies a lot by brand): sb=1.0 st=0.5 sbt=0.7")
    for name, (sb, st, sbt) in {"A": (0.5, 0.5, 0.5), "B": (1.0, 0.5, 0.7)}.items():
        print(f"\nScenario {name}: sb={sb} st={st} sbt={sbt}")
        print("delta  B  T  R  runs_per_contrast  power")
        for delta in (0.5, 1.0):
            for B, T, R in [
                (4, 8, 3), (6, 8, 1), (6, 8, 3), (6, 8, 5), (6, 8, 10),
                (6, 16, 3), (8, 8, 3), (8, 12, 3), (12, 8, 3), (12, 8, 1),
            ]:
                pw = power(delta, B, T, R, sb, st, sbt)
                print(f"{delta:5.1f} {B:2d} {T:2d} {R:2d} {2 * B * T * R:6d}  {pw:5.2f}")

    print("\n# Exact minimum two-sided p for a brand-level sign-flip test")
    for B in (4, 5, 6, 7, 8, 10, 12):
        print(f"B={B:2d} min p={2 / 2 ** B:.4f}")

    print("\n# Votes for one-sample proportion vs chance, alpha=.05 two-sided, power=.80 (independent votes)")
    for p0, ps in ((0.5, (0.6, 0.65, 0.7, 0.75)), (0.25, (0.4, 0.5, 0.6)), (1 / 6, (0.33, 0.5, 0.7))):
        for p in ps:
            print(f"chance={p0:.3f} true={p:.2f} n={n_binom(p, p0)}")
    print("\n# Design effect with clustering: n_eff = n / (1 + (m-1)*icc)")
    for m, icc in ((5, 0.1), (5, 0.3), (10, 0.1), (10, 0.3)):
        print(f"m={m} icc={icc} deff={1 + (m - 1) * icc:.2f}")

    print("\n# Run counts and API cost order of magnitude")
    for label, B, T, A, R in [
        ("pilot main model", 6, 8, 4, 3),
        ("full main model", 8, 10, 5, 3),
        ("second model C0+C3 pilot", 6, 8, 2, 3),
    ]:
        n = B * T * A * R
        print(f"{label}: {B}x{T}x{A}x{R} = {n} runs; at $1/$3/$6 per run = ${n}, ${3 * n}, ${6 * n}; wall-clock at 5 min/run, 8 parallel = {n * 5 / 8 / 60:.1f} h")
    # sonnet-class per-run estimate, list prices in USD per MTok passed explicitly below
    for name, inp, cw, cr, out in [("Sonnet 5", 2.0, 2.5, 0.2, 10.0), ("Opus 5.5", 4.0, 5.0, 0.2, 20.0)]:
        for total_m, out_k in [(1.5, 15), (3.0, 40), (8.0, 80)]:
            read = total_m * 0.90
            write = total_m * 0.08
            fresh = total_m * 0.02
            cost = read * cr + write * cw + fresh * inp + out_k / 1000 * out
            print(f"{name}: {total_m}M input tokens, {out_k}k output, 90% cache read: ${cost:.2f}")


if __name__ == "__main__":
    main()
