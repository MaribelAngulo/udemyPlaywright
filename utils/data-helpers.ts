import { randomBytes } from 'crypto';

export async function getRandomNumber() {
    return Math.floor(Math.random() * 1000 + 1)
}

export function getRandomString(length: number): string {
    return randomBytes(length).toString('hex').slice(0, length);
}