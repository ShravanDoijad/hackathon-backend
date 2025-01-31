import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51QnOOT4RjNzhzn9IxX4759cv0YeCw8O25MlHAk2tHG1AhSPfIbj9I3umC4LpYsdQ8wheAeUA8sLERiAPr7Y8D6LI00WJOfkCJh");

const PaymentForm = ({ selectedDate, pricePerPerson, totalAmount, setTotalAmount, persons, setPersons, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:4000/payment/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });
  
      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error("Failed to parse response as JSON:", jsonError);
        throw new Error("Invalid response from server");
      }
  
      if (!response.ok) {
        throw new Error(responseData.error || "Payment creation failed");
      }
  
      const { clientSecret } = responseData;
      console.log("Client Secret:", clientSecret);
  
      const cardElement = elements.getElement(CardElement);
      console.log("Card Element:", cardElement);
  
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
  
      if (error) {
        console.error("Payment error:", error);
        alert(`Payment failed: ${error.message}`);
      } else {
        console.log("Payment successful:", paymentIntent);
        alert("Payment successful!");
        navigate("/payment-success");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Final Booking</h2>
      <p><strong>Selected Date:</strong> {selectedDate}</p>
      <p><strong>Price Per Person:</strong> ${pricePerPerson}</p>
      <div className="mt-4">
        <label className="block mb-2">Select Number of Persons:</label>
        <input
          type="number"
          min="1"
          value={persons}
          onChange={(e) => setPersons(parseInt(e.target.value) || 1)}
          className="border p-2 rounded w-full"
        />
      </div>
      <p className="mt-4 text-lg font-semibold">Total Amount: ${totalAmount}</p>

      <form onSubmit={handlePayment} className="mt-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Enter Payment Details</h3>
        <CardElement className="p-3 border rounded mb-4" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Pay ${totalAmount}
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-6">Local Tourism Contacts</h3>
      <div className="mt-4">
      </div>
    </div>
  );
};

const FinalBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDate, pricePerPerson } = location.state || {};

  const [persons, setPersons] = useState(1);
  const [totalAmount, setTotalAmount] = useState(pricePerPerson);

  useEffect(() => {
    if (!isNaN(persons) && !isNaN(pricePerPerson)) {
      setTotalAmount(persons * pricePerPerson);
    }
  }, [persons, pricePerPerson]);

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        selectedDate={selectedDate}
        pricePerPerson={pricePerPerson}
        totalAmount={totalAmount}
        setTotalAmount={setTotalAmount}
        persons={persons}
        setPersons={setPersons}
        navigate={navigate}
      />
    </Elements>
  );
};

export default FinalBooking;