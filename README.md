# E-ReCycle

**Description:**

E-ReCycle empowers users to responsibly manage electronic waste by providing a smart platform to sell, donate, or dispose of their devices. It leverages AI to categorize e-waste and connects users with a network of buyers, organizations, and certified recyclers.

**Key Features:**

* AI-powered e-waste categorization
* Integrated marketplace for buying and selling
* Donation platform connecting users with organizations
* Disposal options with certified recyclers

**Tech Stack:**

* **Front-End:** React + Vite
* **Back-End & Data:** Google Firebase (Firestore, Authentication, Cloud Storage)
* **AI:** Gemini API
* **Location:** Google Maps APIs

**Development Steps:**

* **1. Clone the repository:**
    ```bash
    git clone https://github.com/AvishkarPatil/E-ReCycle
    ```

* **2. Navigate to the project directory:**
    ```bash
    cd e-recycle
    ```

* **3. Install dependencies:**
    ```bash
    npm install or yarn install
    ```

* **4. Set up Firebase:**
    * Create a Firebase project and configure your Firebase credentials.
    * Add your Firebase configuration to the appropriate file (e.g., `src/firebase.js`).

* **5. Run the development server:**
    ```bash
    npm run dev or yarn dev
    ```

* **6. Access the application:** Open your browser and navigate to the development server's URL (usually `http://localhost:3000`).

**Deployment:**

* **Front-End (Vercel):**
    * Connect your GitHub repository to Vercel.
    * Configure Vercel project settings (e.g., environment variables).
    * Deploy your React application.

* **Back-End (Firebase):**
    * Deploy Firebase Cloud Functions (if applicable): `firebase deploy --only functions`
    * Firebase Hosting (if applicable): `firebase deploy --only hosting`

**Future Development:**

* Mobile apps, advanced AI, blockchain, and data analytics.
