import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { trips } from "../../data/tripsData";
import styles from "./Trips.module.css";

function Trips() {
  const navigate = useNavigate();
  const [filterDest, setFilterDest] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterDiff, setFilterDiff] = useState("all");

  const uniqueDestinations = [...new Set(trips.map(t => t.destination))];

  const filtered = trips.filter(t => {
    if (filterDest !== "all" && t.destination !== filterDest) return false;
    if (filterDiff !== "all" && t.difficulty.toLowerCase() !== filterDiff) return false;
    if (filterPrice !== "all") {
      const price = t.price;
      if (filterPrice === "0-50000" && price > 50000) return false;
      if (filterPrice === "50000-100000" && (price < 50000 || price > 100000)) return false;
      if (filterPrice === "100000-150000" && (price < 100000 || price > 150000)) return false;
      if (filterPrice === "150000+" && price < 150000) return false;
    }
    return true;
  });

  const resetFilters = () => {
    setFilterDest("all");
    setFilterPrice("all");
    setFilterDiff("all");
  };

  /* Scroll reveal */
  const cardsRef = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    cardsRef.current.forEach(el => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity .5s ease, transform .5s ease";
        obs.observe(el);
      }
    });
    return () => obs.disconnect();
  }, [filtered]);

  return (
    <>
      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className={styles.container}>
          <h1>Explore <span className={styles.gradientText}>Trips</span></h1>
          <p>Discover curated adventures across the world's most breathtaking destinations</p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.container}>
          <div className={styles.filterGroup}>
            <label>Destination</label>
            <select className={styles.filterSelect} value={filterDest} onChange={e => setFilterDest(e.target.value)}>
              <option value="all">All Destinations</option>
              {uniqueDestinations.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Price</label>
            <select className={styles.filterSelect} value={filterPrice} onChange={e => setFilterPrice(e.target.value)}>
              <option value="all">Any Price</option>
              <option value="0-50000">Under ₹50,000</option>
              <option value="50000-100000">₹50,000 – ₹1,00,000</option>
              <option value="100000-150000">₹1,00,000 – ₹1,50,000</option>
              <option value="150000+">₹1,50,000+</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>Difficulty</label>
            <select className={styles.filterSelect} value={filterDiff} onChange={e => setFilterDiff(e.target.value)}>
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="challenging">Challenging</option>
            </select>
          </div>
          <button className={styles.filterReset} onClick={resetFilters}>Reset</button>
          <div className={styles.filterCount}>Showing <span>{filtered.length}</span> trips</div>
        </div>
      </div>

      {/* Trip Grid */}
      <section className={styles.tripsSection}>
        <div className={styles.container}>
          <div className={styles.tripsGrid}>
            {filtered.length === 0 ? (
              <div className={styles.noResults}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                <h3>No trips found</h3>
                <p>Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              filtered.map((t, i) => (
                <div key={t.id} className={styles.tripCard} ref={el => cardsRef.current[i] = el}>
                  <div className={styles.imageWrap}>
                    <img src={t.image} alt={t.name} loading="lazy" />
                    <div className={styles.priceBadge}>₹{t.price.toLocaleString("en-IN")}</div>
                    <div className={`${styles.difficultyBadge} ${styles[t.difficulty.toLowerCase()]}`}>
                      {t.difficulty}
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.tags}>
                      {(t.highlights || []).slice(0, 3).map((tag, j) => (
                        <span key={j}>{tag}</span>
                      ))}
                    </div>
                    <h3>{t.name}</h3>
                    <div className={styles.meta}>
                      <div className={styles.metaItem}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>
                        {t.destination}
                      </div>
                      <div className={styles.metaItem}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                        {t.duration}
                      </div>
                    </div>
                    <div className={styles.cardFooter}>
                      <div className={styles.rating}>
                        <svg viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        {t.rating}
                      </div>
                      <button className={styles.viewBtn} onClick={() => navigate(`/trip/${t.id}`)}>
                        View Details <span className={styles.arrow}>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Trips;
