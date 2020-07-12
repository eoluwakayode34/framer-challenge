import React, {useState} from "react";
import { Card, CardGrid, Container, Header } from "./Elements";
import { motion   } from "framer-motion";
import Modal from './modal';
import "./App.css";
import Menu from "./Menu";
import blue from "./blue.png";
import purp from "./purp.png";
import black from "./black.png";
import green from "./green.png";

function App() {
  const [value, setValue] = useState(0);
  const [isToggle, setToggle] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [lastYPos, setLastYPos] = React.useState(0);
  React.useEffect(() => {
    function handleScroll(){
      const yPos = window.scrollY;
      const isScrollingUp = yPos < lastYPos;

      setShowAction(isScrollingUp);
      setLastYPos(yPos);

    }

    window.addEventListener('scroll', handleScroll, false);
    return () => {
      window.removeEventListener('scroll', handleScroll, false)
    }
  }, [lastYPos])
  return (
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
    >

      <motion.div 

      
      initial={{opacity: 1, backgroundColor: 'black', y: 0}}

      animate={{

       
        opacity: showAction ? [0, 0.5, 0.3, 0.3, 0] : 1 , y: showAction ? [80, 70, 30] : 0
            }}
            
            transition={{duration: showAction ? 0  :[ .3] }}>
      <Header
      >
        <Menu />
        <h1>Header</h1>
      </Header>
      </motion.div>
      <Container>
       
          <motion.h2 
          
          iniital={{x: 0, y: 0, scale: 1}}
          animate={{x: [value + 'px', 2 * value + 'px', value + 'px'],
          y: [value + 'px', value + 'px', value + 'px' ],
          scale: value > 50 ? [0.5, 1, 2] : 1}} >Super Cool
          </motion.h2>
       
        <button onClick={() => setToggle(true)}>Toggle</button>
        <input type='range' min='-100' max='100'  value={value} onChange={(e) => setValue(e.target.value)} />
        <CardGrid>
          <Modal isToggle={isToggle} setToggle={setToggle}>
          <Card style={{ background: "var(--purp)" }}>
            <h3>Some card</h3>
            <img src={purp} alt='mages' />
          </Card>
          </Modal>
          <motion.div
          intial={{x: 0, y: 0, opacity: 0}}
          animate={{x: showAction ? 0 : [100, 200, -300, 200, 0],
          rotate: showAction ? 0: [10, 20, 40, 40, 0]}}
          transition={{duration: 1}}
          >         
               <Card style={{ background: "var(--blue)" }}>
            <h3>Some card</h3>
            <img src={blue} alt='mages'/>
          </Card>       
         
          </motion.div>

          <motion.div
              whileHover={{scale: [1, 1.2, 1]}}
              whileTap={{scale: 1}}
              drag = 'x'
              dragConstraints={{left: 0, right: 0}}

          >
          <Card style={{ background: "var(--black)" }}>
            <h3>Some card</h3>
            <img src={black}alt='mages' />
          </Card>
          </motion.div>
         
          <Card style={{ background: "var(--green)" }}>
            <h3>Some card</h3>
            
            <motion.img
            whileHover={{x: [200, 0, -200, 0, 200, 0, -200, 0,]}}
            transition={{duration: 3}}
            src={green}alt='mages' />
          </Card>
        </CardGrid>
      </Container>
    </motion.div>
  );
}

export default App;
