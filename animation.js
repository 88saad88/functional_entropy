const svg = d3.select("#trajectory-viz");
const width = 600;
const height = 400;

// Create 50 particles
const particles = d3.range(50).map(() => ({
    x0: 100 + Math.random() * 20, 
    y0: 150 + Math.random() * 100,
    x1: 500 + Math.random() * 20,
    y1: 150 + Math.random() * 100
}));

function runAnimation(type) {
    // Reset particles
    svg.selectAll("circle").remove();
    
    const dots = svg.selectAll("circle")
        .data(particles)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("cx", d => d.x0)
        .attr("cy", d => d.y0)
        .attr("fill", "#3498db");

    // Animate based on model type
    dots.transition()
        .duration(2000)
        .attrTween("cx", d => t => {
            // Both models move linearly in X
            return d.x0 + (d.x1 - d.x0) * t;
        })
        .attrTween("cy", d => t => {
            if (type === 'linear') {
                // Straight line Y
                return d.y0 + (d.y1 - d.y0) * t;
            } else {
                // Wild oscillations but ends at the same point!
                const noise = Math.sin(t * 10) * 50 * (1 - t) * t;
                return d.y0 + (d.y1 - d.y0) * t + noise;
            }
        })
        .on("end", () => {
            document.getElementById("fkl-score").innerText = 
                type === 'linear' ? "High" : "Low (Detected Mismatch!)";
        });
}
