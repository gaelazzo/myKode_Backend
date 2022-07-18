
function Heap(){
    this.A =[];

}

Heap.prototype = {
    constructor: Heap,
    heapify: function(a){
        a.forEach(el=> this.push(el));
    },

    push: function(x){
        let pos = this.A.push(x)-1; //= posizione dell'elemento che ha inserito
        while (pos!==0){
            let parent= Math.trunc((pos-1)/2);
            if (this.A[parent]>x) break;
            this.A[pos] = this.A[parent];
            this.A[parent] = x;
            pos = parent;
        }
    },

    popMax: function(){
        let result = this.A[0];

        let V = this.A.pop();
        if (this.A.length===0) return result;

        let pos = 0;
        this.A[pos]= V;
        let childLeft = 2*pos+1;
        while(childLeft < this.A.length){
            let candidatePosition = childLeft;
            if (childLeft+1 < this.A.length){
                    if (this.A[childLeft+1]> this.A[candidatePosition]){
                        candidatePosition = childLeft+1;
                    }
            }
            if (this.A[candidatePosition]<=V) {
                break;
            }
            this.A[pos]= this.A[candidatePosition];
            this.A[candidatePosition]= V;
            pos = candidatePosition;
            childLeft = 2*pos+1;
        }

        return result;
    },

    peekMax: function(){
        return this.A[0];
    }

};

Array.prototype.heapify = function(){
    let H = new Heap();
    H.heapify(this);
    return H;
};

/*

 [ 0 => root] [ 1 => left child di 0] [ 2 => right child di 0] [ 3=> left child di 1] [ 4 => right child di 1]
             0
          1     2

      3      4       5    6
    7  8   9   [571]

 left child dell'elemento I  ha indice 2*I+1, right child ha indice 2*I+2
 indice del parent dell'elemento I  ha indice   (I-1)/2
 il root ha posizione 0

 l'array ha una dimensione N pari al numero di elementi dello heap


* */
module.exports = Heap;