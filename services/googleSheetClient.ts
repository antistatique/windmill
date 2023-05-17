import { google } from 'googleapis';

const googleSheetClient = async (token: string) => {
  const auth = new google.auth.OAuth2();

  auth.setCredentials({ access_token: token });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
};

export default googleSheetClient;
