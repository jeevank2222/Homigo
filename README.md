# 🏠 Homigo

A full-stack listing platform where users can discover and share **Homes, Experiences, and Services**.

Homigo allows users to explore listings, search by location and price, create their own listings, upload images, leave reviews, and manage their content.

---

## 🔗 Live Demo & Repository

* 🌐 **Live Demo:** https://homigo-0n2c.onrender.com
* 💻 **GitHub Repository:** https://github.com/jeevank2222/Homigo

---

## ✨ Features

### 🏡 Listing Categories

Homigo supports three types of listings:

* 🏠 **Homes** — Find places to stay.
* 🏔️ **Experiences** — Discover activities and experiences.
* 🛎️ **Services** — Discover services offered by users.

Users can browse listings based on these categories.

### 🔐 Authentication & Authorization

* User registration and login
* Authentication using Passport.js
* Session-based authentication
* Only logged-in users can create listings
* Only listing owners can edit or delete their listings
* Only logged-in users can create reviews
* Users can delete only reviews they created

### 🏠 Listing Management

Users can:

* Create listings
* Edit listings
* Delete listings
* Upload listing images
* Add descriptions
* Set prices
* Add location and country
* Select a listing category

### 🔎 Search

Users can search listings using:

* Location
* Country
* Title
* Maximum price

### ⭐ Reviews & Ratings

* Users can leave reviews on listings
* Reviews contain ratings and comments
* Each review is associated with its author
* Only the review author can see the Delete button
* Backend authorization prevents unauthorized review deletion

### 🗺️ Location & Maps

* Listing locations are converted into geographical coordinates
* OpenStreetMap Nominatim is used for geocoding
* Listings can display their location on a map

### 🖼️ Image Upload

* Users can upload listing images
* Images are stored using Cloudinary
* Images can be updated when editing a listing

### 🌙 Dark Mode

* Light mode
* Dark mode
* Dark-mode styling for cards, forms, search, and reviews

### 📱 Responsive Design

The interface is designed to work across:

* Desktop
* Mobile

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* EJS
* Bootstrap

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* Passport.js
* Passport Local Strategy
* Express Session

### External Services

* MongoDB Atlas — Database
* Cloudinary — Image storage
* OpenStreetMap Nominatim — Geocoding
* Map integration — Listing locations

---

## 📂 Project Structure

```text
Homigo/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── public/
│   ├── css/
│   └── js/
│
├── util/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── middleware.js
├── app.js
├── cloudConfig.js
├── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

Replace https://github.com/jeevank2222/Homigo with your actual GitHub repository URL.

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Example:

```bash
git clone https://github.com/yourusername/Homigo.git
```

### 2. Go to the project directory

```bash
cd Homigo
```

### 3. Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory of the project.

Your `.env` should contain:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### ⚠️ Important

Do **not** upload your `.env` file to GitHub.

Your `.gitignore` should contain:

```text
.env
node_modules/
```

Never expose:

* MongoDB password
* Cloudinary API secret
* Session secret

---

## ▶️ Run the Project Locally

Start the application:

```bash
npm start
```

If you use Nodemon:

```bash
npm run dev
```

The application will run at:

```text
http://localhost:8080
```

The application uses the deployment-provided port when available:

```js
const port = process.env.PORT || 8080;
```

---

## 🌐 Deployment

The application can be deployed on platforms such as Render or other Node.js hosting services.

Before deploying:

1. Add your environment variables to the hosting platform.
2. Add your MongoDB Atlas connection string.
3. Add your Cloudinary credentials.
4. Add your session secret.
5. Make sure MongoDB Atlas allows your deployment server to connect.
6. Use the hosting platform's `PORT` environment variable.

Example:

```js
const port = process.env.PORT || 8080;
```

---

## 🔐 Authorization

Homigo uses authentication and authorization to protect user actions.

### Listings

Only the owner of a listing can:

* Edit the listing
* Delete the listing

### Reviews

Only the author of a review can:

* See the Delete button
* Delete their review

The backend also verifies review ownership before allowing deletion.

---

## 🧭 Application Flow

```text
User
 │
 ├── Register / Login
 │
 ├── Browse Listings
 │      ├── Homes
 │      ├── Experiences
 │      └── Services
 │
 ├── Search Listings
 │
 ├── View Listing
 │      ├── Images
 │      ├── Location
 │      ├── Map
 │      └── Reviews
 │
 ├── Create Listing
 │
 └── Leave Review
        │
        └── Delete Own Review
```

---

## 📸 Screenshots

### Home Page
![Home Page](screenshots/darkmode.png)

### Listing Page

![Home Page](screenshots/listing.png)

### Review

![Home Page](screenshots/review.png)


---

## 🚀 Future Improvements

Some possible future improvements:

* Booking functionality
* Wishlist / favorites
* User profiles
* Advanced filtering
* Availability calendar
* Online payments
* Email notifications
* Improved mobile UI

---

## 👨‍💻 Author

**JEEVAN**

* GitHub: https://github.com/jeevank2222
* Live Project: https://homigo-0n2c.onrender.com

Replace the placeholders above with your actual information.

---

## 📄 License

This project was created for educational and portfolio purposes.

```
```
