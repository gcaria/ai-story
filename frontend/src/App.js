import Header from "./Header";
import Footer from "./Footer";
import Story from "./Story";
import Form from "./Form";
import { useState, useEffect, useRef } from "react";

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [writer, setWriter] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Header title={"AI generated storyline"} />
      <div className="container">
        <Form
          userPrompt={userPrompt}
          writer={writer}
          loading={loading}
          setUserPrompt={setUserPrompt}
          setWriter={setWriter}
          setReply={setReply}
          setLoading={setLoading}
        />
        <Story story={reply} />;
      </div>
      <Footer />
    </div>
  );
}

export default App;
