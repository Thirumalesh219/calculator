// import { useEffect } from "react";

import ExistingExpressions from "./components/existingExpression";
import Header from "./components/inputHead";

// import { supabase } from "./config/supabase";
function App(){
  // const testBase=async()=>{
  //   console.log("Test base");
  //   const res=await supabase.from("cal").insert([{expression:"1+1=2"}]);
  //   console.log(res);
  // }
  // useEffect(()=>{
  //   testBase();
  // },[])
  return (
  <>
  <Header/>
  <ExistingExpressions/>
  </>);
}
export default App;