import React, { useRef, useEffect } from "react";

const Chart = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const baseline = canvas.height - 40;
    const points = [
      { x: 40, y: baseline },
      { x: 120, y: 250 },
      { x: 200, y: 200 },
      { x: 280, y: 150 },
      { x: 360, y: 180 },
      { x: 440, y: 120 },
      { x: 520, y: 100 }
    ];

    let animationProgress = 0.2; // Start partially filled
    let targetProgress = 0.2;
    const animationSpeed = 0.01;

    function drawAxesAndLabels() {
      // Graph title
      ctx.fillStyle = "#0077b6";
      ctx.font = "bold 30px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Sales Graph", canvas.width / 2, 25);

      // Axes
      ctx.strokeStyle = "#999";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, 0);
      ctx.lineTo(40, baseline);
      ctx.lineTo(canvas.width, baseline);
      ctx.stroke();

      ctx.fillStyle = "#333";
      ctx.font = "12px Arial";
      ctx.textAlign = "left";

      // Y-axis ticks and labels
      const yLabels = [300, 250, 200, 150, 100];
      yLabels.forEach((val) => {
        const y = baseline - (baseline - 40) * (val / 300);
        ctx.beginPath();
        ctx.moveTo(35, y);
        ctx.lineTo(45, y);
        ctx.stroke();
        ctx.fillText(val.toString(), 10, y + 4);
      });

      // X-axis ticks and labels
      const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
      points.forEach((p, i) => {
        ctx.beginPath();
        ctx.moveTo(p.x, baseline - 5);
        ctx.lineTo(p.x, baseline + 5);
        ctx.stroke();
        ctx.fillText(xLabels[i], p.x - 10, baseline + 20);
      });

      // Axis titles
      ctx.save();
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Months", canvas.width / 2, baseline + 35);
      ctx.translate(10, canvas.height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("Value", 0, 0);
      ctx.restore();
    }

    function drawGraph(progress) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawAxesAndLabels();

      // Line path
      ctx.strokeStyle = "#0077b6";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      const totalSegments = points.length - 1;
      let maxIndex = Math.floor(progress * totalSegments);
      let partialSegmentProgress = progress * totalSegments - maxIndex;

      for (let i = 0; i < maxIndex; i++) {
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
      }

      if (maxIndex < totalSegments) {
        const start = points[maxIndex];
        const end = points[maxIndex + 1];
        const x = start.x + (end.x - start.x) * partialSegmentProgress;
        const y = start.y + (end.y - start.y) * partialSegmentProgress;
        ctx.lineTo(x, y);
      }

      ctx.stroke();
    }

    function animate() {
      if (targetProgress > animationProgress) {
        animationProgress += animationSpeed;
        if (animationProgress > 1) animationProgress = 1;
      } else if (targetProgress < animationProgress) {
        animationProgress -= animationSpeed;
        if (animationProgress < 0.2) animationProgress = 0.2; // Keep minimum fill
      }

      drawGraph(animationProgress);
      requestAnimationFrame(animate);
    }

    const handleMouseEnter = () => (targetProgress = 1);
    const handleMouseLeave = () => (targetProgress = 0.2);

    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    animate();

    return () => {
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={550}
      height={400}
      className="bg-blue-50 rounded-lg shadow-lg cursor-pointer"
    ></canvas>
  );
};

export default Chart;
