import { useState, useEffect } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [scripts, setScripts] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScript, setEditingScript] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/text-generate/getscripts", {
        headers: {
          Authorization: `${localStorage.getItem("authtoken")}`,
        },
      });
      setScripts(data.scripts);
    } catch (error) {
      console.error("Error fetching scripts:", error);
    }
  };

  const generateScript = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/text-generate/generate",
        { prompt },
        {
          headers: {
            Authorization: `${localStorage.getItem("authtoken")}`,
          },
        }
      );
      setGeneratedText(data.script.generatedText);
      setScripts([...scripts, data.script]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error generating script:", error);
    }
    setLoading(false);
  };

  const deleteScript = async (id) => {
    if (!window.confirm("Are you sure you want to delete this script?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/text-generate/deletescript/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("authtoken")}`,
        },
      });
      setScripts(scripts.filter((script) => script.id !== id));
    } catch (error) {
      console.error("Error deleting script:", error);
    }
  };

  const updateScript = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/text-generate/update/${id}`,
        { prompt },
        {
          headers: {
            Authorization: `${localStorage.getItem("authtoken")}`,
          },
        }
      );
      setScripts(scripts.map((script) => (script.id === id ? data.script : script)));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating script:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto pt-20">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create New Project
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-2">{editingScript ? "Edit Your Prompt" : "Enter Your Prompt"}</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Type something..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={editingScript ? () => updateScript(editingScript.id) : generateScript}
              disabled={loading}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {loading ? "Processing..." : editingScript ? "Update Text" : "Generate Text"}
            </button>
            <button onClick={() => setIsModalOpen(false)} className="w-full mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Close
            </button>
          </div>
        </div>
      )}
      <h2 className="text-xl font-semibold mt-6">Your Scripts</h2>
      <div className="grid gap-4 mt-4">
        {scripts.map((script) => (
          <div key={script.id} className="border p-4 rounded shadow relative">
            <button onClick={() => setMenuOpen(menuOpen === script.id ? null : script.id)} className="absolute top-2 right-2">
              ...
            </button>
            {menuOpen === script.id && (
              <div className="absolute right-2 top-8 bg-white shadow-lg rounded p-2">
                <button
                  onClick={() => {
                    setEditingScript(script);
                    setPrompt(script.prompt);
                    setIsModalOpen(true);
                    setMenuOpen(null);
                  }}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteScript(script.id)}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-200 text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
            <p className="font-bold">Prompt:</p>
            <p>{script.prompt}</p>
            <p className="font-bold mt-2">Generated Text:</p>
            <p>{script.generatedText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
