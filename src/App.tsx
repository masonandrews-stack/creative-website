import { useId, useState } from "react";
import "./index.css";

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
const contactEmail = "mason.andrews@student.fairfield.edu";
const solutions = [
  {
    name: "Back support overlay",
    tag: "OUR STARTING POINT",
    description:
      "An add-on support concept for existing institutional chairs. Start with the chair you have, then evaluate a better fit for the people using it.",
    detail: "A removable overlay, proposed for a small seating pilot.",
    className: "overlay",
  },
  {
    name: "Seating refresh",
    tag: "EXTEND USEFUL LIFE",
    description:
      "Explore replacing worn pads, contact surfaces, or small components when the underlying chair is still sound.",
    detail:
      "Scope and material choices depend on an in-person furniture assessment.",
    className: "refresh",
  },
  {
    name: "Equipment adaptations",
    tag: "ASSESS THE POSSIBILITY",
    description:
      "Have another recurring equipment problem? Identify practical modifications before committing to a full replacement.",
    detail:
      "A discovery-led concept: feasibility and safety come before a proposal.",
    className: "adapt",
  },
];

function Chair({ mode = "overlay" }: { mode?: string }) {
  const diagramId = useId();
  return (
    <div className={`chair-diagram ${mode}`}>
      <svg
        viewBox="0 0 480 480"
        role="img"
        aria-labelledby={`chair-title-${diagramId}`}
      >
        <title id={`chair-title-${diagramId}`}>
          Concept illustration of an existing chair with an add-on back support
          overlay
        </title>
        <defs>
          <linearGradient
            id={`chair-gradient-${diagramId}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop stopColor="#d2ccb9" />
            <stop offset="1" stopColor="#a79e85" />
          </linearGradient>
        </defs>
        <ellipse cx="245" cy="425" rx="145" ry="22" fill="#103b3310" />
        <path
          d="M165 278 132 416M316 280l45 136M192 281l21 124M290 280l-17 125"
          stroke="#455b55"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="m151 250 151-19 64 54-163 30-75-37z"
          fill={`url(#chair-gradient-${diagramId})`}
          stroke="#9f967e"
          strokeWidth="2"
        />
        <path d="m128 278 75 37 163-30v13l-163 31-75-37z" fill="#8e8975" />
        <path
          d="m153 121 137-21 19 142-152 23z"
          fill={`url(#chair-gradient-${diagramId})`}
          stroke="#9f967e"
          strokeWidth="2"
        />
        <path d="m164 130 116-17 13 116-125 20z" fill="#e4decc" />
        <g className="support-piece">
          <path d="m162 157 117-18 15 81-126 20z" fill="#176454" />
          <path d="m176 163 88-13 10 55-92 14z" fill="#247866" />
          <path
            d="m181 175 83-12m-81 23 83-12m-81 23 83-12"
            stroke="#66a48d"
            strokeWidth="2"
          />
          <path
            d="m155 171 7 50m131-71 7 48"
            stroke="#cf9b51"
            strokeWidth="7"
          />
          <path
            d="m196 182 45-7"
            stroke="#eff3df"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
        <g className="seat-piece">
          <path d="m155 251 145-17 52 46-150 27-62-30z" fill="#b66942" />
          <path d="m166 253 130-14 43 38-135 24-53-24z" fill="#c98258" />
        </g>
        <path
          d="m281 168 64-37h54"
          fill="none"
          stroke="#176454"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle cx="282" cy="168" r="5" fill="#176454" />
        <text
          x="346"
          y="119"
          fontSize="11"
          fill="#176454"
          fontFamily="sans-serif"
        >
          ADD ON.
        </text>
        <text
          x="346"
          y="147"
          fontSize="11"
          fill="#176454"
          fontFamily="sans-serif"
        >
          KEEP USING.
        </text>
      </svg>
      <span className="diagram-label">CONCEPT STUDY / NOT A FINAL PRODUCT</span>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solution, setSolution] = useState(0);
  const [chairs, setChairs] = useState(200);
  const [replacement, setReplacement] = useState(180);
  const [upgrade, setUpgrade] = useState(35);
  const [institution, setInstitution] = useState("");
  const [space, setSpace] = useState("Classrooms");
  const [pilotChairs, setPilotChairs] = useState("25");
  const [inquiryReady, setInquiryReady] = useState(false);
  const replacementTotal = chairs * replacement;
  const upgradeTotal = chairs * upgrade;
  const savings = replacementTotal - upgradeTotal;
  const percent =
    replacementTotal > 0 ? Math.round((savings / replacementTotal) * 100) : 0;
  const emailBody = `Hi Mason,\n\nI'd like to explore a BackSupport pilot.\nInstitution: ${institution.trim() || "To be discussed"}\nSpace: ${space}\nProposed pilot size: ${pilotChairs} chairs\n\nPlease follow up about furniture fit, installation, safety requirements, and a scoped quote.\n\nThank you.`;
  const emailHref = `mailto:${contactEmail}?subject=${encodeURIComponent("BackSupport — campus pilot inquiry")}&body=${encodeURIComponent(emailBody)}`;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="BackSupport home">
          <span className="brand-icon" aria-hidden="true">
            b<span>↗</span>
          </span>
          back<span className="brand-light">support</span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close −" : "Menu +"}
        </button>
        <nav
          id="navigation"
          className={menuOpen ? "nav-open" : ""}
          aria-label="Main navigation"
        >
          {[
            ["Why retrofit", "why"],
            ["Our approach", "solutions"],
            ["Savings estimator", "savings"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="button button-dark nav-cta"
            href="#pilot"
            onClick={() => setMenuOpen(false)}
          >
            Explore a pilot <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero section-wrap" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> A SECOND LIFE FOR CAMPUS FURNITURE
            </p>
            <h1>
              Better support.
              <br />
              Less waste.
              <br />
              <em>Same chair.</em>
            </h1>
            <p className="hero-description">
              Your next furniture upgrade might already be on campus.
              BackSupport helps universities and institutions explore practical
              modifications to the chairs and equipment they already own.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#savings">
                See what you could save <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="#solutions">
                Meet the concept <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="hero-note">
              BUILT AROUND INSTITUTIONS. STARTING WITH SEATING.
            </p>
          </div>
          <div className="hero-visual">
            <div className="visual-top">
              <span>THE RETROFIT MINDSET</span>
              <span>01 / SEATING</span>
            </div>
            <Chair />
            <div className="visual-bottom">
              <span className="round-arrow" aria-hidden="true">
                ↻
              </span>
              <p>
                Keep what works.
                <br />
                <strong>Improve what doesn’t.</strong>
              </p>
              <span className="visual-stamp">
                RETHINK
                <br />
                REPLACE
              </span>
            </div>
          </div>
        </section>
        <div className="audience-strip">
          <span>MADE FOR THE SPACES YOU MANAGE</span>
          <p>
            Classrooms <i>✳</i> Libraries <i>✳</i> Study spaces <i>✳</i>{" "}
            Administrative offices
          </p>
        </div>
        <section className="section-wrap problem-section" id="why">
          <div className="section-intro">
            <p className="eyebrow">01 / THE OPPORTUNITY</p>
            <h2>
              A worn-out part shouldn’t mean
              <br />
              <em>a whole new purchase.</em>
            </h2>
          </div>
          <div className="problem-grid">
            <p className="large-copy">
              Institutions need functional spaces and responsible budgets. When
              a chair’s frame still works, replacing the entire chair may be
              more than the problem calls for.
            </p>
            <div className="benefit">
              <span>01</span>
              <h3>Make budgets go further.</h3>
              <p>
                Compare targeted upgrades with the full cost of new furniture
                before starting a replacement order.
              </p>
            </div>
            <div className="benefit">
              <span>02</span>
              <h3>Keep useful furniture in use.</h3>
              <p>
                Give serviceable items another chapter, with less material
                headed for disposal.
              </p>
            </div>
            <div className="benefit">
              <span>03</span>
              <h3>Start small. Learn first.</h3>
              <p>
                Test fit, day-to-day use, and feedback in one space before
                making a wider decision.
              </p>
            </div>
          </div>
        </section>
        <section className="solutions-section" id="solutions">
          <div className="section-wrap">
            <div className="section-intro split-intro">
              <div>
                <p className="eyebrow">02 / A PRACTICAL PLACE TO START</p>
                <h2>
                  Upgrade the experience.
                  <br />
                  <em>Keep the foundation.</em>
                </h2>
              </div>
              <p>
                Our starting concept is simple: a back support overlay for an
                existing chair. Explore it alongside other possible retrofit
                directions.
              </p>
            </div>
            <div
              className="solution-tabs"
              role="tablist"
              aria-label="Retrofit concepts"
            >
              {solutions.map((item, index) => (
                <button
                  id={`solution-tab-${index}`}
                  key={item.name}
                  role="tab"
                  aria-selected={solution === index}
                  aria-controls="solution-panel"
                  onClick={() => setSolution(index)}
                  onKeyDown={(event) => {
                    if (
                      ["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                        event.key,
                      )
                    ) {
                      event.preventDefault();
                      const next =
                        event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? solutions.length - 1
                            : (solution +
                                (event.key === "ArrowRight" ? 1 : -1) +
                                solutions.length) %
                              solutions.length;
                      setSolution(next);
                      document.getElementById(`solution-tab-${next}`)?.focus();
                    }
                  }}
                  tabIndex={solution === index ? 0 : -1}
                >
                  <span>0{index + 1}</span>
                  {item.name}
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <div
              className="solution-panel"
              id="solution-panel"
              role="tabpanel"
              aria-labelledby={`solution-tab-${solution}`}
            >
              <div className="solution-visual">
                <Chair mode={solutions[solution].className} />
              </div>
              <div className="solution-copy">
                <p className="eyebrow">{solutions[solution].tag}</p>
                <h3>{solutions[solution].name}</h3>
                <p>{solutions[solution].description}</p>
                <div className="concept-note">
                  <span aria-hidden="true">↳</span>
                  {solutions[solution].detail}
                </div>
                <a className="text-link" href="#pilot">
                  Discuss your furniture <span aria-hidden="true">↗</span>
                </a>
                <small>
                  Concept-stage venture. Fit, durability, safety, and any
                  comfort benefits require evaluation. No medical or ergonomic
                  certification is claimed.
                </small>
              </div>
            </div>
          </div>
        </section>
        <section className="section-wrap savings-section" id="savings">
          <div className="section-intro split-intro">
            <div>
              <p className="eyebrow">03 / PUT IT IN PERSPECTIVE</p>
              <h2>
                A smaller change.
                <br />
                <em>A different budget.</em>
              </h2>
            </div>
            <p>
              Try your own numbers. This planning tool compares a full
              replacement with a per-chair retrofit, so you can see whether a
              pilot is worth exploring.
            </p>
          </div>
          <div className="calculator">
            <div className="calculator-inputs">
              <h3>Your campus. Your assumptions.</h3>
              <label htmlFor="chair-count">
                Chairs to evaluate{" "}
                <output htmlFor="chair-count">{chairs.toLocaleString()}</output>
              </label>
              <input
                id="chair-count"
                type="range"
                min="10"
                max="2000"
                step="10"
                value={chairs}
                onChange={(e) => setChairs(Number(e.target.value))}
              />
              <div className="range-labels">
                <span>10 chairs</span>
                <span>2,000 chairs</span>
              </div>
              <div className="cost-inputs">
                <label htmlFor="replacement">
                  New chair cost ($)
                  <input
                    id="replacement"
                    type="number"
                    min="0"
                    max="10000"
                    step="1"
                    value={replacement}
                    onChange={(e) =>
                      setReplacement(
                        Math.min(10000, Math.max(0, Number(e.target.value))),
                      )
                    }
                  />
                </label>
                <label htmlFor="upgrade">
                  Upgrade cost / chair ($)
                  <input
                    id="upgrade"
                    type="number"
                    min="0"
                    max="10000"
                    step="1"
                    value={upgrade}
                    onChange={(e) =>
                      setUpgrade(
                        Math.min(10000, Math.max(0, Number(e.target.value))),
                      )
                    }
                  />
                </label>
              </div>
              <p className="calculator-note">
                Illustrative inputs, not BackSupport pricing. Include parts and
                labor in your upgrade estimate. Shipping, tax, disposal,
                repairs, and future maintenance are excluded. Structural
                suitability must be assessed separately.
              </p>
            </div>
            <div
              className="calculator-result"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="eyebrow">
                {savings >= 0
                  ? "POTENTIAL UPFRONT SAVINGS"
                  : "ADDITIONAL UPFRONT COST"}
              </p>
              <strong className="savings-number">
                {money(Math.abs(savings))}
              </strong>
              <p className="savings-percent">
                {savings >= 0
                  ? `${percent}% less than full replacement`
                  : "These assumptions favor replacement on cost."}
              </p>
              <dl>
                <div>
                  <dt>Full replacement</dt>
                  <dd>{money(replacementTotal)}</dd>
                </div>
                <div>
                  <dt>Targeted upgrades</dt>
                  <dd>{money(upgradeTotal)}</dd>
                </div>
                <div>
                  <dt>Existing chairs evaluated for reuse</dt>
                  <dd>{chairs.toLocaleString()}</dd>
                </div>
              </dl>
              <a href="#pilot" className="button button-cream">
                Turn an estimate into a conversation{" "}
                <span aria-hidden="true">↗</span>
              </a>
              <small>
                Estimated difference = chair count × (new chair cost − upgrade
                cost). Reuse is not guaranteed.
              </small>
            </div>
          </div>
        </section>
        <section className="process-section">
          <div className="section-wrap">
            <div className="section-intro">
              <p className="eyebrow">04 / FROM IDEA TO EVIDENCE</p>
              <h2>
                One room before
                <br />
                <em>the whole campus.</em>
              </h2>
            </div>
            <div className="process-grid">
              {[
                [
                  "Assess what you have",
                  "Share the furniture type, recurring problem, and location. Identify sound items and screen out unsafe or unsuitable equipment.",
                ],
                [
                  "Scope a small pilot",
                  "Agree on a proposed modification, fit checks, installation approach, costs, and institutional approval requirements.",
                ],
                [
                  "Evaluate before expanding",
                  "Collect user and facilities feedback. Compare the total cost and practicality before deciding whether to scale.",
                ],
              ].map(([title, description], i) => (
                <article key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section-wrap pilot-section" id="pilot">
          <div className="pilot-copy">
            <p className="eyebrow">05 / LET’S START WITH YOUR SPACE</p>
            <h2>
              Before you replace it,
              <br />
              <em>rethink it.</em>
            </h2>
            <p>
              Managing facilities, procurement, or campus sustainability? Tell
              us where the friction is. Let’s explore whether a practical
              retrofit could help.
            </p>
            <a className="text-link" href={`mailto:${contactEmail}`}>
              Contact Mason Andrews <span aria-hidden="true">↗</span>
            </a>
            <p className="pilot-disclosure">
              BackSupport is a student venture concept. This is an exploratory
              inquiry, not a purchase or a commitment. No information is sent or
              stored by this website.
            </p>
          </div>
          <form
            className="pilot-form"
            onSubmit={(e) => {
              e.preventDefault();
              setInquiryReady(true);
            }}
          >
            <h3>Explore a campus pilot</h3>
            <label htmlFor="institution">
              Institution or organization
              <input
                id="institution"
                value={institution}
                onChange={(e) => {
                  setInstitution(e.target.value);
                  setInquiryReady(false);
                }}
                required
                maxLength={120}
                placeholder="Your university or institution"
                autoComplete="organization"
              />
            </label>
            <div className="form-row">
              <label htmlFor="space">
                Where would you start?
                <select
                  id="space"
                  value={space}
                  onChange={(e) => {
                    setSpace(e.target.value);
                    setInquiryReady(false);
                  }}
                >
                  <option>Classrooms</option>
                  <option>Library / study space</option>
                  <option>Administrative offices</option>
                  <option>Other equipment / space</option>
                </select>
              </label>
              <label htmlFor="pilot-size">
                Approximate chairs
                <select
                  id="pilot-size"
                  value={pilotChairs}
                  onChange={(e) => {
                    setPilotChairs(e.target.value);
                    setInquiryReady(false);
                  }}
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100+</option>
                  <option>Not sure yet</option>
                </select>
              </label>
            </div>
            <button className="button button-dark" type="submit">
              Prepare my inquiry <span aria-hidden="true">↗</span>
            </button>
            <p className="form-help">
              We’ll prepare an email for you to review and send in your email
              app.
            </p>
            {inquiryReady && (
              <div className="inquiry-ready" role="status">
                <strong>Your inquiry is ready.</strong>
                <p>
                  {institution} · {space} · {pilotChairs} chairs
                </p>
                <a href={emailHref} className="text-link">
                  Open email draft ↗
                </a>
                <small>
                  No email app? Send your details to{" "}
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                </small>
              </div>
            )}
          </form>
        </section>
        <section className="faq-section section-wrap">
          <div>
            <p className="eyebrow">A FEW PRACTICAL QUESTIONS</p>
            <h2>
              Good questions.
              <br />
              <em>Honest answers.</em>
            </h2>
          </div>
          <div className="faq-list">
            {[
              [
                "Will this fit every chair?",
                "No. Furniture dimensions, condition, use, and institutional requirements vary. A fit and safety assessment would come before any pilot. Damaged or unsafe furniture should not be kept in use.",
              ],
              [
                "Are these prices or guaranteed savings?",
                "No. The estimator uses editable assumptions to compare two scenarios. Actual pricing, labor, installation, and lifecycle costs would need a scoped quote.",
              ],
              [
                "Who is BackSupport for?",
                "Universities and other institutions with facilities, procurement, or sustainability teams that want to explore extending the useful life of furniture and equipment.",
              ],
              [
                "Can we order a back support today?",
                "Not yet. BackSupport is a student venture at the concept stage. The next step is an exploratory conversation and a potential pilot, rather than an online order.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="section-wrap footer-top">
          <a className="brand" href="#top">
            back<span className="brand-light">support</span>
          </a>
          <p>Better use of what’s already here.</p>
          <a href="#top">Back to top ↑</a>
        </div>
        <div className="section-wrap footer-bottom">
          <span>
            © {new Date().getFullYear()} BackSupport · A student marketing
            venture
          </span>
          <a href="https://masonandrews-stack.github.io/">
            A project by Mason Andrews ↗
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
