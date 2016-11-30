var numspannedframes = data.NumSpannedFrames
var nodeArray = data.Data;
var nodeRefArray = data.Nodes;
//update tree, frames, and text fields and data when timebar or nodes are clicked
function update_data(i){
    //root node   //can be usd as function per node click
    var leafSize = document.getElementById('leaf-size');
    leafSize.innerHTML = "Leaf Size : "
    leafSize.innerHTML = leafSize.innerHTML + data.LeafSize;
    var selected_time_span = document.getElementById('selected-time-span');
    selected_time_span.innerHTML = "Selected Time Span : ";
    selected_time_span.innerHTML = selected_time_span.innerHTML + String(nodeArray[i].FrameSpan[0]) + '-' + String(nodeArray[i].FrameSpan[1])
    var keyframe_time_span = document.getElementById('keyframe-time-span');
    keyframe_time_span.innerHTML = "Keyframe Time Span : ";
    keyframe_time_span.innerHTML = keyframe_time_span.innerHTML + String(nodeArray[i].FrameSpan[0]) + '-' + String(nodeArray[i].FrameSpan[1])
    var num_segments = document.getElementById('num-segments');
    num_segments.innerHTML = "Num Segments : ";
    num_segments.innerHTML = num_segments.innerHTML + String(nodeArray[i].NumSegments) ;
    var KeyframeAbsIdx1 = document.getElementById('KeyframeAbsIdx1');
    var KeyframeAbsIdx2 = document.getElementById('KeyframeAbsIdx2');
    var KeyframeAbsIdx3 = document.getElementById('KeyframeAbsIdx3');
    var KeyframeAbsIdx4 = document.getElementById('KeyframeAbsIdx4');
    var KeyframeAbsIdx5 = document.getElementById('KeyframeAbsIdx5');
    var KeyframeAbsIdx6 = document.getElementById('KeyframeAbsIdx6');
    var KeyframeAbsIdx7 = document.getElementById('KeyframeAbsIdx7');
    var KeyframeAbsIdx8 = document.getElementById('KeyframeAbsIdx8');
    var KeyframeAbsIdx9 = document.getElementById('KeyframeAbsIdx9');

    var keyframe1 = document.getElementById('frame1');
    var keyframe2 = document.getElementById('frame2');
    var keyframe3 = document.getElementById('frame3');
    var keyframe4 = document.getElementById('frame4');
    var keyframe5 = document.getElementById('frame5');
    var keyframe6 = document.getElementById('frame6');
    var keyframe7 = document.getElementById('frame7');
    var keyframe8 = document.getElementById('frame8');
    var keyframe9 = document.getElementById('frame9');


    KeyframeAbsIdx1.innerHTML = String(nodeArray[i].KeyframeAbsIdx[0]);
    KeyframeAbsIdx2.innerHTML = String(nodeArray[i].KeyframeAbsIdx[1]);
    KeyframeAbsIdx3.innerHTML = String(nodeArray[i].KeyframeAbsIdx[2]);
    KeyframeAbsIdx4.innerHTML = String(nodeArray[i].KeyframeAbsIdx[3]);
    KeyframeAbsIdx5.innerHTML = String(nodeArray[i].KeyframeAbsIdx[4]);
    KeyframeAbsIdx6.innerHTML = String(nodeArray[i].KeyframeAbsIdx[5]);
    KeyframeAbsIdx7.innerHTML = String(nodeArray[i].KeyframeAbsIdx[6]);
    KeyframeAbsIdx8.innerHTML = String(nodeArray[i].KeyframeAbsIdx[7]);
    KeyframeAbsIdx9.innerHTML = String(nodeArray[i].KeyframeAbsIdx[8]);

    keyframe1.innerHTML = String(nodeArray[i].KeyframeAbsIdx[0]);
    keyframe2.innerHTML = String(nodeArray[i].KeyframeAbsIdx[1]);
    keyframe3.innerHTML = String(nodeArray[i].KeyframeAbsIdx[2]);
    keyframe4.innerHTML = String(nodeArray[i].KeyframeAbsIdx[3]);
    keyframe5.innerHTML = String(nodeArray[i].KeyframeAbsIdx[4]);
    keyframe6.innerHTML = String(nodeArray[i].KeyframeAbsIdx[5]);
    keyframe7.innerHTML = String(nodeArray[i].KeyframeAbsIdx[6]);
    keyframe8.innerHTML = String(nodeArray[i].KeyframeAbsIdx[7]);
    keyframe9.innerHTML = String(nodeArray[i].KeyframeAbsIdx[8]);


    //$('#logo').attr({ src: "<%= asset_path('logo.png') %>" });

};



var leafSize = document.getElementById('leaf-size');
leafSize.innerHTML = leafSize.innerHTML + data.LeafSize;
var selected_time_span = document.getElementById('selected-time-span');
selected_time_span.innerHTML = selected_time_span.innerHTML + String(data.Data[0].FrameSpan[0]) + '-' + String(data.Data[0].FrameSpan[1])
var keyframe_time_span = document.getElementById('keyframe-time-span');
keyframe_time_span.innerHTML = keyframe_time_span.innerHTML + String(data.Data[0].FrameSpan[0]) + '-' + String(data.Data[0].FrameSpan[1])
var num_segments = document.getElementById('num-segments');
num_segments.innerHTML = num_segments.innerHTML + String(data.Data[0].NumSegments) ;

console.log(nodeArray);

var nodes = [] ; //array for parent node setup with data
var links = [] ; //array for target to



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
