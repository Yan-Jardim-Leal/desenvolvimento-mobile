import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface AuthContextValue {
  userId: string | null;
  signIn: (userId: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const value = useMemo(() => ({ userId, signIn: setUserId, signOut: () => setUserId(null) }), [userId]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};
