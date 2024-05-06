------Start Project-------

---Client--- 


- Install Packages : npm i

- Start Development : npm run dev


---Server--- 


- Install Packages : npm i

- Run : npm start



------Technology Stack------


- Node.js and npm

- Express.js

- MongoDB

- qrcode generator

- React.js

- Tailwind css

- Backend Implementation

- API Endpoints

- POST /signup:

- Validate input (username, password, phone, email)

- Check uniqueness of usernames

- Hash passwords securely (Bcryptjs)

- Store user data in the database


------Frontend Implementation------

---Signup Screen---

- Include fields for username, phone, email, password, terms and conditions.
- Implement validation for required fields and email format using React state management and validation libraries.
- Include terms and conditions checkbox.
- Display clear error and success messages.

---Login Screen---

- Include fields for username/email, password.
- Implement validation for required fields and email format using React state management and validation libraries.
- Display clear error and success messages.
- Redirect to the post list screen after successful signup using React Router.

---User Profile screen---

- Animated Profile user information card.
- Logout functionality.
- qr code where person can scan and get the user information. 

