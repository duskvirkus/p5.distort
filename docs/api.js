YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Distort",
        "DistortElement",
        "DistortEllipse",
        "DistortString"
    ],
    "modules": [
        "controller",
        "elements",
        "elements-abstract",
        "elements-c",
        "elements-text"
    ],
    "allModules": [
        {
            "displayName": "controller",
            "name": "controller",
            "description": "Creates a Distort controller. Keeps track of frames and the distort factor.\nAlso provides a streamlined way to render all elements associated with the controller."
        },
        {
            "displayName": "elements",
            "name": "elements"
        },
        {
            "displayName": "elements-abstract",
            "name": "elements-abstract",
            "description": "Creates a distort element. This constructor is not meant to be called directly.\nShould be called as super() by a class that extends DistortElement."
        },
        {
            "displayName": "elements-c",
            "name": "elements-c"
        },
        {
            "displayName": "elements-text",
            "name": "elements-text",
            "description": "Creates a DistortElement from a string of text."
        }
    ],
    "elements": []
} };
});