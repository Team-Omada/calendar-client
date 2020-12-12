# Omada Calendar Client

A Vue app to help students organize their course schedules at Cal State San Marcos.

This app uses Vuetify for all styling and allowed us to have a working calendar component out of the box. Some features include: fully functional search and filter options, commenting on a schedule, token-based login, and visual comparison of your schedules against another student's schedule. From the login screen it looks like a user can reset their password, however this was never implemented due to time constraints. Otherwise, all other functionality should be working as intended.

Check out the live client [here](https://omada-calendar.netlify.app/login). We are using Netlify to easily build out and host the app for free.

View the source code for the Express API server [here](https://github.com/Team-Omada/calendar-server).

Some improvements that could be made:

- Refined search - the current filter by course option could include comparison operators and multiple courses.
- Mobile-friendly calendar - currently, the calendar component on a schedule is not mobile-friendly.
- Interactivity on calendar - adding click and drag capabilities to the calendar would make the user experience more friendly.
- Pagination on both comments and user's own schedules - currently pagination is only on the dashboard.
- Flushing out the security issues that come with the token based approach to authentication.
- Adding forgot password functionality.

## Development

### Setup your environment

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

This may take a bit to run for the first time.

### Compiles and minifies for production

```
npm run build
```

Only needed when we want to test what production looks like locally, otherwise Netlify handles the build process.

### Commit conventions

Just to organize our commits a bit, we could just use the "feat", "fix", "chore" convention from this [guide](https://www.conventionalcommits.org/en/v1.0.0/).
