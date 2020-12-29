import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
/*import graphlibDot from 'graphlib-dot';
import dagreD3 from 'dagre-d3';
import * as d3 from 'd3';
import { graphviz }  from 'd3-graphviz';
import { wasmFolder } from "@hpcc-js/wasm";*/

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void { 
   /* wasmFolder('assets/');
    const con = graphviz("#graph").renderDot(`digraph Tree {
      node [color="black", fontname=helvetica, shape=rect, style="filled, rounded"];
      edge [fontname=helvetica];
      0 [fillcolor="#fdf4ee", label="petal width (cm) <= 0.8"];
      1 [fillcolor="#e58139", label="class = setosa"];
      0 -> 1  [headlabel="True", labelangle=45, labeldistance="2.5"];
      2 [fillcolor="#ffffff", label="petal width (cm) <= 1.65"];
      0 -> 2  [headlabel="False", labelangle="-45", labeldistance="2.5"];
      3 [fillcolor="#46e789", label="petal length (cm) <= 4.95"];
      2 -> 3;
      4 [fillcolor="#39e581", label="class = versicolor"];
      3 -> 4;
      5 [fillcolor="#8139e5", label="class = virginica"];
      3 -> 5;
      6 [fillcolor="#8742e6", label="sepal width (cm) <= 2.95"];
      2 -> 6;
      7 [fillcolor="#8139e5", label="class = virginica"];
      6 -> 7;
      8 [fillcolor="#8a48e7", label="petal width (cm) <= 1.75"];
      6 -> 8;
      9 [fillcolor="#39e581", label="class = versicolor"];
      8 -> 9;
      10 [fillcolor="#8640e6", label="petal width (cm) <= 1.9"];
      8 -> 10;
      11 [fillcolor="#9355e9", label="petal length (cm) <= 4.85"];
      10 -> 11;
      12 [fillcolor="#ffffff", label="sepal width (cm) <= 3.1"];
      11 -> 12;
      13 [fillcolor="#8139e5", label="class = virginica"];
      12 -> 13;
      14 [fillcolor="#39e581", label="class = versicolor"];
      12 -> 14;
      15 [fillcolor="#8139e5", label="class = virginica"];
      11 -> 15;
      16 [fillcolor="#8139e5", label="class = virginica"];
      10 -> 16;
      }
      `); //Preload d3Graphiz so it register itself in d3 as a plugin*/
    /*var g = graphlibDot.read(`digraph Tree {
      node [color="black", fontname=helvetica, shape=rect, style="filled, rounded"];
      edge [fontname=helvetica];
      0 [fillcolor="#fdf4ee", label="petal width (cm) <= 0.8"];
      1 [fillcolor="#e58139", label="class = setosa"];
      0 -> 1  [headlabel="True", labelangle=45, labeldistance="2.5"];
      2 [fillcolor="#ffffff", label="petal width (cm) <= 1.65"];
      0 -> 2  [headlabel="False", labelangle="-45", labeldistance="2.5"];
      3 [fillcolor="#46e789", label="petal length (cm) <= 4.95"];
      2 -> 3;
      4 [fillcolor="#39e581", label="class = versicolor"];
      3 -> 4;
      5 [fillcolor="#8139e5", label="class = virginica"];
      3 -> 5;
      6 [fillcolor="#8742e6", label="sepal width (cm) <= 2.95"];
      2 -> 6;
      7 [fillcolor="#8139e5", label="class = virginica"];
      6 -> 7;
      8 [fillcolor="#8a48e7", label="petal width (cm) <= 1.75"];
      6 -> 8;
      9 [fillcolor="#39e581", label="class = versicolor"];
      8 -> 9;
      10 [fillcolor="#8640e6", label="petal width (cm) <= 1.9"];
      8 -> 10;
      11 [fillcolor="#9355e9", label="petal length (cm) <= 4.85"];
      10 -> 11;
      12 [fillcolor="#ffffff", label="sepal width (cm) <= 3.1"];
      11 -> 12;
      13 [fillcolor="#8139e5", label="class = virginica"];
      12 -> 13;
      14 [fillcolor="#39e581", label="class = versicolor"];
      12 -> 14;
      15 [fillcolor="#8139e5", label="class = virginica"];
      11 -> 15;
      16 [fillcolor="#8139e5", label="class = virginica"];
      10 -> 16;
      }
      `);

    // Render the graphlib object using d3.
    var renderer = new dagreD3.render();
    d3.select("#graph").call(renderer,g);


    // Optional - resize the SVG element based on the contents.
    let svg = <SVGGraphicsElement>document.querySelector('#graph');
    var bbox = svg.getBBox();
    svg.style.width = bbox.width + 40.0 + "px";
    svg.style.height = bbox.height + 40.0 + "px";*/
  }

}
