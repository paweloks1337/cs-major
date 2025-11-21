cat > lib/auth.ts <<'EOF'
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { randomBytes } from "crypto";
import clientPromise from "./mongodb";

export async function findUserByEmail(email: string) {
  const client = await clientPromise;
  return client.db().collection("users").findOne({ email });
}

export async function createUser(email: string, password: string) {
  const client = await clientPromise;
  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    email,
    password: hashed,
    createdAt: new Date(),
  };
  const res = await client.db().collection("users").insertOne(newUser);
  return { ...newUser, _id: res.insertedId };
}

export async function validatePassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}

export async function createSession(userId: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  const client = await clientPromise;
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + maxAgeSeconds * 1000);
  await client.db().collection("sessions").insertOne({
    userId: new ObjectId(userId),
    token,
    expiresAt,
    createdAt: new Date(),
  });
  return { token, expiresAt, maxAgeSeconds };
}

export async function getSessionByToken(token: string) {
  const client = await clientPromise;
  const session = await client.db().collection("sessions").findOne({ token });
  if (!session) return null;
  if (session.expiresAt && session.expiresAt < new Date()) return null;
  const user = await client.db().collection("users").findOne({ _id: session.userId });
  if (!user) return null;
  return { session, user };
}

export async function deleteSessionByToken(token: string) {
  const client = await clientPromise;
  await client.db().collection("sessions").deleteOne({ token });
}
EOF