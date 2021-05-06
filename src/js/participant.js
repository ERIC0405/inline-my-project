class Participant {
    constructor(num, pname, tel) {
        this.pname = pname;
        this.tel = tel;
        this.num = num;
        this.createTime = new Date();
    }

    createDom() {
        let template = `<tr>
                    <td colspan="1">${this.num}</td>
                    <td colspan="1">${this.pname}</td>
                    <td colspan="1">${this.tel}</td>
                    <td id="num${this.num}" colspan="1">${this.minutesWaited()}</td>
                </tr>`;
        let tempNode = document.createElement('tbody');
        tempNode.innerHTML = template;
        return tempNode.firstChild;
    }
    minutesWaited()
    {
        let dateBegin = this.createTime;
        let dateEnd = new Date();
        let dateDiff = dateEnd.getTime() - dateBegin.getTime();
        let minutes = Math.floor(dateDiff / (60 * 1000));
        return "Waited " + minutes + " minute(s)";
    }
    timeWaited() {
        let dateBegin = this.createTime;
        let dateEnd = new Date();
        let dateDiff = dateEnd.getTime() - dateBegin.getTime();
        let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
        let leave1 = dateDiff % (24 * 3600 * 1000);
        let hours = Math.floor(leave1 / (3600 * 1000));
        let leave2 = leave1 % (3600 * 1000);
        let minutes = Math.floor(leave2 / (60 * 1000));
        let leave3 = leave2 % (60 * 1000);
        let seconds = Math.round(leave3 / 1000);
        console.log("Waited " + dayDiff + "day(s), " + hours + "hour(s), " + minutes + " minute(s)" + seconds + " second(s)");
        return "Waited " + dayDiff + "day(s), " + hours + "hour(s), " + minutes + " minute(s)" + seconds + " second(s)";
    }
}
