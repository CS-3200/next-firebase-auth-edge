"use client";

import * as React from "react";
import { startTransition } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { IdTokenResult } from "firebase/auth";
import { useFirebaseAuth } from "./firebase";
import { clientConfig } from "../config/client-config";
import { Tenant } from "./types";
import { AuthContext } from "./context";

const mapFirebaseResponseToTenant = (
  result: IdTokenResult,
  user: FirebaseUser
): Tenant => {
  const providerData = user.providerData && user.providerData[0];

  if (!user.isAnonymous && providerData) {
    return {
      id: user.uid,
      name: providerData.displayName || user.displayName || user.email || null,
      email: providerData.email || null,
      emailVerified: user.emailVerified || false,
      photoUrl: providerData.photoURL || null,
      customClaims: {},
      isAnonymous: user.isAnonymous,
      idToken: result.token,
    };
  }

  return {
    id: user.uid,
    name: user.displayName || providerData?.displayName || user.email || null,
    email: user.email || null,
    emailVerified: user.emailVerified || false,
    photoUrl: user.photoURL || null,
    customClaims: {},
    isAnonymous: user.isAnonymous,
    idToken: result.token,
  };
};

export interface AuthProviderProps {
  defaultTenant: Tenant | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  defaultTenant,
  children,
}) => {
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  const firstLoadRef = React.useRef(true);
  const [tenant, setTenant] = React.useState(defaultTenant);

  const handleIdTokenChanged = async (firebaseUser: FirebaseUser | null) => {
    console.log("Token changed")
    if (firebaseUser && tenant && firebaseUser.uid === tenant.id) {
      firstLoadRef.current = false;
      return;
    }

    const auth = await getFirebaseAuth();

    if (!firebaseUser && firstLoadRef.current) {
      const { signInAnonymously } = await import("firebase/auth");
      firstLoadRef.current = false;
      const credential = await signInAnonymously(auth);
      await fetch("/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            (
              await credential.user.getIdTokenResult()
            ).token
          }`,
        },
      });
      return;
    }

    if (!firebaseUser) {
      firstLoadRef.current = false;
      startTransition(() => {
        setTenant(null);
      });
      return;
    }

    firstLoadRef.current = false;
    const tokenResult = await firebaseUser.getIdTokenResult();
    startTransition(() => {
      console.log("Tenant")
      setTenant(mapFirebaseResponseToTenant(tokenResult, firebaseUser));
    });
  };

  const registerChangeListener = async () => {
    const auth = await getFirebaseAuth();
    const { onIdTokenChanged } = await import("firebase/auth");
    return onIdTokenChanged(auth, handleIdTokenChanged);
  };

  React.useEffect(() => {
    const unsubscribePromise = registerChangeListener();

    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        tenant,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
