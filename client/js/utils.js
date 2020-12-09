const constants = require('./constants');

exports.getConfigProps = function() {
	return {
        "name": {
            "translation": "Name",
            "option": "use",
            "section": "General",
            "typeSpec": null,
            "refSpec": null,
            "choices": null
        },
        "type": {
            "translation": "Type",
            "option": "readonly",
            "section": "General",
            "typeSpec": null,
            "refSpec": null,
            "choices": null  
        },
        "size": {
            "translation": "Size",
            "option": "readonly",
            "section": "General",
            "typeSpec": "wiref",
            "refSpec": "size",
            "choices": null
        },
        "location": {
            "translation": "Location",
            "option": "readonly",
            "section": "General",
            "typeSpec": null,
            "refSpec": null,
            "choices": null
        },
        "source": {
            "translation": "Source",
            "option": "readonly",
            "section": "General",
            "typeSpec": null,
            "refSpec": null,
            "choices": null
        },
        "author": {
            "translation": "Author",
            "option": "readonly",
            "section": "General",
            "typeSpec": null,
            "refSpec": null,
            "choices": null  
        },
        "uploaded": {
            "translation": "Date Uploaded",
            "option": "readonly",
            "section": "General",
            "typeSpec": "wiref",
            "refSpec": "time",
            "choices": null
        },
        "modified": {
            "translation": "Date Modified",
            "option": "readonly",
            "section": "General",
            "typeSpec": "wiref",
            "refSpec": "time",
            "choices": null
        },
        "well": {
            "translation": "Well",
            "option": "use",
            // "option" : "notuse",
            "section": "Information",
            "typeSpec": "wilink",
            "refSpec": null,
            "choices": null
        },
        "block": {
            "translation": "Block",
            "option": "use",
            "section": "Information",
            "typeSpec": null,
            "refSpec": null,
            "choices": null
        },
        "field": {
            "translation": "Field",
            "option": "use",
            // "option" : "notuse",
            "section": "Information",
            "typeSpec": null,
            "refSpec": null,
            "choices": null
        },
        "welltype": {
            "translation": "Well Type",
            "option": "readonly",
            // "option" : "notuse",
            "section": "Information",
            "typeSpec": null,
            "refSpec": null,
            "choices": null
        },
        /*"parameter": {
            "translation": "Parameter",
            "option": "use",
            "section": "Information",
            "typeSpec": null,
            "refSpec": null,
            "choices": null 
        },*/
        "datatype": {
            "translation": "Data Type",
            "option": "use",
            "section": "Information",
            "typeSpec": "wiselect",
            "refSpec": null,
            "choices": "datatypes"
        },
        "relatesto": {
            "translation": "Relates to",
            // "option": "use",
            "option" : "notuse",
            "section": "Information",
            "typeSpec": "wilink",
            "refSpec": null,
            "choices": null
        },
        "associate": {
            "translation": "Associate to",
            "option": "use",
            "section": "Information",
            "typeSpec": "wiassociate",
            "refSpec": null,
            "choices": null
        },
        "quality": {
            "translation": "Quality",
            "option": null,
            "section": "Information",
            "typeSpec": 'rating',
            "refSpec": null,
            "choices": null 
        },
        "description": {
            "translation": "Description",
            "option": "use",
            "section": "Description",
            "typeSpec": null,
            "refSpec": null,
            "choices": null   
        },
        "encodingtype": {
            "translation": "Description",
            "option": "notuse",
            "section": "",
            "typeSpec": null,
            "refSpec": null,
            "choices": null   
        }
    };
}

exports.getSelections = function () {
	return {
  		"datatypes" : [
	  		"",
			"Biostratigraphy",
			"Borehole Seismic",
			"Checkshot",
			"Drilling Reports (Drilling Programs, Final Drilling Reports, Final Completion Reports)",
			"DST (Drill Stem Test)",
			"Image Logs",
			"Mud Logging (Gas Data, Mud Log, Oil show etc.)",
			"Perforation",
			"Pressure Logs (MDT, RFT, RCI, etc.)",
			"Production (Data, Forecast, Reports, etc.)",
			"PVT (Lab Data, Modeling, Reports, Analysis, etc.)",
			"SCAL (Special Core Analysis)",
			"Well Intervention (Interpretation Reports, Planning, Daily Reports, Log Data, Analysis, etc.)",
            "Basin Modeling (Geochemical, Petroleum System)",
            "Composite Log",
            "Conventional Logs (GR, Resistivity, Density, Sonic)",
            "Core Image",
            "Cuttings Description",
            "Cuttings Photos",
            "Cuttings Section",
            "Deposition Environment and Seq-Stratigraphy",
            "Directional Surveys",
            "Drilling Data (Mudweight, ROP, SPP, Torque, etc.)",
            "Dynamic Model",
            "Exploration Potential Reports",
            "FDP",
            "Geology Reports (SOR, Well Proposals, Well Evaluation Reports, Geological Final Well Reports)",
            "Geomechanics",
            "Geophysics",
            "Interpreted Logs",
            "Lithology",
            "Material Balance",
            "Petrography",
            "Petrophysics",
            "RAR",
            "RCA (Routine Core Analysis)",
            "SEM",
            "Static Model",
            "Study Reports",
            "Thin Sections",
            "Well Model",
            "Well Paths",
            "Well Test (Records, Interpretation, etc.)",
	  	].sort((a, b) => a.localeCompare(b))
	};
}

exports.validateNodeName = function(name) {
    return validateSpecialCharacter(name);
}
exports.validateKey = function(key) {
    return validateSpecialCharacter(key) && validateUnicodeCharacter(key);
}
function validateSpecialCharacter(str) {
    return !(/[\\/:*?<>|{}^%`\[\]~#&$@=;+,]/.test(str));
}
function validateUnicodeCharacter(str) {
    return !_.some(str, c => c.charCodeAt(0) >= 128);
}

function getAllWellsInNode(parentNode) {
    const groups = parentNode.children.filter(c => c.type === 'group');
    return _.flatten([...groups.map(g => getAllWellsInNode(g)), parentNode.children.filter(c => c.type === 'well')]);
}
exports.getAllWellsInNode = getAllWellsInNode;

function getType(fileName) {
    if (!fileName) return 'Unknown';
    return constants.FILE_EXTENSIONS[fileName.split('.').pop().toLowerCase()] || 'Unknown';
}

function getFileExtension(fileName) {
    return fileName.split('.').pop().toLowerCase();
}

function isFolder(fileName) {
    return !fileName.includes(".");
}

function formatBytes(a,b) {if(0==a) return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}


exports.getType = getType;
exports.getFileExtension = getFileExtension;
exports.isFolder = isFolder;
exports.formatBytes = formatBytes;