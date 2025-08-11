import admin from 'firebase-admin'
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.PROJECT_ID) {
  throw new Error('Faltan variables de conexion a Firebase')
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
})

export const db = admin.firestore()