import Header from "./Header";
import Footer from "./Footer";
import Story from "./Story";
import Form from "./Form";
import { useState, useEffect, useRef } from "react";

function App() {
  const [character1, setCharacter1] = useState("");
  const [character2, setCharacter2] = useState("");
  const [writer, setWriter] = useState("");
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    const handleSend = async () => {
      console.log(`${apiUrl}/query`);
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/query`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({query}),
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

    if (query) handleSend();
    return () => {};
  }, [query]); // 👈 Dependency array

  return (
    <div className="App">
      <Header title={"AI generated storyline"} />
      <div className="container">
        <Form
          character1={character1}
          character2={character2}
          writer={writer}
          loading={loading}
          setCharacter1={setCharacter1}
          setCharacter2={setCharacter2}
          setWriter={setWriter}
          setQuery={setQuery}
        />
        <Story story={reply} />;
      </div>
      <Footer />
    </div>
  );
}

export default App;
