import React, { useRef, useEffect, useState } from "react"
import "./App.css"

const App = () => {
  const canvasRef =useRef(null);
  const [isDrawing, SetIsDrawing] =useState(false);
  const [isErasing, setIsErasing] =useState(false);
  const [eraserSize] = useState(50);

  useEffect(() =>{
    const canvas =canvasRef.current;
    const ctx =canvas .getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height =window.innerHeight -50;

    ctx.fillStyle ='white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const handleResize = () =>{
      const imgData =ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = window.innerWidth;
      canvas.height =window.innerHeight -50;
      ctx.fillStyle ='white';
      ctx.putImageData(imgData, 0, 0);
    };
    window.addEventListener('resize', handleResize);
    return() => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  const startDrawing  = (e) => {
    SetIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
   

  };
   const draw =(e) =>{
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (isErasing) {
      ctx.linewidth = eraserSize;
      ctx.strokeStyle ='white';
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      
    } else {
      ctx.lineWidth = 2;
      ctx.strokeStyle ='black';
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }

   };
  
   const stopDrawing = () => {
    SetIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.closePath();
    
   };

 return (
    <div className="App">
      <div className="toolbar bg-white p-2 shadow-md flex">
        <button onClick={() => setIsErasing(false)}
        className={`tool mr-2 p-2 rounded ${!isErasing ? 'bg-blue-500 text-white': 'bg-white'}`}
        >Pen</button>
        <button onClick={() => setIsErasing(true)}
         className={`tool p-2 rounded ${isErasing ? 'bg-blue-500 text-white': 'bg-white'}`}
        >Erase</button>
      </div>
      <canvas ref={canvasRef}
      className="cursor-crosshair"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      ></canvas>
    </div>
  );
}

export default App;
