import React from "react";

import { HomeScreen } from "./screens/Home";
import { NotFoundScreen } from "./screens/NotFound";
import { AddMembersScreen } from "./screens/AddMembers";
import { EditMemberScreen } from "./screens/EditMember";
import { MembersScreen } from "./screens/Members";
import { MemberScreen } from "./screens/Member";
import { Routes, Route, Link as RouterLink, useMatch } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { FullPageErrorFallback } from "./components/lib";

function Authenticatedapp({ user, logout }) {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <div className="md:hidden">
          <div className="fixed inset-0 z-30 transition-opacity ease-linear duration-300">
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
          <div className="fixed inset-0 flex z-40">
            <div className="flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800 transform ease-in-out duration-300 ">
              <div className="absolute top-0 right-0 -mr-14 p-1">
                <button className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600">
                  <svg
                    className="h-6 w-6 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="/img/logos/workflow-logo-on-dark.svg"
                  alt="Workflow"
                />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <MobileNavLink />
              </div>
            </div>
            <div className="flex-shrink-0 w-14"></div>
          </div>
        </div>

        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800">
              <span className="text-white text-xl">Green Mile Project</span>
            </div>
            <div className="h-0 flex-1 flex flex-col overflow-y-auto">
              <DesktopNavLink />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white">
            <button className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden">
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <div className="w-full flex md:ml-0">
                  <label htmlFor="search_field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        />
                      </svg>
                    </div>
                    <input
                      id="search_field"
                      className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                      placeholder="Search for Products using Product Id"
                    />
                  </div>
                </div>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500">
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <div className="ml-3 relative">
                  <div>
                    <button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                    <div className="py-1 rounded-md bg-white shadow-xs">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                      >
                        Settings
                      </a>
                      <button
                        onClick={logout}
                        className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <main
            className="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
            tabIndex="0"
          >
            <AppRoutes user={user} />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

function DesktopNavLink() {
  return (
    <nav className="flex-1 px-2 py-4 bg-gray-800">
      <NavLink to="/home">
        <svg
          className="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
          />
        </svg>
        Home
      </NavLink>
      <NavLink to="/members">
        <svg
          className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Members
      </NavLink>
      <a
        href="#"
        className="mt-1 group flex items-center px-2 py-2 text-sm leading-8 tracking-wider font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
      >
        <svg
          className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
        Suppliers
      </a>
      <a
        href="#"
        className="mt-1 group flex items-center px-2 py-2 text-sm leading-8 tracking-wider font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
      >
        <svg
          className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Calendar
      </a>
      <a
        href="#"
        className="mt-1 group flex items-center px-2 py-2 text-sm leading-8 tracking-wider font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
      >
        <svg
          className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        Documents
      </a>
      <a
        href="#"
        className="mt-1 group flex items-center px-2 py-2 text-sm leading-8 tracking-wider font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
      >
        <svg
          className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Reports
      </a>
    </nav>
  );
}

function NavLink(props) {
  const match = useMatch(props.to);

  return (
    <RouterLink
      className={`group flex items-center px-2 py-2 text-base leading-7 font-medium rounded-md text-white  focus:outline-none hover:underline focus:underline focus:bg-gray-900 transition ease-in-out duration-150 ${
        match ? "bg-gray-900 underline" : ""
      }`}
      {...props}
    />
  );
}

function MobileNavLink() {
  return (
    <nav className="px-2">
      <NavLink to="/home">
        <svg
          className="mr-4 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
          />
        </svg>
        Home
      </NavLink>
      <NavLink to="members">
        <svg
          className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Members
      </NavLink>
    </nav>
  );
}

function AppRoutes({ user }) {
  console.log("user-app-routes", user);
  return (
    <Routes>
      <Route path="/home" element={<HomeScreen user={user} />} />
      <Route path="/members/add" element={<AddMembersScreen user={user} />} />
      <Route path="/members" element={<MembersScreen user={user} />} />
      <Route path="/members/:memberId" element={<MemberScreen user={user} />} />
      <Route
        path="/members/:memberId/edit"
        element={<EditMemberScreen user={user} />}
      />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export { Authenticatedapp };
