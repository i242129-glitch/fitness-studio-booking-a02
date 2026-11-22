
export function checkCapacity(session, quantity = 1) {
  const available = session.capacity - session.booked;

  if (quantity < 1) {
    return {
      valid: false,
      message: "Select at least one participant."
    };
  }

  if (quantity > available) {
    return {
      valid: false,
      message: `Only ${available} places are available.`
    };
  }

  return {
    valid: true,
    message: "Available places confirmed."
  };
}

export function checkEligibility(age, session) {
  if (!Number.isInteger(Number(age)) || Number(age) < session.minAge) {
    return {
      valid: false,
      message: `You must be at least ${session.minAge} years old.`
    };
  }

  return {
    valid: true,
    message: "Age requirement satisfied."
  };
}

export function checkBookingCutoff(session, currentTime = new Date()) {
  const sessionTime = new Date(session.startsAt);
  const minimumBookingTime = 2 * 60 * 60 * 1000;

  const remainingTime = sessionTime.getTime() - currentTime.getTime();

  if (remainingTime < minimumBookingTime) {
    return {
      valid: false,
      message: "Bookings must be made at least 2 hours before the session."
    };
  }

  return {
    valid: true,
    message: "Booking time requirement satisfied."
  };
}
