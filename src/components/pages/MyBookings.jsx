import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../context/AuthContext'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styles from './MyBookings.module.css'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const { user } = useContext(authContext)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      if (!user) {
        return
      }

      const fetchBookings = async () => {
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        )

        const snapshot = await getDocs(q)

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setBookings(data)
      }

      fetchBookings()
    } catch (error) {
      console.error("Error fetching bookings:", error)
    }
  }, [user])

  return (
    <>
      <section className={styles.heroSection}>
        <Container>
          <h1 className={styles.pageTitle}>My Bookings</h1>
          <p className={styles.pageSubtitle}>Manage and view all your trip bookings</p>
        </Container>
      </section>

      <section style={{ padding: "96px 0" }}>
        <Container>
          {bookings.length === 0 ? (
            <Row>
              <Col lg={8} className="mx-auto">
                <Card className={styles.emptyCard}>
                  <Card.Body className={styles.emptyBody}>
                    <div className={styles.emptyIcon}>✈️</div>
                    <h2 className={styles.emptyTitle}>No Bookings Yet</h2>
                    <p className={styles.emptyText}>
                      You haven't booked any trips yet. Start exploring amazing destinations today!
                    </p>
                    <Button
                      className={styles.exploreBtn}
                      onClick={() => navigate("/trips")}
                    >
                      🌍 Explore Trips
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <div>
              <h2 className={styles.bookingsCount}>
                📌 {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'}
              </h2>
              <Row className="g-4">
                {bookings.map((booking) => (
                  <Col key={booking.id} md={6} lg={4}>
                    <Card className={styles.bookingCard}>
                      <Card.Body>
                        <div className={styles.cardHeader}>
                          <h3 className={styles.tripName}>{booking.tripName}</h3>
                          <span className={styles.bookingBadge}>Confirmed</span>
                        </div>

                        <div className={styles.bookingDetails}>
                          <div className={styles.detailItem}>
                            <span className={styles.detailIcon}>💵</span>
                            <div>
                              <p className={styles.detailLabel}>Price per Person</p>
                              <p className={styles.detailValue}>₹{booking.tripPrice.toLocaleString('en-IN')}</p>
                            </div>
                          </div>

                          <div className={styles.detailItem}>
                            <span className={styles.detailIcon}>📅</span>
                            <div>
                              <p className={styles.detailLabel}>Trip Date</p>
                              <p className={styles.detailValue}>{booking.tripDate}</p>
                            </div>
                          </div>

                          <div className={styles.detailItem}>
                            <span className={styles.detailIcon}>👥</span>
                            <div>
                              <p className={styles.detailLabel}>Total Persons</p>
                              <p className={styles.detailValue}>{booking.totalPerson}</p>
                            </div>
                          </div>

                          <div className={styles.detailItem}>
                            <span className={styles.detailIcon}>💰</span>
                            <div>
                              <p className={styles.detailLabel}>Grand Total</p>
                              <p className={styles.detailValueGrand}>₹{booking.grandTotal.toLocaleString('en-IN')}</p>
                            </div>
                          </div>

                          {booking.specialRequest && (
                            <div className={styles.specialRequest}>
                              <span className={styles.requestIcon}>📝</span>
                              <div>
                                <p className={styles.requestLabel}>Special Request</p>
                                <p className={styles.requestText}>{booking.specialRequest}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className={styles.cardFooter}>
                          <Button
                            variant="outline-primary"
                            className={styles.contactBtn}
                            size="sm"
                          >
                            📞 Contact Support
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

export default MyBookings