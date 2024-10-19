// components/ui/TreeDiagram.js

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function buildTree(expression) {
    let stack = [];
    let operators = [];
    let precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 2,
        '(': 0
    };

    function createNode(operator) {
        let node = new Node(operator);
        node.right = stack.pop();
        node.left = stack.pop();
        stack.push(node);
    }

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];

        if (char === ' ') continue;

        if (!isNaN(char) || char === '.') {
            let num = "";
            while (i < expression.length && (!isNaN(expression[i]) || expression[i] === '.')) {
                num += expression[i];
                i++;
            }
            i--;
            stack.push(new Node(num));
        } else if (char === '(') {
            operators.push(char);
        } else if (char === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                createNode(operators.pop());
            }
            operators.pop(); 
            let parenNode = new Node('( )');
            parenNode.left = stack.pop();
            stack.push(parenNode);
        } else if (char in precedence) {
            while (operators.length && operators[operators.length - 1] !== '(' &&
                   precedence[char] <= precedence[operators[operators.length - 1]]) {
                createNode(operators.pop());
            }
            operators.push(char);
        }
    }

    while (operators.length) {
        createNode(operators.pop());
    }

    return stack.pop();
}

function convertTreeToD3Format(node) {
    if (!node) return null;
    return {
        value: node.value,
        children: [
            convertTreeToD3Format(node.left),
            convertTreeToD3Format(node.right)
        ].filter(n => n !== null)
    };
}

const TreeDiagram = ({ expression }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!expression) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = svg.node().getBoundingClientRect().width;
        const height = svg.node().getBoundingClientRect().height;

        const tree = buildTree(expression);
        const data = convertTreeToD3Format(tree);
        const root = d3.hierarchy(data);

        const treeLayout = d3.tree().size([width, height - 40]);
        treeLayout(root);

        const g = svg.append("g")
            .attr("transform", `translate(0, 20)`);

        // Invertir el árbol verticalmente
        // root.descendants().forEach(d => d.y = 400 - d.y);

        // Animación de las líneas (aristas)
        g.selectAll('line')
            .data(root.links())
            .enter()
            .append('line')
            .attr('x1', d => d.source.x + 50)
            .attr('y1', d => d.source.y + 50)
            .attr('x2', d => d.source.x + 50)  // Comienzan desde el mismo punto para efecto de animación
            .attr('y2', d => d.source.y + 50)
            .style("stroke", "#00ff00") // Color de borde
            .style("stroke-width", 2)
            .transition()
            .duration(1000)
            .attr('x2', d => d.target.x + 50)
            .attr('y2', d => d.target.y + 50);

        // Animación de los nodos (círculos)
        g.selectAll('circle')
            .data(root.descendants())
            .enter()
            .append('circle')
            .attr('cx', d => d.x + 50)
            .attr('cy', d => d.y + 50)
            .attr('r', 0)  // Comienzan con radio 0
            .style('fill', 'white')
            .style("stroke", "#00ff00") // Color de borde
            .style("stroke-width", 2)
            .transition()
            .duration(1000)
            .attr('r', 20);  // Expanden al radio original

        // Agregar texto a los nodos
        g.selectAll('text')
            .data(root.descendants())
            .enter()
            .append('text')
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .style('fill', '#1a1a1a') // Texto en color oscuro
            .attr('x', d => d.x + 50)
            .attr('y', d => d.y + 50)
            .text(d => d.data.value);

        // Agregar funcionalidad de zoom
        const zoom = d3.zoom()
            .scaleExtent([0.5, 2])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoom);

    }, [expression]);

    return (
        <svg ref={svgRef} width="100%" height="100%" className="svg">
            <style>
                {`
                .svg {
                    background-color: #f0f0f0; // Fondo claro
                }
                `}
            </style>
        </svg>
    );
};

export default TreeDiagram;
