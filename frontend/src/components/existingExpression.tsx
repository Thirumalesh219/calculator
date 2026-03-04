import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

type Expression = {
  id: number;
  expression: string;
  result: number;
  created_at: string;
};

type Props = {
  refreshKey: number;
  setExpression: (val: string) => void;
  setEditingId: (id: number) => void;
};

type Tree = {
  [week: string]: {
    total: number;
    days: {
      [day: string]: {
        total: number;
        expressions: Expression[];
      };
    };
  };
};

function ExistingExpressions({
  refreshKey,
  setExpression,
  setEditingId
}: Props) {

  const [exps, setExps] = useState<Expression[]>([]);

  const getAll = async () => {
    const res = await supabase
      .from("cal")
      .select()
      .order("created_at", { ascending: false });

    if (res.data) {
      setExps(res.data);
    }
  };

  useEffect(() => {
    getAll();
  }, [refreshKey]);

  const deleteExp = async (id: number) => {
    await supabase.from("cal").delete().eq("id", id);
    getAll();
  };

  const copyExp = (exp: Expression) => {
    navigator.clipboard.writeText(`${exp.expression}=${exp.result}`);
  };

  const formatDay = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString();

  const getWeekRange = (dateStr: string) => {

    const date = new Date(dateStr);

    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay());

    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);

    const format = (d: Date) =>
      d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
      });

    return `${format(sunday)} - ${format(saturday)}`;
  };

  const tree: Tree = exps.reduce((acc, item) => {

    const week = getWeekRange(item.created_at);
    const day = formatDay(item.created_at);

    if (!acc[week]) {
      acc[week] = { total: 0, days: {} };
    }

    if (!acc[week].days[day]) {
      acc[week].days[day] = {
        total: 0,
        expressions: []
      };
    }

    acc[week].total += Number(item.result);
    acc[week].days[day].total += Number(item.result);
    acc[week].days[day].expressions.push(item);

    return acc;

  }, {} as Tree);

  return (
    <>
      {Object.entries(tree).map(([week, weekData]) => (

        <div key={week}>

          <h2>
            ▶ {week} (Weekly Total: {weekData.total})
          </h2>

          {Object.entries(weekData.days).map(([day, dayData]) => (

            <div key={day} style={{ marginLeft: "20px" }}>

              <h4>
                ▶ {day} (Daily Total: {dayData.total})
              </h4>

              {dayData.expressions.map((exp) => (

                <div
                  key={exp.id}
                  style={{ marginLeft: "40px" }}
                >

                  {exp.expression} = {exp.result}

                  <button
                    onClick={() => {
                      setExpression(exp.expression);
                      setEditingId(exp.id);
                    }}
                  >
                    Edit
                  </button>

                  <button onClick={() => copyExp(exp)}>
                    Copy
                  </button>

                  <button onClick={() => deleteExp(exp.id)}>
                    Delete
                  </button>

                </div>

              ))}

            </div>

          ))}

        </div>

      ))}
    </>
  );
}

export default ExistingExpressions;