# Secure Your Meteor ☄️ with Unkey

A template that demonstrates how to integrate the Unkey API with a Vue 3 and Vite-powered Meteor app. This setup showcases secure API key authentication, enabling controlled access to a to-do list application.

## Libraries used

- [Vue3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://next.router.vuejs.org/)
- [Meteor](https://www.meteor.com/)
- [Vue Meteor Tracker](https://github.com/meteor-vue/vue-meteor-tracker)
- [Tailwind CSS](https://tailwindcss.com/)
- [Unkey SDK](https://www.unkey.com/docs/libraries/ts/sdk/overview)

## Getting started

### Create a Unkey Root Key

1. Navigate to [Unkey Root Keys](https://app.unkey.com/settings/root-key) and click **"Create New Root Key"**.
2. Name your root key.
3. Select the following workspace permissions:
   - `create_key`
   - `read_key`
   - `encrypt_key`
   - `decrypt_key`
4. Click **"Create"** and save your root key securely.

### Create a Unkey API

1. Go to [Unkey APIs](https://app.unkey.com/apis) and click **"Create New API"**.
2. Enter a name for the API.
3. Click **"Create"**.

### Generate your first API Key

1. From the [Unkey APIs](https://app.unkey.com/apis) page, select your newly created API.
2. Click **"Create Key"** in the top right corner.
3. In the "Owner" field, enter a unique username to assign ownership of the key. Leaving this field blank will invalidate the key and trigger an error in the app itself.
4. Fill in the rest of the form or leave the default values, then click **"Create"** and save the key.

## Setup

1. Clone the repository to your local machine:

   ```bash
   git clone git@github.com:unrenamed/unkey-meteor-vue
   cd unkey-meteor-vue
   ```

2. Create a new folder and a file in the root directory `private/settings` with the following content:

   ```json
   {
     "env": {
       "UNKEY_API_ID": "<your-unkey-api-id>"
     }
   }
   ```

## Running the example

> Before you proceed, ensure you have `meteor` installed on your machine. Follow the official guide if needed: https://docs.meteor.com/about/install.html

1. Run `meteor npm install` to install all dependencies.

2. Run `npm run start` to start the server.

3. Open `http://localhost:3000` in your browser
