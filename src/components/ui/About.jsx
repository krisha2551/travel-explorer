import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./About.module.css";

function About() {
  const navigate = useNavigate();
  const countersRef = useRef([]);
  const revealRef = useRef([]);

  /* Animated Counters */
  useEffect(() => {
    const animateCounter = (el) => {
      const target = parseFloat(el.dataset.target);
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        if (isDecimal) el.textContent = current.toFixed(1);
        else if (target >= 1000) el.textContent = Math.floor(current).toLocaleString("en-IN") + "+";
        else el.textContent = Math.floor(current) + "+";
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.5 });

    countersRef.current.forEach(c => c && obs.observe(c));
    return () => obs.disconnect();
  }, []);

  /* Scroll Reveal */
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealRef.current.forEach(el => {
      if (el) { el.style.opacity = "0"; el.style.transform = "translateY(24px)"; el.style.transition = "opacity .5s ease, transform .5s ease"; obs.observe(el); }
    });
    return () => obs.disconnect();
  }, []);

  let ri = 0;
  const team = [
    { initials: "AR", name: "Aarav Rajan", role: "Founder & CEO", short: "Ex-GoTrip, 10+ years in hospitality and tech.", long: "Aarav founded TripVerse after realising India's travel industry deserved a modern, tech-first approach that never sacrifices the personal touch." },
    { initials: "PM", name: "Priya Menon", role: "Head of Operations", short: "Logistics expert, managed 1,000+ group trips.", long: "Priya ensures every TripVerse journey runs like clockwork — from transport coordination to emergency support." },
    { initials: "VK", name: "Vikram Kapoor", role: "Lead Developer", short: "Full-stack wizard, built the entire TripVerse platform.", long: "Vikram combines his love of code and travel to build intuitive tools that make trip discovery effortless." },
    { initials: "NS", name: "Neha Sharma", role: "Creative Director", short: "Photographer turned brand strategist, storytelling at heart.", long: "Neha crafts the visual identity of TripVerse, ensuring every touchpoint inspires the wanderlust within." },
  ];

  return (
    <>
      {/* Hero */}
      <section className={styles.aboutHero}>
        <div className={styles.container}>
          <h1>About <span className={styles.gradientText}>TripVerse</span></h1>
          <p>We're on a mission to make extraordinary travel accessible through curated experiences, expert guides, and unmatched hospitality.</p>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {[
              { icon: "🌍", target: "500", label: "Destinations" },
              { icon: "😊", target: "50000", label: "Happy Travellers" },
              { icon: "⭐", target: "4.9", label: "Avg Rating" },
              { icon: "🏆", target: "15", label: "Awards Won" },
            ].map((s, i) => (
              <div key={i} className={styles.statCard} ref={el => revealRef.current[ri++] = el}>
                <div className={styles.statIcon}>{s.icon}</div>
                <div className={styles.statNumber} data-target={s.target} ref={el => countersRef.current[i] = el}>0</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.mvSection}>
        <div className={styles.container}>
          <div className={styles.mvGrid}>
            <div className={styles.mvCard} ref={el => revealRef.current[ri++] = el}>
              <div className={styles.mvIcon}>🎯</div>
              <h3>Our Mission</h3>
              <p>To democratize premium travel experiences by connecting curious explorers with India's most awe-inspiring destinations. We believe every journey should be transformative, affordable, and deeply personal.</p>
            </div>
            <div className={styles.mvCard} ref={el => revealRef.current[ri++] = el}>
              <div className={styles.mvIcon}>🔭</div>
              <h3>Our Vision</h3>
              <p>To become India's most trusted travel platform where technology meets hospitality. We envision a world where booking your dream trip is as seamless as daydreaming about it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.sectionLabel}><span className={styles.dot}></span> Our Values</div>
            <h2 className={styles.sectionTitle}>What We <span className={styles.gradientText}>Stand For</span></h2>
          </div>
          <div className={styles.valuesGrid}>
            {[
              { emoji: "🤝", title: "Trust & Transparency", desc: "No hidden fees, no surprises. We practice radical honesty in pricing, itinerary details, and customer communication." },
              { emoji: "🌱", title: "Sustainability", desc: "We champion responsible travel. Every trip supports local communities, preserves natural habitats, and reduces carbon footprint." },
              { emoji: "✨", title: "Excellence", desc: "From hand-picked stays to expert guides, every detail is curated for an experience that exceeds expectations — every single time." },
              { emoji: "💡", title: "Innovation", desc: "We leverage cutting-edge technology to simplify travel planning while keeping the human touch that makes journeys memorable." },
            ].map((v, i) => (
              <div key={i} className={styles.valueCard} ref={el => revealRef.current[ri++] = el}>
                <h4><span>{v.emoji}</span> {v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.sectionLabel}><span className={styles.dot}></span> Our Team</div>
            <h2 className={styles.sectionTitle}>The <span className={styles.gradientText}>People</span> Behind TripVerse</h2>
          </div>
          <div className={styles.teamGrid}>
            {team.map((m, i) => (
              <div key={i} className={styles.teamCard} ref={el => revealRef.current[ri++] = el}>
                <div className={styles.teamAvatar}>{m.initials}</div>
                <h4>{m.name}</h4>
                <div className={styles.role}>{m.role}</div>
                <p>{m.short}</p>
                <div className={styles.teamOverlay}>
                  <h4>{m.name}</h4>
                  <div className={styles.role}>{m.role}</div>
                  <p>{m.long}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Checklist */}
      <section className={styles.checklistSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.sectionLabel}><span className={styles.dot}></span> Why Choose Us</div>
            <h2 className={styles.sectionTitle}>The TripVerse <span className={styles.gradientText}>Difference</span></h2>
          </div>
          <div className={styles.checklist}>
            {[
              { title: "Verified Properties & Stays", desc: "Every hotel, homestay and camp is personally inspected by our team before listing." },
              { title: "Flexible Cancellation", desc: "Plans change — and we get it. Free cancellation up to 72 hours before departure." },
              { title: "Small Group Sizes", desc: "Maximum 15 travellers per group for intimate, meaningful experiences." },
              { title: "All-Inclusive Pricing", desc: "Accommodation, meals, transport, and activities — all covered in one transparent price." },
              { title: "Safety First", desc: "Comprehensive insurance, trained guides, and 24/7 emergency support on every trip." },
            ].map((item, i) => (
              <div key={i} className={styles.checkItem} ref={el => revealRef.current[ri++] = el}>
                <div className={styles.checkIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-1)" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.aboutCta}>
        <div className={styles.container}>
          <div className={styles.ctaBanner}>
            <h2>Ready to <span className={styles.gradientText}>Join Us</span>?</h2>
            <p>Start exploring India's most incredible destinations today.</p>
            <button className={styles.btnPrimary} onClick={() => navigate("/trips")}>Explore Trips →</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;