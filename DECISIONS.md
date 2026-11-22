# Frontend Decisions Record

## Decision 1: Loading Failure Demonstration Control
* **Problem:** Users cannot complete tasks if the server fails, and there is no way to retry.
* **Decision:** Added a mock asynchronous loader with a visible "Simulate Loading Failure" checkbox on the Classes page.
* **Alternative:** Just let the page crash with a white screen.
* **Reason:** Allows users to recover gracefully and provides evidence for the assignment's edge-case testing.
* **Tradeoff:** Adds extra UI clutter, but it's a required demo control.
* **Code Location:** `src/pages/Classes.jsx` and `src/services/api.js`

## Decision 2: Shared State & Local Storage
* **Problem:** Users lose their selected classes if they refresh the page.
* **Decision:** Lifted the cart state up to `App.jsx` and synced it with `localStorage`.
* **Alternative:** Use React Context or Redux, but that is overkill for this app size.
* **Reason:** Ensures selections persist across page navigations and browser refreshes.
* **Tradeoff:** `App.jsx` becomes a bit larger as it manages the cart state.
* **Code Location:** `src/App.jsx` (`useEffect` and `useState` hooks).

## Decision 3: Immediate Form Feedback
* **Problem:** Users get frustrated when form errors only appear after clicking submit, or if valid input is cleared.
* **Decision:** Show inline red errors immediately under the fields when validation fails upon submission, while keeping valid input intact.
* **Alternative:** Use an alert popup, which is annoying and not accessible.
* **Reason:** Provides clear, specific feedback without losing the user's input.
* **Tradeoff:** Requires additional state management for the `errors` object.
* **Code Location:** `src/pages/Booking.jsx`