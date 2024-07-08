# Facebook Graph API Integration

This project demonstrates how to integrate Facebook's Graph API using React. The application allows users to log in with their Facebook account and view statistics for pages they own.

## Features

- Facebook Login
- Fetching user's Facebook pages
- Displaying page statistics:
  - Total Followers/Fans
  - Total Engagement
  - Total Impressions
  - Total Reactions
- Date range filter for page statistics
- Clear form button to reset inputs and statistics

## Technologies Used

- React
- Tailwind CSS
- Facebook JavaScript SDK

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Shrikant-kshatriya/aadi-facebookGraphAPI.git
cd aadi-facebookGraphAPI
```

2. Install the dependencies:

```bash
npm install
```

3. Set up your Facebook App:

   - Go to the [Facebook Developers](https://developers.facebook.com/) website.
   - Create a new app.
   - Set up the OAuth redirect URIs to include `https://localhost:3000/dashboard`.
   - Add your app's ID and version in the `index.html` file in the `<script>` tag:

```html
<script>
  window.fbAsyncInit = function () {
    FB.init({
      appId: 'YOUR_APP_ID',
      cookie: true,
      xfbml: true,
      version: 'v14.0',
    });
    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
</script>
```

4. Start the development server:

```bash
HTTPS=true npm start
```

## Usage

1. Open your browser and navigate to `https://localhost:3000`.
2. Log in with your Facebook account.
3. View the list of pages you own and select a page to see its statistics.
4. Use the date range filters to fetch statistics for a specific period.
5. Click the "Clear Form" button to reset the inputs and statistics.

## Components

- `App.js`: Main component that sets up routing and context.
- `Navbar.jsx`: Navigation bar component.
- `Home.jsx`: Home page component.
- `Login.jsx`: Login page component with Facebook login button.
- `Dashboard.jsx`: Dashboard component that displays page statistics.

## License

This project is licensed under the MIT License.
```

Replace `YOUR_APP_ID` with your actual Facebook App ID in the `index.html` script tag.