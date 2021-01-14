const usersKey = "__bookshelf_users__";

let seededusers = {
  2210022515: {
    id: "2210022515",
    name: "Admin GreenMile",
    phoneNumber: "0704828232",
    role: "hub-manager",
    email: "admin@greenmile.com",
    passwordHash: "423803642",
  },
};

window.addEventListener("load", (event) => {
  console.log("page is fully reloaded");
  window.localStorage.setItem(usersKey, JSON.stringify(seededusers));
  console.log("a user has been successfully seeded");
});

let users = {};
const persist = () =>
  window.localStorage.setItem(usersKey, JSON.stringify(users));

const load = () =>
  Object.assign(users, JSON.parse(window.localStorage.getItem(usersKey)));
console.log("users", JSON.parse(window.localStorage.getItem(usersKey)));

try {
  load();
} catch (error) {
  persist();
}

function validateUsersForm({ name, email, phoneNumber, role, password }) {
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

async function authenticate({ name, email, phoneNumber, role, password }) {
  validateUsersForm({ name, email, phoneNumber, role, password });

  const id = hash(email);

  let user = {};

  if (users[id] !== null) {
    user = users[id];

    if (user.passwordHash === hash(password)) {
      return { ...sanitizeUser(user), token: btoa(user.id) };
    }
  }

  const error = new Error("Invalid username or password");

  error.status = 400;
  throw error;
}

async function create({ name, email, phoneNumber, role, password }) {
  validateUsersForm({ name, email, phoneNumber, role, password });

  const id = hash(email);

  const passwordHash = hash(password);

  if (users[id]) {
    const error = new Error(`User with ${email} already exists`);
    error.status = 400;
    throw error;
  }

  users[id] = { id, email, passwordHash, name, phoneNumber, role };

  persist();

  return read(id);
}

async function read(id) {
  validateUser(id);
  return sanitizeUser(users[id]);
}

async function update(id, updates) {
  validateUser(id);

  Object.assign(users[id], updates);

  persist();

  return read(id);
}

async function remove(id) {
  validateUser(id);
  delete users[id];

  persist();
}

async function reset() {
  users = {};

  persist();
}

function validateUser(id) {
  load();

  if (!users[id]) {
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

export { authenticate, create, read, update, remove, reset };
