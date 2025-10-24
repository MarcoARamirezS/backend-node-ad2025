// src/repositories/empleado.repository.js
import { db } from '../config/firebase.js';
const COLLECTION = 'empleados';

export default {
  async getAllSafe() {
    const snap = await db.collection(COLLECTION).get();
    return snap.docs.map((doc) => {
      const d = doc.data();
      const { password, activeToken, ...safe } = d;
      return { id: doc.id, ...safe };
    });
  },

  async create(data) {
    console.log('@@@ data repo => ', data);

    const plainData = typeof data.toJSON === 'function' ? data.toJSON() : data;

    const ref = await db.collection(COLLECTION).add(plainData);
    return { id: ref.id };
  },

  async update(id, data) {
    await db.collection(COLLECTION).doc(id).update(data);
    return { id };
  },

  async remove(id) {
    await db.collection(COLLECTION).doc(id).delete();
    return { id };
  },

  async findById(id) {
    const doc = await db.collection(COLLECTION).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async findByFullName(nombre, apaterno, amaterno) {
    const snap = await db
      .collection(COLLECTION)
      .where('nombre', '==', nombre)
      .where('apaterno', '==', apaterno)
      .where('amaterno', '==', amaterno)
      .limit(1)
      .get();

    return snap.empty
      ? null
      : { id: snap.docs[0].id, ...snap.docs[0].data() };
  },

  async findByUsuario(usuario) {
    const snap = await db
      .collection(COLLECTION)
      .where('usuario', '==', usuario)
      .limit(1)
      .get();

    return snap.empty
      ? null
      : { id: snap.docs[0].id, ...snap.docs[0].data() };
  },
};
