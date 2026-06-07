import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { trips } from '../../data/tripsData'
import { Container, Row, Col, Button, Card, Badge, Form, FloatingLabel } from 'react-bootstrap'
import { authContext } from '../context/AuthContext'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import styles from './BookingsForm.module.css'

const BookingsForm = () => {
  const { id } = useParams()
  const selectedTrips = trips.find((t) => t.id === Number(id))
  const { user } = useContext(authContext)

  const [formData, setFormData] = useState({
    name: user.displayName,
    email: user.email,
    phone: "",
    grandTotal: 0,
    totalPerson: 1,
    specialRequest: null,
    tripDate: ""
  })

  const navigate = useNavigate()

  const handleChange = (identifier, e) => {
    setFormData((data) => {
      return {
        ...data,
        [identifier]: e.target.value
      }
    })
  }

  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        grandTotal: prevData.totalPerson * selectedTrips.price
      }
    })
  }, [formData.totalPerson, selectedTrips.price])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        tripDate: formData.tripDate,
        specialRequest: formData.specialRequest,
        totalPerson: formData.totalPerson,
        grandTotal: formData.grandTotal,
        tripId: id,
        tripName: selectedTrips.name,
        tripPrice: selectedTrips.price,
        createdAt: serverTimestamp(),
      })

      alert("🎉 Trip booked successfully! Check your bookings.")
      setFormData({
        name: user.displayName,
        email: user.email,
        phone: "",
        tripDate: "",
        specialRequest: "",
        totalPerson: 1,
        grandTotal: 0,
      })

      navigate("/myBookings")
    } catch (error) {
      console.log(error)
      alert("❌ Error booking trip. Please try again.")
    }
  }

  if (!selectedTrips) {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Card className={`${styles.notFoundCard} shadow`}>
              <Card.Body className="text-center py-5">
                <h2>📍 Trip Not Found</h2>
                <p className="text-muted">The trip you're trying to book doesn't exist.</p>
                <Button variant="primary" onClick={() => navigate("/trips")}>
                  ← Back to Trips
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <>
      <section className={styles.heroSection}>
        <Container>
          <h1 className={styles.pageTitle}>Complete Your Booking</h1>
          <p className={styles.pageSubtitle}>Confirm your details and secure your adventure</p>
        </Container>
      </section>

      <section style={{ padding: 'calc(8px * 12) 0' }}>
        <Container>
          <Row className="g-5">
            {/* Trip Info Card */}
            <Col lg={5}>
            <Card className={styles.tripCard}>
              <div className={styles.imageContainer}>
                <Card.Img 
                  variant="top" 
                  src={selectedTrips.image} 
                  className={styles.tripImage}
                />
              </div>
              <Card.Body>
                <h3 className={styles.tripTitle}>{selectedTrips.name}</h3>
                <p className={styles.destination}>📍 {selectedTrips.destination}</p>
                
                <div className={styles.badges}>
                  <Badge className={styles.badge}>{selectedTrips.duration}</Badge>
                  <Badge className={styles.badge}>⭐ {selectedTrips.rating}</Badge>
                  <Badge className={styles.badge}>{selectedTrips.difficulty}</Badge>
                </div>

                <div className={styles.priceBreakdown}>
                  <div className={styles.breakdownItem}>
                    <span>Price per Person</span>
                    <strong>₹{selectedTrips.price.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className={styles.breakdownItem}>
                    <span>Number of Persons</span>
                    <strong>{formData.totalPerson}</strong>
                  </div>
                  <div className={styles.breakdownDivider}></div>
                  <div className={styles.breakdownTotal}>
                    <span>Total Amount</span>
                    <strong>₹{formData.grandTotal.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Booking Form */}
          <Col lg={7}>
            <Card className={styles.formCard}>
              <Card.Body>
                <h3 className={styles.formTitle}>📋 Booking Details</h3>
                
                <Form onSubmit={handleSubmit} className={styles.form}>
                  
                  <div className={styles.formGroup}>
                    <FloatingLabel label="Full Name" className="mb-3">
                      <Form.Control 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => handleChange("name", e)}
                        className={styles.input}
                        placeholder="Your full name"
                      />
                    </FloatingLabel>
                  </div>

                  <div className={styles.formGroup}>
                    <FloatingLabel label="Email Address" className="mb-3">
                      <Form.Control 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => handleChange("email", e)}
                        className={styles.input}
                        placeholder="your@email.com"
                      />
                    </FloatingLabel>
                  </div>

                  <div className={styles.formGroup}>
                    <FloatingLabel label="Phone Number" className="mb-3">
                      <Form.Control 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e)}
                        className={styles.input}
                        placeholder="+91"
                        required
                      />
                    </FloatingLabel>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <FloatingLabel label="Trip Date" className="mb-3">
                        <Form.Control 
                          type="date" 
                          value={formData.tripDate}
                          onChange={(e) => handleChange("tripDate", e)}
                          className={styles.input}
                          required
                        />
                      </FloatingLabel>
                    </div>

                    <div className={styles.formGroup}>
                      <FloatingLabel label="Number of Persons" className="mb-3">
                        <Form.Control 
                          type="number" 
                          value={formData.totalPerson}
                          onChange={(e) => handleChange("totalPerson", e)}
                          className={styles.input}
                          min="1"
                          max="20"
                          required
                        />
                      </FloatingLabel>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <FloatingLabel label="Special Requests (Optional)" className="mb-3">
                      <Form.Control 
                        as="textarea"
                        rows={3}
                        value={formData.specialRequest || ""}
                        onChange={(e) => handleChange("specialRequest", e)}
                        className={styles.input}
                        placeholder="Any special requirements or preferences?"
                      />
                    </FloatingLabel>
                  </div>

                  <div className={styles.totalBox}>
                    <div className={styles.totalLabel}>Grand Total</div>
                    <div className={styles.totalAmount}>
                      ₹{formData.grandTotal.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className={styles.buttonGroup}>
                    <Button 
                      className={styles.bookBtn}
                      type='submit'
                    >
                      🎫 Confirm Booking
                    </Button>
                    <Button 
                      variant='outline-secondary'
                      onClick={() => navigate(-1)}
                      className={styles.cancelBtn}
                    >
                      ← Go Back
                    </Button>
                  </div>

                  <p className={styles.securNote}>
                    ✓ Secure checkout • Free cancellation • 24/7 support
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </section>
    </>
  )
}

export default BookingsForm