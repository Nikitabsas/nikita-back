import * as dotenv from 'dotenv'
dotenv.config()

import admin from 'firebase-admin';


admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore()

export default db


