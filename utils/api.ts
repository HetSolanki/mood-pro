export const createNewEntry = async () => {
  const entry = await fetch(
    new Request("/api/journal", {
      method: "POST",
    })
  );

  return entry;
};

export const updateEntry = async ({ id, content }) => {
  const entry = await fetch(
    new Request(`/api/journal/${id}`, {
      method: "POST",
      body: JSON.stringify({
        content,
      }),
    })
  );

  const data = await entry.json();

  return data;
};
