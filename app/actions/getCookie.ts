"use server"
import { cookies } from 'next/headers';

export default async function getCookie() {
  const cookieStore = await cookies();
  const myCookieValue = cookieStore.get('noisses')?.value;

  return  myCookieValue;
}