import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

type Expression = {
  id: number;
  expression: string;
  created_at: string;
};

function ExistingExpressions(){
    const [exps,setExps]=useState<Expression[]>([]);
    const grouped = exps.reduce<Record<string, Expression[]>>((acc, item) => {
    const date = new Date(item.created_at).toLocaleDateString();

    if (!acc[date]) acc[date] = [];

    acc[date].push(item);
    return acc;
    }, {});
    const getAll=async()=>{
        const res=await supabase.from("cal").select().order("created_at",{ascending:false});
        if(res.data){
            setExps(res.data);
        }
    }
    useEffect(()=>{
        getAll();

    },[]);
    return (
    <>
        {Object.entries(grouped).map(([date, expressions]) => (
            <div key={date}>
            <h3>{date}</h3>

            {expressions.map((exp) => (
                <div key={exp.id}>
                {exp.expression}
                </div>
            ))}
            </div>
        ))}
    </>);
}
export default ExistingExpressions;