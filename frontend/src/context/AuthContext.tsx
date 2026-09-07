"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  authService,
  AuthUser,
  CitizenLoginCredentials,
  GovernmentLoginCredentials,
  CitizenRegistrationData,
  DEMO_CITIZEN,
  DEMO_OFFICER,
} from "@/services/authService";

export type UserRole = "citizen" | "government" | "admin" | "CITIZEN" | "GOVERNMENT_OFFICER" | "ADMIN";

interface AuthContextType {
  isAuthenticated: boolean;
  role: "citizen" | "government" | "admin";
  rawRole: UserRole;
  user: AuthUser | null;
  isInitialized: boolean;
  switchRole: () => void;
  setRole: (role: "citizen" | "government" | "admin") => void;
  loginCitizen: (credentials?: CitizenLoginCredentials, returnUrl?: string) => Promise<void>;
  loginGovernment: (credentials?: GovernmentLoginCredentials, returnUrl?: string) => Promise<void>;
  registerCitizen: (data: CitizenRegistrationData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialRole = (path?: string): "citizen" | "government" | "admin" => {
  if (typeof window === "undefined") return "citizen";
  try {
    const saved = localStorage.getItem("bhu_rail_demo_role");
    if (saved === "government" || saved === "admin" || saved === "citizen") return saved;
    const sess = localStorage.getItem("bhurail_auth_session") || sessionStorage.getItem("bhurail_auth_session");
    if (sess) {
      const parsed = JSON.parse(sess);
      if (parsed?.user?.role === "GOVERNMENT_OFFICER") return "government";
      if (parsed?.user?.role === "ADMIN") return "admin";
      if (parsed?.user?.role === "CITIZEN") return "citizen";
    }
    if (path && path.startsWith("/government")) return "government";
    if (window.location.pathname.startsWith("/government")) return "government";
  } catch {}
  return "citizen";
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !!(authService.getSession() || localStorage.getItem("bhu_rail_demo_role"));
  });

  const [role, setRoleState] = useState<"citizen" | "government" | "admin">(() => getInitialRole());
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    const session = authService.getSession();
    if (session) return session.user;
    const initialRole = getInitialRole();
    return initialRole === "government" ? DEMO_OFFICER : DEMO_CITIZEN;
  });
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check for stored active session
    const session = authService.getSession();
    if (session) {
      setIsAuthenticated(true);
      setUser(session.user);
      const mappedRole = session.user.role === "GOVERNMENT_OFFICER" ? "government" : session.user.role === "ADMIN" ? "admin" : "citizen";
      setRoleState(mappedRole);
    } else {
      // Check legacy demo role if available
      const savedRole = localStorage.getItem("bhu_rail_demo_role");
      if (savedRole === "citizen" || savedRole === "government" || savedRole === "admin") {
        setRoleState(savedRole);
        setIsAuthenticated(true);
        setUser(savedRole === "government" ? DEMO_OFFICER : DEMO_CITIZEN);
      } else {
        // If visiting a protected portal route directly, default to demo login
        if (pathname.startsWith("/government") || pathname.startsWith("/citizen")) {
          const isGov = pathname.startsWith("/government");
          const targetRole = isGov ? "government" : "citizen";
          setRoleState(targetRole);
          setIsAuthenticated(true);
          setUser(isGov ? DEMO_OFFICER : DEMO_CITIZEN);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    }
    setIsInitialized(true);
  }, [pathname]);

  const setRole = (newRole: "citizen" | "government" | "admin") => {
    setRoleState(newRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("bhu_rail_demo_role", newRole);
    }
    if (newRole === "government") {
      setUser(DEMO_OFFICER);
    } else {
      setUser(DEMO_CITIZEN);
    }
  };

  const switchRole = () => {
    const nextRole: "citizen" | "government" = role === "citizen" ? "government" : "citizen";
    setRole(nextRole);
    setIsAuthenticated(true);
    if (nextRole === "citizen") {
      router.push("/citizen/dashboard");
    } else {
      router.push("/government/dashboard");
    }
  };

  const loginCitizen = async (credentials?: CitizenLoginCredentials, returnUrl?: string) => {
    let session;
    if (credentials && credentials.identifier) {
      session = await authService.loginCitizen(credentials);
    } else {
      // One-click demo login
      session = await authService.loginCitizen({
        identifier: DEMO_CITIZEN.mobile,
        password: "Password@123",
        rememberMe: true,
      });
    }
    setIsAuthenticated(true);
    setUser(session.user);
    setRoleState("citizen");
    localStorage.setItem("bhu_rail_demo_role", "citizen");

    if (returnUrl) {
      router.push(returnUrl);
    } else {
      router.push("/citizen/dashboard");
    }
  };

  const loginGovernment = async (credentials?: GovernmentLoginCredentials, returnUrl?: string) => {
    let session;
    if (credentials && credentials.officerId) {
      session = await authService.loginGovernment(credentials);
    } else {
      // One-click demo login
      session = await authService.loginGovernment({
        officerId: DEMO_OFFICER.officerId,
        password: "Officer@123",
        department: credentials?.department || DEMO_OFFICER.department,
        rememberMe: true,
      });
    }
    setIsAuthenticated(true);
    setUser(session.user);
    setRoleState("government");
    localStorage.setItem("bhu_rail_demo_role", "government");

    if (returnUrl) {
      router.push(returnUrl);
    } else {
      router.push("/government/dashboard");
    }
  };

  const registerCitizen = async (data: CitizenRegistrationData) => {
    await authService.registerCitizen(data);
  };

  const logout = () => {
    authService.clearSession();
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        rawRole: role === "government" ? "GOVERNMENT_OFFICER" : role === "admin" ? "ADMIN" : "CITIZEN",
        user: user || (role === "government" ? DEMO_OFFICER : DEMO_CITIZEN),
        isInitialized,
        switchRole,
        setRole,
        loginCitizen,
        loginGovernment,
        registerCitizen,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
