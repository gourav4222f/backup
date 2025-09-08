import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Milestones from "./components/MilestonesSection/Milestones";


function App() {

  gsap.registerPlugin(useGSAP);

  const container = useRef();


  return (
    <main ref={container} className="">
      <Milestones />      
    </main>
  )
}

export default App