/**
 * Bhu-Rail Authentication Service
 * Implements demo token generation, local session caching, and mock API calls.identity services.
 * Features mock simulation with cryptographic token structures and ready-to-wire API endpoints.
 */

export type UserRole = "CITIZEN" | "GOVERNMENT_OFFICER" | "ADMIN";

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  lastLogin?: string;
}

export interface CitizenUser extends BaseUser {
  role: "CITIZEN";
  mobile: string;
  aadhaarHash: string;
  registeredParcelsCount: number;
}

export interface GovernmentUser extends BaseUser {
  role: "GOVERNMENT_OFFICER";
  officerId: string;
  department: string;
  designation: string;
  jurisdictionDistrict: string;
}

export interface AdminUser extends BaseUser {
  role: "ADMIN";
  adminLevel: "NATIONAL" | "STATE";
}

export type AuthUser = CitizenUser | GovernmentUser | AdminUser;

export interface AuthSession {
  token: string;
  refreshToken: string;
  user: AuthUser;
  expiresAt: number;
}

export interface CitizenLoginCredentials {
  identifier: string; // Mobile or Email
  password: string;
  rememberMe?: boolean;
}

export interface GovernmentLoginCredentials {
  officerId: string; // Officer ID or Official Email
  password: string;
  department?: string;
  rememberMe?: boolean;
}

export interface CitizenRegistrationData {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
}

// Demo Accounts pre-seeded for institutional presentation and evaluation
export const DEMO_CITIZEN: CitizenUser = {
  id: "USR-CIT-2026-9814",
  name: "Suresh Chandra Yadav",
  email: "suresh.yadav@example.com",
  mobile: "+91 98765 43210",
  aadhaarHash: "aadhaar-sha256-a9f82d1b",
  role: "CITIZEN",
  registeredParcelsCount: 3,
  lastLogin: "2026-03-07T08:30:00Z",
};

export const DEMO_OFFICER: GovernmentUser = {
  id: "USR-GOV-2026-0842",
  name: "Rajeshwar Sharma",
  email: "r.sharma@revenue.haryana.gov.in",
  officerId: "HR-REV-GGM-0842",
  department: "Revenue & Land Records",
  designation: "Tehsildar / Land Records Officer",
  jurisdictionDistrict: "Gurugram (Sohna Tehsil)",
  role: "GOVERNMENT_OFFICER",
  lastLogin: "2026-03-07T09:15:00Z",
};

export const DEMO_ADMIN: AdminUser = {
  id: "USR-ADM-2026-0001",
  name: "Dr. P. K. Mishra",
  email: "admin@bhurail.gov.in",
  role: "ADMIN",
  adminLevel: "NATIONAL",
  lastLogin: "2026-03-07T07:00:00Z",
};

const SESSION_STORAGE_KEY = "bhurail_auth_session";

class AuthService {
  /**
   * Retrieves active session from browser storage
   */
  public getSession(): AuthSession | null {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY) || sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!saved) return null;
      const parsed: AuthSession = JSON.parse(saved);
      if (Date.now() > parsed.expiresAt) {
        this.clearSession();
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  /**
   * Stores authenticated session in local or session storage
   */
  private saveSession(session: AuthSession, rememberMe = true): void {
    if (typeof window === "undefined") return;
    const data = JSON.stringify(session);
    if (rememberMe) {
      localStorage.setItem(SESSION_STORAGE_KEY, data);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } else {
      sessionStorage.setItem(SESSION_STORAGE_KEY, data);
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }

  /**
   * Clears active session
   */
  public clearSession(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem("bhu_rail_demo_role");
  }

  /**
   * Authenticate Citizen
   */
  public async loginCitizen(credentials: CitizenLoginCredentials): Promise<AuthSession> {
    // Artificial latency for realistic async behavior
    await new Promise((resolve) => setTimeout(resolve, 600));

    const id = credentials.identifier.trim();
    if (!id) {
      throw new Error("Please enter your Mobile Number or Email ID.");
    }
    if (!credentials.password) {
      throw new Error("Please enter your password.");
    }

    // In demo environment, allow any password with >= 6 characters, or specific demo password
    if (credentials.password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const session: AuthSession = {
      token: `bhu_jwt_cit_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      refreshToken: `bhu_rf_${Date.now()}`,
      user: {
        ...DEMO_CITIZEN,
        // If user logged in with custom email/mobile, reflect it
        email: id.includes("@") ? id : DEMO_CITIZEN.email,
        mobile: !id.includes("@") ? id : DEMO_CITIZEN.mobile,
      },
      expiresAt: Date.now() + (credentials.rememberMe ? 7 * 24 * 3600 * 1000 : 24 * 3600 * 1000),
    };

    this.saveSession(session, credentials.rememberMe ?? true);
    return session;
  }

  /**
   * Authenticate Government Officer
   */
  public async loginGovernment(credentials: GovernmentLoginCredentials): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const id = credentials.officerId.trim();
    if (!id) {
      throw new Error("Please enter your Official Email or Officer ID.");
    }
    if (!credentials.password) {
      throw new Error("Please enter your password.");
    }

    if (credentials.password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const dept = credentials.department || DEMO_OFFICER.department;

    const session: AuthSession = {
      token: `bhu_jwt_gov_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      refreshToken: `bhu_rf_${Date.now()}`,
      user: {
        ...DEMO_OFFICER,
        officerId: id,
        department: dept,
      },
      expiresAt: Date.now() + (credentials.rememberMe ? 7 * 24 * 3600 * 1000 : 8 * 3600 * 1000),
    };

    this.saveSession(session, credentials.rememberMe ?? true);
    return session;
  }

  /**
   * Register Citizen Account
   */
  public async registerCitizen(data: CitizenRegistrationData): Promise<CitizenUser> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!data.fullName.trim()) throw new Error("Full name is required.");
    if (!data.mobile.trim() || data.mobile.trim().length < 10) throw new Error("A valid 10-digit mobile number is required.");
    if (!data.email.trim() || !data.email.includes("@")) throw new Error("A valid email address is required.");
    if (!data.password || data.password.length < 8) throw new Error("Password must be at least 8 characters.");

    const newUser: CitizenUser = {
      id: `USR-CIT-${Date.now().toString().slice(-4)}`,
      name: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      mobile: data.mobile.trim(),
      aadhaarHash: `aadhaar-sha256-${Math.random().toString(36).substring(2, 10)}`,
      role: "CITIZEN",
      registeredParcelsCount: 0,
      lastLogin: new Date().toISOString(),
    };

    return newUser;
  }

  /**
   * Step 1: Request OTP for password reset
   */
  public async requestPasswordReset(identifier: string): Promise<{ success: boolean; maskedTarget: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!identifier.trim()) throw new Error("Please enter your registered Email, Mobile, or Officer ID.");

    let masked = identifier;
    if (identifier.includes("@")) {
      const parts = identifier.split("@");
      masked = `${parts[0].slice(0, 2)}***@${parts[1]}`;
    } else if (identifier.length >= 10) {
      masked = `+91 ******${identifier.slice(-4)}`;
    }

    return { success: true, maskedTarget: masked };
  }

  /**
   * Step 2: Verify OTP
   */
  public async verifyOTP(_identifier: string, otp: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (!otp || otp.trim().length !== 6) {
      throw new Error("Please enter the 6-digit OTP received on your mobile or email.");
    }
    // In demo environment, accept '123456' or any 6-digit number
    return true;
  }

  /**
   * Step 3: Set New Password
   */
  public async resetPassword(_identifier: string, _otp: string, newPassword: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (!newPassword || newPassword.length < 8) {
      throw new Error("New password must be at least 8 characters with letters and numbers.");
    }
    return true;
  }
}

export const authService = new AuthService();
