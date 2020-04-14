const STORAGE_KEY = "countdowns";

const getAll = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const add = (countdown) => {
  const countdowns = JSON.stringify([...getAll(), countdown]);
  localStorage.setItem(STORAGE_KEY, countdowns);

  return countdowns;
};

const remove = (id) => {
  const countdowns = JSON.stringify(getAll().filter(c => c.id !== id));
  localStorage.setItem(STORAGE_KEY, countdowns);

  return countdowns;
};

export const storage = { getAll, add, remove };