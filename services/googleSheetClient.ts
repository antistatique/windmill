import { google } from 'googleapis';
import { Session } from 'next-auth';

const googleSheetClient = async (session: Session | null) => {
  const auth = new google.auth.OAuth2();

  auth.setCredentials({ access_token: session?.accessToken });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
};

export default googleSheetClient;
