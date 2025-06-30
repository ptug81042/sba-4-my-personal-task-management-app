# SBA 4: My Personal Task Management App

## Reflection
Building My Custom Task Tracker was both exciting and challenging. One of the main challenges I faced was managing state changes in a way that felt responsive and intuitive—especially with editing tasks and updating their status dynamically. Handling overdue logic required careful comparison of date strings, and I had to ensure that updating the task list didn’t override these changes accidentally.

To tackle these challenges, I broke the problem down into smaller pieces and focused first on core functionality: adding and storing tasks, then progressively added features like filtering and inline status updates. Using localStorage helped maintain persistence, but it also meant carefully managing updates to avoid stale or inconsistent data.

If I had more time, I would implement real-time validation feedback, better UX for editing (like toggling between edit/view modes in-place), and possibly refactor some repeated logic into more modular helper functions. I’d also consider integrating accessibility features and mobile optimizations. Overall, this project helped me practice working with the DOM, managing user input, and thinking through state-driven UI behavior in vanilla JavaScript.