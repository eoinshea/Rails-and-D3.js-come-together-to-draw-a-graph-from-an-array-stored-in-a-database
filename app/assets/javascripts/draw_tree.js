
//must allow for > N children must be rewritten
//possibly use array, then sort children left to right and insert accordingly // DONT DO UNTIL IMAGES DONE FOR coreset-tree
function get_children(i){
    //var child1 = nodeRefArray.indexOf(i);
    //var child2 = nodeRefArray.lastIndexOf(i,-1); //reverse


    var child1 = nodeRefArray.indexOf(1);
    var child2 = nodeRefArray.lastIndexOf(1,-1); //reverse

    //console.log("child of "nodeRefArray[i]  = " + child1);

    if ( (child1 === undefined || child2 === undefined || child1 === null || child2 === null || child1 === -1 || child2 === -1)) //&& nodeArray[i].NodeType != "Leaf")
    {
        child1 = nodeRefArray.indexOf(i+1);
        child2 = nodeRefArray.lastIndexOf(i+1, -1); //reverse
    }

    if ( (child1 === undefined || child2 === undefined || child1 === null || child2 === null || child1 === -1 || child2 === -1)) //&& nodeArray[i].NodeType != "Leaf")
    {
        return [];
    }
    else if (child1 < child2)
    {
        var left_child_index = child1;
        var right_child_index = child2;
        var children = [{
            "name" : left_child_index,
            "value": left_child_index,
            "parent": i,
            "children": get_children(left_child_index)
        }, {
            "name" : right_child_index,
            "value": right_child_index,
            "parent": i,
            "children": get_children(right_child_index)
        }]
        return children;
    }
    else
    {
        var left_child_index = child2;
        var right_child_index = child1;
        var children = [ {
            "name" : right_child_index,
            "value" : right_child_index,
            "parent" : i,
            "children" :  get_children(right_child_index)
        }, {
            "name" : left_child_index,
            "value": left_child_index,
            "parent": i,
            "children": get_children(left_child_index)
        }]
        return children;
    }
};


var flatData = [];

// Create nodes for tree layout
var i = 1;
do {
    if (i == nodeArray.length ) {
        var node = {
            "name" : i,
            "value": i,
            "parent": null,
            "children": get_children(i)
        };
        flatData.push(node);
    }

    if (nodeArray[i].NodeType == "Leaf")
    {
        //create node with no children
        var node = {
            "name" : i,
            "value" : i,
            "parent" : nodeRefArray[i], //for the links
            "children" :[]
        }
        flatData.push(node);
    };

    if(nodeArray[i].NodeType == "Merge")
    {
        // root node
        var node = {
            "name" : i,
            "value": i,
            "parent": nodeRefArray[i],
            "children": get_children(i)
        }
        flatData.push(node);
    };
    i = i + 1;
} while( i != nodeArray.length);




// ************** Generate the tree diagram  *****************
var margin = {top: 10, right: 50, bottom: 20, left: 100},
    width = 700 - margin.right - margin.left,
    height = 600 - margin.top - margin.bottom;

var i = 1;
var tree = d3.layout.tree()
    .size([height, width]);
var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.x, d.y]; });
var svg = d3.select("#tree").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
root = flatData[flatData.length -1];

update(root);
function update(source) {
    // Compute the new tree layout.
    console.log(tree.nodes);
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);
    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 100; });

    // Declare the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter the nodes.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")"; });
    nodeEnter.append("circle")
        .attr("r", 10)
        .style("fill", "#fff")
        .on("click", function(d) {
            update_data(d.value) ;
            update_images(d.value);
                //state = !state;
                // (state) {
                    set.style('fill', 'black');
                //} else {
                  //  set.style('fill', function(d) { return d.color; });
                //}
            console.log("Value =" + d.value)
        });
    nodeEnter.append("text")
        .attr("y", function(d) {
            return d.children || d._children ? -18 : 18; })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return ""; })
        .style("fill-opacity", 1);
    // Declare the links…
    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });
    // Enter the links.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", diagonal);

    nodes.forEach(function(d) { d.y = d.depth * 100; });


    update_data(nodeArray.length -1);
    //var node_index = prompt("Enter a node index for data. Press F5 for another. Or just click on the tree !", "");
    // update_data(node_index)
}