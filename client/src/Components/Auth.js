'use client'

import {auth} from '../firebase'
import {signInAnonymously} from 'firebase/auth'
import {useEffect, useState} from 'react'

export function signIn() {
  if (process.env.NEXT_PUBLIC_SLUGLOOP_TEST_MODE === '1') {
    return Promise.resolve(null)
  }

  return signInAnonymously(auth)
}

export function useAuthUser() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return unsubscribe
  }, [])
  return user
}
