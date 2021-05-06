class DataFolder
{
	constructor(args){
		this.lineNow = [];
		this.lineHis = [];
	}

	print()
	{
		console.log(this.lineNow);
		console.log(this.lineHis);
	}

	lineIn(item)
	{
		this.lineNow.push(item);
	}

	lineOut()
	{
		let item = this.lineNow.shift();
		this.lineHis.push(item);
		return item;
	}
}