import { supabase } from "../config/supabase";

type Props = {
  expression: string;
  setExpression: (val: string) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  refresh: () => void;
};

function Header({
  expression,
  setExpression,
  editingId,
  setEditingId,
  refresh
}: Props) {

  const calculate = (exp: string) => {
    try {
      return eval(exp);
    } catch {
      return "";
    }
  };

  const result = calculate(expression);

  const saveExpression = async () => {

    if (!expression || result === "") return;

    if (editingId) {

      await supabase
        .from("cal")
        .update({
          expression,
          result
        })
        .eq("id", editingId);

      setEditingId(null);

    } else {

      await supabase
        .from("cal")
        .insert({
          expression,
          result
        });

    }

    setExpression("");
    refresh();
  };

  return (
    <>
      <input
        placeholder="Enter expression"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
      />

      <label>{result}</label>

      <button onClick={saveExpression}>
        {editingId ? "Update Expression" : "Add Expression"}
      </button>
    </>
  );
}

export default Header;