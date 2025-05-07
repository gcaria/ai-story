import FormEntry from "./FormEntry.js";

function Form({
  character1,
  character2,
  writer,
  loading,
  setCharacter1,
  setCharacter2,
  setWriter,
  setQuery,
}) {
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    const query = `Write a short story about ${character1} and ${character2}, as if it was written by ${writer}.`;
    setQuery(query);
  };

  return (
    <div className="form">
      <h2>Enter input</h2>
      <form onSubmit={handleSubmit}>
        <FormEntry
          entry={{
            label: "Character #1",
            type: "text",
            name: "character1",
            value: character1,
          }}
          onChange={setCharacter1}
        />
        <FormEntry
          entry={{
            label: "Character #2",
            type: "text",
            name: "character2",
            value: character2,
          }}
          onChange={setCharacter2}
        />
        <FormEntry
          entry={{
            label: "Writer",
            type: "text",
            name: "writer",
            value: writer,
          }}
          onChange={setWriter}
        />
        <input type="submit" value={loading ? "Loading..." : "Generate"} />
      </form>
    </div>
  );
}

export default Form;
