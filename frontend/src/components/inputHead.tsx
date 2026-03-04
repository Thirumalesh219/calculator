import { useState } from "react";
import { supabase } from "../config/supabase";

function Header(){
    const [expression,setExpression]=useState<string>("");
    const calculate=(exp:string)=>{
        try {
            return eval(exp)
        } catch {
            return ""
        }
    }
    const addtoDatabase=async()=>{
        const entry:string=expression+"="+result;
        const res=await supabase.from("cal").insert({expression:entry});
        console.log(res)
    }
    const result=calculate(expression);

    return (
    <>
        <input placeholder="Enter expression 100*30" onChange={(e)=>setExpression(e.target.value)} value={expression}/>
        <label >{result}</label>
        <button onClick={addtoDatabase}>Add expression</button>
    </>);
}
export default Header;