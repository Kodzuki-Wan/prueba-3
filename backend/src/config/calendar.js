import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const credentials = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN
};

const auth = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: SCOPES,
});

export const calendar = google.calendar({ version: 'v3', auth });