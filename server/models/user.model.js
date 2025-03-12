import sql from '../db/index.js';
import argon2 from 'argon2';

export const createUser = async (email, password) => {
  const hashedPassword = await hashPassword(password);
  const [user] = await sql`
    INSERT INTO users (email, password)
    VALUES (${email}, ${hashedPassword})
    RETURNING id, email
  `;
  return user;
};

export const findUserByEmail = async (email) => {
  const [user] = await sql`
    SELECT id, email, password
    FROM users
    WHERE email = ${email}
  `;
  return user;
};

export const verifyPassword = async (inputPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, inputPassword);
};

const hashPassword = async (password) => {
  return argon2.hash(password);
}; 