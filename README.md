# Snap Vault

## Snap vault is a one stop solution gallery app for you to store your images on the cloud.

## Author - Varun Chauhan

### Table of Contents

- Features
- Getting Started
- Usage
- Technologies Used
- Contributions

### Features

#### User Authentication:

- Allow users to register and log in securely.
- Implement JWT-based authentication for secure user sessions.

#### Image Upload:

- Enable users to upload images to their gallery.
- Support various image formats (e.g., JPEG, PNG).

#### Image Deletion:

- Provide an option for users to delete their uploaded images.

#### Image Display:

- Display user-uploaded images in an organized and visually appealing manner.
- Implement a responsive masonry layout for image presentation.

#### Image Zoom:

- Allow users to click on an image to view it in a larger or zoomed-in format.
- Provide an option to close the zoomed image view.

#### Pagination:

- Implement pagination for a smooth browsing experience.
- Display a limited number of images per page.

#### Loading Bar:

- Include a loading bar to indicate the progress of image uploads or other asynchronous tasks.

#### Responsive Design:

- Ensure that the app is responsive and works well on various devices and screen sizes.

#### Email Verification:

- Implement email verification for new user registrations.
- Send confirmation emails with a unique code for account activation.

#### Password Security:

- Enforce strong password policies for user accounts.
- Use password hashing to securely store user passwords.

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/VarunChauhan23/Snap-Vault.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Snap-Vault
   ```

3. Navigate to the backend folder
   ```bash
   cd Backend
   ```
   
      install dependencies using

   ```bash
   npm install
   ```

4. Create a .env folder in your root directory of Backend
   ```bash
   echo. > .env
   ```

5. Now in .env file add these environment variables
   - app_Port=5000
   - DB_String="Your_Mongo_DB_Connection_String"
   - Cloudinary_Cloud_Name=Your_Cloudinary_Name
   - Cloudinary_Api_Key=Your_Cloudinary_API_Key
   - Cloudinary_Api_Secret=Your_Cloudinary_API_Secret
   - JWT_Secret="Your_JWT_Secret"
   - Owner_Email=Your_Gmail
   - Email_Password=Your_Gmail_Password

- Note -->
  - If you are getting error regarding connection of gmail through your password, try creating an app password in your google account and then enter that app password in place of "Your_Gmail_Password".
  - Please note that add the .env variables as it is i.e., if the definition of a varibale is in double quotes then add that variable value in double quotes.
    eg. - above DB_String has definition in double quotes = "Your_Mongo_DB_Connection_String",
    then add the string in double quotes.
  - You can find cloudinary configurations in your cloudinary dashboard after creating an account.

6. Start your backend server by running

```bash
npm start
```

7. If everything goes OK then you have this message on the console

- Example app listening on port 5000
- Connected to mongo seccessfully

8. Now navigate to the Frontend folder using

```bash
cd ../.\Frontend\
```

   install dependencies using

```bash
npm install
```

9. Create a .env folder in your root directory of Frontend
    ```bash
    echo. > .env
    ```

10. Now in .env file add these environment variables
    - REACT_APP_Authentication_Base_URL=http://localhost:5000/api/auth
    - REACT_APP_Image_Base_URL=http://localhost:5000/api/image

- Note -->
  - If you have changed the port of backend above then change this in these urls also
  - Here "/api/auth" and "/api/image" are the endpoints.

11. Start your application by running

```bash
npm start
```

12. Now you will be able to run the application on your local host i.e.,

```bash
http://localhost:3000/
```

#### Usage

- Open the app in your web browser at http://localhost:3000.
  1. You will have some images at home page to preview
  2. In order to upload image, follow these steps
     - Sign Up using a valid email
     - Enter otp sent to you email
     - After completing signup you will be redirected to login page
     - After log in you willl be redirected to MyImages page, where you can upload your images and delete them as well.

#### Technologies Used

- React (For frontend design)
- Material UI
- Node.js
- Express
- MongoDB (To store user as well as images data)
- Cloudinary (To store images online on the cloud)
- Axios (To make API call)

#### Contribution

- Contributions are welcome! Feel free to open issues or submit pull requests.
  1. Fork the repository.
  2. Create a new branch for your feature or bug fix: "git checkout -b feature-name".
  3. Commit your changes: "git commit -m 'Add new feature'".
  4. Push to the branch: "git push origin feature-name".
  5. Submit a pull request.
