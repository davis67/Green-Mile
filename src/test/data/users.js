const usersKey = "__bookshelf_users__";

let users = {};

const persist = () =>
  window.localStorage.setItem(usersKey, JSON.stringify(users));

const load = () =>
  Object.assign(users, JSON.parse(window.localStorage.getItem(usersKey)));

try {
  load();
} catch (error) {
  persist();
}

function validateUsersForm({ email, password }) {
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
  validateUsersForm({ email, password });

  const id = hash(email);

  const user = users[id] || {};

  if (user.passwordHash === hash(password)) {
    return { ...sanitizeUser(user), token: btoa(user.id) };
  }

  console.log("hash", id);

  const error = new Error("Invalid username or password");

  error.status = 400;
  throw error;
}

async function create({ email, password }) {
  validateUsersForm({ email, password });

  const id = hash(email);

  const passwordHash = hash(password);

  if (users[id]) {
    const error = new Error(`User with ${email} already exists`);
    error.status = 400;
    throw error;
  }

  users[id] = { id, email, passwordHash };

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
