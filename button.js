function SelectableButton(ele){
	this.selectedItem = false;
	this.domElement = ele;
}

SelectableButton.prototype.setSelect = function(){
	this.selectedItem = true;
	this.domElement.style.background="#666666";
}

SelectableButton.prototype.deselect = function(){
	this.selectedItem = false;
	this.domElement.style.background="#000000";
}

SelectableButton.prototype.getDom = function(){
	return this.domElement;
}

SelectableButton.prototype.isSelected = function(){
	return this.selectedItem;
}



