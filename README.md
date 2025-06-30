# SBA 4: My Personal Task Management App

## Reflection
Building My Custom Task Tracker was both an educational and rewarding experience. One of the more difficult challenges was managing dynamic state changes—particularly around task editing and live status updates. Ensuring overdue tasks updated correctly based on current dates pushed me to think carefully about data consistency and logic flow. I also had to prevent localStorage conflicts and stale data issues, which sharpened my understanding of client-side persistence.

To solve these, I adopted a layered approach: I first built out core functionality, then incrementally added filters, UI feedback, and input validation. Breaking things into small, testable components helped me isolate bugs quickly. Writing the overdue logic made me appreciate how tricky working with date strings can be without libraries.

If I had more time, I’d improve user experience with in-place editing, real-time form validation, and more semantic accessibility. I’d also refactor repetitive DOM logic into reusable utility functions. Long term, I’d like to explore syncing with a backend or expanding this into a mobile-friendly progressive web app.

Overall, this project deepened my comfort with vanilla JavaScript, event-driven UI design, and the importance of thoughtful UX.
