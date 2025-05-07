import FormEntry from "./FormEntry.js";

function Form({
  userPrompt,
  writer,
  loading,
  setUserPrompt,
  setWriter,
  setReply,
  setLoading,
}) {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    const query = `Write a short story about ${userPrompt}, as if it was written by ${writer}.`;

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      // const message = data.choices?.[0]?.message?.content || "[No response]";
      setReply(data.answer);
    } catch (error) {
      setReply("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <h2>Enter input</h2>
      <form onSubmit={handleSubmit}>
        <FormEntry
          entry={{
            label: "Story's plot",
            type: "text",
            name: "userPrompt",
            value: userPrompt,
          }}
          onChange={setUserPrompt}
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
