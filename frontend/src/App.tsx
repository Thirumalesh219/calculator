import { useState } from "react";
import ExistingExpressions from "./components/existingExpression";
import Header from "./components/inputHead";

function App() {

  const [refreshKey, setRefreshKey] = useState(0);
  const [expression, setExpression] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const refresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <Header
        expression={expression}
        setExpression={setExpression}
        editingId={editingId}
        setEditingId={setEditingId}
        refresh={refresh}
      />

      <ExistingExpressions
        refreshKey={refreshKey}
        setExpression={setExpression}
        setEditingId={setEditingId}
      />
    </>
  );
}

export default App;