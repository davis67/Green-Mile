const usersKey = "__bookshelf_users__";

let users = [
  {
    id: "2210022515",
    name: "Admin GreenMile",
    phoneNumber: "0704828232",
    role: "hub-manager",
    email: "admin@greenmile.com",
    passwordHash: "423803642",
  },
];

window.addEventListener("load", (event) => {
  console.log("page is fully reloaded");

  let users = JSON.parse(window.localStorage.getItem(usersKey));

  if (users === null) {
    window.localStorage.setItem(usersKey, JSON.stringify(users));
  }

  console.log("a user has been successfully seeded");
});

const persist = () =>
  window.localStorage.setItem(usersKey, JSON.stringify(users));

const load = () => JSON.parse(window.localStorage.getItem(usersKey));

try {
  load();
} catch (error) {
  persist();
}

function validateUsersFormAfterRegister({
  name,
  email,
  phoneNumber,
  role,
  password,
}) {
  if (!name) {
    const error = new Error("A Name is required");
    error.status = 400;
    throw error;
  }

  if (!email) {
    const error = new Error("An Email Address is required");
    error.status = 400;
    throw error;
  }

  if (!role) {
    const error = new Error("A Role is required");
    error.status = 400;
    throw error;
  }

  if (!phoneNumber) {
    const error = new Error("A Phone Number is required");
    error.status = 400;
    throw error;
  }

  if (!password) {
    const error = new Error("A password is required");
    error.status = 400;
    throw error;
  }
}

function validateUsersFormAfterLogin({ email, password }) {
  if (!email) {
    const error = new Error("An Email Address is required");
    error.status = 400;
    throw error;
  }

  if (!password) {
    const error = new Error("A password is required");
    error.status = 400;
    throw error;
  }
}

async function authenticate({ email, password }) {
  validateUsersFormAfterLogin({ email, password });

  const id = hash(email);

  let users = JSON.parse(window.localStorage.getItem(usersKey));

  let user = users.find((u) => u.id === id);

  if (user !== null) {
    if (user.passwordHash === hash(password)) {
      return { ...sanitizeUser(user), token: btoa(user.id) };
    }
  }

  const error = new Error("Invalid username or password");

  error.status = 400;
  throw error;
}

async function create({ name, email, phoneNumber, role, password }) {
  validateUsersFormAfterRegister({ name, email, phoneNumber, role, password });

  const id = hash(email);

  let users = JSON.parse(window.localStorage.getItem(usersKey));

  let user = users.find((u) => u.id === id);

  const passwordHash = hash(password);

  if (user) {
    const error = new Error(`User with ${email} already exists`);
    error.status = 400;
    throw error;
  }

  let registeredUser = { id, email, passwordHash, name, phoneNumber, role };

  users.push(registeredUser);

  window.localStorage.setItem(usersKey, JSON.stringify(users));

  return read(id);
}

async function read(id) {
  validateUser(id);

  let users = JSON.parse(window.localStorage.getItem(usersKey));

  let user = users.find((u) => u.id === id);

  return sanitizeUser(user);
}

async function update(id, updates) {
  validateUser(id);

  let users = JSON.parse(window.localStorage.getItem(usersKey));

  let userIndex = users.findIndex((u) => u.id === id);
  let updatedUser = users.find((u) => u.id === id);

  updatedUser.name = updates.name;
  updatedUser.email = updates.email;
  updatedUser.phoneNumber = updates.phoneNumber;
  updatedUser.role = updates.role;

  users[userIndex] = updatedUser;

  window.localStorage.setItem(usersKey, JSON.stringify(users));

  return read(id);
}

async function remove(id) {
  validateUser(id);

  let users = JSON.parse(window.localStorage.getItem(usersKey));

  let userIndex = users.findIndex((u) => u.id === id);

  users.splice(userIndex, 1);

  window.localStorage.setItem(usersKey, JSON.stringify(users));

  return { success: true };
}

async function reset() {
  users = {};

  persist();
}

function validateUser(id) {
  // load();

  let users = JSON.parse(window.localStorage.getItem(usersKey));

  let user = users.find((u) => u.id === id);

  if (!user) {
    const error = new Error(`No user with the id "${id}"`);
    error.status = 404;
    throw error;
  }
}

function sanitizeUser(user) {
  const { passwordHash, ...rest } = user;

  return rest;
}

function hash(str) {
  var hash = 5381;
  var i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  return String(hash >>> 0);
}

export { authenticate, create, read, update, remove, reset, usersKey };
