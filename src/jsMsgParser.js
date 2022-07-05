/**
 * Extracts subsequent strings delimited by startToken and stopToken
 * @param {string} message
 * @param {string} startToken
 * @param {string} stopToken
 * @constructor
 */
function MsgParser(message,startToken,stopToken){
    this.msg=message;
    this.startToken=startToken;
    this.stopToken=stopToken;
    this.reset();
}

/**
 * Restarts parsing
 */
MsgParser.prototype.reset = function (){
    this.nextPosition=0;
};

/**
 * @public
 * @return {?{found:?string, skipped:string}}
 */
MsgParser.prototype.getNext = function (){
    if (this.nextPosition>= this.msg.length){
        return null;
    }
    let foundAt=-1;
    let afterEndTag=-1;
    let nextAt=-1;
    let newStart=-1;
    let endTag;
    foundAt= this.msg.indexOf(this.startToken,this.nextPosition);
    if (foundAt>=0){
        newStart= foundAt+this.startToken.length;
        endTag= this.msg.indexOf(this.stopToken,newStart);
        if (endTag === -1){
            foundAt=-1; //aborts the element
        }
        else {
            nextAt= endTag+this.stopToken.length;
        }
    }
    if (foundAt>=0){
        let len= nextAt-this.stopToken.length-newStart;

        let found= this.msg.substr(newStart,len);
        let skipped = this.msg.substr(this.nextPosition,foundAt-this.nextPosition);
        this.nextPosition= nextAt;
        return  {found:found, skipped:skipped };
    }
    else {
        let skipped= this.msg.substr(this.nextPosition);
        let found=null;
        this.nextPosition= this.msg.length;
        return  {found:found, skipped:skipped };
    }



};



module.exports = {
    MsgParser: MsgParser
};