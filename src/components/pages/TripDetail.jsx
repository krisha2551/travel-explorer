import { Container, Row, Col, Image, Card, Button, Badge, ListGroup, Accordion } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { trips } from "../../data/tripsData";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import styles from "./TripDetail.module.css";

const TripDetail = () => {
  const { id } = useParams();
  const trip = trips.find((t) => t.id === Number(id));
  const navigate = useNavigate();
  const { user } = useContext(authContext);

  const handleBook = () => {
    if (!user) {
      navigate("/auth");
    } else {
      navigate(`/booking/${id}`);
    }
  };

  if (!trip) {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Card className={`${styles.notFoundCard} shadow`}>
              <Card.Body className="text-center py-5">
                <h2 className="mb-3">📍 Trip Not Found</h2>
                <p className="text-muted mb-4">The trip you're looking for doesn't exist.</p>
                <Button variant="primary" onClick={() => navigate("/trips")}>
                  ← Back to Trips
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <section className={styles.heroSection}>
        <Image src={trip.image} className={styles.heroImage} alt={trip.name} />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <Container>
            <Button 
              className={styles.backBtn}
              onClick={() => navigate("/trips")}
            >
              ← Back
            </Button>
            <h1 className={styles.heroTitle}>{trip.name}</h1>
            <p className={styles.heroLocation}>📍 {trip.destination}</p>
            <div className={styles.badges}>
              <Badge className={styles.badge}>{trip.duration}</Badge>
              <Badge className={styles.badge}>⭐ {trip.rating}</Badge>
              <Badge className={styles.badge}>{trip.difficulty}</Badge>
            </div>
          </Container>
        </div>
      </section>

      <section style={{ padding: 'calc(8px * 12) 0' }}>
        <Container>
          <Row className="g-5">
          <Col lg={8}>
            {/* Overview Section */}
            <Card className={styles.section}>
              <Card.Body>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>✨ Overview</h3>
                </div>
                <p className={styles.sectionText}>{trip.overview}</p>
              </Card.Body>
            </Card>

            {/* Highlights Section */}
            <Card className={styles.section}>
              <Card.Body>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>⭐ Trip Highlights</h3>
                </div>
                <ListGroup variant="flush" className={styles.highlightsList}>
                  {trip.highlights.map((highlight, idx) => (
                    <ListGroup.Item key={idx} className={styles.highlightItem}>
                      <span className={styles.highlightIcon}>✓</span>
                      {highlight}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>

            {/* Itinerary Section */}
            <Card className={styles.section}>
              <Card.Body>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>🗓️ Day-wise Itinerary</h3>
                </div>
                <Accordion className={styles.accordion}>
                  {trip.itinerary.map((item) => (
                    <Accordion.Item key={item.day} eventKey={item.day.toString()}>
                      <Accordion.Header className={styles.accordionHeader}>
                        <span className={styles.dayBadge}>Day {item.day}</span>
                        <span className={styles.dayTitle}>{item.title}</span>
                      </Accordion.Header>
                      <Accordion.Body className={styles.accordionBody}>
                        {item.description}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Card.Body>
            </Card>

            {/* Inclusions & Exclusions */}
            <Row className="gap-3">
              <Col md={6}>
                <Card className={styles.section}>
                  <Card.Body>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>✅ Inclusions</h3>
                    </div>
                    <ListGroup variant="flush" className={styles.list}>
                      {trip.inclusions.map((item, idx) => (
                        <ListGroup.Item key={idx} className={styles.listItem}>
                          <span className={styles.checkIcon}>✓</span>
                          {item}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className={styles.section}>
                  <Card.Body>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>✖️ Exclusions</h3>
                    </div>
                    <ListGroup variant="flush" className={styles.list}>
                      {trip.exclusions.map((item, idx) => (
                        <ListGroup.Item key={idx} className={styles.listItem}>
                          <span className={styles.crossIcon}>✕</span>
                          {item}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Best Time to Visit */}
            <Card className={styles.section}>
              <Card.Body>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>🌞 Best Time to Visit</h3>
                </div>
                <p className={styles.bestTimeText}>{trip.bestTimeToVisit}</p>
              </Card.Body>
            </Card>
          </Col>

          {/* Booking Sidebar */}
          <Col lg={4}>
            <Card className={`${styles.bookingCard} sticky-lg-top`}>
              <Card.Body>
                <div className={styles.priceBox}>
                  <span className={styles.priceLabel}>Package Price</span>
                  <h2 className={styles.priceValue}>₹{trip.price.toLocaleString('en-IN')}</h2>
                  <p className={styles.priceNote}>Per person</p>
                </div>

                <div className={styles.tripInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📅</span>
                    <div>
                      <p className={styles.infoLabel}>Duration</p>
                      <p className={styles.infoValue}>{trip.duration}</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>📊</span>
                    <div>
                      <p className={styles.infoLabel}>Difficulty</p>
                      <p className={styles.infoValue}>{trip.difficulty}</p>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>⭐</span>
                    <div>
                      <p className={styles.infoLabel}>Rating</p>
                      <p className={styles.infoValue}>{trip.rating}/5</p>
                    </div>
                  </div>
                </div>

                <div className={`d-grid gap-2 ${styles.buttonGroup}`}>
                  <Button 
                    className={styles.bookBtn}
                    onClick={handleBook}
                  >
                    🎫 Book Now
                  </Button>
                  <Button 
                    variant="outline-primary"
                    className={styles.inquiryBtn}
                  >
                    💬 Send Inquiry
                  </Button>
                </div>

                <p className={styles.trustText}>
                  ✓ Secure booking • Free cancellation • 24/7 support
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </section>
    </>
  );
};

export default TripDetail;
