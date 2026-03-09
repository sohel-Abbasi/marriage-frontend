import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useBiodata } from "../context/BiodataContext";

export default function Register() {
  const { register: registerUser, authLoading } = useBiodata();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (values) => {
    setServerError("");

    const result = await registerUser(
      values.name,
      values.email,
      values.password,
    );

    if (result.success) {
      navigate("/dashboard");
    } else if (result.message) {
      setServerError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-rose-50 via-slate-50 to-purple-50 px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-rose-50">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">
          Create your account
        </h1>
        <p className="text-slate-500 mb-6 text-center">
          Start your journey with a beautiful{" "}
          <span className="font-semibold text-rose-500">ShaadiBio</span>.
        </p>

        {serverError && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition"
              placeholder="Priya Sharma"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none transition"
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full inline-flex items-center justify-center rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 transition-colors"
          >
            {authLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-rose-500 hover:text-rose-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

