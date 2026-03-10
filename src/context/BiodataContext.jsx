import { createContext, useState, useContext, useEffect } from "react";

const BiodataContext = createContext();
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://marriage-backend-delta.vercel.app/api";

export function BiodataProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("shaadiUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [biodata, setBiodata] = useState(() => {
    const storedBiodata = localStorage.getItem("shaadiBiodata");
    return storedBiodata ? JSON.parse(storedBiodata) : null;
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [biodataLoading, setBiodataLoading] = useState(false);

  useEffect(() => {
    const fetchExistingBiodata = async () => {
      if (!user || !user.token) return;

      try {
        setBiodataLoading(true);
        const res = await fetch(`${API_BASE_URL}/biodata/me`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.biodata) {
            setBiodata(data.biodata);
            localStorage.setItem("shaadiBiodata", JSON.stringify(data.biodata));
          }
        }
      } catch (error) {
        console.error("Failed to load biodata from backend", error);
      } finally {
        setBiodataLoading(false);
      }
    };

    fetchExistingBiodata();
  }, [user]);

  const login = async (email, password) => {
    try {
      setAuthLoading(true);
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Invalid email or password");
      }

      const authUser = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        token: data.token,
      };

      setUser(authUser);
      localStorage.setItem("shaadiUser", JSON.stringify(authUser));

      return { success: true };
    } catch (error) {
      console.error("Login failed", error);
      return {
        success: false,
        message: error.message || "Unable to login right now.",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setAuthLoading(true);
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Registration failed");
      }

      const authUser = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        token: data.token,
      };

      setUser(authUser);
      localStorage.setItem("shaadiUser", JSON.stringify(authUser));

      return { success: true };
    } catch (error) {
      console.error("Registration failed", error);
      return {
        success: false,
        message: error.message || "Unable to register right now.",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setBiodata(null);
    localStorage.removeItem("shaadiUser");
    localStorage.removeItem("shaadiBiodata");
  };

  const saveBiodata = async (data) => {
    setBiodata(data);
    localStorage.setItem("shaadiBiodata", JSON.stringify(data));

    if (!user || !user.token) {
      return { success: true };
    }

    try {
      setBiodataLoading(true);
      const res = await fetch(`${API_BASE_URL}/biodata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ biodata: data }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Failed to save biodata");
      }

      return { success: true };
    } catch (error) {
      console.error("Saving biodata failed", error);
      return {
        success: false,
        message: error.message || "Unable to save biodata right now.",
      };
    } finally {
      setBiodataLoading(false);
    }
  };

  return (
    <BiodataContext.Provider
      value={{
        user,
        biodata,
        authLoading,
        biodataLoading,
        login,
        register,
        logout,
        saveBiodata,
      }}
    >
      {children}
    </BiodataContext.Provider>
  );
}

export function useBiodata() {
  return useContext(BiodataContext);
}
